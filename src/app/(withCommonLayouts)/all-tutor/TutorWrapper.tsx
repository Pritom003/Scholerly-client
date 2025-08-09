/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import SearchBar from '@/component/searchComponent/serchALltutor';
import TutorCard from '@/lib/TutorCard/TutorCard';
import { useRouter, useSearchParams } from 'next/navigation';
import { getAllTutors } from '@/app/Services/TutorServices';
import SubjectFilter from '@/component/searchComponent/SubjectFilter';

const PAGE_SIZE = 6;

const ClientTutorsSection = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [tutors, setTutors] = useState<any[]>([]);
  const [totalTutors, setTotalTutors] = useState(0);

  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const currentPage = isNaN(pageParam) ? 1 : pageParam;

  const buildQuery = () => {
    const query = new URLSearchParams(searchParams.toString());
    query.set('page', currentPage.toString());
    query.set('limit', PAGE_SIZE.toString());
    return query.toString();
  };

  useEffect(() => {
    const fetchTutors = async () => {
      const data = await getAllTutors(buildQuery());
      const approvedTutors = data?.data?.tutors?.filter((t: any) => t.request === 'approved') || [];
      setTutors(approvedTutors);
      setTotalTutors(data?.data?.total || 0);
    };

    fetchTutors();
  }, [searchParams.toString()]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/all-tutor?${params.toString()}`);
  };

  return (
<div className="flex  md:flex-row items-start gap-6 py-10 px-8">

      <div className="flex-1">
        <div className="flex justify-center mb-4">
          <div className="w-96 ">
            <SearchBar />
          </div>
        </div>
<div className='flex flex-col md:flex-row gap-4'>
    <div className="sticky top-2 max-h-[90vh]
     overflow-y-auto w-fit z-30">
       <SubjectFilter />
   </div>
        <div className="grid w-full  gap-6 sm:grid-cols-1 md:grid-cols-2 py-10">
          {tutors.map((tutor: any) => (
            <TutorCard
              key={tutor._id}
              id={tutor._id}
              name={tutor.name}
              image={tutor.profileImage}
              rating={tutor.rating}
              hourlyRate={tutor.hourlyRate}
              location={tutor.location}
              qualifications={tutor.qualifications?.map((q: any) => ({
                name: `${q.degree} - ${q.institution}`,
              }))}
            />
          ))}
        </div>
</div>

        <div className="flex justify-center mt-8">
          <Pagination
            current={currentPage}
            pageSize={PAGE_SIZE}
            total={totalTutors}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientTutorsSection;
