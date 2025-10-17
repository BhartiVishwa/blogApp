import { assets} from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Blogitem = ({ title, category, description, image, id }) => {
  return (
    <div className=" shake max-w-[330px] sm:max-w-[300px] bg-white border border-black hover:shadow-[-7px_7px_0px_#000000]">
      <Link href={`/blogs/${id}`}>
        <Image
          src={image}
          alt=""
          width={400}
          height={400}
          className="border border-black"
        />
      </Link>
      <p className="px-2 ml-5 mt-5  inline-block bg-black text-white text-sm">
        {category}
      </p>
      <div className="p-4 flex flex-col items-center text-left overflow-hidden">
       <h5 className="mb-2 text-lg font-semibold text-gray-900 leading-snug break-words w-full">
          {title}
        </h5>
           <p
          className="mb-3 text-sm text-gray-700 leading-relaxed break-words w-full"
          dangerouslySetInnerHTML={{
            __html: description.slice(0, 120),
          }}
        ></p>
          
        
        <Link href={`/blogs/${id}`}>
   <div className="inline-flex items-center justify-center py-2 font-semibold text-center text-gray-900 hover:underline">
            Read more{" "}
            <Image src={assets.arrow} className="ml-2" alt="arrow" width={12} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Blogitem;