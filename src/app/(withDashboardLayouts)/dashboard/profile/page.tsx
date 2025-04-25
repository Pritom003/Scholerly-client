/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Form,
  Input,
  Modal,
  Spin,
  Tooltip,
  Upload,
  message,
} from "antd";
import {
  EditOutlined,
  LockOutlined,
  SaveOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { getUserProfile, updateUserProfile } from "@/app/Services/Authservices";
import ImageUploader from "@/lib/ImageUploaderField";
import { toast } from "sonner";

const UserProfile = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [file, setFile] = useState<any>(null);
  const fetchProfile = async () => {
    try {
      const res = await getUserProfile();
      if (res?.success) {
        setProfile(res.data);
        form.setFieldsValue({ name: res.data.name });
      }
    } catch (err) {
      message.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append("name", values.name);
    if (values.oldPassword && values.newPassword) {
      formData.append("oldPassword", values.oldPassword);
      formData.append("newPassword", values.newPassword);
    }
    if (file) {
      formData.append("ProfileImage", file);
    }

    try {
      const res = await updateUserProfile(formData);
      console.log(res);
      if (res?.success) {
        toast.success("Profile updated!");
        fetchProfile();
        setModalVisible(false);
        setFileList([]);
        setShowPasswordFields(false);
      } else {
        message.error(res?.message || "Update failed");
      }
    } catch (err) {
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <Spin fullscreen />;

  return (
    <div className="max-w-3xl  mt-10 p-4   mx-4">
      <h1 className="text-2xl font-light"> Hello <span className="capitalize">{profile.name}</span></h1>
      <div className="flex gap-6 border-2 my-2 items-center p-6 rounded-lg shadow-md  relative">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <div className="w-32 h-32 border-4 border-brown-700 rounded-full overflow-hidden">
            <Avatar
              src={profile?.Profileimage}
              alt="Profile Image"
              size={128}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex flex-col flex-grow">
          <h2 className="text-2xl font-semibold capitalize">
            {profile?.name}</h2>
          <p className="text-gray-600 ">Role: <span>   {profile?.role || "User"}</span>
          </p>
          <p className="text-gray-500"> email: {profile?.email}</p>
        </div>

        {/* Edit Button */}
        
      </div>
      <Button
          icon={<EditOutlined />}
          className="flex justify-end mx-10 !text-white !bg-amber-950"
          onClick={() => setModalVisible(true)}
        >
          Edit
        </Button>
      {/* Modal for Editing Profile */}
      <Modal
        open={modalVisible}
        title="Edit Profile"
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item label="Name" name="name">
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item label="Profile Image">
  <ImageUploader
    onFileSelect={(file) => setFile(file)}
  />
</Form.Item>

          <div className="flex justify-between items-center">
            <h3 className="text-md font-medium">Change Password?</h3>
            <Button
              icon={<LockOutlined />}
              size="small"
              onClick={() => setShowPasswordFields(!showPasswordFields)}
            >
              {showPasswordFields ? "Cancel" : "Yes"}
            </Button>
          </div>

          {showPasswordFields && (
            <>
              <Form.Item label="Old Password" name="oldPassword">
                <Input.Password placeholder="Enter old password" />
              </Form.Item>

              <Form.Item label="New Password" name="newPassword">
                <Input.Password placeholder="Enter new password" />
              </Form.Item>
            </>
          )}

          <Form.Item>
            <Button
              icon={<SaveOutlined />}
              // type="primary"
              htmlType="submit"
              className="!text-white !bg-amber-950"
            >
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserProfile;
