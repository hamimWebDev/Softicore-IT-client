import React from 'react';

const PiriLoader: React.FC = () => (
  <div className="fixed inset-0 w-screen h-screen bg-black/40 flex items-center justify-center z-[9999]">
    <div className="w-20 h-20 rounded-full border-8 border-gray-200 border-t-primary-500 animate-spin"></div>
  </div>
);

export default PiriLoader; 