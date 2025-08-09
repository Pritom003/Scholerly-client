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
  message,
} from "antd";
import {
  EditOutlined,
  LockOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { getUserProfile, updateUserProfile } from "@/app/Services/Authservices";
import ImageUploader from "@/lib/ImageUploaderField";
import { toast } from "sonner";
import ProfileBg from '../../../../../public/ProfileBg.jpg';
import Image from "next/image";
const UserProfile = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [file, setFile] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

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
      if (res?.success) {
        toast.success("Profile updated!");
        fetchProfile();
        setModalVisible(false);
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
    <div className="   mb-5 shadow-lg rounded-lg overflow-hidden">
      {/* Cover Photo */}
      <div className="relative h-56 bg-gray-300">
        <Image
          src={ProfileBg}
          alt="Cover"
          layout="fill"
          objectFit="cover"
        />

        {/* Profile Image */}
        <div className="absolute -bottom-16 left-6">
          <Avatar
            src={profile?.Profileimage}
            size={128}
            className="border-4 border-white shadow-md"
          />
        </div>
      </div>

      {/* Profile Content */}
      <div className="pt-20 px-6 pb-8 bg-amber-50">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold capitalize">{profile?.name}</h1>
            <p className="text-gray-500">{profile?.email}</p>
            <p className="text-gray-600 mt-1">Role: <span className="capitalize">{profile?.role || "User"}</span></p>
          </div>
          <Button
            icon={<EditOutlined />}
            onClick={() => setModalVisible(true)}
            className="!text-white !bg-amber-950"
          >
            Edit Profile
          </Button>
        </div>

        {/* Static Info (you can replace these with real fields later) */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div>
            <h3 className="font-semibold">Location</h3>
            <p>Dhaka, Bangladesh</p>
          </div>
          <div>
            <h3 className="font-semibold">Joined</h3>
            <p>January 2024</p>
          </div>
          <div>
            <h3 className="font-semibold">Education</h3>
            <p>BSc in Computer Science</p>
          </div>
          <div>
            <h3 className="font-semibold">Website</h3>
            <p>https://example.com</p>
          </div>
        </div>
      </div>

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
            <ImageUploader onFileSelect={(file) => setFile(file)} />
          </Form.Item>

          <div className="flex justify-between items-center mb-2">
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
