import React, { useState } from 'react';
import video from '../assets/video.mp4';
import TypingHero from '../components/ui/TypingHero';
import logo from '../assets/logo.png';

import SignIn from '../components/ui/SignIn';
import SignUp from '../components/SignUp';

export default function Landing() {
  const [method, methodChange] = useState('SignIn');

  return (
    <div className="w-full h-screen flex bg-black text-white font-sans">
      {/* Left Side – Video + TypingHero */}
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

      {/* Right Side – Branding + Form */}
      <div className="w-1/2 h-full flex flex-col justify-center items-center px-8 space-y-6">
        <img
          src={logo}
          alt="PayPact Logo"
          className="w-60 mb-2 filter invert brightness-200"
        />

        <h3 className="text-xl font-semibold text-gray-200">{method}</h3>

        {method === 'SignIn' ? <SignIn /> : <SignUp />}

        <div className="text-sm text-gray-400">
          {method === 'SignIn' ? 'Create new account? ' : 'Already have an account? '}
          <button
            onClick={() =>
              methodChange(method === 'SignIn' ? 'SignUp' : 'SignIn')
            }
            className="underline text-white hover:text-gray-200 transition"
          >
            {method === 'SignIn' ? 'SignUp' : 'SignIn'}
          </button>
        </div>
      </div>
    </div>
  );
}
