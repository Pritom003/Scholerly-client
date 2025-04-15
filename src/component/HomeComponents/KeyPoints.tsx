import React from 'react';
import Image from 'next/image';
import { Monitor, Users, BookOpen } from 'lucide-react';
import mainimage from '../../../public/pexels-mikhail-nilov-8923040.jpg';
import SectionTitle from '../Shared/SectionTitle';
import Container from '../Shared/Container/Container';

const cardData = [
  {
    title: 'In-Person Guidance',
    subtitle: 'Find nearby expert tutors',
    icon: <Users size={32} className="text-blue-600 mb-2" />,
    order: 'order-2 md:order-1',
  },
  {
    title: 'Virtual Learning',
    subtitle: 'Interactive sessions anytime',
    icon: <Monitor size={32} className="text-teal-600 mb-2" />,
    order: 'order-1 md:order-2',
  },
  {
    title: 'Free Trial Classes',
    subtitle: 'Explore before you commit',
    icon: <BookOpen size={32} className="text-purple-600 mb-2" />,
    order: 'order-3',
  },
];

const KeyPoints = () => {
  return (
    <Container>
      <div className="flex flex-col lg:flex-row items-stretch w-full max-w-7xl mx-auto py-10 gap-6">
        {/* Left: Image */}
        <div data-aos="fade-in"
    data-aos-duration="2000" className="relative lg:w-1/2 h-[360px] w-full order-2 lg:order-1 ">
          <Image
            src={mainimage}
            alt="Main Visual"
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />

          {/* Overlapping Boxes for large screens */}
          <div data-aos="fade-right"
    data-aos-duration="1000" className=" absolute lg:flex -right-96 hidden 
        -bottom-16  
       gap-4 z-10">
            {cardData.map((card, idx) => (
              <div
                key={idx}
                className="bg-white shadow-lg rounded-xl p-4 w-36 h-36 flex flex-col items-center justify-center text-center text-sm font-medium"
              >
                {card.icon}
                <h4 className="font-semibold text-gray-800 text-xs">{card.title}</h4>
                <p className="text-[10px] text-gray-500 mt-1">{card.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Content */}
        <div data-aos="fade-right"
    data-aos-duration="2000" className="w-full lg:w-1/2 flex flex-col justify-between  lg:order-2 md:order-1">
          <div>
            <SectionTitle text="About Us" />
            <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
              Empowering Education Everywhere
            </h2>
            <p  className="text-gray-500">
              We believe in a hybrid approach to learning, combining the flexibility of online
              education with the power of in-person tutoring. Our mission is to connect students
              with passionate tutors and provide free demo classes to help them get started.
            </p>
          </div>

          {/* Cards for small and medium screens */}
          <div className="flex flex-wrap my-10 gap-4 lg:hidden">
            {cardData.map((card, idx) => (
              <div
                key={idx}
                className={`bg-white shadow-lg rounded-xl p-4 w-36 h-36 flex flex-col items-center justify-center text-center text-sm font-medium ${card.order}`}
              >
                {card.icon}
                <h4 className="font-semibold text-gray-800 text-xs">{card.title}</h4>
                <p className="text-[10px] text-gray-500 mt-1">{card.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default KeyPoints;
