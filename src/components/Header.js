import netflixLogo from "../assets/netflixLogo.jpg";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";

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
    <div className="w-full top-0 left-0 items-center z-20 absolute flex justify-between bg-gradient-to-b from-black">
      <div className="p-4">
        <img
          className="ml-10 w-36 transition-all delay-100 ease-in-out duration-300 hover:scale-95"
          src={netflixLogo}
          alt="logo"
        />
      </div>

      {user && (
        <div className="flex">
          <img
            className="mx-2 h-12 my-auto rounded-full"
            src={user.photoURL}
            alt="userPfp"
          />
          <div className="flex p-2 m-2  bg-white bg-opacity-20 rounded-lg">
            <div>
              <p className="font-bold text-white text-center">
                {user.displayName}
              </p>
              <button
                className=" p-2 bg-red-600 text-white text-sm font-bold rounded-lg hover:bg-red-700"
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
