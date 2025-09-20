import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify'; // Removed ToastContainer

const ForgotPassword = ({ onBackToLogin }) => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  useEffect(() => {
    let timerId;
    if (otpTimer > 0) {
      timerId = setTimeout(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timerId);
  }, [otpTimer]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("https://chatify-backend-eight.vercel.app/forgot/otp", { email });
      setIsOtpSent(true);
      setOtpTimer(60);
      toast.success("OTP sent to your email!", { position: "top-right" });
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error(error.response?.data?.message || "Failed to send OTP.", { position: "top-right" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload = { email, otp: otpInput, password: newPassword };
      await axios.post("https://chatify-backend-eight.vercel.app/forgot", payload);
      toast.success("Password changed successfully! Please log in.", { position: "top-right" });
      onBackToLogin(); // Go back to login page
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error(error.response?.data?.message || "Failed to change password.", { position: "top-right" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
          Reset Password
        </h1>
        <p className="text-gray-400 text-sm">
          {isOtpSent ? "Enter OTP and new password" : "Enter your email to receive an OTP"}
        </p>
      </div>

      <form onSubmit={isOtpSent ? handleChangePassword : handleSendOtp} className="space-y-6">
        <div className="relative group">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-4 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 group-hover:border-gray-500/70"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading || isOtpSent}
          />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
        </div>

        {isOtpSent && (
          <div className="relative group">
            <input
              type="text"
              placeholder="OTP"
              className="w-full px-4 py-4 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 group-hover:border-gray-500/70"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              required
              disabled={isLoading}
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
          </div>
        )}

        {isOtpSent && (
          <div className="relative group">
            <input
              type="password"
              placeholder="New Password"
              className="w-full px-4 py-4 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 group-hover:border-gray-500/70"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              disabled={isLoading}
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || (isOtpSent ? !newPassword || !otpInput : !email)}
          className="w-full py-4 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
        >
          {isLoading
            ? "Please wait..."
            : isOtpSent
              ? "Change Password"
              : (otpTimer > 0 ? `Resend OTP in ${otpTimer}s` : "Send OTP")
          }
        </button>
      </form>

      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={onBackToLogin}
          disabled={isLoading}
          className="text-blue-400 hover:text-blue-300 font-semibold transition-all duration-200 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
