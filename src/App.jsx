import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Auth from "../Components/Auth.jsx";
import Forground from "../Components/Forground.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    setLoading(true); // Ensure loading is true at the start of every auth check
    console.log("checkAuth: Initiating authentication check.");
    try {
      const res = await axios.get("https://chatify-backend-eight.vercel.app/me", {
        withCredentials: true, // send cookies
      });
      console.log("checkAuth: API response for /me:", res.data);
      setUser(res.data.user);
      console.log("checkAuth: User set to", res.data.user);
    } catch (err) {
      console.error("checkAuth: Authentication check failed:", err);
      setUser(null);
    } finally {
      setLoading(false);
      console.log("checkAuth: Loading set to false. User is", user);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) return <div className="text-white">Checking auth...</div>;

  return (
    <>
      {user ? (
        <Forground user={user} onLogout={checkAuth} />
      ) : (
        <Auth onLoginSuccess={checkAuth} />
      )}
    </>
  );
}

export default App;
