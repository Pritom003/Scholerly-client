/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { HeartIcon, PenSquare, Upload } from "lucide-react";
import {
  getBlogById,
  addComment,
  toggleLike,
  updateBlog,
} from "@/app/Services/BlogServices";
import Container from "@/component/Shared/Container/Container";
import { toast } from "sonner";
import { useUser } from "@/context/useContext";
import Image from "next/image";
import { Avatar, Input } from "antd";
import { SendOutlined, LoadingOutlined } from "@ant-design/icons";
import Link from "next/link";

const SingleBlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [description, setDescription] = useState("");
  const [videos, setVideos] = useState<string[]>([]);

  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const fetchBlog = async () => {
    const res = await getBlogById(id as string);
    setBlog(res?.data);
    setDescription(res?.data?.content?.description || "");
    setVideos(res?.data?.recommendedVideos || []);
  };

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id]);

  useEffect(() => {
    if (editMode && descriptionRef.current) {
      const len = descriptionRef.current.value.length;
      descriptionRef.current.setSelectionRange(len, len);
      descriptionRef.current.focus();
    }
  }, [editMode]);

  const handleToggleLike = async () => {
    if (!user) return toast.error("Please log in to like the blog");
    const res = await toggleLike(id as string);
    if (res?.success) fetchBlog();
  };

  const handleCommentSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!user) return toast.error("Please log in to comment");
    if (!commentText.trim()) return;

    setLoading(true);
    const res = await addComment(id as string, commentText.trim());
    setLoading(false);

    if (res?.success) {
      toast.success("Comment added");
      setCommentText("");
      fetchBlog();
    } else {
      toast.error("Failed to post comment");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "main" | "extra") => {
    const file = e.target.files?.[0];
    if (!file) return;
    // You can upload image here and update blog state
    toast.success(`Uploading ${type} image...`);
  };

  const handleVideoChange = (index: number, value: string) => {
    const newVideos = [...videos];
    newVideos[index] = value;
    setVideos(newVideos);
  };
