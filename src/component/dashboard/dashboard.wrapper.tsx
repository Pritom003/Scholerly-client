// components/dashboard/DashboardWrapper.tsx
"use client";

import React, { useState } from "react";
import { Layout } from "antd";
// import { Sidebar } from "lucide-react";
import HeaderBar from "./HeaderBar";
import Sidebar from "./Sidebar";


const { Content } = Layout;

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="min-h-screen">
      {/* Replace Sidebar with a custom implementation or remove the collapsed prop */}
      <Sidebar collapsed={collapsed} />
      <Layout>
        <HeaderBar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content className="p-4 bg-gray-100 min-h-[100vh]">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default DashboardWrapper;
