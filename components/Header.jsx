"use client";

import { assets } from "@/Assets/assets";
import Image from "next/image";
import { useState } from "react";
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";

const Header = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { user, logout } = useAuth();

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    try {
      const response = await axios.post("/api/email", formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setEmail("");
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

  return (
    <div className="py-3 px-3 sm:py-5 sm:px-5 md:px-12 lg:px-20">
      {/* Mobile Layout */}
      <div className="flex flex-col sm:hidden gap-3">
        <div className="flex justify-between items-center">
          <Image
            src={assets.logo}
            width={120}
            alt="logo"
            className="w-[100px]"
          />
          <div className="flex gap-2 items-center">
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-xs py-1 px-2 border border-black shadow-[-3px_3px_0px_#000000] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 17L21 12L16 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 12H9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Logout
            </button>
            <Link href={"/admin"}>
              <button className="flex items-center gap-1 text-xs py-1 px-2 border border-black shadow-[-3px_3px_0px_#000000] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all">
                Get Started
                <Image src={assets.arrow} alt="arrow" width={8} height={8} />
              </button>
            </Link>
          </div>
        </div>
        <div className="text-center">
          <span className="text-xs text-gray-600">Welcome, {user?.name}</span>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Image
            src={assets.logo}
            width={180}
            alt="logo"
            className="w-[130px] sm:w-auto"
          />
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 font-medium py-1 px-3 sm:py-2 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000] 
            active:translate-y-1 active:translate-x-1 active:shadow-none transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 17L21 12L16 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 12H9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Logout
          </button>
        </div>

        <div className="flex gap-4 items-center">
          <span className="text-sm">Welcome, {user?.name}</span>
          <Link href={"/admin"}>
            <button
              className="flex items-center gap-2 font-medium py-1 px-3 sm:py-2 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000] 
            active:translate-y-1 active:translate-x-1 active:shadow-none transition-all"
            >
              Get Started
              <Image src={assets.arrow} alt="arrow" />
            </button>
          </Link>
        </div>
      </div>

      <div className="text-center py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-medium">
          Latest Blogs
        </h1>
        <p className="mt-6 sm:mt-10 max-w-[740px] m-auto text-xs sm:text-base px-4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet sit
          similique aut delectus nostrum! Optio laborum vero mollitia tenetur
          facere.
        </p>

        <form
          onSubmit={onsubmitHandler}
          className="flex justify-between max-w-[500px] scale-90 sm:scale-100  mt-6 sm:mt-10 border border-black shadow-[-7px_7px_0px_#000000] mx-4 sm:mx-auto"
        >

          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter your email"
            className="pl-4 outline-none border  flex-1 py-3 text-sm"
          />
        
          <button
            type="submit"
             className="py-3 px-3 sm:px-8 border  active:text-white text-sm bg-white shadow-[0px_2px_0px_#000000]"
             style={{ borderColor: '#e0e0e0' }}
>
            Subscribe
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default Header;
