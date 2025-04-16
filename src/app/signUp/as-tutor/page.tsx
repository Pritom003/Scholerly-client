"use client";
import { toast } from "sonner";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs, Form, Button } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import { registerUserWithFormData } from "@/app/Services/Authservices";
import ProfileSection from "@/component/TutoRegisterForm/ProfileSection";
import EducationSection from "@/component/TutoRegisterForm/EducationSection";
import ExpectationSection from "@/component/TutoRegisterForm/ExpectationSection";

const SignUpAsTutor = () => {
  const [form] = Form.useForm();
  const [file, setFile] = useState<any>(null);
  const [currentTab, setCurrentTab] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

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

    const result = await registerUserWithFormData(formData);
    setIsSubmitting(false);

    if (result?.data?.accessToken) {
      toast.success("Tutor registered successfully!");
      form.resetFields();
      setCurrentTab("1");
      setIsFormValid(false);
    } else {
      toast.error("Registration failed. Please check your input or try again.");
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
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Register as a Tutor</h2>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        onValuesChange={handleFormChange}
      >
        <Tabs
          activeKey={currentTab}
          onChange={(key) => setCurrentTab(key)}
          type="card"
          className="mb-4"
          items={tabItems}
        />
        <Form.Item>
          <Button
            type="primary"
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
  );
};

export default SignUpAsTutor;
