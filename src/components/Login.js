import Header from "./Header";
import flixipediaBg from "../assets/flixipediaBg.jpg";
import { useRef, useState } from "react";
import { checkValidData } from "../utils/checkValidData";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import { signInAnonymously } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { PHOTO_URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [passwordTips, setPasswordTips] = useState(false);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleTipsClick = () => {
    setPasswordTips(!passwordTips);
  };

  const handleBtnClick = () => {
    const msg = checkValidData(email.current.value, password.current.value);
    setErrorMsg(msg);

    if (msg) return;

    if (!isSignIn) {
      //Sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: PHOTO_URL,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                }),
              );
            })
            .catch((error) => {
              setErrorMsg(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorMessage + " (" + errorCode + ") ");
        });
    } else {
      //Sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorMessage + " (" + errorCode + ") ");
        });
    }
  };

  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
  };

  const handleGuestLogin = () => {
    signInAnonymously(auth).catch((error) => {
      console.error("Guest login failed:", error.message);
    });
  };

  return (
    <div>
      <div className="md:w-screen h-screen object-cover z-10 fixed inset-0 bg-black bg-opacity-40"></div>
      <Header />
      <img
        className="fixed h-screen md:w-screen object-cover "
        src={flixipediaBg}
        alt="Background Img"
      />
      <form
        onSubmit={(e) => e.preventDefault()}
        className="md:p-10 z-10 p-4 md:w-1/4 w-3/4 md:mt-32 mx-auto mt-20 left-0 right-0 absolute bg-gray-600 bg-opacity-80 rounded-lg" // Bumped opacity slightly so the box is more readable
      >
        <h1 className="md:mb-8 mb-4 md:text-4xl text-lg text-white font-bold ">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignIn && (
          <input
            ref={name}
            className="md:p-3 p-2 md:mb-4 mb-2 border border-gray-400 rounded-lg w-full bg-gray-700 bg-opacity-50 text-white"
            type="text"
            placeholder="User Name"
          />
        )}

        <input
          ref={email}
          className="md:p-3 p-2  mb-4 border border-gray-400 rounded-lg w-full bg-gray-700 bg-opacity-50 text-white"
          type="text"
          placeholder="E-mail"
        />

        <input
          ref={password}
          className="md:p-3 p-2 mb-2 border border-gray-400 rounded-lg w-full  bg-gray-700 bg-opacity-50 text-white"
          type="password"
          placeholder="Password"
        />

        <p className=" text-red-500 font-semibold md:text-lg text-sm mb-2 ">
          {errorMsg}
        </p>

        {!isSignIn && (
          <div
            className="text-white md:text-sm text-xs border border-gray-400 rounded-lg p-2 w-full hover:cursor-pointer"
            onClick={handleTipsClick}
          >
            <div className="flex justify-between">
              <h1>Tips for setting up your password</h1>{" "}
              {passwordTips ? "👆" : "👇"}
            </div>
            {passwordTips && (
              <ul className="pt-2 pl-6 list-disc ">
                <li>Mix uppercase/lowercase letters</li>
                <li>It should be alphanumeric</li>
                <li>Include at least one symbol</li>
              </ul>
            )}
          </div>
        )}

        <button
          className="md:mt-4 mt-2 p-3 mb-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 w-full"
          onClick={handleBtnClick}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>

        {isSignIn && (
          <div className="mb-4 text-white flex justify-center cursor-pointer hover:underline">
            Forgot Password?
          </div>
        )}

        <p
          className="text-white font-semibold rounded-lg cursor-pointer text-center hover:underline mb-2"
          onClick={toggleSignIn}
        >
          {isSignIn ? "New Here? Sign Up Now" : "Already registered? Sign In"}
        </p>

        {/* --- GUEST LOGIN SECTION --- */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="mx-4 text-gray-300 font-semibold text-sm">OR</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

        <button
          type="button"
          onClick={handleGuestLogin}
          className="w-full p-3 bg-gray-500 bg-opacity-80 text-white font-bold rounded-lg transition-all hover:bg-gray-400"
        >
          Continue as Guest
        </button>
      </form>
    </div>
  );
};
export default Login;
