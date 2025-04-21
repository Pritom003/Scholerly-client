"use client";

import React, { useEffect, useState } from "react";
import Container from "@/component/Shared/Container/Container";
import SectionTitle from "@/component/Shared/SectionTitle";
import Link from "next/link";
import Image from "next/image";
import { Button } from "antd";
import { getAllTutors } from "@/app/Services/TutorServices";
import Buttons from "@/lib/Buttons/Button";

export interface ITutor {
  _id: string;
  role: "tutor";
  name: string;
  email: string;
  phone?: string;
  id: string;
  profileImage?: string;
  request?: "pending" | "approved" | "rejected";
  location?: string;
  qualifications?: [
    {
      degree: string;
      institution: string;
      graduationYear: number;
      currentYear: string;
      experience: string;
    }
  ];
}

const OurTutors = () => {
  const [tutors, setTutors] = useState<ITutor[]>([]);

  useEffect(() => {
    const fetchTutors = async () => {
      const res = await getAllTutors("limit=4");
      if (res?.data) {
        setTutors(res.data.tutors);
      }
    };
    fetchTutors();
  }, []);

  return (
    <div>
    <div className='grid justify-center align-middle items-center'>
      <div data-aos="fade-left"
    data-aos-duration="2000" className=' max-w-[580px]  my-10 '>
     <SectionTitle
  text="Meet Our Tutors"
  description="Connect with top-rated educators"
/>
</div> </div>  <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {tutors.map((tutor) => (
          <div
          data-aos="fade-in"
          data-aos-duration="2000"
          key={tutor._id}
          className="relative group overflow-hidden shadow-2xl
           rounded-lg hover:shadow-amber-900  duration-1000
           ease-in-out hover:shadow-xl hover:-translate-y-2 hover:translate-x-2"
          
              // className="relative group overflow-hidden rounded-lg shadow-lg transition-all duration-300 "
        >
          <div className="relative w-full h-60">
            <Image
              src={tutor.profileImage || "https://res.cloudinary.com/dkal4qazy/image/upload/v1744812682/profile_1744812678684.png"}
              alt={tutor.name}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-black/40 backdrop-blur-md text-white px-3 py-2">
              <h3 className="text-lg font-semibold">{tutor.name}</h3>
            </div>
            <div className="absolute bottom-0 left-0 w-full px-3 py-4 bg-black/60 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out">
              <p className="text-sm">
                {tutor.qualifications?.[0]
                  ? `${tutor.qualifications[0].degree} (${tutor.qualifications[0].institution})`
                  : "No qualification info"}
              </p>
              {tutor.location && (
                <p className="text-sm mt-1">📍 {tutor.location}</p>
              )}
              <Link href={`/all-tutor/${tutor._id}`}>
                <Button size="small" className="mt-2 border-2 border-[#815606] text-[#815606] font-bold">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
          ))}
        </div>
      </Container>
<div className="grid justify-center align-middle items-center mt-10">
<Link href="/all-tutor"  className="w-44">  <Buttons buttontext='Explore More  ' >
           
           </Buttons> </Link>
</div>
    </div>
  );
};

export default OurTutors;
