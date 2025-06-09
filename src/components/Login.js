import Header from "./Header";
import netflixBg from "../assets/netflixBg.jpg";
import { useState } from "react";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
  };
  return (
    <div>
      <div className="z-10 absolute inset-0 bg-black bg-opacity-50"></div>
      <Header />
      <img className="absolute" src={netflixBg} alt="Background Img" />
      <form className="p-10 z-10 w-1/4 m-48 mx-auto left-0 right-0 absolute bg-black bg-opacity-65 rounded-lg">
        <h1 className="mb-6 text-4xl text-white font-semibold">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
            className="p-3 mb-4 border border-gray-400 rounded-lg w-full h-14 bg-gray-700 bg-opacity-50 text-white"
            type="text"
            placeholder="User Name"
          />
        )}
        <input
          className="p-3 mb-4 border border-gray-400 rounded-lg w-full h-14 bg-gray-700 bg-opacity-50 text-white"
          type="text"
          placeholder="E-mail"
        />
        <input
          className="p-3 mb-4 border border-gray-400 rounded-lg w-full h-14 bg-gray-700 bg-opacity-50 text-white"
          type="password"
          placeholder="Password"
        />
        <button className="p-3 mb-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 w-full">
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
