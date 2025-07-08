import React, { useState } from 'react';
import video from '../assets/video.mp4';
import TypingHero from '../components/ui/TypingHero';
import {
  FaLinkedin,
  FaYahoo,
  FaFacebook,
  FaXTwitter,
  FaApple,
  FaEnvelope,
  FaGoogle,
  FaMicrosoft,
} from 'react-icons/fa6';

export default function Landing() {
  const [method, methodChange] = useState('Signin');

  return (
    <div className="w-full h-screen flex bg-black text-white font-sans">
      {/* Left side – Video with overlayed TypingHero */}
      <div className="w-1/2 h-full relative overflow-hidden rounded-r-3xl">
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute top-[75%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10">
          <TypingHero />
        </div>
      </div>

      {/* Right side – Branding + Auth Buttons */}
      <div className="w-1/2 h-full flex flex-col justify-center items-center px-8 space-y-8">
        <h1 className="text-5xl font-bold tracking-wide">PayPact</h1>
        <h3 className="text-lg font-medium text-gray-300">{method}</h3>

        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          {[FaGoogle, FaMicrosoft, FaLinkedin, FaYahoo, FaFacebook, FaXTwitter, FaApple, FaEnvelope].map((Icon, i) => (
            <button
              key={i}
              className="flex items-center justify-center p-3 border border-white rounded-lg hover:bg-white hover:text-black transition"
            >
              <Icon size={22} />
            </button>
          ))}
        </div>

        {/* Toggle Link */}
        <div className="text-sm text-gray-400">
          {method === 'Signin' ? 'Create new account? ' : 'Already have an account? '}
          <button
            onClick={() => methodChange(method === 'Signin' ? 'Signup' : 'Signin')}
            className="underline text-white hover:text-gray-200 transition"
          >
            {method === 'Signin' ? 'Signup' : 'Signin'}
          </button>
        </div>
      </div>
    </div>
  );
}
