import React, { useState, useEffect, useRef } from 'react';
import { GrAd } from "react-icons/gr";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import { TfiWrite } from "react-icons/tfi";
import { IoSend } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { HiSparkles } from "react-icons/hi";
import axios from 'axios';
import { ThreeDot } from "react-loading-indicators";
import ReactMarkdown from "react-markdown";

const Forground = ({ user, onLogout }) => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogingOut ,setLogingOut] = useState(false)
  const bottomRef = useRef(null);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  // Get token from localStorage
  const token = localStorage.getItem("accessToken");

  // Send user input to backend
  const handler = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessage(prev => [...prev, { text: input, sender: "user" }]);
    const data = { input };
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(
        "https://chatify-backend-eight.vercel.app/asked",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(prev => [
        ...prev,
        { text: response.data.text, sender: response.data.sender || "bot" },
      ]);
    } catch (error) {
      setMessage(prev => [
        ...prev,
        { text: "❌ Something went wrong. Please try again.", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logOut = async () => {
    setLogingOut(true)
    try {
      await axios.post(
        "https://chatify-backend-eight.vercel.app/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onLogout();
      setLogingOut(false)
      localStorage.removeItem("accessToken");
    } catch (error) {
      setLogingOut(false)
      console.error(error);
    }
  };

  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 flex flex-col md:flex-row'>
      {isLogingOut && 
      (<div className='absolute top-0 w-full h-screen flex justify-center items-center bg-white/10 backdrop-blur-[10px] z-50'>
        <h1 className='text-xl text-white font-solid '>Logging out...</h1>
      </div>)
      }
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`sidebar  w-full md:w-80 min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 border-r border-slate-700/50 backdrop-blur-sm fixed md:static top-0 left-0 z-20 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} shadow-2xl`}>
        {/* Header */}
        <div className="flex  items-center justify-between p-6 border-b border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <GrAd className="text-white text-xl" />
            </div>
            <span className="text-white font-semibold text-lg hidden md:block">Chatify</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="text-slate-400 hover:text-white text-2xl md:hidden transition-colors p-1"
          >
            {isSidebarOpen ? <GoSidebarCollapse /> : <GoSidebarExpand />}
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <button
            onClick={() => setMessage([])}
            className="w-full flex items-center justify-center space-x-3 py-4 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <HiSparkles className="text-xl" />
            <span>New Chat</span>
          </button>
        </div>

        {/* User Info */}
        {user && (
          <div className="p-4 mx-4 mb-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {user.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <p className="text-white text-sm font-medium">{user.username || 'User'}</p>
                <p className="text-slate-400 text-xs">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Chat History Section */}
        <div className="px-4 mb-4">
          <h3 className="text-slate-400 text-sm font-medium mb-2">Recent Chats</h3>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-slate-800/30 hover:bg-slate-700/50 cursor-pointer transition-colors">
              <p className="text-slate-300 text-sm truncate">Previous conversation...</p>
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1"></div>

        {/* Logout Button */}
        <div className="p-4 border-t border-slate-700/50">
          <button
            onClick={logOut}
            className="w-full flex items-center justify-center space-x-3 py-3 px-4 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 font-medium transition-all duration-200 border border-red-600/30"
          >
            <BiLogOut className="text-xl" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col h-screen bg-slate-900/50">
        {/* Mobile Header */}
        <div className="md:hidden sticky top-0 z-10 flex items-center justify-between p-4 bg-slate-800/50 border-b border-slate-700/50 rounded-2xl">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-slate-400 hover:text-white text-2xl transition-colors p-1"
          >
            <GoSidebarExpand />
          </button>
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <GrAd className="text-white text-lg" />
            </div>
            <span className="text-white font-semibold">Chatify</span>
          </div>
          <div className="w-8"></div> {/* spacer for alignment */}
        </div>

        {/* Meessage Arra for the user to work with ... */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {message.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
                <HiSparkles className="text-white text-4xl" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Welcome to Chatify
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-md">
                Start a conversation and let AI assist you with anything you need.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <h3 className="text-white font-medium mb-2">💡 Get Ideas</h3>
                  <p className="text-slate-400 text-sm">Brainstorm creative solutions</p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <h3 className="text-white font-medium mb-2">📝 Write Content</h3>
                  <p className="text-slate-400 text-sm">Create articles, emails, and more</p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <h3 className="text-white font-medium mb-2">🔍 Research</h3>
                  <p className="text-slate-400 text-sm">Find information on any topic</p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <h3 className="text-white font-medium mb-2">⚡ Quick Tasks</h3>
                  <p className="text-slate-400 text-sm">Get help with daily tasks</p>
                </div>
              </div>
            </div>
          )}

          {message.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-4`}
            >
              <div
                className={`max-w-[85%] md:max-w-[70%] px-4 py-3 rounded-2xl ${
                  msg.sender === "user" 
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" 
                    : "bg-slate-800/70 text-slate-100 border border-slate-700/50 shadow-md"
                } backdrop-blur-sm`}
              >
                {msg.sender === "bot" ? (
                  <div className="prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                        code: ({ children, className }) => (
                          <code className={`${className} bg-slate-900/50 px-1 py-0.5 rounded text-blue-300`}>
                            {children}
                          </code>
                        ),
                        pre: ({ children }) => (
                          <pre className="bg-slate-900/80 p-3 rounded-lg overflow-x-auto border border-slate-700/50">
                            {children}
                          </pre>
                        ),
                      }}
                    >
                      {msg.text.replace(/\n/g, "  \n")}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="break-words">{msg.text}</p>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start mb-4">
              <div className="bg-slate-800/70 px-4 py-3 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
                <ThreeDot color="#94a3b8" size="small" text="" textColor="" />
              </div>
            </div>
          )}
          <div ref={bottomRef}></div>
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 bg-slate-800/30 border-t border-slate-700/50 backdrop-blur-sm">
          <form onSubmit={handler} className="max-w-4xl mx-auto">
            <div className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full px-4 py-3 md:py-4 pr-12 rounded-2xl bg-slate-800/80 border border-slate-600/50 text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 backdrop-blur-sm resize-none"
                  disabled={loading}
                />
              </div>
              <button 
                type="submit"
                disabled={loading || !input.trim()}
                className="p-3 md:p-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-600 text-white rounded-2xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 shadow-lg disabled:shadow-none"
              >
                <IoSend className="text-xl" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forground;