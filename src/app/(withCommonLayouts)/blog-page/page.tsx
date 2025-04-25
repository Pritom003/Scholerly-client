// app/(public)/blog/page.tsx
'use client';

import PageBanner from '@/component/PageBanner/PageBanner';
import Container from '@/component/Shared/Container/Container';
import { useEffect, useState } from 'react';

type BlogPost = {
  id: number;
  title: string;
  description: string;
  url: string;
  published_at: string;
  user: {
    name: string;
    profile_image: string;
  };
};

const BlogPage = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('https://dev.to/api/articles?per_page=6');
        const data = await res.json();
        setBlogs(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
  <Container>
    <PageBanner title='BLog Page' description='Learn More By reading Our Blogs'></PageBanner>
      <div className="max-w-7xl mx-auto p-4">


{loading ? ('...'
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {blogs.map((post) => (
      <div
        key={post.id}
        className="bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between"
      >
        <div>
          <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
          <p className="text-sm text-gray-600">{post.description}</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={post.user.profile_image}
              alt={post.user.name}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm text-gray-700">{post.user.name}</span>
          </div>
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-sm font-medium"
          >
            Read More →
          </a>
        </div>
      </div>
    ))}
  </div>
)}
</div>
  </Container>
  );
};

export default BlogPage;
