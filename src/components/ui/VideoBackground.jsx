import React from 'react';
import video from '../../assets/video.mp4';
import TypingHero from './TypingHero';

export default function VideoBackground() {
  return (
    <div className="w-1/2 h-full relative overflow-hidden rounded-r-3xl">
      <video
        src={video}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
      <div className="absolute top-[75%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <TypingHero />
      </div>
    </div>
  );
}
