/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Form, Input, Button,  message } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { getCurrentUser, registerUserWithFormData } from "@/app/Services/Authservices";
import { toast } from "sonner";
import { useRouter} from "next/navigation";
import SectionTitle from "@/component/Shared/SectionTitle";
import ImageUploader from "@/lib/ImageUploaderField";
import { useUser } from "@/context/useContext";

const RegisterAsStudent = () => {
  const [form] = Form.useForm();
  const [file, setFile] = useState<any>(null);
  // const searchParams = useSearchParams();
  // const redirect = searchParams.get("redirectPath");
  const router = useRouter();
 const { setUser, setIsLoading } = useUser();
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
  
    if (result?.data?.accessToken) {
      message.success("Student registered successfully!");
      toast.success("Student registered successfully!");
 
         const currentUser = await getCurrentUser();
            setUser(currentUser);
            setIsLoading(false);
        router.push("/");  // Default redirect path
      
  
      form.resetFields();  // Reset form after submission
    } else {
      message.error("Registration failed.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <SectionTitle
       text="Register As Student" 
       description="Join us to get the best tutor" 
     />
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
  <ImageUploader
    onFileSelect={(file) => setFile(file)}
  />
</Form.Item>
        <Form.Item>
          <Button  className="!bg-[#2d210a] !text-white  !font-bold" htmlType="submit" block>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterAsStudent;
