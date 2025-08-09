/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {  getMostLikedBlogs } from "@/app/Services/BlogServices";
import Container from "@/component/Shared/Container/Container";
import SectionTitle from "@/component/Shared/SectionTitle";
import Button from "@/lib/Buttons/Button";
import Link from "next/link";
import React, { useEffect, useState } from "react";


const OurMostLikedBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await getMostLikedBlogs(); // sort by latest
      setBlogs(res?.data || []);
    };
    fetchBlogs();
  }, []);
  
console.log(blogs);
  return (
    <div className="p-6 pb-20">
   <div  className=' max-w-[580px]  mx-auto mb-10 '>
     <SectionTitle
  text="Our Blogs"
  description="Top Three Most Liked BLogs"
/>
</div>
     <Container>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {blogs.map((blog: any) => (
          <Link href={`/blog-page/${blog._id}`} key={blog._id} className="p-4  hover:shadow-2xl border rounded shadow">
            <img
              src={blog?.images?.MainImage}
              alt="blog"
              className="w-full h-40 object-cover mb-2 rounded"
            />
            <h3 className="text-xl font-semibold">
              {blog.content.title}</h3>
            <p className="text-sm text-gray-600 
            line-clamp-3">{blog.content.description}</p>
          </Link>
        ))}
      </div>
    <div>
      
    </div>
     </Container>
     <div className="mt-10 max-w-96 mx-auto">
        <Link href="/blog-page"  className="w-44 my-10 ">  <Button buttontext='Visit Blog Page ' />
           
           </Link>
     </div>
    </div>
  );
};

export default OurMostLikedBlogs;
