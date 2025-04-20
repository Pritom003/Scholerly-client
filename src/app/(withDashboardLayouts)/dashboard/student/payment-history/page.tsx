/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import { getPaymentHistory } from "@/app/Services/Paymentservice";


const PaymentHistoryTable = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await getPaymentHistory();
      console.log(res);
      if (res?.data) {
        setPayments(res.data);
      }
    };
    fetchHistory();
  }, []);

  const columns = [
    {
      title: "Tutor",
      dataIndex: "tutor",
      key: "tutor",
      render: (tutor: any) => tutor?.name || "N/A",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Date",
      dataIndex: "bookingDate",
      key: "bookingDate",
      render: (text: string) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Amount (BDT)",
      dataIndex: ["transaction", "totalAmout"],
      key: "totalAmout",
    },
    {
      title: "Payment Method",
      dataIndex: ["transaction", "method"],
      key: "method",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <Tag color={status === "Paid" ? "green" : "red"}>{status}</Tag>,
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Payment History</h2>
      <Table
        columns={columns}
        dataSource={payments}
        rowKey={(record: { _id: string }) => record._id}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default PaymentHistoryTable;
