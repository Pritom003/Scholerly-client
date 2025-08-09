'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Avatar } from 'antd';
import { getAllBlogs } from '@/app/Services/BlogServices';
import Link from 'next/link';
import Container from '@/component/Shared/Container/Container';
import { useUser } from '@/context/useContext';
import Button from '@/lib/Buttons/Button';

export type TBlogPost = {
  _id?: string;
  content: {
    title: string;
    description: string;
  };
  subjectCategory: string;
  images: {
    MainImage: string;
    extraImage?: string;
  };
  recommendedVideos?: string[];
  likes: string;
  status: 'pending' | 'approved' | 'rejected';
  comments: string;
};

type TGroupedBlog = {
  _id: string;
  name: string;
  email: string;
  profileImage: string;
  blogs: TBlogPost[];
};

const AllBlogPage = () => {
  const [tutorsWithBlogs, setTutorsWithBlogs] = useState<TGroupedBlog[]>([]);
  const [visibleTutors, setVisibleTutors] = useState(3); // Initially show 3 tutors
  const [visibleBlogs, setVisibleBlogs] = useState<number>(5); // Initially show 5 blogs per tutor
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await getAllBlogs();
      if (res?.success) {
        setTutorsWithBlogs(res.data);
      }
    };
    fetchBlogs();
  }, []);

  // Function to load more tutors
  const loadMoreTutors = () => {
    setVisibleTutors((prev) => prev + 2); // Load 2 more tutors
  };

  // Function to load more blogs per tutor
  const loadMoreBlogs = () => {
    setVisibleBlogs((prev) => prev + 2); // Load 2 more blogs
  };

  return (
    <Container>
      <div className='flex gap-4 '>
        <div>
          {tutorsWithBlogs.slice(0, visibleTutors).map((tutor) => (
            <div key={tutor._id} className="grid border-dotted border-b pb-8 border-b-[#815606] justify-start gap-6 items-start">
              {/* Tutor Info */}
              <div className="items-center">
                <div className='pt-8 flex justify-start gap-2 align-middle'>
                  <Avatar src={tutor.profileImage} size={100} className="rounded-full pt-8" />
                  <div>
                    <h2 className="text-center text-lg font-semibold mt-4">{tutor.name}</h2>
                    <h2 className="text-center text-xs">{tutor.email}</h2>
                  </div>
                </div>
              </div>

              {/* Blogs */}
              <div className="flex-1 space-y-6 pt-8">
                <h2 className='text-[#815606] text-lg font-bold uppercase'>Blogs By {tutor.name}</h2>
                {tutor.blogs.slice(0, visibleBlogs).map((blog) => (
                  <div key={blog._id} className="flex overflow-hidden hover:shadow-lg transition">
                    {blog?.images?.MainImage && (
                      <div className="w-20 h-16 mr-4 ml-6 my-2 relative">
                        <Image
                          src={blog.images.MainImage}
                          alt="Blog Image"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="w-2/3 flex flex-col justify-between">
                      <div>
                        <h3
                          onClick={() => router.push(`/blog-page/${blog._id}`)}
                          className="text-[#815606] cursor-pointer hover:underline"
                        >
                          {blog.content.title}
                        </h3>
                        <p className="text-gray-600 line-clamp-1 mt-2">
                          {blog.content.description}
                        </p>
                      </div>
                      <Link href={`/blog-page/${blog._id}`} className='w-full flex justify-end'>
                        <span className='text-[#815606] text-xs underline text-end'>visit blog</span>
                      </Link>
                    </div>
                  </div>
                ))}

                {/* Show "See More" button if there are more blogs */}
                {visibleBlogs < tutor.blogs.length && (
                  <div className='flex justify-center pt-4'>
                    <button onClick={loadMoreBlogs}>See More Blogs</button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Show "See More" button if there are more tutors */}
          {visibleTutors < tutorsWithBlogs.length && (
            <div className='flex justify-center pt-4'>
              <button className='text-amber-950 border-dotted border-b-2  text-2xl  border-b-amber-950  mb-10 ' onClick={loadMoreTutors}>See More Tutors</button>
            </div>
          )}
        </div>

        {/* Create Blog Button for Admin or Tutor */}
        {(user?.role === "admin" || user?.role === "tutor") && (
          <div className='w-full flex justify-end m-4'>
            <Link href={'/create-blog'}>
              <Button buttontext="Create Blog" />
            </Link>
          </div>
        )}
      </div>
    </Container>
  );
};

export default AllBlogPage;
