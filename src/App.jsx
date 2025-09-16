import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Auth from "../Components/Auth.jsx";
import Forground from "../Components/Forground.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const res = await axios.get("https://chatify-backend-eight.vercel.app/me", {
        withCredentials: true, // send cookies
      });
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
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
