import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(255,140,0,1)_0%,rgba(0,123,255,1)_100%)]">
      <div className="bg-[#fdf5ef]/90 p-8 rounded-2xl shadow-xl w-full max-w-sm backdrop-blur-md">
        <h2 className="text-xl text-center font-medium mb-5 text-gray-800">
          Hey Pal!!
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-lg text-center shadow-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold p-3 rounded-md hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-md"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          <a href="/forgot-password" className="text-blue-600 font-medium hover:underline">
            Forgot password?
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
