"use client";
import { toast } from "sonner";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs, Form, Button } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import { getCurrentUser, registerUserWithFormData } from "@/app/Services/Authservices";
import ProfileSection from "@/component/TutoRegisterForm/ProfileSection";
import EducationSection from "@/component/TutoRegisterForm/EducationSection";
import ExpectationSection from "@/component/TutoRegisterForm/ExpectationSection";

import { useRouter } from "next/navigation";
import LottieAnimation from "@/component/Shared/animation/LottieAnimation";
import Container from "@/component/Shared/Container/Container";
import SectionTitle from "@/component/Shared/SectionTitle";
import { useUser } from "@/context/useContext";

const SignUpAsTutor = () => {
  const [form] = Form.useForm();
  const [file, setFile] = useState<any>(null);
  const [currentTab, setCurrentTab] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const { setUser, setIsLoading } = useUser();
  const router = useRouter();
 const onFinish = async (values: any) => {
  setIsSubmitting(true);

  const formData = new FormData();
  const formattedAvailability = (values.availability || []).map((slot: any) => ({
    day: slot.day,
    from: dayjs(slot.from).format("HH:mm"),
    to: dayjs(slot.to).format("HH:mm"),
  }));

  const userData = {
    name: values.name,
    email: values.email,
    password: values.password,
    role: "tutor",
    phone: values.phone,
    bio: values.bio,
    subjects: values.subjects,
    hourlyRate: Number(values.hourlyRate),
    qualifications: values.qualifications || [],
    availability: formattedAvailability,
    location: values.location,
  };

  formData.append("formdata", JSON.stringify(userData));
  if (file) {
    formData.append("ProfileImage", file);
  }

  try {
    const result = await registerUserWithFormData(formData);
    setIsSubmitting(false);

    if (result?.data?.accessToken) {
      toast.success("Tutor registered successfully!");
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setIsLoading(false);
      form.resetFields();
      setCurrentTab("1");
      setIsFormValid(false);
      router.push("/");
    } else if(result?.success === false) {
      console.log(result);
      toast.error(result?.message || "Registration failed. Please check your input or try again.");
    }
  } catch (error) {
    console.log(error);
    setIsSubmitting(false);
    const errorMessage = (error as any)?.response?.data?.message || "An unexpected error occurred. Please try again later.";
    toast.error(errorMessage);
  }
};


  const handleFormChange = async () => {
    try {
      await form.validateFields();
      setIsFormValid(true);
    } catch {
      setIsFormValid(false);
    }
  };

  const tabItems = [
    {
      key: "1",
      label: "Profile",
      children: <ProfileSection form={form} setFile={setFile} />,
    },
    {
      key: "2",
      label: "Education",
      children: <EducationSection form={form} />,
    },
    {
      key: "3",
      label: "Expectation",
      children: <ExpectationSection form={form} />,
    },
  ];

  return (
    <div className="bg-[#E3E3E5] ">
<Container>
<div className="grid lg:grid-cols-4 justify-between  py-16
align-middle items-center gap-20 ">
       <div>
        <LottieAnimation name="teacher"></LottieAnimation>
       </div>
        <div className="lg:col-span-3 ">
     <SectionTitle text="Register As Tutor"
      description="Complete all the fields with valued info"></SectionTitle>
    <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        onValuesChange={handleFormChange}
        className="max-w-[400px]"
      >
       <Tabs
  activeKey={currentTab}
  onChange={(key) => setCurrentTab(key)}
  type="card"
  className=""
  items={tabItems}
/>

        <Form.Item>
          <Button
          className="!bg-[#2d210a] !text-white  !font-bold"
            htmlType="submit"
            block
            loading={isSubmitting}
            disabled={!isFormValid}
          >
            Submit Registration
          </Button>
        </Form.Item>
      </Form>
      
    </div>
    
    </div>
</Container>
    </div>

  );
};

export default SignUpAsTutor;
