/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { Card, Modal, Pagination, Spin, Tooltip } from 'antd';
import { getAllBookings } from '@/app/Services/BookingServices';
import { EyeOutlined } from '@ant-design/icons'; // 👈 icon only action

const PAGE_SIZE = 6;
const AllBookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  // const [total, setTotal] = useState(0);
  // const pageSize = 6;
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      const data = await getAllBookings();
      console.log(data);
      if (data?.data) {
        setBookings(data.data);
      
      }
      setLoading(false);
    };
    fetchBookings();
  }, [currentPage]); // <-- make sure to include currentPage here
  

  const handleCardClick = (booking: any) => {
    setSelectedBooking(booking);
    setModalVisible(true);
  };  
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currntBookings = bookings.slice(startIndex, endIndex);
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-1">Bookings</h1>
      <p className="text-sm font-bold text-green-700 mb-4">
        Click the icon to view payment details
      </p>

      {loading ? (
        <div className="w-full flex justify-center items-center">
          <Spin size="large" />
        </div>
      ) : (
  <>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {currntBookings.map((booking: any) => (
            <Card
              key={booking._id}
              title={`Transaction: ${booking?.transaction?.transactionId || 'Not Paid'}`}
              className="shadow hover:shadow-lg transition duration-300"
              actions={[
                <Tooltip title="View Details" key="view">
                  <EyeOutlined
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => handleCardClick(booking)}
                  />
                </Tooltip>,
              ]}
            >
              <p><strong>Student:</strong> {booking.student?.name}</p>
              <p><strong>Tutor:</strong> {booking.tutor?.name}</p>
              <p><strong>Status:</strong> {booking.status}</p>
              <p><strong>Date:</strong> {new Date(booking.bookingDate).toLocaleString()}</p>
            </Card>
          ))}
        </div>         <div className="flex justify-center mt-6">
            <Pagination
                   current={currentPage}
                   pageSize={PAGE_SIZE}
                   total={bookings.length}
                   onChange={(page) => setCurrentPage(page)}
                   showSizeChanger={false}
                 />
          </div></>
        
      )}

      <Modal
        title="Transaction Details"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        centered
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
  );
};

export default AllBookingsList;
