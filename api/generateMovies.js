import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Simple in-memory rate limiting (Vercel-safe, best-effort)
 * NOTE: Resets on cold starts — acceptable for frontend protection
 */
const RATE_LIMIT = 5; // max requests
const WINDOW_MS = 60 * 1000; // per minute
const COOLDOWN_MS = 3 * 1000; // debounce-like cooldown

const ipStore = new Map();

export default async function handler(req, res) {
  try {
    const query = req.query.query;
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress ||
      "unknown";

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const now = Date.now();
    const record = ipStore.get(ip) || {
      count: 0,
      firstRequestTime: now,
      lastRequestTime: 0
    };

    // ---- COOLDOWN (debounce protection) ----
    if (now - record.lastRequestTime < COOLDOWN_MS) {
      return res.status(429).json({
        error: "Too many requests. Please wait a moment before trying again."
      });
    }

    // ---- RATE LIMIT WINDOW RESET ----
    if (now - record.firstRequestTime > WINDOW_MS) {
      record.count = 0;
      record.firstRequestTime = now;
    }

    record.count += 1;
    record.lastRequestTime = now;
    ipStore.set(ip, record);

    if (record.count > RATE_LIMIT) {
      return res.status(429).json({
        error: "Rate limit exceeded. Please try again later."
      });
    }

    const prompt = `Act as a movie recommendation system.
Recommend movies based on this query: "${query}".
Return ONLY the top 10 movie names in a comma-separated format.
No explanations. No numbering.`;

    let moviesText = "";
    let provider = "gemini";

    // ---- GEMINI (PRIMARY) ----
    try {
      const genAI = new GoogleGenerativeAI(process.env.VERCEL_GEMINI_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash"
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      moviesText = response.text();
    } catch (err) {
      console.warn("Gemini failed, switching to fallback:", err.message);
      provider = "fallback";
    }

    // ---- GROQ FALLBACK ----
    if (!moviesText) {
      const groqRes = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.VERCEL_GROQ_KEY}`
          },
          body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 200
          })
        }
      );

      const groqData = await groqRes.json();
      moviesText = groqData.choices?.[0]?.message?.content || "";
    }

    // ---- PARSE MOVIES ----
    const movies = moviesText
      .split(",")
      .map(m => m.trim())
      .filter(Boolean)
      .slice(0, 10);

    return res.status(200).json({
      movies,
      provider
    });
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ error: "AI generation failed" });
  }
}
