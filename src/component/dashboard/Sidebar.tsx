// components/layout/Sidebar.tsx
import { Layout, Menu } from "antd";
import Link from "next/link";
import Image from "next/image";

import logoWith from "../../../public/logo-2withbg.png";
import { adminRoutes, studentRoutes, tutorRoutes } from "./sidebarRoutes";
import { useUser } from "@/context/useContext";


const { Sider } = Layout;

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
  const { user } = useUser();

  // Choose routes based on user role
  let routesToRender = [];
  if (user?.role === "tutor") {
    routesToRender = tutorRoutes;
  } else if (user?.role === "admin") {
    routesToRender = adminRoutes;
  } else {
    routesToRender = studentRoutes;
  }

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      collapsedWidth={50}
      className="!bg-white min-h-[100vh]"
    >
      <div className="p-4 text-center font-bold text-xl">
        <Image src={logoWith} alt="logoimg" height={50} width={50} />
      </div>
      <Menu mode="inline" defaultSelectedKeys={["dashboard"]}>
        {routesToRender.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link href={item.href}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
