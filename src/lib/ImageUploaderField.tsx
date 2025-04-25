/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Upload, Button, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";

interface ImageUploaderProps {
  label?: string;
  onFileSelect: (file: File | null) => void;
  defaultImage?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  label = "Upload Image",
  onFileSelect,
  defaultImage,
}) => {
  const [preview, setPreview] = useState<string | null>(defaultImage || null);

  const handleBeforeUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    onFileSelect(file);
    return false; // Prevent automatic upload
  };

  const handleRemove = () => {
    setPreview(null);
    onFileSelect(null);
  };

  return (
    <div>
      {preview && (
        <div className="mb-2">
          <Image src={preview} alt="Preview" width={100} height={100} />
        </div>
      )}
      <Upload
        beforeUpload={handleBeforeUpload}
        showUploadList={false}
        maxCount={1}
        onRemove={handleRemove}
        accept="image/*"
      >
        <Button icon={<UploadOutlined />}>{label}</Button>
      </Upload>
    </div>
  );
};

export default ImageUploader;
