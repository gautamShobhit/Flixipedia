// api/tmdb.js
export default async function handler(req, res) {
  // Extract the target TMDB path and any other query parameters (like page=1)
  const { path, ...queryParams } = req.query;

  if (!path) {
    return res.status(400).json({ error: "TMDB path is required" });
  }

  // Reconstruct the query parameters to pass along to TMDB
  const queryString = new URLSearchParams(queryParams).toString();
  const tmdbUrl = `https://api.themoviedb.org/3${path}${queryString ? `?${queryString}` : ""}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      // Accessing your env variable securely on the server
      Authorization: "Bearer " + process.env.REACT_APP_TMDB_API_KEY,
    },
  };

  try {
    const response = await fetch(tmdbUrl, options);

    if (!response.ok) {
      throw new Error(`TMDB API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // Add caching headers so Vercel's Edge Network caches the response
    // This makes your app lightning fast and reduces TMDB API usage
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    res.status(200).json(data);
  } catch (error) {
    console.error("TMDB Proxy Error:", error);
    res.status(500).json({ error: "Failed to fetch data from TMDB" });
  }
}
