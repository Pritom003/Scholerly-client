/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Avatar, Divider, Modal, Table, message } from "antd";
import {
  getAllBlogs,
  getBlogById,
  updateBlogStatus,
} from "@/app/Services/BlogServices";
import { Eye, Check, X } from "lucide-react";

interface IBlog {
  _id: string;
  content: {
    title: string;
    description: string;
  };
  images: {
    MainImage: string;
    extraImage?: string;
  };
  recommendedVideos?: string[];
  status: string;
  createdAt: string;
}

interface ITutorWithBlogs {
  _id: string;
  name: string;
  email: string;
  profileImage?: string;
  blogs: IBlog[];
}

const AllBlogsGroupedByTutor = () => {
  const [tutorBlogs, setTutorBlogs] = useState<ITutorWithBlogs[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewModal, setPreviewModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<any>(null);

  const fetchGroupedBlogs = async () => {
    setLoading(true);
    try {
      const res = await getAllBlogs();
      setTutorBlogs(res?.data || []);
    } catch {
      message.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroupedBlogs();
  }, []);

  const handlePreview = async (id: string) => {
    const res = await getBlogById(id);
    if (res?.data) {
      setSelectedBlog(res.data);
      setPreviewModal(true);
    }
  };

  const handleStatusChange = async (
    id: string,
    status: "approved" | "rejected"
  ) => {
    try {
      const result = await updateBlogStatus(id, status);
      if (result.success) {
        message.success(`Blog ${status}`);
        fetchGroupedBlogs();
      } else {
        throw new Error(result.message || "Failed to update blog");
      }
    } catch (error: any) {
      message.error(error.message || "Something went wrong");
    }
  };

  const blogColumns = [
    {
      title: "Title",
      dataIndex: "content",
      key: "title",
      render: (content: any, record: IBlog) => {
        const words = content.title.split(" ");
        const shortTitle = words.slice(0, 2).join(" ") + (words.length > 2 ? "..." : "");
        return (
          <button
            onClick={() => handlePreview(record._id)}
            className="text-blue-600 hover:underline"
          >
            {shortTitle}
          </button>
        );
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span
          className={`px-2 py-1 rounded-full text-white text-sm ${
            status === "approved"
              ? "bg-green-500"
              : status === "rejected"
              ? "bg-red-500"
              : "bg-yellow-500"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: IBlog) => (
        <div className="flex gap-2">
          <Eye
            size={18}
            className="text-blue-600 cursor-pointer"
            onClick={() => handlePreview(record._id)}
          />
          <Check
            size={18}
            className={`cursor-pointer ${
              record.status === "approved" ? "text-gray-400" : "text-green-600"
            }`}
            onClick={() =>
              record.status !== "approved" &&
              handleStatusChange(record._id, "approved")
            }
          />
          <X
            size={18}
            className={`cursor-pointer ${
              record.status === "rejected" ? "text-gray-400" : "text-red-600"
            }`}
            onClick={() =>
              record.status !== "rejected" &&
              handleStatusChange(record._id, "rejected")
            }
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">All Blogs Grouped by Tutor</h2>
      {tutorBlogs.map((tutor) => (
        <div key={tutor._id} className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <Avatar src={tutor.profileImage} size={48} />
            <div>
              <h3 className="text-lg font-medium">{tutor.name}</h3>
              <p className="text-sm text-gray-500">{tutor.email}</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table
              columns={blogColumns}
              dataSource={tutor.blogs}
              rowKey="_id"
              loading={loading}
              pagination={false}
              scroll={{ x: true }}
            />
          </div>
          <Divider />
        </div>
      ))}

      {/* Preview Modal */}
      <Modal
        open={previewModal}
        title={selectedBlog?.content?.title || "Blog Preview"}
        onCancel={() => setPreviewModal(false)}
        footer={null}
        width={800}
      >
        <div>
          <p>
            <strong>Tutor:</strong> {selectedBlog?.tutor?.name}
          </p>
          <p>
            <strong>Status:</strong> {selectedBlog?.status}
          </p>
          <div className="mt-4 space-y-4">
            <h4 className="font-semibold">Description:</h4>
            <div
              className="prose max-w-full"
              dangerouslySetInnerHTML={{
                __html: selectedBlog?.content?.description,
              }}
            />

            {/* Images */}
            {selectedBlog?.images?.MainImage && (
              <div>
                <h4 className="font-semibold mt-4">Images:</h4>
                <div className="flex gap-4 flex-wrap">
                  <img
                    src={selectedBlog.images.MainImage}
                    alt="Main"
                    className="w-40 h-40 object-cover rounded border"
                  />
                  {selectedBlog.images.extraImage && (
                    <img
                      src={selectedBlog.images.extraImage}
                      alt="Extra"
                      className="w-40 h-40 object-cover rounded border"
                    />
                  )}
                </div>
              </div>
            )}

            {/* Videos */}
            {selectedBlog?.recommendedVideos?.length > 0 && (
              <div>
                <h4 className="font-semibold mt-4">Recommended Videos:</h4>
                <div className="flex flex-wrap gap-4">
                  {selectedBlog.recommendedVideos.map((videoUrl: string, index: number) => {
                    const videoId = videoUrl.split("v=")[1] || videoUrl;
                    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                    return (
                      <iframe
                        key={index}
                        width="300"
                        height="170"
                        src={embedUrl}
                        title={`YouTube Video ${index + 1}`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded shadow"
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AllBlogsGroupedByTutor;
