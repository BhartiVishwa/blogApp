"use client";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@/lib/AuthContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState('user');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
   
  try {
    // Remove selectedRole logic, just use signup endpoint
    const { data } = await axios.post('/api/auth/signup', {
      name,
      email,
      password,
    });
    
    login(data.token, data.user);
    toast.success("Signup successful!");
    router.push("/");
    
  } catch (err) {
    toast.error(err.response?.data?.error || "Signup failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="pl-4 outline-none border border-black w-full py-3 mb-4"
        required
      />
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="pl-4 outline-none border border-black w-full py-3 mb-4"
        required
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="pl-4 outline-none border border-black w-full py-3 mb-4"
        required
      />

      <button
        type="submit"
        className="border border-black py-3 px-8 w-full active:bg-gray-600 active:text-white shadow-[-7px_7px_0px_#000000] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all"
        disabled={loading}
      >
        {loading ? "Signing up..." : "Signup"}
      </button>
    </form>
  );
};

export default SignupForm;
