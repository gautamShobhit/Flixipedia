import netflixBg from "../assets/netflixBg.jpg";
import MovieSuggestions from "./MovieSuggestions";
import SearchBar from "./SearchBar";
const GptSearch = () => {
  return (
    <div>
      <div className="md:w-screen h-screen object-cover z-10 fixed inset-0 bg-black bg-opacity-40"></div>
      <img
        className="md:w-screen h-screen object-cover fixed -z-10"
        src={netflixBg}
        alt="Background Img"
      />
      <div className="absolute z-10 mt-20  w-full">
        <SearchBar />
        <MovieSuggestions />
      </div>
    </div>
  );
};
export default GptSearch;
