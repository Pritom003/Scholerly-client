import React from 'react';

interface SectionTitleProps {
  text: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ text }) => {
  return (
    <h1  className="text-2xl font-bold text-[#815606] flex items-center gap-2">
      <svg height="6" width="60" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="10" x2="250" y2="10" style={{ stroke: '#815606', strokeWidth: 12 }} />
      </svg>
      {text}
    </h1>
  );
};

export default SectionTitle;
