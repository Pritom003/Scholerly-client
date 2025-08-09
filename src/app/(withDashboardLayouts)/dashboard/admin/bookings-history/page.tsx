/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { Table, Drawer, Spin, Pagination } from 'antd';
import { getAllBookings } from '@/app/Services/BookingServices';

const PAGE_SIZE = 6;

const AllBookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      const data = await getAllBookings();
      if (data?.data) {
        setBookings(data.data);
      }
      setLoading(false);
    };
    fetchBookings();
  }, [currentPage]);

  const handleRowClick = (record: any) => {
    setSelectedBooking(record);
    setDrawerVisible(true);
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentBookings = bookings.slice(startIndex, endIndex);

  const columns = [
    {
      title: 'Transaction',
      dataIndex: ['transaction', 'transactionId'],
      key: 'transactionId',
      render: (text: string) => text || 'Not Paid',
    },
    {
      title: 'Student',
      dataIndex: ['student', 'name'],
      key: 'studentName',
    },
    {
      title: 'Tutor',
      dataIndex: ['tutor', 'name'],
      key: 'tutorName',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
   
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-2">All Bookings</h1>
      <p className="text-sm font-medium text-green-700 mb-4">
        Click on a row to view transaction details.
      </p>

      {loading ? (
        <div className="w-full flex justify-center items-center min-h-[200px]">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="overflow-x-auto max-w-xl mx-auto">
            <Table
              columns={columns}
              dataSource={currentBookings}
              rowKey="_id"
              pagination={false}
              onRow={(record) => ({
                onClick: () => handleRowClick(record),
              })}
              className="custom-booking-table w-full"
              bordered
            />
          </div>

          <div className="flex justify-center mt-6">
            <Pagination
              current={currentPage}
              pageSize={PAGE_SIZE}
              total={bookings.length}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
            />
          </div>
        </>
      )}

      <Drawer
        title="Transaction Details"
        placement="right"
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        width={360}
        className="p-4 !bg-amber-100 !min-w-[300px]"
      >
        {selectedBooking?.transaction ? (
          <div className="space-y-2 text-sm">
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
      </Drawer>

      {/* Tailwind-enhanced styles */}
      <style jsx global>{`
        .custom-booking-table .ant-table-thead > tr > th {
          background-color: #5c4033; /* Deep brown */
          color: white;
        }

        .custom-booking-table .ant-table-tbody > tr:hover > td {
          background-color: #baa49a; /* Light brown on hover */
          transition: background-color 0.3s ease;
        }

        .custom-booking-table .ant-table-cell {
          transition: background-color 0.2s ease;
        }
      `}</style>
    </div>
  );
};

export default AllBookingsList;
