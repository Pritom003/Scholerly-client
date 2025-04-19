"use client"; // this one **can optionally be client** if needed for dropdowns or user

import { Layout, Avatar, Dropdown, Badge } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined, BellOutlined } from "@ant-design/icons";
import { useUser } from "@/context/useContext";

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
    <Header className=" !bg-white flex justify-between items-center px-4 shadow-sm">
      <div onClick={() => setCollapsed(!collapsed)} className="cursor-pointer text-xl">
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      <div className="flex items-center gap-4">
        <Badge count={3}>
          <BellOutlined className="text-xl cursor-pointer" />
        </Badge>
        <Dropdown
          menu={{
            items: [
              { key: "1", label: <span>{user?.role}</span> },
              { key: "2", label: <span>Logout</span> },
            ],
          }}
          placement="bottomRight"
        >
          <Avatar className="cursor-pointer bg-blue-500" size="large">
            {user?.email?.charAt(0).toUpperCase() || "U"}
            
          </Avatar>
        </Dropdown>
      </div>
    </Header>
  );
};

export default HeaderBar;
