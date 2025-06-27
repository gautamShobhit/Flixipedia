import { IMG_CDN_URL } from "../utils/constants";

const MovieVideoBg = ({ poster, trailer }) => {
  return (
    <div className="flex justify-center ">
      <div className="md:w-5/6 w-11/12 md:h-[75%] h-[23%] md:mt-20 mt-12 text-white absolute flex justify-between">
        <img
          className="hidden md:block md:h-3/4 h-2/3 rounded-2xl object-cover z-20 md:border-b-2 border-b border-white shadow-red-400 shadow-xl md:my-auto md:-mr-32"
          src={IMG_CDN_URL + poster}
          alt="Movie Poster"
        />
        <div className="z-10 overflow-hidden md:w-5/6 w-full h-full rounded-2xl  shadow-red-400 shadow-xl ">
          <div className=" md:ml-auto rounded-2xl md:border-b-2 border-b border-white absolute z-20 md:w-5/6  inset-0 bg-gradient-to-t from-black via-transparent to-transparent "></div>
          <iframe
            className="scale-[1.35] w-full h-full "
            src={
              "https://www.youtube.com/embed/" +
              trailer?.key +
              "?&autoplay=1&mute=1&controls=0&loop=1&showinfo=0"
            }
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
      </div>
    </div>
  );
};
export default MovieVideoBg;
