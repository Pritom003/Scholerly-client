// app/tutors/page.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
  
    // Always ensure status is set to 'approved'
    params.set("request", "approved");
  
    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }
  
    router.push(`/all-tutor?${params.toString()}`);
  };
  
  

  return (
    <form onSubmit={handleSearch} className="flex items-center mb-6">
        <Input
        size="large"
        placeholder="Search for subjects, tutors, or topics..."
        prefix={<SearchOutlined />}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="shadow-lg !bg-[#E3E3E5]  !border-[#815606] !border-2 !h-12 !rounded-2xl"
      />
    </form>
  );
};

export default SearchBar;
