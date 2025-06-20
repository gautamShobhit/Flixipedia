import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideos, clearTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const trailerVideos = useSelector((store) => store.movies?.trailerVideos);

  //Make an API call with the movie ID we have got
  const getMovieVideos = async () => {
    dispatch(clearTrailerVideo());
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
    !trailerVideos && getMovieVideos();
  }, [movieId, dispatch]);
};

export default useMovieTrailer;
