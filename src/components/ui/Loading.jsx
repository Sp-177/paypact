import React from 'react';

export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-bars loading-lg text-white"></span>
        <p className="text-white text-sm">Loading PayPact...</p>
      </div>
    </div>
  );
}
