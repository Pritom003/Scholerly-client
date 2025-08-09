// constants/sidebarRoutes.ts
import {
    BookOutlined,
    UserOutlined,

 
    DollarOutlined,
    CheckCircleOutlined,
    BarChartOutlined,
  } from "@ant-design/icons";
import { GroupIcon, List, PenIcon } from "lucide-react";
  
  export const tutorRoutes = [

    {
      key: "tutor-profile",
      label: "Profile",
      icon: <UserOutlined />,
      href: "/dashboard/profile",
    },
    {
      key: "BlogList",
      label: "My Blogs",
      icon: <List />,
      href: "/dashboard/tutor/blogs-list",
    },
    {
      key: "tutor-bookings",
      label: "Booking Requests",
      icon: <BookOutlined />,
      href: "/dashboard/tutor/bookingrqst",
    },
    {
      key: "tut-bookings",
      label: "Booking History",
      icon:  <DollarOutlined />,
      href: "/dashboard/tutor/booking-history",
    },
  ];
  
  export const studentRoutes = [

    {
      key: "student-profile",
      label: "Profile",
      icon: <UserOutlined />,
      href: "/dashboard/profile",
    },
    {
      key: "student-bookings",
      label: "Bookings",
      icon: <BookOutlined />,
      href: "/dashboard/student/booking",
    },
    {
      key: "student-payments",
      label: "Payment History",
      icon: <DollarOutlined />,
      href: "/dashboard/student/payment-history",
    },
  ];
  
  export const adminRoutes = [

    {
      key: "admin-profile",
      label: "Profile",
      icon: <UserOutlined />,
      href: "/dashboard/profile",
    },
    {
      key: "admin-stats",
      label: "Statistics",
      icon: <BarChartOutlined/>,
      href: "/dashboard/admin/dashboard-stats",
    },
    {
      key: "admin-blogs",
      label: "Blogs request",
      icon: <PenIcon />,
      href: "/dashboard/admin/blog-list-table",
    },
    {
      key: "admin-bookings",
      label: "Bookings",
      icon: <BookOutlined />,
      href: "/dashboard/admin/bookings-history",
    },
    {
      key: "admin-approve-tutor",
      label: "Approve Tutors",
      icon: <CheckCircleOutlined />,
      href: "/dashboard/admin/tutor-request",
    },
    {
      key: "All-users",
      label: "All Users",
      icon: <GroupIcon/>,
      href: "/dashboard/admin/all-users-list",
    },
  ];
  