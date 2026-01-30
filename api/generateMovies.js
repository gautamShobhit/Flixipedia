import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * API endpoint for generating AI movie recommendations.
 * This file handles incoming requests, applies rate limiting, and uses either
 * the Gemini AI or Groq API to generate movie suggestions based on a user query.
 */

/**
 * Simple in-memory rate limiting (Vercel-safe, best-effort)
 * NOTE: Resets on cold starts — acceptable for frontend protection
 */
const RATE_LIMIT = 5; // Maximum number of requests allowed within the `WINDOW_MS`
const WINDOW_MS = 60 * 1000; // Time window (in milliseconds) for rate limiting (e.g., 1 minute)
const COOLDOWN_MS = 3 * 1000; // Cooldown period (in milliseconds) between requests from the same IP

const ipStore = new Map(); // Stores IP-based request records for rate limiting

/**
 * Main handler function for the API route.
 * Processes movie recommendation requests, applies rate limiting, interacts with AI models,
 * and parses their responses to return a structured list of movies with reasons.
 * @param {object} req - The incoming request object.
 * @param {object} res - The outgoing response object.
 * @returns {Promise<void>} A promise that resolves when the response is sent.
 */
export default async function handler(req, res) {
  try {
    const query = req.query.query; // Extract the movie search query from the request
    // Determine the client's IP address for rate limiting purposes
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress ||
      "unknown";

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const now = Date.now();
    // Retrieve or initialize the IP's request record
    const record = ipStore.get(ip) || {
      count: 0,
      firstRequestTime: now,
      lastRequestTime: 0,
    };

    // ---- COOLDOWN (debounce protection) ----
    // Prevents rapid-fire requests from the same IP within a short period
    if (now - record.lastRequestTime < COOLDOWN_MS) {
      return res.status(429).json({
        error: "Too many requests. Please wait a moment before trying again.",
      });
    }

    // ---- RATE LIMIT WINDOW RESET ----
    // Resets the request count if the time window has passed
    if (now - record.firstRequestTime > WINDOW_MS) {
      record.count = 0;
      record.firstRequestTime = now;
    }

    record.count += 1;
    record.lastRequestTime = now;
    ipStore.set(ip, record);

    // ---- RATE LIMIT CHECK ----
    // Checks if the request count exceeds the defined rate limit
    if (record.count > RATE_LIMIT) {
      return res.status(429).json({
        error: "Rate limit exceeded. Please try again later.",
      });
    }

    /**
     * AI prompt for generating movie recommendations.
     * Instructs the model to return 10 movie titles, each with a brief reason,
     * formatted as a comma-separated string without numbering or extra text.
     */
    const prompt = `You are a movie recommendation system.\n    Recommend movies based on this query: "${query}".\n    For each of the top 10 movies, return the movie title followed by a comprehensive reason for recommending it.\n    Format your response as:\n    Movie Title 1: Comprehensive reason here ### Movie Title 2: Comprehensive reason here ### ... up to 10 movies.\n    Do not number the movies and do not include any explanations or extra text outside this format.`;

    let moviesText = ""; // Stores the raw text response from the AI model
    let provider = "gemini"; // Tracks which AI provider was used (default: Gemini)

    // ---- GEMINI (PRIMARY) ----
    // Attempt to get movie recommendations using the Google Gemini AI model
    try {
      const genAI = new GoogleGenerativeAI(process.env.VERCEL_GEMINI_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash", // Specify the Gemini model to use
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      moviesText = response.text();
    } catch (err) {
      console.warn("Gemini failed, switching to fallback:", err.message);
      provider = "fallback";
    }

    // ---- GROQ FALLBACK ----
    // If Gemini fails, or returns no movies, attempt to use Groq as a fallback AI provider
    if (!moviesText) {
      const groqRes = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.VERCEL_GROQ_KEY}`,
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant", // Specify the Groq model to use
            messages: [{ role: "user", content: prompt }],
            max_tokens: 500,
          }),
        },
      );

      const groqData = await groqRes.json();
      moviesText = groqData.choices?.[0]?.message?.content || "";
    }

    // ---- PARSE MOVIES ----
    // Parses the raw text response from the AI into an array of movie objects
    // The expected format is: "Movie Title 1: Brief reason here, Movie Title 2: Brief reason here, ..."
    const movies = moviesText
      .split("###") // Split the string by "###" to get individual movie entries
      .map((entry) => {
        const lastColonIndex = entry.lastIndexOf(":");
        if (lastColonIndex === -1) return null; // No colon found, invalid format
        const title = entry.substring(0, lastColonIndex).trim();
        const reason = entry.substring(lastColonIndex + 1).trim();
        if (!title || !reason) return null; // Filter out entries without a valid title or reason
        return { title, reason };
      })
      .filter(Boolean) // Remove any null entries resulting from parsing errors
      .slice(0, 10); // Limit the results to the top 10 movies

    // Send the structured movie data and the AI provider as a JSON response
    return res.status(200).json({
      movies,
      provider,
    });
  } catch (error) {
    console.error("API error:", error); // Log any unexpected errors
    return res.status(500).json({ error: "AI generation failed" }); // Return a 500 status for server errors
  }
}
