import { blog_data } from "@/Assets/assets";
import React, { useEffect, useState } from "react";
import Blogitem from "./Blogitem";
import axios from "axios";

const bloglist = () => {
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await axios.get("/api/blog");
    setBlogs(response.data.blogs);
    console.log(response.data.blogs);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="px-4 sm:px-6">
      <div className="flex justify-center gap-3 sm:gap-6 my-10 flex-wrap">
        <button
          onClick={() => setMenu("All")}
          className={
            menu === "All" ? "bg-black text-white py-1 px-4 rounded-sm" : " "
          }
        >
          All
        </button>
        <button
          onClick={() => setMenu("Technology")}
          className={
            menu === "Technology"
              ? "bg-black text-white py-1 px-4 rounded-sm"
              : " "
          }
        >
          Technology
        </button>
        <button
          onClick={() => setMenu("Startup")}
          className={
            menu === "Startup"
              ? "bg-black text-white py-1 px-4 rounded-sm"
              : " "
          }
        >
          Startup
        </button>
        <button
          onClick={() => setMenu("Lifestyle")}
          className={
            menu === "Lifestyle"
              ? "bg-black text-white py-1 px-4 rounded-sm"
              : " "
          }
        >
          Lifestyle
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-16">
        {blogs
          .filter((item) => (menu === "All" ? true : item.category === menu))
          .map((item, index) => {
            return (
              <Blogitem
                key={index}
                image={item.image}
                id={item._id}
                description={item.description}
                title={item.title}
                category={item.category}
              />
            );
          })}
      </div>
    </div>
  );
};

export default bloglist;
