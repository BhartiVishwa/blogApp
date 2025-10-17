"use client";
import { useState, useEffect } from "react";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { assets } from "@/Assets/assets";
import Image from "next/image";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showLogo, setShowLogo] = useState(false);
  const [logoAtTop, setLogoAtTop] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowLogo(true), 500);
    const timer2 = setTimeout(() => setShowWelcome(false), 1500);
    const timer3 = setTimeout(() => setLogoAtTop(true), 2000);
    const timer4 = setTimeout(() => setShowForm(true), 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <ToastContainer theme="dark" />

      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 pointer-events-none ${
          showWelcome ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-4xl sm:text-6xl font-bold italic text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent animate-pulse">
          Welcome to our Blog
        </h1>
      </div>

      <div
        className={`absolute transition-all duration-1000 pointer-events-none ${
          logoAtTop
            ? "top-8 left-1/2 transform -translate-x-1/2"
            : "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        } ${showLogo ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
      >
        <Image
          src={assets.logo}
          width={120}
          alt="logo"
          className="w-[120px] sm:w-[130px]"
        />
      </div>

      <div
        className={`py-32 px-5 md:px-12 lg:px-20 min-h-screen transition-opacity duration-1000 ${
          showForm
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-md mx-auto bg-white p-8 border border-black shadow-[-7px_7px_0px_#000000]">
          {/* Login/Signup Toggle */}
          <div className="flex mb-6 border border-black">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 text-center border-r border-black ${
                isLogin ? "bg-black text-white" : "bg-white"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 text-center ${
                !isLogin ? "bg-black text-white" : "bg-white"
              }`}
            >
              Signup
            </button>
          </div>

          {isLogin ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
    </div>
  );
}
