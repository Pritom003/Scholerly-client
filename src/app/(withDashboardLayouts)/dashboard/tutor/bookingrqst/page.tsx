/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from 'react';
import { Button, Spin, message, Table, Drawer } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { getTutorBookings, updateBookingStatus } from '@/app/Services/BookingServices';
import { useUser } from '@/context/useContext';

const AlltheBookingRequest = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const { user } = useUser();

  const fetchBookings = async () => {
    if (user && user.id) {
      try {
        setLoading(true);
        const result = await getTutorBookings(user.id);
        console.log(result);
        if (result?.data) {
          const pendingBookings = result.data.filter(
            (booking: any) => booking.status === 'pending'
          );
          setBookings(pendingBookings);
        }
      } catch (error) {
        console.error("Error fetching student bookings", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const handleStatusChange = async (id: string, status: 'accepted' | 'rejected') => {
    const res = await updateBookingStatus(id, status);
    console.log(res);
    if (res?.success) {
      message.success(`Booking ${status}`);
      fetchBookings();
    } else {
      message.error('Failed to update booking status');
    }
  };

  const columns = [
    {
      title: 'Student',
      dataIndex: ['student', 'email'],
      key: 'student',
      render: (email: string) => email || 'Student',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Date',
      dataIndex: 'updatedAt',
      key: 'date',
      render: (updatedAt: string) => {
        return new Date(updatedAt).toLocaleDateString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
      },
    },
    {
      title: 'Time',
      dataIndex: 'updatedAt',
      key: 'time',
      render: (updatedAt: string) => {
        return new Date(updatedAt).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        });
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, booking: any) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            onClick={() => handleStatusChange(booking._id, 'accepted')}
          >
            Accept
          </Button>
          <Button
            danger
            onClick={() => handleStatusChange(booking._id, 'rejected')}
          >
            Reject
          </Button>
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleDrawerOpen(booking)}
          >
            View
          </Button>
        </div>
      ),
    },
  ];

  const handleDrawerOpen = (booking: any) => {
    setSelectedBooking(booking);
    setDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setDrawerVisible(false);
    setSelectedBooking(null);
  };

  if (loading) return <Spin size="large" className="flex justify-center mt-10" />;

  return (
    <div className="p-4">
      {bookings.length === 0 && (
        <p className="text-center text-gray-500">No pending bookings found.</p>
      )}

      <Table
        dataSource={bookings}
        columns={columns}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 5 }}
        className="table-responsive"
        scroll={{ x: 'max-content' }}
      />

      {/* Drawer to show booking details */}
      <Drawer
        title="Booking Details"
        visible={drawerVisible}
        onClose={handleDrawerClose}
        width="100%"
        className="drawer-responsive"
        bodyStyle={{ padding: '16px 24px' }}
      >
        {selectedBooking && (
          <div>
            <p><strong>Student:</strong> {selectedBooking?.student?.email}</p>
            <p><strong>Subject:</strong> {selectedBooking.subject}</p>
            <p><strong>Date:</strong> {new Date(selectedBooking.updatedAt).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {new Date(selectedBooking.updatedAt).toLocaleTimeString()}</p>
            <p><strong>Status:</strong> {selectedBooking.status}</p>
            <p><strong>Notes:</strong> {selectedBooking.notes || 'No notes available'}</p>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default AlltheBookingRequest;
