import React from 'react';
import { Spin } from 'antd'; // Import Spin from Ant Design

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spin size="large" />
      <div className="text-center text-xl font-semibold ml-4">Loading...</div>
    </div>
  );
};

export default Loading;
