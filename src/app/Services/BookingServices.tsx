import { getValidToken } from "@/lib/varifyToken";

/* eslint-disable @typescript-eslint/no-explicit-any */
const baseURL = `${process.env.NEXT_PUBLIC_BASE_API}/api/v1`;

// Create a new booking
export const createBooking = async (payload: any) => {
  try {
    const token =await getValidToken()
    const res = await fetch(`${baseURL}/book-tutor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: ` ${token}`,
      },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (error: any) {
    console.error("Error creating booking:", error);
    return null;
  }
};

// Get a booking by ID
export const getBookingById = async (id: string) => {
  try {
    const token =await getValidToken()
    const res = await fetch(`${baseURL}/${id}`, {
      method: "GET",
      headers: {
        Authorization: ` ${token}`,
      },
    });
    return await res.json();
  } catch (error: any) {
    console.error("Error fetching booking:", error);
    return null;
  }
};

// Update booking status (e.g., Confirmed, Cancelled)
export const updateBookingStatus = async (
  id: string,
  status: string,

) => {
  try {
    const token =await getValidToken()
    const res = await fetch(`${baseURL}/status/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: ` ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    return await res.json();
  } catch (error: any) {
    console.error("Error updating booking status:", error);
    return null;
  }
};

// Update booking after payment success
export const updateBookingPayment = async (
  id: string,
  paymentData: any,

) => {
  try {
    const token =await getValidToken()
    const res = await fetch(`${baseURL}/payment/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: ` ${token}`,
      },
      body: JSON.stringify(paymentData),
    });
    return await res.json();
  } catch (error: any) {
    console.error("Error updating payment info:", error);
    return null;
  }
};


 // Adjust based on your actual location

 export const getAllBookings = async () => {
  try {
    const token = await getValidToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/v1/all`, {
      method: 'GET',
      headers: {
        Authorization: `${token}`,
      },
      cache: 'no-store',
    });
    return await res.json();
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    return null;
  }
};


// Get all bookings for a student
export const getStudentBookings = async (studentId: string) => {

  try {
    const token =await getValidToken()
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/v1/student/${studentId}`, {
     
      method: "GET",
      headers: {
        
        Authorization: `${token}`,
      },
      cache: "no-store",
    });
    // console.log(token ,'token');
    return await res.json();
  } catch (error: any) {
    console.error("Error fetching student bookings:", error);
    return null;
  }
};


// Get all bookings for a tutor
export const getTutorBookings = async (tutorId: string) => {
  try {
    const token =await getValidToken()
    const res = await fetch(`${baseURL}/tutorId/${tutorId}`, {
      method: "GET",
      headers: {
        Authorization: ` ${token}`,
      },
    });
    return await res.json();
  } catch (error: any) {
    console.error("Error fetching tutor bookings:", error);
    return null;
  }
};
