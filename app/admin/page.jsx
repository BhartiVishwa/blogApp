"use client";
import React from "react";
import { assets } from "@/Assets/assets";
import Image from "next/image";

const AdminPage = () => {
  return (
    <div className="flex flex-col items-center  min-h-screen text-center">
      <Image src={assets.logo} width={120} alt="Logo" />
      <h1 className="text-2xl font-bold mt-4 mb-4">Welcome to Admin Panel</h1>
      <p className="text-gray-600 mb-6">
        Manage your blogs, subscriptions, and content from here.
      </p>
      {/* Add buttons or links for Add Blog, Blog List, Subscription here */}
    </div>
  );// Example in sidebar/header:
  {user?.role === 'admin' && (
    <Link href="/admin/dashboard">Admin Panel</Link>
  )}

  // Example for blog actions:
  {(user?.role === 'admin' || blog.author === user?.id) && (
    <button>Delete Blog</button>
  )}
// Example in sidebar/header:
{user?.role === 'admin' && (
  <Link href="/admin/dashboard">Admin Panel</Link>
)}

// Example for blog actions:
{(user?.role === 'admin' || blog.author === user?.id) && (
  <button>Delete Blog</button>
)}

};

export default AdminPage;
