import Header from "./Header";
import netflixBg from "../assets/netflixBg.jpg";
import { useRef, useState } from "react";
import { checkValidData } from "../utils/checkValidData";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebaseConfig";

import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { PHOTO_URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const handleBtnClick = () => {
    const msg = checkValidData(email.current.value, password.current.value);
    setErrorMsg(msg);
    //when our msg is null(which means both e-mail and password are valid), we do sign in/up
    //msg --> !null --> means true
    //msg --> null --> means false
    if (msg) return;
    //sign in/up logic

    if (!isSignIn) {
      //Sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          //signed up user data is stored in user variable
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: PHOTO_URL, //since PHOTO_URL is not a jsx anymore
          })
            .then(() => {
              // Profile updated!
              // After updating profile, we have to dispatch an action again in userSlice
              // to add updated info in slice
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              //Now the userSlice is also updated with new data
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
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
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
  return (
    <div>
      <div className="md:w-screen h-screen object-cover z-10 fixed inset-0 bg-black bg-opacity-40"></div>
      <Header />
      <img
        className="fixed h-screen md:w-screen object-cover "
        src={netflixBg}
        alt="Background Img"
      />
      <form
        onSubmit={(e) => e.preventDefault()}
        className="md:p-10 z-10 p-4 md:w-1/4 w-3/4 md:mt-48 mx-auto mt-20 left-0 right-0 absolute bg-gray-600 bg-opacity-50 rounded-lg"
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
          className="md:p-3 p-2 md:mb-4 mb-2 border border-gray-400 rounded-lg w-full bg-gray-700 bg-opacity-50 text-white"
          type="text"
          placeholder="E-mail"
        />
        <input
          ref={password}
          className="md:p-3 p-2 md:mb-4 mb-2 border border-gray-400 rounded-lg w-full  bg-gray-700 bg-opacity-50 text-white"
          type="password"
          placeholder="Password"
        />
        <p className="mb-4 text-red-500 font-semibold text-lg">{errorMsg}</p>
        <button
          className="p-3 mb-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 w-full"
          onClick={handleBtnClick}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        {/* Forgot password only appears when you are a registered user */}
        {isSignIn && (
          <div className="mb-4 text-white flex justify-center">
            Forgot Password?
          </div>
        )}
        <p
          className="text-white font-semibold rounded-lg cursor-pointer"
          onClick={toggleSignIn}
        >
          {isSignIn ? "New Here? Sign Up Now" : "Already registered? Sign In"}
        </p>
      </form>
    </div>
  );
};
export default Login;
