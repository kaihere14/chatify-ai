import React, { useState } from "react";
import axios from "axios";

const Auth = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const url = isLogin
        ? "https://chatify-backend-eight.vercel.app/login"
        : "https://chatify-backend-eight.vercel.app/register";

      const payload = isLogin
        ? { username, password }
        : { username, email, password };

      const res = await axios.post(url, payload, {
        withCredentials: true,
      });
      
      if (res.status === 200 || res.status === 201) {
        localStorage.setItem("accessToken", res.data.accessToken);
        onLoginSuccess();
      }
    } catch (err) {
      alert("Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-gray-400 text-sm">
              {isLogin 
                ? "Sign in to your account to continue" 
                : "Join us today and get started"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
            />

            {!isLogin && (
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            )}

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              {isLoading 
                ? "Please wait..." 
                : (isLogin ? "Sign In" : "Create Account")}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm mb-2">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              disabled={isLoading}
              className="text-white hover:text-gray-300 font-semibold transition-colors hover:underline disabled:opacity-50"
            >
              {isLogin ? "Create Account" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;