import { useSelector } from "react-redux";
import useMovieTrailer from "../customHooks/useMovieTrailer";

const VideoBg = ({ movieId }) => {
  const trailer = useSelector((store) => store.movies?.trailerVideos);

  useMovieTrailer(movieId);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <iframe
        // 1. Increased md:scale from [1.1] to [1.35] to push 21:9 black bars out of frame
        // 2. Removed object-cover (it doesn't affect iframes)
        // 3. Added pointer-events-none so users can't accidentally click/pause the background video
        className="w-full h-full md:scale-[1.35] scale-[1.8] pointer-events-none"
        src={
          "https://www.youtube.com/embed/" +
          trailer?.key +
          "?&autoplay=1&mute=1&controls=0&loop=1&showinfo=0" // showinfo=0 is deprecated, but won't hurt
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};
export default VideoBg;
