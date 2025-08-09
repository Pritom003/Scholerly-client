/* eslint-disable react/no-unescaped-entities */
"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Form } from "antd";
import { toast } from "sonner";
import InputField from "@/component/Shared/FormsharedFields/InpuField";
import { useRouter, useSearchParams } from "next/navigation";
import { getCurrentUser, loginUser } from "@/app/Services/Authservices";
import { useUser } from "@/context/useContext";
import Container from "../Shared/Container/Container";

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

        const currentUser = await getCurrentUser();
        setUser(currentUser);
        setIsLoading(false);

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
    <Container>
     <div className="">
  <div className="">
  <p className="text-center font-semibold text-gray-700">Quick Sign In</p>
  <p className="text-center text-sm text-gray-500 mb-2 italic px-4">
    (As a visitor, to save you from hassle — just click any button below to sign in as your preferred role. 
   .)
  </p>
  <div className="flex flex-wrap gap-2 justify-center">
    <Button
      onClick={() => {
        form.setFieldsValue({
          email: "admin@gmail.com",
          password: "123456",
        });
        form.submit();
      }}
      className="!text-[#724c05] !w-20 !border-[#513d19] w-full sm:w-auto
        hover:bg-[#f5e2c3] hover:shadow-md hover:shadow-[#724c05]"
    >
      Admin
    </Button>
    <Button
      onClick={() => {
        form.setFieldsValue({
          email: "sumaiya.haque@example.com",
          password: "123456789",
        });
        form.submit();
      }}
      className="!text-[#bd903e] !w-20 !border-[#533f19] w-full sm:w-auto
        hover:bg-[#fdf0d5] hover:shadow-md hover:shadow-[#bd903e]"
    >
      Tutor
    </Button>
    <Button
      onClick={() => {
        form.setFieldsValue({
          email: "student@gmail.com",
          password: "123456",
        });
        form.submit();
      }}
      className="!text-[#382d19] !w-20 !border-[#0e0b04] w-full sm:w-auto
        hover:bg-[#eee4d1] hover:shadow-md hover:shadow-[#382d19]"
    >
      Student
    </Button>
  </div>
    <p className="text-center text-sm mt-4 text-gray-500 mb-2 italic px-4">
    ( Or log in using your own account
   .)
  </p>
</div>


      <div className=" p-4 mt-10 max-w-sm w-full mx-auto rounded shadow-md bg-white">
        {/* Quick Sign-in Buttons */}
       

        {/* Actual Login Form */}
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

        <p className="text-center mt-4">
          Don't have an account? join as <br />
          <a
            href="/signUp/as-student"
            className="text-[#815606] border-2 px-2 border-dotted mx-2 text-xl"
          >
            student
          </a>{" "}
          or{" "}
          <a
            href="/signUp/as-tutor"
            className="text-[#815606] border-2 px-2 border-dotted mx-2 text-xl"
          >
            Tutor
          </a>
        </p>
      </div>
     </div>
    </Container>
  );
};

export default SignInForm;
