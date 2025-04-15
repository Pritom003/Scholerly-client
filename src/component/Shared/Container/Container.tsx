import React, { ReactNode } from 'react';

export interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className='w-[80%] mx-auto  '>
      {children}
    </div>
  );
};

export default Container;
