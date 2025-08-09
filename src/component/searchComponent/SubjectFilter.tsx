'use client';

import { getsubjects } from '@/app/Services/TutorServices';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const SubjectFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [subjects, setSubjects] = useState<string[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(
    searchParams.get('subjects') || null
  );

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await getsubjects();
        const allSubjects: string[] = data.data || [];

        const cleanedSubjects = allSubjects.map(subject =>
          subject.trim().toLowerCase()
        );

        const uniqueSubjects = Array.from(new Set(cleanedSubjects));

        const formattedSubjects = uniqueSubjects.map(subject =>
          subject
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        );

        setSubjects(formattedSubjects);
      } catch (error) {
        console.error('Failed to fetch subjects', error);
      }
    };

    fetchSubjects();
  }, []);

  const handleFilter = (subject: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!subject) {
      params.delete('subjects');
      setSelectedSubject(null);
    } else {
      params.set('subjects', subject);
      setSelectedSubject(subject);
    }

    params.set('request', 'approved');
    router.push(`/all-tutor?${params.toString()}`);
  };

  return (
    <div className="bg-[#815606] text-white p-4 w-full lg:max-w-[20vw]
      rounded-lg sticky top-20">
      <h2 className="text-sm font-semibold mb-2">Filter by Subject</h2>
      <div className="flex flex-wrap gap-2">
        <span
          onClick={() => handleFilter(null)}
          className={`cursor-pointer text-xs px-3 py-1
             rounded-full border ${
            selectedSubject === null
              ? 'bg-white text-[#815606] font-semibold'
              : 'hover:bg-white hover:text-[#815606]'
          }`}
        >
          All
        </span>

        {subjects.map(subject => (
          <span
            key={subject}
            onClick={() => handleFilter(subject)}
            className={`cursor-pointer text-xs px-3 
                py-1 rounded-full border ${
              selectedSubject === subject
                ? 'bg-white text-[#815606] font-semibold'
                : 'hover:bg-white hover:text-[#815606]'
            }`}
          >
            {subject}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SubjectFilter;
