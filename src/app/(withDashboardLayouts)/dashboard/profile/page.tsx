/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Upload,
  message,
  Avatar,
  Spin,
  Tooltip,
} from "antd";
import {
  EditOutlined,
  UploadOutlined,
  LockOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { getUserProfile, updateUserProfile } from "@/app/Services/Authservices";


const UserProfile = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await getUserProfile();
      console.log(res);
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

    if (fileList[0]) {
        formData.append("ProfileImage", fileList[0].originFileObj);
      }
      

    try {
      const res = await updateUserProfile(formData);
      console.log(res);
      if (res?.success) {
        message.success("Profile updated!");
        fetchProfile(); // refresh profile
        setEditMode(false);
        setShowPasswordFields(false);
        setFileList([]);
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
    <div className="max-w-xl mx-auto mt-10">
      <div className="text-center mb-6 relative">
        <div className="inline-block relative">
          <Avatar size={100} src={profile?.Profileimage} />
          {editMode && (
            <div className="absolute bottom-0 right-0">
              <Upload
                beforeUpload={() => false}
                fileList={fileList}
                onChange={({ fileList }) => setFileList(fileList)}
                showUploadList={false}
              >
                <Tooltip title="Change Image">
                  <Button
                    icon={<UploadOutlined />}
                    shape="circle"
                    size="small"
                  />
                </Tooltip>
              </Upload>
            </div>
          )}
        </div>
        <div className="flex justify-center items-center mt-2 gap-2">
          {!editMode ? (
            <h2 className="text-xl">{profile?.name}</h2>
          ) : (
            <Form form={form}>
              <Form.Item name="name" noStyle>
                <Input placeholder="Enter name" className="w-40" />
              </Form.Item>
            </Form>
          )}
          <Tooltip title="Edit Name & Image">
            <Button
              icon={<EditOutlined />}
              shape="circle"
              size="small"
              onClick={() => setEditMode(!editMode)}
            />
          </Tooltip>
        </div>
        <p className="text-sm text-gray-500 mt-1">{profile?.email}</p>
      </div>

      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        {editMode && (
          <>
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
                type="primary"
                htmlType="submit"
                className="bg-blue-600"
              >
                Save Changes
              </Button>
            </Form.Item>
          </>
        )}
      </Form>
    </div>
  );
};

export default UserProfile;
