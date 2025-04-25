"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Result, Spin } from "antd";
import { verifyPayment } from "../Services/Paymentservice";

const VerifyPaymentPage = () => {
  const router = useRouter();
  const [status, setStatus] = useState<"pending" | "success" | "failed">("pending");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const bookingId = params.get("order_id");

    const verify = async () => {
      if (!bookingId) return setStatus("failed");

      try {
        const result = await verifyPayment(bookingId);
        setStatus(result?.success ? "success" : "failed");
      } catch {
        setStatus("failed");
      }
    };

    verify();
  }, []);

  if (status === "pending") {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin tip="Verifying payment..." />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Result
        status={status === "success" ? "success" : "error"}
        title={status === "success" ? "Payment Successful" : "Payment Failed"}
        subTitle={
          status === "success"
            ? "Your booking has been confirmed. Thank you!"
            : "Something went wrong with the payment."
        }
        extra={
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => router.push("/dashboard/student/booking")}
          >
            Back to Bookings
          </button>
        }
      />
    </div>
  );
};

export default VerifyPaymentPage;
