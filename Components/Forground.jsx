import React, { useState, useEffect, useRef } from 'react';
import { GrAd } from "react-icons/gr";
import { GoSidebarExpand } from "react-icons/go";
import { TfiWrite } from "react-icons/tfi";
import { IoSend } from "react-icons/io5";
import axios from 'axios';
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { ThreeDot } from "react-loading-indicators";

const Forground = ({ user, onLogout }) => {
  const [loading, setLoadin] = useState(false);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const handler = async (e) => {
    e.preventDefault();
    setMessage(prev => [...prev, { text: input, sender: "user" }]);
    const data = { input };
    setInput('');
    setLoadin(true);

    try {
      const response = await axios.post("https://chatify-backend-eight.vercel.app/asked", data, {
        withCredentials: true, // send cookies
      });
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
      setLoadin(false);
    }
  };
  
  const logOut = async() =>{
    try {
      const res = await axios.post("https://chatify-backend-eight.vercel.app/logout",{},{
        withCredentials : true
      })
     onLogout()
    } catch (error) {
      console.log(error )
    }
  }

  return (
    <div className='w-full min-h-[100vh] bg-[#4f4f4f] flex flex-col md:flex-row'>
      {/* Sidebar */}
      <div className="sidebar md:w-[22vw] md:min-h-screen border-r-4 w-full h-30 bg-black/30">
        <div className="first flex justify-between p-3">
          <GrAd className="text-white/80 text-2xl" />
          <GoSidebarExpand className="text-white/70 text-2xl hidden md:block" />
        </div>

        <div
          onClick={()=>setMessage([])}
          className="nchat md:mt-10 py-3 w-full flex items-center justify-center cursor-pointer hover:bg-black/20"
        >
          <TfiWrite className="text-2xl text-white/30" />
          <button className="text-xl ml-3 text-white/30 cursor-pointer">
            New Chat
          </button>
        </div>


        <div
          onClick={logOut}
          className="nchat md:mt-10 py-3 w-full flex items-center justify-center cursor-pointer hover:bg-black/20"
        >
          <TfiWrite className="text-2xl text-white/30" />
          <button className="text-xl ml-3 text-white/30 cursor-pointer">
            log out
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className='left-80 w-full md:w-[78vw] h-screen md:h-[100vh] bg-black/40 overflow-x-hidden overflow-y-auto'>
        <div className="messages p-5 flex flex-col space-y-2">
          {message.map((msg, index) => (
            <div
              key={index}
              className={`px-4 py-2 rounded-lg max-w-[60%] ${msg.sender === "user" ? "bg-blue-600 text-white self-end" : "bg-gray-700/40 text-white self-start"}`}
            >
              {msg.sender === "bot" ? (
                <div className="text-white break-words space-y-10">
                  <ReactMarkdown>{msg.text.replace(/\n/g, "  \n")}</ReactMarkdown>
                </div>
              ) : (
                msg.text
              )}
            </div>
          ))}

          {loading && 
            <div className='ml-3'>
              <ThreeDot color="#c3c3c3" size="small" text="" textColor="" />
            </div>
          }
        </div>

        <form onSubmit={handler} className='mt-20'>
          <div ref={bottomRef}></div>

          <div className="invalue bg-[#2F2F2F] fixed bottom-0 border-t-2 w-full flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your prompt"
              className="ml-20 mr-4 w-[60vw] p-3 my-4 rounded-2xl bg-gray-400/60 text-white/80 placeholder-gray-800 outline-none focus:ring-2 focus:ring-gray-500 transition"
            />
            <button className='py-2 px-3 my-4 text-white/60 cursor-pointer border-2 rounded-full hover:text-white'>
              <IoSend />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forground;
