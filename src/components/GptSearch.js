import netflixBg from "../assets/netflixBg.jpg";
import MovieSuggestions from "./MovieSuggestions";
import SearchBar from "./SearchBar";
const GptSearch = () => {
  return (
    <div>
      <div className="z-10 absolute inset-0 bg-black bg-opacity-40"></div>
      <img className="absolute -z-10" src={netflixBg} alt="Background Img" />
      <div className="absolute z-10 mt-24 border border-white w-full">
        <SearchBar />
        <MovieSuggestions />
      </div>
    </div>
  );
};
export default GptSearch;
