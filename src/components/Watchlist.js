// src/components/Watchlist.js
import Header from "./Header";
import flixipediaBg from "../assets/flixipediaBg.jpg";

const Watchlist = () => {
  return (
    <div>
      <div className="md:w-screen h-screen object-cover z-10 fixed inset-0 bg-black bg-opacity-40"></div>

      {/* Reusing your Header here so the user can easily navigate back to Home/Discover */}
      <Header />

      <img
        className="fixed h-screen md:w-screen object-cover -z-10"
        src={flixipediaBg}
        alt="Background Img"
      />

      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none backdrop-blur-md">
        <h1 className="text-white md:text-xl text-[14px] font-bold bg-black bg-opacity-70 px-8 py-4 rounded-lg border border-gray-500 drop-shadow-2xl backdrop-blur-sm">
          Coming Soon...
        </h1>
      </div>
    </div>
  );
};

export default Watchlist;
