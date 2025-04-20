/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { Card, Modal, Spin } from 'antd';
import { getAllBookings } from '@/app/Services/BookingServices';


const AllBookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      const data = await getAllBookings();
      console.log(data);
      if (data?.data) setBookings(data.data);
      setLoading(false);
    };
    fetchBookings();
  }, []);

  const handleCardClick = (booking: any) => {
    setSelectedBooking(booking);
    setModalVisible(true);
  };

  return (
<div>
    <h1>Bookings</h1>
    <p className='text-sm font-bold text-green-700'> click on the card to  know the payment details</p>
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      
      {loading ? (
        <div className="w-full flex justify-center items-center">
          <Spin size="large" />
        </div>
      ) : (
        bookings.map((booking: any) => (
          <Card
            key={booking._id}
            title={`transictionID: ${booking?.transaction?.transactionId || 'no payment has made'}`}
            className="shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => handleCardClick(booking)}
          >
            <p><strong>Student:</strong> {booking.student?.name}</p>
            <p><strong>Tutor:</strong> {booking.tutor?.name}</p>
            <p><strong>Status:</strong> {booking.status}</p>
            <p><strong>Date:</strong> {new Date(booking.bookingDate).toLocaleString()}</p>
          </Card>
        ))
        
      )}

      <Modal
        title="Transaction Details"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        {selectedBooking?.transaction ? (
          <div className="space-y-2">
            <p><strong>Transaction ID:</strong> {selectedBooking.transaction.transactionId}</p>
            <p><strong>Status:</strong> {selectedBooking.transaction.transactionStatus}</p>
            <p><strong>Bank Status:</strong> {selectedBooking.transaction.bank_status}</p>
            <p><strong>SP Code:</strong> {selectedBooking.transaction.sp_code}</p>
            <p><strong>SP Message:</strong> {selectedBooking.transaction.sp_message}</p>
            <p><strong>Method:</strong> {selectedBooking.transaction.method}</p>
            <p><strong>Date Time:</strong> {selectedBooking.transaction.date_time}</p>
            <p><strong>Total Amount:</strong> ৳ {selectedBooking.transaction.totalAmout}</p>
          </div>
        ) : (
          <p>No transaction details available.</p>
        )}
      </Modal>
    </div>
</div>
  );
};

export default AllBookingsList;
