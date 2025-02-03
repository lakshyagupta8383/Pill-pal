import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaLightbulb, FaGoogle } from "react-icons/fa"; // Importing icons
import funFacts from "../assets/FunFact.json"; // Importing FunFacts

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [animate, setAnimate] = useState(false);
  const [funFact, setFunFact] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setAnimate(true); 
    displayRandomFunFact();
    const interval = setInterval(displayRandomFunFact, 10000); // Change fact every 10 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const displayRandomFunFact = () => {
    const randomIndex = Math.floor(Math.random() * funFacts.length);
    setFunFact(funFacts[randomIndex].fact);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err) {
      setError("Google sign-in failed. Please try again.");
    }
  };

  const animationStyle = animate ? { transform: 'scale(1)', opacity: 1 } : { transform: 'scale(0.5)', opacity: 0 };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-start via-orange-middle to-blue-end">
      <div className="bg-shapes fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="shape shape1 absolute w-96 h-96 top-1/4 left-[-150px] bg-blue-500 rounded-full opacity-5 animate-spin"></div>
        <div className="shape shape2 absolute w-[500px] h-[500px] top-3/4 right-[-200px] bg-blue-500 rounded-full opacity-5 animate-spin"></div>
      </div>

      <div className="p-12 rounded-2xl shadow-xl w-full max-w-md bg-white/80 backdrop-blur-lg"
           style={{ ...animationStyle, transition: 'transform 0.5s, opacity 0.5s' }}>
        <h1 className="text-4xl text-center font-bold mb-6 text-gray-800">
          Hey Pal!!
        </h1>

        {/* Fun Fact Box */}
        <div className="bg-yellow-100 text-yellow-800 p-4 mb-6 rounded-lg shadow-md flex items-center">
          <FaLightbulb className="mr-3 text-yellow-500" />
          <span>{funFact}</span>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-lg text-center shadow-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input with Icon */}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-4 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input with Icon */}
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-start via-orange-middle to-blue-end text-white font-semibold p-4 rounded-md hover:bg-green-700 transition-transform transform hover:scale-105 shadow-md"
          >
            Sign In
          </button>
        </form>

        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-red-600 text-white font-semibold p-4 rounded-md mt-4 hover:bg-red-700 transition-transform transform hover:scale-105 shadow-md flex items-center justify-center"
        >
          <FaGoogle className="mr-2" /> Sign In with Google
        </button>

        {/* Forgot Password and Sign Up Section */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <a href="/forgot-password" className="text-gradient-to-r from-orange-500 to-blue-500 font-medium hover:underline">
            Forgot password?
          </a>
          <p className="mt-4">
            Don't have an account? 
            <button 
              onClick={() => navigate('/signup')} 
              className="ml-1 text-gradient-to-r from-orange-500 to-blue-500 font-medium hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};  

export default Login;
