"use client";
import SubsTableitem from "@/components/AdminComponents/SubsTableitem";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Trash2, ChevronLeft, ChevronRight } from "lucide-react";

const page = () => {
  const [emails, setEmails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [emailsPerPage] = useState(5); // Show 5 emails per page

  const fetchEmails = async () => {
    try {
      const response = await axios.get("/api/email");
      setEmails(response.data.emails || []);
    } catch (error) {
      console.error("Error fetching emails:", error);
      toast.error("Failed to fetch emails");
    }
  };

  const deleteEmail = async (mongoId) => {
    try {
      const response = await axios.delete("/api/email", {
        params: { id: mongoId },
      });
      if (response.data.success) {
        toast.success(response.data.msg);
        fetchEmails();
      } else {
        toast.error(response.data.msg || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to delete email");
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  // Pagination Logic
  const indexOfLastEmail = currentPage * emailsPerPage;
  const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
  const currentEmails = emails.slice(indexOfFirstEmail, indexOfLastEmail);
  const totalPages = Math.ceil(emails.length / emailsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">All Subscriptions</h1>
        <p className="text-gray-600 mt-1">Total: {emails.length} subscriptions</p>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentEmails.map((item, index) => (
                <SubsTableitem
                  key={index}
                  mongoId={item._id}
                  deleteEmail={deleteEmail}
                  email={item.email}
                  date={item.date}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {currentEmails.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {item.email || "No email"}
                </h3>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(item.date).toDateString()}
                </p>
              </div>
              <div className="ml-4">
                <button
                  onClick={() => deleteEmail(item._id)}
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
            Showing {indexOfFirstEmail + 1} to {Math.min(indexOfLastEmail, emails.length)} of {emails.length} subscriptions
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Previous Button */}
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Page Numbers */}
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

            {/* Next Button */}
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

      {/* Empty State */}
      {emails.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No subscriptions found</p>
        </div>
      )}
    </div>
  );
};

export default page;
