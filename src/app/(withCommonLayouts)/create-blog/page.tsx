/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Input, Upload, Button, Avatar, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ReactPlayer from "react-player";
import { createBlog } from "@/app/Services/BlogServices";
import { useUser } from "@/context/useContext";
import TipTapEditor from "@/component/TipTapEditor";
import ImageUploader from "@/lib/ImageUploaderField"; // same as profile
const { Option } = Select;
const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [extraImages, setExtraImages] = useState<File[]>([]);
  const [youtubeUrl, setYoutubeUrl] = useState("");
 const [category, setCategory] = useState("General");
const [customCategory, setCustomCategory] = useState("");
  const { user } = useUser();

  const handleExtraImagesChange = (info: any) => {
    const files = info.fileList.map((f: any) => f.originFileObj).filter(Boolean);
    setExtraImages(files);
  };

  const handleSubmit = async () => {
    
    if (!title || !description || !mainImage) {
      return message.error("Please fill all required fields");
    }

    const structuredPayload = {
      content: { title, description },
      subjectCategory: category === "Other" ? customCategory : category,
      recommendedVideos: youtubeUrl ? [youtubeUrl] : [],
      // tutor: user?.id, HEy gpt instead of sending the tutor id from here send it from backend get thet logged in user id req.user and then find the tutor with user fild and get the id and add it but if you have any easiar way tell me 
    };

    const formData = new FormData();
    formData.append("formdata", JSON.stringify(structuredPayload));
    formData.append("MainImage", mainImage);
    extraImages.forEach((img) => {
      formData.append("extraImage", img);
    });

    // setSubmitting(true);
   for (const pair of formData.entries()) {
  console.log(`${pair[0]}:`, pair[1]);
}

    const res = await createBlog(formData);
    // setSubmitting(false);
console.log(res ,'look here ');
    if (res?.success) {
      message.success("Blog created successfully!");
      // reset if needed
    } else {
      message.error(res?.message || "Failed to create blog");
      console.log('erre');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Profile */}
      <div className="flex items-center gap-4">
        <Avatar src={user?.image} size={48} />
        <span className="text-lg font-semibold">{user?.name}</span>
      </div>

      {/* Title */}
      <Input
        placeholder="Enter Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        size="large"
        className="text-2xl font-bold"
      />

      {/* TipTap */}
      <TipTapEditor value={description} onChange={(value) => setDescription(value)} />
{/* Category Selector */}
<div className="space-y-2">
  <label className="font-medium">Select Category</label>
  <Select
    defaultValue="General"
    value={category}
    onChange={(value) => setCategory(value)}
    style={{ width: "100%" }}
  >
    <Option value="General">General</Option>
    <Option value="Physics">Physics</Option>
    <Option value="Chemistry">Chemistry</Option>
    <Option value="Mathematics">Mathematics</Option>
    <Option value="Biology">Biology</Option>
    <Option value="Business">Business</Option>
    <Option value="English">English</Option>
    <Option value="Other">Other</Option>
  </Select>
  {category === "Other" && (
    <Input
      placeholder="Enter custom category"
      value={customCategory}
      onChange={(e) => setCustomCategory(e.target.value)}
    />
  )}
</div>

      {/* Main Image */}
<div className="flex flex-col md:flex-row gap-6">
        <div className="space-y-2">
        <label className="font-medium">Main Image</label>
        <ImageUploader onFileSelect={(file) => setMainImage(file)} />
      </div>

      {/* Extra Images */}
      <div className="space-y-2">
        <label className="font-medium">Extra Images</label>
        <Upload
          listType="picture"
          multiple
          beforeUpload={() => false}
          onChange={handleExtraImagesChange}
        >
          <Button icon={<UploadOutlined />}>Upload Extras</Button>
        </Upload>
      </div>
</div>

      {/* YouTube */}
      <div>
        <label className="font-medium">Embed YouTube Video</label>
        <Input
          placeholder="Paste YouTube URL"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
        />
        {youtubeUrl && (
          <ReactPlayer url={youtubeUrl} controls width="100%" className="mt-4" />
        )}
      </div>

      {/* Submit */}
      <div className="text-right">
        <Button type="primary"onClick={handleSubmit}>
          Publish Blog
        </Button>
      </div>
    </div>
  );
};

export default CreateBlog;
