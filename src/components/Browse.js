import netflixBg from "../assets/netflixBg.jpg";
import netflixLogo from "../assets/netflixLogo.jpg";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebaseConfig";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";

const Browse = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        //navigate to login page
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };
  return (
    <div>
      <div className="z-10 absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="z-10 absolute flex justify-between bg-gradient-to-b from-black ">
        <img
          className="m-2 w-2/12 transition-all delay-100 ease-in-out duration-300 hover:scale-95 "
          src={netflixLogo}
          alt="logo"
        />
        <div className="p-4 m-2 bg-black bg-opacity-65 rounded-lg">
          <img
            className=" h-12 mx-auto rounded-lg"
            src={user.photoURL}
            alt="userPfp"
          />
          <p className="font-bold text-white text-center">{user.displayName}</p>
          <button
            className=" p-2 bg-red-600 text-white text-sm font-bold rounded-lg hover:bg-red-700"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </div>

      <img className="absolute" src={netflixBg} alt="Background Img" />
    </div>
  );
};
export default Browse;
