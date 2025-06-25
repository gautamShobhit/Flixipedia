import { IMG_CDN_URL } from "../utils/constants";

const MovieVideoBg = ({ poster, trailer }) => {
  return (
    <div className="flex justify-center ">
      <div className=" w-5/6 h-[75%] mt-20 text-white absolute flex  justify-between  ">
        <img
          className="h-3/4 rounded-2xl object-cover z-20 border-b-2 border-white shadow-red-400 shadow-xl my-auto -mr-32"
          src={IMG_CDN_URL + poster}
          alt="Movie Poster"
        />
        <div className="overflow-hidden w-5/6 h-full rounded-2xl  shadow-red-400 shadow-xl ">
          <div className="ml-auto rounded-2xl border-b-2 border-white absolute z-10 w-5/6 inset-0 bg-gradient-to-t from-black via-transparent to-transparent "></div>
          <iframe
            className="scale-[1.35] w-full h-full"
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
