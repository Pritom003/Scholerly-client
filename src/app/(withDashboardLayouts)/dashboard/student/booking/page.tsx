/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Spin, Card, Tag, Empty,  Tooltip } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { useUser } from "@/context/useContext";
import { getStudentBookings } from "@/app/Services/BookingServices";
import SurjoPayButton from "@/lib/PaymentButton";

const BookingsForStudent = () => {
  const { user, isLoading: userLoading } = useUser();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (user && user.id) {
        try {
          const res = await getStudentBookings(user.id);
          setBookings(res?.data || []);
        } catch (error) {
          console.error("Error fetching student bookings", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBookings();
  }, [user]);

  if (userLoading || loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (!bookings.length) {
    return <Empty description="No bookings found." className="mt-12" />;
  }

  return (
    <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      {bookings.map((booking) => (
        <Card
          key={booking._id}
          title={
            <div className="flex justify-between items-center">
              <span>Tutor: {booking.tutor?.name || "Unknown"}</span>
              <Tooltip title="Details">
                <FileTextOutlined style={{ fontSize: "18px" }} />
              </Tooltip>
            </div>
          }
          bordered
        >
          <p>
            <strong>Subject:</strong> {booking.subject}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(booking.bookingDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Rate:</strong> ${booking.ValuPerHour}/hr
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <Tag
              color={
                booking.status === "accepted"
                  ? "green"
                  : booking.status === "canceled"
                  ? "red"
                  : booking.status === "Paid"
                  ? "blue"
                  : "orange"
              }
            >
              {booking.status}
            </Tag>
          </p>

          {booking.status === "accepted" && (
           <SurjoPayButton label="Pay Now" bookingId={`${booking._id}`}>

           </SurjoPayButton>
          )}
        </Card>
      ))}
    </div>
  );
};

export default BookingsForStudent;
