"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Button, Card, Spin, message } from 'antd';
import { getTutorBookings, updateBookingStatus } from '@/app/Services/BookingServices';
import { useUser } from '@/context/useContext';

const AlltheBookingRequest = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
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

  if (loading) return <Spin size="large" className="flex justify-center mt-10" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {bookings.length === 0 && (
        <p className="text-center col-span-2 text-gray-500">No pending bookings found.</p>
      )}
      {bookings.map((booking) => (
        <Card key={booking._id} 
        title={booking?.student?.email || 'Student'} 
        className="rounded-xl shadow">
          <p><strong>Subject:</strong> {booking.subject}</p>
          <p>
  <strong>Date:</strong>{' '}
  {new Date(booking.updatedAt).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })}
</p>
<p>
  <strong>Time:</strong>{' '}
  {new Date(booking.updatedAt).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })}
</p>

          <div className="flex gap-2 mt-3">
            <Button type="primary" onClick={() => handleStatusChange(booking._id, 'accepted')}>
              Accept
            </Button>
            <Button danger onClick={() => handleStatusChange(booking._id, 'rejected')}>
              Reject
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AlltheBookingRequest;
