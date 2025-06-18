import { useRef } from "react";

import geminiAI from "../utils/geminiAI";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addMovieSearchResults } from "../utils/gptSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchText = useRef(null);
  //this function returns tmdb search results for particular movies
  const searchTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };
  const handleGptSearchClick = async () => {
    const searchQuery =
      "Act as a movie recommendation system, recommend movies as per the given query : " +
      searchText.current.value +
      "Return only the top 10 of your most recommended movies in a comma separated format and nothing else like the given example. Example Response : Bang Bang, Kaabil, Kick, Tere Naam";
    const response = await geminiAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: searchQuery,
    });
    //console.log(response.text);
    const getMovies = response.text.split(", ");
    const promiseArray = getMovies.map((movie) => searchTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);
    //Since tmdbResults is an array containing arrays of all the movies which include given movie name
    //We need to pick 1st array from every array since they are most likely the required one
    const movieList = tmdbResults.map((results) => results[0]);
    //dispatch an action to add the resultant movie list
    dispatch(addMovieSearchResults(movieList));
  };
  return (
    <div className="flex justify-center">
      <form
        className="flex justify-between p-4 w-3/5  bg-black bg-opacity-70 rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          className="w-10/12 p-2 rounded-lg mr-2 text-white font-bold bg-gray-700 border border-gray-400"
          type="text"
          placeholder="What would you like to watch today ?"
        />
        <button
          className="w-2/12 p-2 bg-red-600 font-bold rounded-lg text-white hover:bg-red-700 "
          onClick={handleGptSearchClick}
        >
          Search
        </button>
      </form>
    </div>
  );
};
export default SearchBar;
