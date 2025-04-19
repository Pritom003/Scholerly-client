"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { createBooking } from "../Services/BookingServices";

/**
 * Helper: Get the current logged in user from cookies by decoding the JWT.
 */
const getCurrentUser = async () => {
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) throw new Error("User not authenticated");
  const user = jwtDecode(token) as { id: string };
  return user;
};

export async function bookTutor(tutor: any) {
  // Get the current user
  const currentUser = await getCurrentUser();

  // Construct the booking data payload
  const bookingData: any = {
    student: currentUser.id,
    tutor: tutor.user,
    subject:
      Array.isArray(tutor.subjects) && tutor.subjects.length > 0
        ? tutor.subjects[0]
        : "",
    bookingDate: new Date(),
    durationInHours: 1,
    ValuPerHour: tutor.hourlyRate,
    status: "pending",
  };
  
  // Retrieve token for authorization from cookies
  const token = (await cookies()).get("accessToken")?.value || "";

  // Create the booking record via your booking service
  const newBooking = await createBooking(bookingData, token);
  
  // Instead of calling toast here, return an indicator for the client to process.
  if(newBooking?.success){
    return { success: true, message: 'Sent booking request to tutor', booking: newBooking };
  } else {
    return { success: false, message: "Something went wrong", booking: newBooking };
  }
}
