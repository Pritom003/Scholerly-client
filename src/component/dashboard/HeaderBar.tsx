"use client"; // this one **can optionally be client** if needed for dropdowns or user

import { Layout, Dropdown } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined} from "@ant-design/icons";
import { useUser } from "@/context/useContext";
import NotificationBell from "../Notification/NotificationBell";
import { Home } from "lucide-react";
import Link from "next/link";

const { Header } = Layout;

const HeaderBar = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}) => {
  const { user } = useUser();

  return (
    <Header className=" !bg-[#e7e4df] flex justify-between items-center px-4 shadow-sm">
      <div onClick={() => setCollapsed(!collapsed)} className="cursor-pointer text-xl">
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      <div className="flex items-center gap-4">
       <Link href="/" className="text-black"> <Home className="text-black"></Home></Link>
   <NotificationBell></NotificationBell>
        <Dropdown
          menu={{
            items: [
              { key: "1", label: <span>{user?.role}</span> },
              { key: "2", label: <span>Logout</span> },
            ],
          }}
          placement="bottomRight"
        >
          
        </Dropdown>
      </div>
    </Header>
  );
};

export default HeaderBar;
