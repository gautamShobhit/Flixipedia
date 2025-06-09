import netflixLogo from "../assets/netflixLogo.jpg";
const Header = () => {
  return (
    <div>
      <div className="z-10 absolute flex justify-center bg-gradient-to-b from-black">
        <img
          className="m-2 w-2/12 transition-all delay-100 ease-in-out duration-300 hover:scale-95 "
          src={netflixLogo}
          alt="logo"
        />
      </div>
    </div>
  );
};
export default Header;
