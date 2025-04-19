// constants/sidebarRoutes.ts
import {
    BookOutlined,
    UserOutlined,
    HomeOutlined,
    BarChartOutlined,
    DollarOutlined,
    CheckCircleOutlined,
  } from "@ant-design/icons";
  
  export const tutorRoutes = [
    {
      key: "tutor-dashboard",
      label: "Dashboard",
      icon: <HomeOutlined />,
      href: "/dashboard/tutor",
    },
    {
      key: "tutor-profile",
      label: "Profile",
      icon: <UserOutlined />,
      href: "/dashboard/tutor/profile",
    },
    {
      key: "tutor-bookings",
      label: "Booking Requests",
      icon: <BookOutlined />,
      href: "/dashboard/tutor/bookingrqst",
    },
  ];
  
  export const studentRoutes = [
    {
      key: "student-dashboard",
      label: "Dashboard",
      icon: <HomeOutlined />,
      href: "/dashboard/student",
    },
    {
      key: "student-profile",
      label: "Profile",
      icon: <UserOutlined />,
      href: "/dashboard/student/profile",
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
      href: "/dashboard/payment-history",
    },
  ];
  
  export const adminRoutes = [
    {
      key: "admin-dashboard",
      label: "Dashboard",
      icon: <HomeOutlined />,
      href: "/dashboard/admin",
    },
    {
      key: "admin-profile",
      label: "Profile",
      icon: <UserOutlined />,
      href: "/dashboard/admin/profile",
    },
    {
      key: "admin-stats",
      label: "Statistics",
      icon: <BarChartOutlined />,
      href: "/dashboard/admin/stats",
    },
    {
      key: "admin-payments",
      label: "Payment History",
      icon: <DollarOutlined />,
      href: "/dashboard/admin/payment-history",
    },
    {
      key: "admin-bookings",
      label: "Bookings",
      icon: <BookOutlined />,
      href: "/dashboard/admin/bookings",
    },
    {
      key: "admin-approve-tutor",
      label: "Approve Tutors",
      icon: <CheckCircleOutlined />,
      href: "/dashboard/admin/aprove-tutor",
    },
  ];
  