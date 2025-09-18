import React, { useState, useEffect } from "react";
import axios from "axios";
import Auth from "../Components/Auth.jsx";
import Forground from "../Components/Forground.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      console.log("Checking auth");
      const token = localStorage.getItem("accessToken");
      const res = await axios.get("https://chatify-backend-eight.vercel.app/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
    } finally {kklh


      
      setLoading(false);
    }
  };

  // Remove 'user' from dependency array to prevent infinite loop
  useEffect(() => {
    checkAuth();
  }, []); // Empty dependency array - only run on mount

  // Handle successful login
  const handleLoginSuccess = () => {
    checkAuth(); // Re-check auth status after successful login
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null); // Clear user state immediately
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {user ? (
        <Forground user={user} onLogout={handleLogout} />
      ) : (
        <Auth onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;