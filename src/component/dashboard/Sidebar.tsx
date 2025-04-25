// components/layout/Sidebar.tsx
"use client";
import { Layout, Menu } from "antd";
import Link from "next/link";
import Image from "next/image";

import logoWith from "../../../public/logo-2withbg.png";
import { adminRoutes, studentRoutes, tutorRoutes } from "./sidebarRoutes";
import { useUser } from "@/context/useContext";
import dynamic from "next/dynamic";
// import LottieAnimation from "../Shared/animation/LottieAnimation";


const { Sider } = Layout;

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
    
  const LottieAnimation = dynamic
  (() => import("../Shared/animation/LottieAnimation"), {
    ssr: false,
  });
  const { user } = useUser();
// console.log(user);
  // Choose routes based on user role
  let routesToRender: Array<{ key: string; icon: React.ReactNode; href: string; label: string }> = [];
  if (user?.role === "tutor") {
    routesToRender = tutorRoutes;
  } else if (user?.role === "admin") {
    routesToRender = adminRoutes;
  } else if (user?.role === "student") {
    routesToRender = studentRoutes;
  }

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      collapsedWidth={50}
      className="!bg-[#815606] min-h-[100vh]"
    >
      <div className="py-[13px] text-center flex justify-center align-middle font-bold text-xl">
        <Image src={logoWith} alt="logoimg" height={50} width={50} />
      </div>
    <div>
    <Menu
  mode="inline"
  className="!bg-[#e7e4df] !text-white"
  defaultSelectedKeys={["dashboard"]}
  items={routesToRender.map((item) => ({
    key: item.key,
    icon: item.icon,
    label: <Link href={item.href}>{item.label}</Link>,
  }))}
/>
<LottieAnimation className={`${collapsed? "hide" :"flex"}`} name="studenmam"></LottieAnimation>
    </div>

    </Sider>
  );
};

export default Sidebar;
