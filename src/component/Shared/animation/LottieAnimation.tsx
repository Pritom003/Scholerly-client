'use client'; // 👈 if you're using Next.js and this will be used in Server Components

import React from 'react';
import Lottie from 'lottie-react';
import animations, { LottieKey } from './animationandkey';

type Props = {
  name: LottieKey;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
};

const LottieAnimation: React.FC<Props> = ({
  name,
  className = 'w-64 h-64',
  loop = true,
  autoplay = true,
}) => {
  const animationData = animations[name];

  return (
    <div className={className}>
      <Lottie animationData={animationData} loop={loop} autoplay={autoplay} />
    </div>
  );
};

export default LottieAnimation;
