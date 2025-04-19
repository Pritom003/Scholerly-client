/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { bookTutor } from "@/app/actions/booktutor";
import Button from "@/lib/Buttons/Button";
import { useTransition } from "react";
import { toast } from "sonner"; // This is now used in the client component

type BookNowButtonProps = {
  tutor: any;
};

export default function  BookNowButton({ tutor }: BookNowButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleBooking = () => {
    startTransition(async () => {
      try {
        const result = await bookTutor(tutor);
        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
        console.log("Booking result:", result);
      } catch (error) {
        console.error("Booking failed:", error);
        toast.error("Booking failed. Please try again.");
      }
    });
  };

  return (
    <button
      onClick={handleBooking}
      disabled={isPending}
      
    ><Button buttontext={isPending ? "Booking..." : "Book Now"}></Button> </button>
  );
}
