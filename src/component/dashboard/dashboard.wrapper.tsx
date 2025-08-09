// components/dashboard/DashboardWrapper.tsx
"use client";

import React, { useState } from "react";
import { Layout } from "antd";
// import { Sidebar } from "lucide-react";
import HeaderBar from "./HeaderBar";
import Sidebar from "./Sidebar";


const { Content } = Layout;

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout className="min-h-screen">
      {/* Replace Sidebar with a custom implementation or remove the collapsed prop */}
      <Sidebar collapsed={collapsed} />
      <Layout>
        <HeaderBar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content
  className=" min-h-[100vh] bg-cover bg-center"
  style={{
    backgroundImage: "url('/dashbg-2.jpg')", // path relative to public/
  }}
>
  {children}
</Content>

      </Layout>
    </Layout>
  );
};

export default DashboardWrapper;
