import React from 'react';

interface SectionTitleProps {
  text: string;
  description:string
}

const SectionTitle: React.FC<SectionTitleProps> = ({ text ,description}) => {
  return (
    <div>
    <div  className="text-2xl font-bold text-[#815606] flex items-center gap-2">
      <svg height="6" width="40" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="10" x2="250" y2="10" style={{ stroke: '#815606', strokeWidth: 12 }} />
      </svg>
     <h1>{text}</h1></div>
     <p className="text-xl md:text-3xl font-extrabold text-gray-800 mb-4">{description}</p>
    </div>
  );
};

export default SectionTitle;
