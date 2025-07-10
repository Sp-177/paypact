import React, { lazy, Suspense, useState } from 'react';
import Loading from '../components/ui/Loading';
const TypingHero = lazy(() => import('../components/ui/TypingHero'));
const Logo = lazy(() => import('../components/ui/Logo'));
const SignIn = lazy(() => import('../components/ui/SignIn'));
const SignUp = lazy(() => import('../components/ui/SignUp'));
const VideoBackground = lazy(() => import('../components/ui/VideoBackground'));

export default function Landing() {
  const [method, setMethod] = useState('SignIn');

  return (
    <Suspense fallback={<Loading />}>
      <div className="w-full h-screen flex bg-black text-white font-sans overflow-hidden">
        {/* Left – Video */}
        <VideoBackground>
          <TypingHero />
        </VideoBackground>

        {/* Right – Auth Section */}
        <div className="w-1/2 h-full flex flex-col justify-center items-center px-8 relative">
          <Logo />

          <div className="w-full max-w-sm space-y-6 mt-24">
            <h3 className="text-2xl font-semibold text-center text-gray-200">
              {method === 'SignIn' ? 'Welcome Back!' : 'Join PayPact'}
            </h3>

            {method === 'SignIn' ? <SignIn /> : <SignUp />}

            <div className="text-sm text-center text-gray-400">
              {method === 'SignIn' ? 'Don’t have an account?' : 'Already a user?'}
              <button
                onClick={() =>
                  setMethod(method === 'SignIn' ? 'SignUp' : 'SignIn')
                }
                className="ml-2 underline text-white hover:text-gray-300 transition"
              >
                {method === 'SignIn' ? 'Sign Up' : 'Sign In'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
