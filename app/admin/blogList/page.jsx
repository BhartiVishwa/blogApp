"use client";
import BlogTableitem from "@/components/AdminComponents/BlogTableitem";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { Trash2, Edit, ChevronLeft, ChevronRight } from "lucide-react";

const page = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(5); // Show 5 blogs per page
  const { user } = useAuth();
  const router = useRouter();

  const fetchBlogs = async () => {
    const response = await axios.get("/api/blog");
    setBlogs(response.data.blogs);
  };

  const editBlog = (mongoId) => {
    router.push(`/admin/editBlog/${mongoId}`);
  };  

  const deteleBlog = async (mongoId) => {
    try {
      const response = await axios.delete(`/api/blog?id=${mongoId}&userId=${user.id}&userRole=${user.role}`);
      toast.success(response.data.message);
      fetchBlogs();
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Pagination Logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">All Blogs</h1>
        <p className="text-gray-600 mt-1">Total: {blogs.length} blogs</p>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Author</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Blog Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentBlogs.map((item, index) => (
                <BlogTableitem
                  key={index}
                  mongoId={item._id}
                  title={item.title}
                  author={item.author}
                  author_img={item.author_img}
                  date={item.date}
                  deleteBlog={deteleBlog}
                  editBlog={editBlog}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {currentBlogs.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {item.title || "No title"}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  By {item.author || "Unknown"}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(item.date).toDateString()}
                </p>
              </div>
              <div className="flex flex-col gap-2 ml-4">
                <button
                  onClick={() => editBlog(item._id)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => deteleBlog(item._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {indexOfFirstBlog + 1} to {Math.min(indexOfLastBlog, blogs.length)} of {blogs.length} blogs
          </div>
          
          <div className="flex items-center space-x-2">
    
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
            </button>

            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`px-3 py-2 border rounded-md text-sm ${
                  currentPage === index + 1
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                {index + 1}
              </button>
            ))}

            
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

  
      {blogs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No blogs found</p>
        </div>
      )}
    </div>
  );
};

export default page;
