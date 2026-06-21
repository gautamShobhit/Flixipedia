import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addMovieSearchResults } from "../utils/gptSlice";

/**
 * UX + Performance focused SearchBar
 * - Debounced AI requests
 * - Client-side caching
 * - Graceful rate-limit handling
 * - Clear user feedback
 */
const SearchBar = () => {
  // Initialize Redux dispatch for sending actions to the store
  const dispatch = useDispatch();
  // Create a ref for direct access to the search input element
  const inputRef = useRef(null);

  // UI state for managing loading status and displaying messages to the user
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // Performance optimizations: tracking last request time for debouncing and a cache for search results
  const lastRequestTimeRef = useRef(0);
  // Caches movie search results to avoid redundant API calls for the same query
  const searchCacheRef = useRef({}); // Stores query -> movieList mapping

  // ---- CONSTANTS (easy to tweak later) ----
  const DEBOUNCE_TIME = 3000;

  /**
   * Fetches movie details from The Movie Database (TMDB) API.
   * Retrieves only the first result to avoid duplicates.
   * @param {string} movieName - The name of the movie to search for.
   * @returns {Promise<object|null>} A promise that resolves to the first movie object from TMDB, or null if not found.
   */
  const fetchFromTMDB = async (movieName) => {
    const response = await fetch(
      `/api/tmdb?path=/search/movie&query=${movieName}&include_adult=false&language=en-US&page=1`,
    );
    const data = await response.json();
    return data.results?.[0]; // Return only the first result
  };

  /**
   * Handles the main AI-powered movie search logic.
   * Includes client-side caching, debouncing, and rate-limit handling for a smooth user experience.
   * Dispatches the final list of unique movies with AI-generated reasons to the Redux store.
   */
  const handleSearch = async () => {
    const query = inputRef.current.value.trim();
    if (!query || loading) return;

    const cacheKey = query.toLowerCase();

    // ---- CACHE HIT (instant UX) ----
    if (searchCacheRef.current[cacheKey]) {
      dispatch(addMovieSearchResults(searchCacheRef.current[cacheKey]));
      setStatusMessage("⚡ Loaded from cache");
      setLoading(false);
      return;
    }

    // ---- FRONTEND DEBOUNCE ----
    const now = Date.now();
    if (now - lastRequestTimeRef.current < DEBOUNCE_TIME) {
      setStatusMessage("⏳ Please wait a moment before searching again");
      return;
    }
    lastRequestTimeRef.current = now;

    try {
      setLoading(true);
      setStatusMessage("✨ Finding the perfect movies for you...");

      // Construct the API endpoint for Gemini movie recommendations.
      const response = await fetch(
        `/api/generateMovies?query=${encodeURIComponent(query)}`,
      );

      // Handle API response errors, specifically rate limiting (429) and other server errors.
      if (!response.ok) {
        if (response.status === 429) {
          setStatusMessage("🚫 Too many requests. Please slow down a bit.");
        } else {
          setStatusMessage(
            `❌ API error: ${response.status} ${response.statusText}. Please try again.`,
          );
        }
        return;
      }

      // Extract movie titles and AI provider from the Gemini API response.
      const { movies = [], provider = "unknown" } = await response.json();

      // For each movie recommended by AI, fetch its details from TMDB and attach the AI-generated reason.
      const tmdbResultsWithReason = await Promise.all(
        movies.map(async ({ title, reason }) => {
          const result = await fetchFromTMDB(title); // Assuming fetchFromTMDB now returns a single best result or null
          // If a TMDB result is found, combine it with the AI's reason.
          return result ? { ...result, aiReason: reason } : null;
        }),
      );

      // Filter out any null results (movies not found on TMDB) and ensure uniqueness based on movie ID.
      const uniqueMovies = new Map();
      tmdbResultsWithReason.filter(Boolean).forEach((movie) => {
        if (!uniqueMovies.has(movie.id)) {
          uniqueMovies.set(movie.id, movie);
        }
      });
      const finalMovieList = Array.from(uniqueMovies.values());

      // Cache the final list of unique movies to improve performance for subsequent identical searches.
      searchCacheRef.current[cacheKey] = finalMovieList;

      // Dispatch the final, curated list of movie results to the Redux store.
      dispatch(addMovieSearchResults(finalMovieList));

      // Set a status message indicating the AI model used for the recommendations.
      setStatusMessage(
        provider === "fallback"
          ? "⚠️ Using Groq (Alternate AI model)"
          : "🎬 Results provided by Gemini",
      );
    } catch (error) {
      console.error("Search failed:", error);
      setStatusMessage("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      {/* Search input form */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex justify-between md:m-0 m-4 p-4 md:w-3/5 w-screen bg-gray-800 bg-opacity-70 rounded-lg border-b border-white shadow-md shadow-red-400"
      >
        {/* Input field for movie search query */}
        <input
          ref={inputRef}
          type="text"
          placeholder="What would you like to watch today?"
          disabled={loading}
          className="md:text-base text-xs w-10/12 p-2 mr-2 rounded-lg bg-gray-900 text-white font-bold border border-gray-400"
        />

        {/* Search button */}
        <button
          onClick={handleSearch}
          disabled={loading}
          className={`text-center md:text-base text-[9px] w-2/12 p-2 rounded-lg font-bold text-white transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Display status messages to the user (e.g., loading, errors, cache hits) */}
      {statusMessage && (
        <p className="mt-2 text-sm italic text-gray-300">{statusMessage}</p>
      )}
    </div>
  );
};

export default SearchBar;
