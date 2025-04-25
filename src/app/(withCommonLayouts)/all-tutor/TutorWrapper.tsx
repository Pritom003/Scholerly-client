/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from "react";
import { Pagination } from "antd";
import SearchBar from "@/component/searchComponent/serchALltutor";
import TutorCard from "@/lib/TutorCard/TutorCard";

const PAGE_SIZE = 6;

const ClientTutorsSection = ({ tutors }: { tutors: any[] }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentTutors = tutors.slice(startIndex, endIndex);

  return (
    <>
      <div className="flex justify-center mb-4">
        <div className="w-96">
          <SearchBar />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10">
        {currentTutors.map((tutor) => (
          <TutorCard
            key={tutor._id}
            id={tutor._id}
            name={tutor.name}
            image={tutor.profileImage}
            rating={tutor.rating}
            hourlyRate={tutor.hourlyRate}
            location={tutor.location}
            qualifications={tutor.qualifications}
          />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Pagination
          current={currentPage}
          pageSize={PAGE_SIZE}
          total={tutors.length}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>
    </>
  );
};

export default ClientTutorsSection;
