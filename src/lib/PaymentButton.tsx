"use client";

import { initiatePayment } from "@/app/Services/Paymentservice";
import { Button } from "antd";
// import { initiatePayment } from "@/app/Services/PaymentServices";
import { useState } from "react";

interface SurjoPayButtonProps {
  bookingId: string;
  label?: string;
  className?: string;
}

const SurjoPayButton: React.FC<SurjoPayButtonProps> = ({
  bookingId,
  label = "Pay Now",
  className = "",
}) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await initiatePayment(bookingId);
      if (res?.paymentUrl) {
        window.location.href = res.paymentUrl;
      }
    } catch (err) {
      console.error("Payment initiation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="primary"
      loading={loading}
      className={`mt-2 ${className}`}
      onClick={handlePayment}
    >
       {label}
    </Button>
  );
};

export default SurjoPayButton;
