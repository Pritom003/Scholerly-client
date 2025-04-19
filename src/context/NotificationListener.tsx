"use client";

import { useEffect } from "react";
import socket from "@/utils/socket";
import { useUser } from "@/context/useContext"; // ⬅️ use your custom context

export default function NotificationListener() {
  const { user } = useUser(); // ⬅️ this gives you user from context

  useEffect(() => {
    if (!user?.id) return;

    // Join room for current user (based on userId)
    socket.emit("joinRoom", user.id);

    // Listen for tutor booking notifications
    socket.on("newBooking", (data) => {
      console.log("📩 Booking Notification:", data);
      // Show toast or update UI
    });

    // Listen for booking status updates (for students)
    socket.on("bookingUpdated", (data) => {
      console.log("📩 Booking Status Update:", data);
      // Show toast or update UI
    });

    return () => {
      socket.off("newBooking");
      socket.off("bookingUpdated");
    };
  }, [user?.id]);

  return null;
}
