import Link from 'next/link';
import Container from '../Shared/Container/Container';

interface PageBannerProps {
  title: string;
  description: string;
}

const PageBanner = ({ title, description }: PageBannerProps) => {
  return (
    <Container>
      <div className="px-4 rounded-xl py-8">
      <div className="pl-[2.5rem] md:pl-[3rem] lg:pl-[3.5rem]">
          <h1
            data-aos="fade-right"
            data-aos-duration="2000"
            className="text-2xl font-bold text-gray-500"
          >
            Scholerly
          </h1></div>
        {/* Page Title Row with Dotted Line */}
        <div
          data-aos="fade-left"
          data-aos-duration="2000"
          className="flex items-center gap-4 my-4"
        >
          {/* Left dotted line */}
          <div className="w-10 border-t border-dotted border-[#815606]" />

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-semibold text-[#815606] whitespace-nowrap">
            {title}
          </h2>

          {/* Right dotted line */}
          <div className="flex-1 border-t border-dotted border-[#815606]" />
        </div>

        {/* Aligned block that matches title's left position */}
        <div className="pl-[2.5rem] md:pl-[3rem] lg:pl-[3.5rem]">
      
          <p
            data-aos="fade-right"
            data-aos-duration="2000"
            className="text-gray-500 mt-1"
          >
            {description}
          </p>
          <Link
            data-aos="fade-right"
            data-aos-duration="2000"
            href="/"
            className="text-sm text-[#815606] mt-3 inline-block hover:underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default PageBanner;
