// constants/sidebarRoutes.ts
import {
    BookOutlined,
    UserOutlined,

 
    DollarOutlined,
    CheckCircleOutlined,
  } from "@ant-design/icons";
import { GroupIcon } from "lucide-react";
  
  export const tutorRoutes = [

    {
      key: "tutor-profile",
      label: "Profile",
      icon: <UserOutlined />,
      href: "/dashboard/profile",
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
    // {
    //   key: "admin-stats",
    //   label: "Statistics",
    //   icon: <BarChartOutlined />,
    //   href: "/dashboard/admin/stats",
    // },
    // {
    //   key: "admin-payments",
    //   label: "Payment History",
    //   icon: <DollarOutlined />,
    //   href: "/dashboard/admin/payment-history",
    // },
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
  