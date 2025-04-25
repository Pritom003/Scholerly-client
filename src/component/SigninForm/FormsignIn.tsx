/* eslint-disable react/no-unescaped-entities */
"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Form } from "antd";
import { toast } from "sonner";
import InputField from "@/component/Shared/FormsharedFields/InpuField";
// import { loginUser } from "../Services/Authservices";
import { useRouter, useSearchParams } from "next/navigation";
import { getCurrentUser, loginUser } from "@/app/Services/Authservices";
import { useUser } from "@/context/useContext";
import Container from "../Shared/Container/Container";

 // adjust path accordingly

const SignInForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();
  const { setUser, setIsLoading } = useUser();
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const result = await loginUser(values);
  
      if (result?.data?.accessToken) {
        toast.success("Logged in successfully!");
  
        // Fetch the latest user and update context
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        setIsLoading(false);  // triggers re-render
  
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
  
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
<div>
  <Container>
    <div>
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-md">

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
            className="!bg-[#2d210a] !text-white  !font-bold"
            htmlType="submit"
            block
            loading={loading}
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
      <p className="text-center mt-4">Don't have an account? join as <br /> 
         <a href="/signUp/as-student"
          className="text-[#815606] border-2 px-2 border-dotted mx-2 text-xl"> student</a> or 
         <a href="/signUp/as-tutor" 
         className="text-[#815606] border-2 px-2 border-dotted mx-2 text-xl
         "> Tutor</a> 
         
         </p>
    </div>
    </div>
  </Container>
</div>
  );
};

export default SignInForm;
