/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { registerUserWithFormData } from "@/app/Services/Authservices";
// import { registerUserWithFormData } from "../Services/Authservices";
// import { registerUserWithFormData } from "@/services/register";

const RegisterAsStudent = () => {
  const [form] = Form.useForm();
  const [file, setFile] = useState<any>(null);

  const onFinish = async (values: any) => {
    const formData = new FormData();
  
    // Combine the entire payload in a single object
    const userData = {
      name: values.name,
      email: values.email,
      password: values.password,
      role: "student",
    };
  
    // Append it under a field called `formdata`
    formData.append("formdata", JSON.stringify(userData));
  
    // Append image file
    if (file) {
      formData.append("ProfileImage", file);
    }
  
    const result = await registerUserWithFormData(formData);
  
    if (result?.accessToken) {
      message.success("Student registered successfully!");
      form.resetFields();
    } else {
      message.error("Registration failed.");
    }
  };
  
  

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Register as Student</h2>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        
        <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item label="Profile Image">
          <Upload
            beforeUpload={(file) => {
              setFile(file);
              return false;
            }}
            showUploadList={{ showRemoveIcon: true }}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterAsStudent;
