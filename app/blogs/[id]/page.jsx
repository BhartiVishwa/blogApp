"use client";
import { assets, blog_data } from "@/Assets/assets";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";

const page = ({ params }) => {
  const [data, setData] = useState(null);


const fetchBlogData = async () => {
  try {
    const response = await axios.get('/api/blog', {
      params: { id: params.id }
    });
    setData(response.data.blog);
  } catch (err) {
    console.error("Error fetching blog:", err);
  }
};

  useEffect(() => {
    fetchBlogData();
  }, []);

  return ( data?
    <>
      <div className=" bg-gray-200 py-5 md:px-12 lg:px-28 ">
        <div className="flex justify-between items-center">
        <Link href={'/'}>
          <Image
            src={assets.logo}
            width={180}
            className="w-[130px] sm:w-auto"
          />
        </Link>
       
       <Link href={'/admin'}>
          <button
            className="flex items-center gap-2 font-medium py-1 px-3 sm:py-2 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000] 
              active:translate-y-1 active:translate-x-1 active:shadow-none transition-all 
             "
          >
            Get Started <Image src={assets.arrow} alt="arrow" />
          </button>
          </Link>
          
        </div>
        <div className="text-center my-24">
          <h1 className="test-2xl sm:text-5xl font-semibold max-w-[500px] mx-auto">
            {data.title}
          </h1>
          <Image
            className="mx-auto mt-6 border border-white rounded-full"
            src={data.author_img}
            width={60}
            height={60}
          />
          <p className="mt-1 text-lg max-w-[740px] mx-auto text-[#808080]">
            {data.author}
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-[800px] md:mx-auto mt-[-100px] mb-10 px-4 ">
        <Image
          className="border-4 border-white"
          src={data.image}
          width={1280}
          height={720}
        />
        
       <div className="blog-content" dangerouslySetInnerHTML={{__html: data.description}}></div>
        <div className="my-24 ">
          <p className="text-black font-semibold my-4">Share this artial on social meadia</p>
          <div className="flex">
              <Image src={assets.facebook_icon} alt='' width={40} className="transition-transform duration-500 hover:rotate-y-180 cursor-pointer"/>
              <Image src={assets.twitter_icon} alt='' width={40} className="transition-transform duration-500 hover:rotate-y-180 cursor-pointer"/>
              <Image src={assets.googleplus_icon} alt='' width={40} className="transition-transform duration-500 hover:rotate-y-180 cursor-pointer"/>  
          </div>
        </div>
      </div>  
      <Footer/>
    </>:<></>
  );
};

export default page;
