import { assets } from "@/Assets/assets";
import Image from "next/image";
import React from "react";
import { Trash2, Edit } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

const BlogTableitem = ({
  author_img,
  title,
  author,
  date,
  deleteBlog,
  editBlog,
  mongoId,
}) => {
  const { user } = useAuth();
  const Blogdate = new Date(date);

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <Image
            width={40}
            height={40}
            src={author_img ? author_img : assets.profile_icon}
            className="rounded-full"
            alt="Author"
          />
          <span className="text-sm font-medium text-gray-900">
            {author || "No author"}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900 font-medium max-w-xs truncate">
          {title || "No title"}
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-gray-600">
          {Blogdate.toDateString()}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => editBlog(mongoId)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => deleteBlog(mongoId)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BlogTableitem;
