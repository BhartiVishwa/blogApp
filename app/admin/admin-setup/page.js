"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function AdminSetup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/create-admin", {
        name,
        email,
        password,
      });

      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      toast.error(err.response?.data?.error || "Admin creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-start mt-5 justify-center bg-gray-50 p-2">
      <div className="w-full max-w-sm">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 border border-black shadow-[-7px_7px_0px_#000000] w-full"
        >
          <h2 className="text-lg font-bold mb-4 text-center">
            Create Admin Account
          </h2>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Admin Name</label>
              <input
                type="text"
                placeholder="Enter admin name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-4 outline-none border border-black w-full py-2 text-sm"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Admin Email</label>
              <input
                type="email"
                placeholder="Enter admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-4 outline-none border border-black w-full py-2 text-sm"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Admin Password</label>
              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-4 outline-none border border-black w-full py-2 text-sm"
                required
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="border border-black py-2 w-full mt-4 active:bg-gray-600 active:text-white shadow-[-7px_7px_0px_#000000] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all text-sm font-medium"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                Creating Admin...
              </div>
            ) : (
              "Create Admin"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
