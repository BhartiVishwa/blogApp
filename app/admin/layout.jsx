"use client";
import { assets } from "@/Assets/assets";
import Sidebar from "@/components/AdminComponents/Sidebar";
import Image from "next/image";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "@/lib/AuthContext";

export default function Layout({ children }) {
    const { user, loading } = useAuth();
  
  

   if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

    if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Please login first</div>;
  }
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <ToastContainer theme="dark"/>
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col w-full">
        {/* Navbar */}
        <div className="flex items-center justify-between w-full px-12 border-b border-black" style={{paddingTop: "14px", paddingBottom: "12px"}}>
          <h3 className="font-medium  ml-8 sm:ml-0">{user?.role === 'admin' ? 'Admin Panel' : 'User Panel'}</h3>
          <Image src={assets.profile_icon} width={40} alt="Profile" />
        </div>

        {/* Page content */}
        <div className="flex-1 p-2">
          {children}
        </div>
      </div>
    </div>
   
);
 
}
