/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Table } from "antd";
import Image from "next/image";
import Link from "next/link";
import { EyeOutlined } from "@ant-design/icons";
import { getBlogsByUserId } from "@/app/Services/BlogServices";
import { useUser } from "@/context/useContext";

type Blog = {
  _id: string;
  content: {
    title: string;
    description: string;
  };
  images: {
    MainImage: string;
    extraImage?: string;
  };
  status: string;
};

import { deleteBlog } from "@/app/Services/BlogServices";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const tutorId = user?.id;

  const fetchBlogs = async () => {
    if (!tutorId) return;
    setLoading(true);
    const res = await getBlogsByUserId(tutorId);
    if (res?.success) {
      setBlogs(res.data);
    }
    setLoading(false);
  };

  const handleDelete = async (blogId: string) => {
    const res = await deleteBlog(blogId);
    console.log(res);
    if (res?.success) {
      setBlogs(blogs.filter((blog) => blog._id !== blogId));
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [tutorId]);

  const columns = [
    {
      title: "Image",
      dataIndex: "images",
      key: "image",
      render: (images: Blog["images"]) => (
        <Image
          src={images.MainImage}
          alt="Main"
          width={80}
          height={50}
          className="rounded object-cover"
        />
      ),
    },
    {
      title: "Title",
      dataIndex: ["content", "title"],
      key: "title",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span
          className={`px-2 py-1 rounded text-white text-xs ${
            status === "published" ? "bg-green-600" : "bg-yellow-500"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, blog: Blog) => (
        <>
          <Link href={`/blog-page/${blog._id}`}>
            <span className="text-blue-600 hover:underline flex items-center gap-1">
              <EyeOutlined /> View
            </span>
          </Link>
          <button
            onClick={() => handleDelete(blog._id)}
            className="text-red-600 ml-2"
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Blogs</h1>
      <div className="bg-white p-4 rounded shadow">
        <Table
          dataSource={blogs}
          columns={columns}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
};

export default MyBlogs;

