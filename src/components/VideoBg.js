import { useSelector } from "react-redux";
import useMovieTrailer from "../customHooks/useMovieTrailer";
const VideoBg = ({ movieId }) => {
  const trailer = useSelector((store) => store.movies?.trailerVideos);

  useMovieTrailer(movieId);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <iframe
        className="w-full h-full md:scale-[1.1] scale-[1.8] object-cover"
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
