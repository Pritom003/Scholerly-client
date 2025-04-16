"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Form } from "antd";
import { toast } from "sonner";
import InputField from "@/component/Shared/FormsharedFields/InpuField";
import { loginUser } from "../Services/Authservices";
 // adjust path accordingly

const SignInForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const { result } = await loginUser(values);

      if ( result?.data?.accessToken) {
        toast.success("Logged in successfully!");
        console.log("Token:", result.accessToken);
        // You could store token here:
        // localStorage.setItem("token", result.accessToken);
        form.resetFields();
      } else {
        toast.error(result?.message || "Login failed. Check your credentials.");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <InputField
          name="email"
          label="Email"
          required
          type="email"
          placeholder="Enter your email"
        />
        <InputField
          name="password"
          label="Password"
          required
          password
          placeholder="Enter your password"
        />

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignInForm;
