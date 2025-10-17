"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { assets } from "@/Assets/assets";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/lib/AuthContext";


export default function EditBlog({ params }) {
  const [blog, setBlog] = useState({});
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`/api/blog?id=${params.id}`);
      setBlog(response.data.blog);
    } catch (error) {
      toast.error("Failed to fetch blog");
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setBlog((blog) => ({ ...blog, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append("id", params.id);
      formData.append("title", blog.title);
      formData.append("description", blog.description);
      formData.append("category", blog.category);
      formData.append("author", user?.name || blog.author);
      
      if (image) {
        formData.append("image", image);
      }

     await axios.put("/api/blog", formData);
    toast.success("Blog updated successfully!");
    
    // Redirect based on user role
    
    if (user?.role === 'admin') {
      router.push("/admin/blogList");
    } else {
      router.push("/admin/UserBlogs");
    }
  } catch (error) {
    toast.error("Failed to update blog");
  } finally {
    setLoading(false);
  }
};

  const getImageSrc = () => {
    if (image) {
      return URL.createObjectURL(image);
    } else if (blog.image) {
      return blog.image;
    } else {
      return assets.upload_area;
    }
  };

  return (
  <form onSubmit={handleSubmit} className="pt-5 px-5 sm:pt-12 pl-16">
    <p className="text-xl">Upload thumbnail</p>
    <label htmlFor="image">
      <Image
        className="mt-4"
        src={getImageSrc()}
        width={140}
        height={70}
        alt=""
      />
    </label>
    <input
      onChange={(e) => setImage(e.target.files[0])}
      type="file"
      id="image"
      hidden
    />
    
    <p className="text-xl mt-4">Blog title</p>
    <input
      name="title"
      onChange={onChangeHandler}
      value={blog.title || ""}
      className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
      type="text"
      placeholder="Type here"
      required
    />
    
    <p className="text-xl mt-4">Blog Description</p>
    <textarea
      name="description"
      onChange={onChangeHandler}
      value={blog.description || ""}
      className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
      placeholder="Write content here"
      rows={6}
      required
    />
    
    <p className="text-xl mt-4">Blog Category</p>
    <select 
      name="category" 
      onChange={onChangeHandler} 
      value={blog.category || "Startup"} 
      className="w-40 mt-4 px-4 py-3 border text-gray-500"
    >
      <option value="Startup">Startup</option>
      <option value="Technology">Technology</option>
      <option value="Lifestyle">Lifestyle</option>
    </select>
    
    <br/>
    <button
      type="submit"
      disabled={loading}
      className="mt-8 w-40 h-12 bg-white-400 text-black border border-solid border-black shadow-[-4px_4px_0px_#000000] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all disabled:opacity-50 flex items-center justify-center gap-2"
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
      )}
      {loading ? "Updating..." : "UPDATE"}
    </button>
  </form>
);

}
