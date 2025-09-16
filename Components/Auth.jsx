import React, { useState } from "react";

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

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // important for cookies
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();

      console.log(data);
      onLoginSuccess(data); // pass login success back
    } catch (err) {
      console.error(err.message);
      alert("Auth failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gray-800 rounded-full opacity-5 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gray-700 rounded-full opacity-5 blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Glass morphism card */}
        <div className="backdrop-blur-xl bg-gray-900/90 border border-gray-700 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 opacity-10 blur-sm"></div>
          
          <div className="relative z-10">
            {/* Logo/Header area */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg border border-gray-600">
                <div className="w-8 h-8 bg-white rounded-lg opacity-90"></div>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-gray-400 text-sm">
                {isLogin 
                  ? "Sign in to your account to continue" 
                  : "Join us today and get started"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username field */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full px-4 py-3 bg-gray-800/80 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 backdrop-blur-sm transition-all duration-300"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-700/20 to-gray-600/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              {/* Email field (only for register) */}
              <div className={`relative transition-all duration-500 ${!isLogin ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 bg-gray-800/80 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 backdrop-blur-sm transition-all duration-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required={!isLogin}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-700/20 to-gray-600/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              {/* Password field */}
              <div className="relative">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 bg-gray-800/80 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 backdrop-blur-sm transition-all duration-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-700/20 to-gray-600/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              {/* Submit button */}
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-white text-black font-semibold rounded-xl shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <div className="flex items-center justify-center space-x-2">
                  {isLoading && (
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
                  )}
                  <span>{isLogin ? "Sign In" : "Create Account"}</span>
                </div>
              </button>
            </form>

            {/* Toggle between login/register */}
            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm mb-2">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </p>
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-white hover:text-gray-300 font-semibold transition-colors duration-300 hover:underline"
              >
                {isLogin ? "Create Account" : "Sign In"}
              </button>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full opacity-20 blur-2xl"></div>
          </div>
        </div>

        {/* Bottom decorative text */}
        <div className="text-center mt-8">
          <p className="text-gray-600 text-xs">
            Secure • Fast • Beautiful
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;