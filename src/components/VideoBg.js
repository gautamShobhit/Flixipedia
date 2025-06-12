import { useSelector } from "react-redux";
import useMovieTrailer from "../customHooks/useMovieTrailer";
const VideoBg = ({ movieId }) => {
  const trailer = useSelector((store) => store.movies?.trailerVideos);

  useMovieTrailer(movieId);

  return (
    <div className="w-screen">
      <iframe
        className="w-screen aspect-video"
        //   Optional chaining mein phs gya tha.....
        src={
          "https://www.youtube.com/embed/" +
          trailer?.key +
          "?&autoplay=1&mute=1&controls=0&loop=1&showinfo=0"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};
export default VideoBg;
