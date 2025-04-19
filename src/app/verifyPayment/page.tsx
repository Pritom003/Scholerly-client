"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Result, Spin } from "antd";
import { verifyPayment } from "../Services/Paymentservice";

const VerifyPaymentPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const bookingId = searchParams.get("order_id");
  const source = searchParams.get("source");
  console.log(bookingId,'hre');
  console.log(source);
  const [status, setStatus] = useState<"pending" | "success" | "failed">("pending");

  useEffect(() => {
    const verifyPaymentStatus = async () => {
      if (!bookingId) return setStatus("failed");
      console.log(bookingId);
  
      try {
        const data = await verifyPayment(bookingId); // ✅ Correct usage
        console.log("Verification result:", data);
        if (data?.success) {
          setStatus("success");
        } else {
          setStatus("failed");
          console.log();
        }
      } catch (error) {
        console.error("Verification error:", error);
        setStatus("failed");
      }
    };
  
    verifyPaymentStatus();
  }, [bookingId]);

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
