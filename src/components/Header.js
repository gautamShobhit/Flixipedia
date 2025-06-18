import netflixLogo from "../assets/netflixLogo.jpg";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { resetSearch, toggleGptSearch } from "../utils/gptSlice";
import searchBtn from "../assets/searchBtn.jpg";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.search?.isGptSearch);
  const handleSearchClick = () => {
    dispatch(toggleGptSearch());
  };
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
      <div className="p-4">
        <img
          className="ml-8 w-36 transition-all delay-100 ease-in-out duration-300 hover:scale-95"
          src={netflixLogo}
          alt="logo"
        />
      </div>

      {user && (
        <div className="flex">
          <button
            className="m-2 h-10 py-2 px-4 my-auto  bg-black bg-opacity-70 text-black rounded-lg transition-all ease-in-out delay-70 duration-300 hover:scale-95"
            onClick={handleSearchClick}
          >
            {showGptSearch ? (
              "🏠"
            ) : (
              <img className="w-6" src={searchBtn} alt="Search Button" />
            )}
          </button>
          <img
            className="mx-2 h-10 my-auto rounded-full"
            src={user.photoURL}
            alt="userPfp"
          />
          <div className="flex p-2 m-2  bg-black bg-opacity-70 rounded-lg">
            <div>
              <p className="font-bold text-white text-center text-xs">
                {user.displayName}
              </p>
              <button
                className=" p-2 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Header;
