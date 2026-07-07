import flixipediaLogo from "../assets/flixipediaLogo.jpg";
import signOutLogo from "../assets/signOutLogo.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../utils/firebaseConfig";
import { onAuthStateChanged, signOut, deleteUser } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import {
  clearMovieSearchResults,
  resetSearch,
  toggleGptSearch,
} from "../utils/gptSlice";
import { resetMovieDetails } from "../utils/movieInfoSlice";
import { PHOTO_URL } from "../utils/constants";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector((store) => store.user);
  const isGptSearch = useSelector((store) => store.search?.isGptSearch);

  const [showGuestPopup, setShowGuestPopup] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = () => {
    const currentUser = auth.currentUser;
    // -- Check if the current user is a guest (anonymous) user --
    if (currentUser && currentUser.isAnonymous) {
      deleteUser(currentUser)
        .then(() => {
          dispatch(resetSearch());
          dispatch(clearMovieSearchResults());
          dispatch(resetMovieDetails());
        })
        .catch((error) => {
          console.error("Error deleting guest user:", error);
          navigate("/error");
        });
    } else {
      signOut(auth).catch((error) => {
        navigate("/error");
      });
      dispatch(resetSearch());
      dispatch(clearMovieSearchResults());
      dispatch(resetMovieDetails());
    }
  };

  const handleHomeBtnClick = () => {
    dispatch(resetSearch());
    dispatch(clearMovieSearchResults());
    dispatch(resetMovieDetails());
    setIsMenuOpen(false);
    navigate("/browse");
  };

  // --- Context-Aware Discover Logic ---
  const handleDiscoverClick = () => {
    setIsMenuOpen(false);
    dispatch(resetMovieDetails());

    if (location.pathname !== "/browse") {
      if (!isGptSearch) {
        dispatch(toggleGptSearch());
      }
      navigate("/browse");
    } else {
      dispatch(toggleGptSearch());
    }
  };

  const handleWatchlistClick = () => {
    setIsMenuOpen(false);
    if (user?.isAnonymous) {
      setShowGuestPopup(true);
    } else {
      navigate("/watchlist");
    }
  };

  // Handle Tab Close Deletion
  useEffect(() => {
    const handleTabClose = () => {
      const currentUser = auth.currentUser;
      if (currentUser && currentUser.isAnonymous) {
        deleteUser(currentUser);
      }
    };

    window.addEventListener("beforeunload", handleTabClose);
    return () => window.removeEventListener("beforeunload", handleTabClose);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL, isAnonymous } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
            isAnonymous: isAnonymous,
          }),
        );
        if (window.location.pathname === "/") {
          navigate("/browse");
        }
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate]);

  return (
    <>
      <div className="w-full top-0 left-0 items-center z-50 absolute flex justify-between bg-gradient-to-b from-black to-transparent">
        <div className="md:p-4 p-2 z-50">
          <img
            className="md:ml-8 md:w-40 w-24 transition-all delay-75 ease-in-out duration-300 hover:scale-95 hover:cursor-pointer"
            src={flixipediaLogo}
            alt="logo"
            onClick={handleHomeBtnClick}
          />
        </div>

        {user && (
          <div className="flex md:text-base text-sm items-center pr-4 md:pr-8 z-50">
            <div className="hidden md:flex items-center">
              <button
                className="md:h-10 h-6 md:py-2 mx-2 md:mx-4 transition-all ease-in-out delay-70 duration-300 hover:scale-95"
                onClick={handleHomeBtnClick}
              >
                <h1 className="text-white font-semibold">Home</h1>
              </button>

              <button
                className="md:h-10 h-6 md:py-2 mx-2 md:mx-4 transition-all ease-in-out delay-70 duration-300 hover:scale-95"
                onClick={handleDiscoverClick}
              >
                <h1 className="text-white font-semibold">Discover</h1>
              </button>

              <button
                className="md:h-10 h-6 md:py-2 mx-2 md:mx-4 transition-all ease-in-out delay-70 duration-300 hover:scale-95"
                onClick={handleWatchlistClick}
              >
                <h1 className="text-white font-semibold">My Watchlist</h1>
              </button>
            </div>

            <div className="flex items-center md:ml-4">
              <p className="mr-2 font-bold text-white text-xs md:text-base whitespace-nowrap">
                {user.displayName || "Guest"}
              </p>
              <button
                className="p-1.5 md:p-2 bg-red-600 rounded-lg hover:bg-red-700 mr-2 md:mr-3"
                onClick={handleSignOut}
              >
                <img
                  className="w-3 md:w-4"
                  src={signOutLogo}
                  alt="sign out logo"
                />
              </button>
              <img
                className="h-6 md:h-8 rounded-full object-cover"
                src={user.photoURL || PHOTO_URL}
                alt="userPfp"
              />
            </div>

            <div
              className="md:hidden flex flex-col gap-[5px] w-6 justify-center cursor-pointer z-50 ml-4"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span
                className={`block w-6 h-[3px] bg-white rounded transition-transform duration-300 ease-in-out ${
                  isMenuOpen ? "rotate-45 translate-y-[8px]" : ""
                }`}
              ></span>
              <span
                className={`block w-6 h-[3px] bg-white rounded transition-opacity duration-300 ease-in-out ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block w-6 h-[3px] bg-white rounded transition-transform duration-300 ease-in-out ${
                  isMenuOpen ? "-rotate-45 -translate-y-[8px]" : ""
                }`}
              ></span>
            </div>
          </div>
        )}
      </div>

      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-70 backdrop-blur-md transition-opacity duration-300 md:hidden ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      ></div>

      <div
        className={`fixed top-16 right-4 z-50 md:hidden flex flex-col bg-gray-900 bg-opacity-95 border border-gray-700 rounded-xl p-3 gap-1 origin-top-right transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.7)] ${
          isMenuOpen
            ? "scale-100 opacity-100"
            : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        <button
          className="text-white font-semibold text-left py-3 px-8 hover:bg-gray-800 rounded-lg transition-colors"
          onClick={handleHomeBtnClick}
        >
          Home
        </button>

        <button
          className="text-white font-semibold text-left py-3 px-8 hover:bg-gray-800 rounded-lg transition-colors"
          onClick={handleDiscoverClick}
        >
          Discover
        </button>

        <button
          className="text-white font-semibold text-left py-3 px-8 hover:bg-gray-800 rounded-lg transition-colors"
          onClick={handleWatchlistClick}
        >
          My Watchlist
        </button>
      </div>

      {showGuestPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md px-4 animate-backdrop">
          <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-600 flex flex-col items-center max-w-md text-center animate-modal-pop">
            <h2 className="text-white text-3xl font-bold mb-4">
              Account Required
            </h2>
            <p className="text-gray-300 mb-8 text-sm md:text-base">
              You are currently browsing as a Guest. To build a custom watchlist
              and save your favorite movies, please create an account!
            </p>
            <div className="flex gap-4 w-full">
              <button
                onClick={() => setShowGuestPopup(false)}
                className="w-1/2 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-500 transition-all"
              >
                Close
              </button>
              <button
                onClick={handleSignOut}
                className="w-1/2 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all shadow-[0_0_15px_rgba(220,38,38,0.5)]"
              >
                Sign Up Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
