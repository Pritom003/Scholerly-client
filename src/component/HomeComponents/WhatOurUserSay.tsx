"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import SectionTitle from "../Shared/SectionTitle";
import Image from "next/image";
import { getAllreviws } from "@/app/Services/reviewServices";
import Container from "../Shared/Container/Container";
// import { getAllreviws } from "@/services/review.service"; // ✅ adjust path accordingly

interface TReview {
  _id: string;
  rating: number;
  comment?: string;
  userId: {
    name: string;
    Profileimage?: string;
  };
}

const WhatOurUserSay = () => {
  const [reviews, setReviews] = useState<TReview[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getAllreviws("limit=3");
        const allReviews = data.data || [];
        const firstThree = allReviews.slice(0, 3);
        setReviews(firstThree);
        
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="pt-20 ">
    <div className='grid justify-center align-middle items-center'>
      <div data-aos="fade-left"
    data-aos-duration="2000" className=' max-w-[600px] my-10 '>
   <SectionTitle
  text="What Students Say"
  description="Real feedback from real learners"
/>

</div>   </div>   <Container  >
      <Swiper  data-aos="fade-up"
    data-aos-duration="2000"
        slidesPerView={1}
        spaceBetween={30}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 1 },
        }}
        modules={[Pagination, Autoplay]}
        className="my-6 h-[300px]"
      >
        {reviews.map((review) => (
          <SwiperSlide  key={review._id}>
          <div className="relative  border-[1.5px] border-[#815606] text-[#815606] rounded-lg pt-6 pb-12 px-6 text-center">
  {/* Rating at top center */}
  <div className="text-xl">
 <span>   {"★".repeat(review.rating)}
 {"☆".repeat(5 - review.rating)}</span>
  </div>

  {/* Horizontal line under rating */}
  <hr className="border-t border-[#815606] my-2 w-2/3 mx-auto" />

  {/* Comment */}
  <p className="italic mt-4">“{review.comment || "No comment"}”</p>

  {/* User image at bottom center, overlapping border */}
  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
    <Image
      src={review.userId?.Profileimage || "https://res.cloudinary.com/dkal4qazy/image/upload/v1744812682/profile_1744812678684.png"}
      alt={review.userId?.name}
      width={80}
      height={80}
      className="rounded-full border-2 border-[#815606] bg-white"
    />
  </div>
</div>

          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
    </div>
  );
};

export default WhatOurUserSay