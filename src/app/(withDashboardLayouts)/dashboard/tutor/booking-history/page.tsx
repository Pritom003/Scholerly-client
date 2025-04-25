/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { Table, Drawer, Typography, Spin, Tag } from "antd";
import { getTutorBookings } from "@/app/Services/BookingServices";
import { useUser } from "@/context/useContext";

const { Title, Text } = Typography;

const BookingHistoryTable = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const fetchBookings = async () => {
      if (user?.id) {
        const res = await getTutorBookings(user.id);
        if (res?.data) {
          setBookings(res.data);
        }
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user]);

  const columns = [
    {
      title: "Title",
      dataIndex: "subject",
      key: "subject",
      render: (text: string, record: any) => (
        <a onClick={() => openDrawer(record)} className="text-blue-600 hover:underline">
          {text}
        </a>
      ),
    },
    {
      title: "Student",
      dataIndex: ["student", "name"],
      key: "student",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color = status === "confirmed" ? "green" : status === "rejected" ? "red" : "orange";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Booked At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date: string) => new Date(date).toLocaleString(),
    },
  ];

  const openDrawer = (booking: any) => {
    setSelectedBooking(booking);
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
    setSelectedBooking(null);
  };

  if (loading) return <Spin size="large" />;

  return (
    <div>
      <Title level={3}>My Booking History</Title>
      <Table
        dataSource={bookings}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 6 }}
      />

      <Drawer
        title="Booking Details"
        placement="right"
        onClose={closeDrawer}
        open={drawerVisible}
        width={400}
      >
        {selectedBooking && (
          <div className="space-y-2">
            <Text strong>Subject:</Text>
            <p>{selectedBooking.subject}</p>

            <Text strong>Student:</Text>
            <p>{selectedBooking.student?.name || "N/A"}</p>

            <Text strong>Email:</Text>
            <p>{selectedBooking.student?.email || "N/A"}</p>

            <Text strong>Date & Time:</Text>
            <p>{selectedBooking.date} at {selectedBooking.time}</p>

            <Text strong>Status:</Text>
            <Tag color={selectedBooking.status === "confirmed" ? "green" : selectedBooking.status === "rejected" ? "red" : "orange"}>
              {selectedBooking.status.toUpperCase()}
            </Tag>

            <Text strong>Booked At:</Text>
            <p>{new Date(selectedBooking.updatedAt).toLocaleString()}</p>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default BookingHistoryTable;
