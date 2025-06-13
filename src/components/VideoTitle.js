const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-full aspect-video pt-72 pl-24 absolute text-white bg-gradient-to-r from-black  ">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent "></div>
      <div className="absolute">
        <h1 className="text-4xl font-bold mb-4 w-1/3">{title}</h1>
        <p className=" w-1/3 mb-4 shadow-xl">{overview}</p>
        <div>
          <button className="mr-4 w-20 p-2 font-semibold text-lg bg-white text-black  rounded-lg transition-all ease-in-out delay-75 duration-200 hover:scale-95 hover:bg-opacity-80">
            Play
          </button>
          <button className="w-40 p-2 font-semibold text-lg bg-white text-white bg-opacity-30 rounded-lg transition-all ease-in-out delay-75 duration-200 hover:scale-95">
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};
export default VideoTitle;
