import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Auth from "../Components/Auth.jsx";
import Forground from "../Components/Forground.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);

  // Configure axios defaults for better mobile support
  useEffect(() => {
    axios.defaults.timeout = 15000; // 15 second timeout
    axios.defaults.withCredentials = true;
    
    // Add request interceptor for debugging
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        console.log("Making request to:", config.url);
        console.log("With credentials:", config.withCredentials);
        return config;
      },
      (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor for debugging
    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        console.log("Response received:", response.status);
        return response;
      },
      (error) => {
        console.error("Response error:", error);
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => {
      console.log("Device is online");
      setNetworkError(false);
      if (!user) {
        checkAuth();
      }
    };

    const handleOffline = () => {
      console.log("Device is offline");
      setNetworkError(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [user]);

  const checkAuth = useCallback(async () => {
    setLoading(true);
    setNetworkError(false);
    console.log("checkAuth: Starting authentication check");
    console.log("Current cookies:", document.cookie);
    console.log("Navigator online:", navigator.onLine);

    try {
      const res = await axios.get("https://chatify-backend-eight.vercel.app/me", {
        withCredentials: true,
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });

      console.log("checkAuth: Success - Status:", res.status);
      console.log("checkAuth: Response data:", res.data);

      if (res.data && res.data.user) {
        setUser(res.data.user);
        console.log("checkAuth: User authenticated successfully");
      } else {
        console.log("checkAuth: No user data in response");
        setUser(null);
      }
    } catch (err) {
      console.error("checkAuth: Failed with error:", err);
      
      // Detailed error logging for mobile debugging
      if (err.response) {
        console.error("Response error - Status:", err.response.status);
        console.error("Response error - Data:", err.response.data);
        console.error("Response error - Headers:", err.response.headers);
      } else if (err.request) {
        console.error("Request error - No response received:", err.request);
        setNetworkError(true);
      } else {
        console.error("Setup error:", err.message);
      }

      // Check for specific mobile issues
      if (err.code === 'NETWORK_ERROR' || 
          err.message.includes('timeout') || 
          err.message.includes('Network Error')) {
        console.log("Detected network connectivity issue");
        setNetworkError(true);
      }

      setUser(null);
    } finally {
      setLoading(false);
      console.log("checkAuth: Authentication check completed");
    }
  }, []);

  // Initial auth check
  useEffect(() => {
    // Add small delay for mobile to ensure DOM is ready
    const timer = setTimeout(() => {
      checkAuth();
    }, 100);

    return () => clearTimeout(timer);
  }, [checkAuth]);

  // Handle page visibility changes (important for mobile)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && !user && !loading) {
        console.log("Page became visible, rechecking auth");
        checkAuth();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [user, loading, checkAuth]);

  // Loading state with network error handling
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="text-white text-lg mb-2">Checking authentication...</div>
          {networkError && (
            <div className="text-yellow-400 text-sm">
              Network connectivity issue detected
            </div>
          )}
        </div>
      </div>
    );
  }

  // Network error state
  if (networkError && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center p-4">
          <div className="text-red-400 text-lg mb-4">Connection Error</div>
          <div className="text-gray-300 mb-4">
            Unable to connect to the server. Please check your internet connection.
          </div>
          <button
            onClick={checkAuth}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {user ? (
        <Forground user={user} onLogout={checkAuth} />
      ) : (
        <Auth onLoginSuccess={checkAuth} />
      )}
    </div>
  );
}

export default App;