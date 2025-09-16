import React, { useState, useEffect } from "react";
import axios from "axios";
import Auth from "../Components/Auth.jsx";
import Forground from "../Components/Forground.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("https://chatify-backend-eight.vercel.app/me", {
          withCredentials: true, // send cookies
        });
        setUser(res.data.user); // user comes from backend
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [setUser]);

  if (loading) return <div className="text-white">Checking auth...</div>;

  return (
    <>
      {user ? (
        <Forground user={(user)=>setUser(user)} />
      ) : (
        <Auth onLogin={(data) => setUser(data.user)} />
      )}
    </>
  );
}

export default App;
