import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addMovieSearchResults } from "../utils/gptSlice";

/**
 * UX + Performance focused SearchBar
 * - Debounced AI requests
 * - Client-side caching
 * - Graceful rate-limit handling
 * - Clear user feedback
 */
const SearchBar = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  // UI state
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // Performance optimizations
  const lastRequestTimeRef = useRef(0);
  const searchCacheRef = useRef({}); // query -> movieList

  // ---- CONSTANTS (easy to tweak later) ----
  const DEBOUNCE_TIME = 3000;

  /**
   * Fetch movie details from TMDB for a given movie name
   */
  const fetchFromTMDB = async (movieName) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const data = await response.json();
    return data.results;
  };

  /**
   * Main AI-powered search handler
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

      const response = await fetch(
        `/api/generateMovies?query=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        if (response.status === 429) {
          setStatusMessage("🚫 Too many requests. Please slow down a bit.");
        } else {
          setStatusMessage(`❌ API error: ${response.status} ${response.statusText}. Please try again.`);
        }
        return;
      }

      const { movies = [], provider = "unknown" } = await response.json();

      // Fetch TMDB details for each AI-recommended movie
      const tmdbResults = await Promise.all(
        movies.map((movie) => fetchFromTMDB(movie))
      );

      // Pick the most relevant result per movie
      const finalMovieList = tmdbResults.map(
        (results) => results?.[0]
      );

      // ---- CACHE RESULT ----
      searchCacheRef.current[cacheKey] = finalMovieList;

      dispatch(addMovieSearchResults(finalMovieList));

      setStatusMessage(
        provider === "fallback"
          ? "⚠️ Using Groq (Alternate AI model)"
          : "🎬 Results provided by Gemini"
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
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex justify-between md:m-0 m-4 p-4 md:w-3/5 w-screen bg-black bg-opacity-70 rounded-lg border-b border-white shadow-md shadow-red-400"
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="What would you like to watch today?"
          disabled={loading}
          className="md:text-base text-xs w-10/12 p-2 mr-2 rounded-lg bg-gray-900 text-white font-bold border border-gray-400"
        />

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

      {statusMessage && (
        <p className="mt-2 text-sm italic text-gray-300">
          {statusMessage}
        </p>
      )}
    </div>
  );
};

export default SearchBar;