const handleBlogUpdate = async () => {
  const formData = new FormData();
  
  // Ensure title is included
  if (!description.trim()) {
    toast.error("Description cannot be empty");
    return;
  }

  formData.append('formdata', JSON.stringify({
    content: {
      description,
      title: blog.content.title || "Default Title",  // Ensure title is added
    }
  }));

  // Add images if they are updated
  const mainImageInput = document.getElementById('mainImageInput') as HTMLInputElement;
  const extraImageInput = document.getElementById('extraImageInput') as HTMLInputElement;
  if (mainImageInput?.files?.[0]) formData.append('MainImage', mainImageInput.files[0]);
  if (extraImageInput?.files?.[0]) formData.append('extraImage', extraImageInput.files[0]);

  const res = await updateBlog(id as string, formData);
  console.log(res);

  if (res?.success) {
    toast.success('Blog updated successfully');
    fetchBlog(); // Re-fetch the blog data to reflect the changes
    setEditMode(false); // Exit edit mode
  } else {
    toast.error('Error updating blog');
  }
};


  const getEmbeddableUrl = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([\w-]{11})/
    );
    const videoId = match?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  if (!blog) return <div className="text-center mt-10">Loading...</div>;

  const isTutor = user?.email === blog?.tutor?.email;

  return (
    <Container>
      <div className="max-w-7xl mx-auto p-4 grid grid-cols-6 gap-6">
        <div className="col-span-6 md:col-span-4 space-y-6">
          <div className="relative">
            <img
              src={blog?.images?.MainImage}
              alt="Main Blog"
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
            {editMode && (
              <>
                <input
                  type="file"
                  className="hidden"
                  id="mainImageInput"
                  onChange={(e) => handleImageUpload(e, "main")}
                />
                <label
                  htmlFor="mainImageInput"
                  className="absolute bottom-2 right-2 p-2 bg-white shadow-md rounded-full cursor-pointer"
                >
                  <Upload className="text-black" size={18} />
                </label>
              </>
            )}
          </div>
<div>
  {editMode && (
  <button
    onClick={handleBlogUpdate}
    className="mt-4 bg-blue-600 text-white p-2 rounded-md"
  >
    Save Changes
  </button>
)}

</div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Avatar
                src={blog?.tutor.profileImage}
                size={50}
                className="rounded-full pt-8"
              />
              <Link href={`/all-tutor/${blog.tutor._id}`}>
                <h2 className="mt-2 text-sm font-semibold">{blog?.tutor.name}</h2>
                <h2 className="text-xs">{blog?.tutor.email}</h2>
              </Link>
              {isTutor && (
                <button
                  onClick={() => setEditMode((prev) => !prev)}
                  className="text-sm ml-2 mt-2 text-blue-600 hover:underline"
                >
                  <PenSquare size={18} />
                </button>
              )}
            </div>
            <div
              className="flex items-center gap-2"
              onClick={handleToggleLike}
              role="button"
            >
              <HeartIcon
                className={`cursor-pointer transition ${
                  blog.likes?.length > 0 ? "text-red-500" : "text-gray-400"
                }`}
              />
              <span>{blog.likes?.length || 0} Likes</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold">{blog.content.title}</h1>

          {editMode ? (
            <textarea
              ref={descriptionRef}
              className="w-full border border-gray-300 rounded-md p-2 text-sm"
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          ) : (
            <p className="text-gray-700 whitespace-pre-line">
              {description}
            </p>
          )}

          {blog.images?.extraImage && (
            <div className="relative">
              <img
                src={blog.images.extraImage}
                alt="Extra"
                className="w-full h-64 object-cover rounded-lg"
              />
              {editMode && (
                <>
                  <input
                    type="file"
                    className="hidden"
                    id="extraImageInput"
                    onChange={(e) => handleImageUpload(e, "extra")}
                  />
                  <label
                    htmlFor="extraImageInput"
                    className="absolute bottom-2 right-2 p-2 bg-white shadow-md rounded-full cursor-pointer"
                  >
                    <Upload className="text-black" size={18} />
                  </label>
                </>
              )}
            </div>
          )}

          <h1 className="text-xl font-bold italic text-amber-950 text-start">
            Related Videos:
          </h1>

          <div className="mt-6 space-y-4 gap-4 flex flex-wrap">
            {videos.map((video: string, idx: number) => (
              <div key={idx} className="w-44 h-80 aspect-video">
                {editMode ? (
                  <Input
                    value={video}
                    onChange={(e) => handleVideoChange(idx, e.target.value)}
                    className="!text-xs"
                  />
                ) : (
                  <iframe
                    src={getEmbeddableUrl(video) || ""}
                    title={`Video ${idx + 1}`}
                    allowFullScreen
                    className="w-full h-full rounded-lg shadow-md"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Comments Section */}
        <div className="col-span-6 md:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">Comments</h2>

          <div className="flex items-start gap-3">
            <Image
              src={
                user?.image ||
                "https://res.cloudinary.com/dkal4qazy/image/upload/v1744812682/profile_1744812678684.png"
              }
              alt="User"
              width={40}
              height={40}
              className="rounded-full mt-1"
            />
            <div className="relative w-full">
              <Input.TextArea
                rows={2}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write your comment..."
                className="!pr-10 !bg-gray-100 !text-sm !rounded-md"
                disabled={!user}
              />
              {loading ? (
                <LoadingOutlined className="absolute right-3 top-2.5 text-[#815606] text-lg animate-spin" />
              ) : (
                <SendOutlined
                  onClick={handleCommentSubmit}
                  className={`absolute right-3 top-2.5 text-[#815606] text-lg cursor-pointer hover:scale-110 transition ${
                    !user && "opacity-50 cursor-not-allowed"
                  }`}
                />
              )}
              {!user && (
                <p className="text-xs text-red-700 mt-1">
                  Please log in to add a comment.
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {blog.comments?.length === 0 && (
              <p className="text-sm text-gray-500">No comments yet.</p>
            )}
            {blog.comments?.map((comment: any, idx: number) => (
              <div key={idx} className="bg-gray-100 p-3 rounded-md">
                <p className="text-sm">{comment.text}</p>
                {comment.user?.name && (
                  <p className="text-xs font-medium text-gray-600 mb-1">
                    – {comment.user.name}
                  </p>
                )}
                <span className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SingleBlogPage;
