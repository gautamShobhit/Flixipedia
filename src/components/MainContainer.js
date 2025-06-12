import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBg from "./VideoBg";

const MainContainer = () => {
  //Since we need to build a vdo title and a vdo bg
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  //There could be case when "movies" is empty
  //AKA early return -> It prevents our code fetchinh movies when it is null
  if (!movies) return;

  const mainMovie = movies[0];
  const { original_title, overview, id } = mainMovie;
  return (
    <div>
      <VideoTitle title={original_title} overview={overview} />
      <VideoBg movieId={id} />
    </div>
  );
};
export default MainContainer;
