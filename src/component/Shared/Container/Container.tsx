import React, { ReactNode } from 'react';

export interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className='w-[80%] mx-auto  mr-20 bg-red-800'>
      {children}
    </div>
  );
};

export default Container;
