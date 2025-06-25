import netflixLogo from "../assets/netflixLogo.jpg";
import signOutLogo from "../assets/signOutLogo.jpg";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import {
  clearMovieSearchResults,
  resetSearch,
  toggleGptSearch,
} from "../utils/gptSlice";
// import searchBtn from "../assets/searchBtn.jpg";
import { resetMovieDetails, toggleIsMoviePage } from "../utils/movieInfoSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        //navigate to login page
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
    dispatch(resetSearch());
    dispatch(clearMovieSearchResults());
    dispatch(resetMovieDetails());
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        //when user is logged in....
        navigate("/browse");
      } else {
        dispatch(removeUser());
        //when user logged out...
        navigate("/");
      }
      return () => unsubscribe();
    });
  }, []);

  return (
    <div className="w-full top-0 left-0 items-center z-20 absolute flex justify-between bg-gradient-to-b from-black ">
      <div className="md:p-4 p-2">
        <img
          className="md:ml-8 md:w-40 w-24 transition-all delay-100 ease-in-out duration-300 hover:scale-95"
          src={netflixLogo}
          alt="logo"
        />
      </div>

      {user && (
        <div className="flex">
          <button
            className=" md:h-10 h-6 md:py-2 my-auto mx-4 transition-all ease-in-out delay-70 duration-300 hover:scale-95"
            onClick={() => {
              // to reset the entire gptSlice
              dispatch(resetSearch());
              dispatch(clearMovieSearchResults());
              // to reset the entire movieInfo Slice
              dispatch(resetMovieDetails());
            }}
          >
            <h1 className="text-white font-semibold md:text-base text-xs">
              Home
            </h1>
          </button>
          <button
            className=" md:h-10 h-6 md:py-2 my-auto transition-all ease-in-out delay-70 duration-300 hover:scale-95"
            onClick={() => {
              //It doesn't matter what position we are in,
              //We need to enter search page with empty list
              //And we need to take exit by emptying the list
              dispatch(toggleGptSearch());
              dispatch(resetMovieDetails());
            }}
          >
            {/* <img className="w-6" src={searchBtn} alt="Search Button" /> */}
            <h1 className="text-white font-semibold md:text-base text-xs">
              Search
            </h1>
          </button>
          <div className="flex p-2 md:m-2  rounded-lg">
            <p className="mr-2 font-bold text-white md:text-base text-xs my-auto">
              {user.displayName}
            </p>
            <button
              className=" p-2 bg-red-600 rounded-lg hover:bg-red-700"
              onClick={handleSignOut}
            >
              <img
                className="md:w-4 w-2"
                src={signOutLogo}
                alt="sign out logo"
              />
            </button>
          </div>
          <img
            className="mr-2 md:h-8 h-6 my-auto rounded-full"
            src={user.photoURL}
            alt="userPfp"
          />
        </div>
      )}
    </div>
  );
};
export default Header;
