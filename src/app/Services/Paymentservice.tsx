/* eslint-disable @typescript-eslint/no-explicit-any */
import { getValidToken } from "@/lib/varifyToken";

const baseURL = "http://localhost:5000/api/v1";

// 🚀 Initiate SurjoPay Payment
export const initiatePayment = async (bookingId: string) => {
  try {
    const token = await getValidToken();

    const res = await fetch(`${baseURL}/payment/initiate/${bookingId}`, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    });

    return await res.json();
  } catch (error: any) {
    console.error("Error initiating payment:", error);
    return null;
  }
};

// ✅ Verify SurjoPay Payment
export const verifyPayment = async (bookingId: string) => {
  try {
    const token = await getValidToken();

    const res = await fetch(`${baseURL}/payment/verify/${bookingId}`, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    });

    return await res.json();
  } catch (error: any) {
    console.error("Error verifying payment:", error);
    return null;
  }
};
export const getPaymentHistory = async () => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${baseURL}/payment-history`, {
      headers: {
        Authorization: `${token}`,
      },
    });

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch payment history", error);
    return null;
  }
};
