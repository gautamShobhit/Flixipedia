import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideos } from "../utils/moviesSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  //Make an API call with the movie ID we have got
  const getMovieVideos = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    const filteredData = json.results.filter(
      (videos) => videos.type === "Trailer"
    );
    //There may be cases when trailer of a movie has not been released yet,
    //In such cases, display teaser of that movie
    //filteredData --> returns a list of trailer videos
    const trailerVideo = filteredData.length
      ? filteredData[0]
      : json.results.filter((videos) => videos.type === "Teaser")[0];

    dispatch(addTrailerVideos(trailerVideo));
  };

  useEffect(() => {
    getMovieVideos();
  }, []);
};

export default useMovieTrailer;
