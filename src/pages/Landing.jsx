import React, { lazy, Suspense, useState } from 'react';
import Loading from '../components/ui/Loading';

const TypingHero = lazy(() => import('../components/ui/TypingHero'));
const Logo = lazy(() => import('../components/ui/Logo'));
const SignIn = lazy(() => import('../components/ui/SignIn'));
const SignUp = lazy(() => import('../components/ui/SignUp'));
const VideoBackground = lazy(() => import('../components/ui/VideoBackground'));
const OtpVerification = lazy(() => import('../components/ui/OtpVerification'));

export default function Landing() {
  const [method, setMethod] = useState('SignIn');
  const [otpSent, setOtpSent] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleOtpSent = (phone) => {
    setPhoneNumber(phone);
    setOtpSent(true);
  };

  const handleBackToAuth = () => {
    setOtpSent(false);
    setRegistrationData(null);
    setPhoneNumber('');
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className="w-full h-screen flex bg-black text-white font-sans overflow-hidden">
        {/* Left – Background Video & Hero */}
        <VideoBackground>
          <TypingHero />
        </VideoBackground>

        {/* Right – Auth Area */}
        <div className="w-1/2 h-full flex flex-col justify-center items-center px-8 relative">
          <Logo />

          <div className="w-full max-w-sm space-y-6 mt-24">
            {!otpSent && (
              <h3 className="text-2xl font-semibold text-center text-gray-200 transition-all duration-300">
                {method === 'SignIn' ? 'Welcome Back!' : 'Join PayPact'}
              </h3>
            )}

            {otpSent ? (
              <OtpVerification 
                setOtpSent={handleBackToAuth} 
                phoneNumber={phoneNumber}
                registrationData={registrationData}
                isRegistration={method === 'SignUp'}
              />
            ) : method === 'SignIn' ? (
              <SignIn setOtpSent={handleOtpSent} />
            ) : (
              <SignUp 
                setOtpSent={handleOtpSent} 
                setRegistrationData={setRegistrationData}
              />
            )}

            {!otpSent && (
              <div className="text-sm text-center text-gray-400 transition-opacity duration-300">
                {method === 'SignIn' ? 'Dont have an account?' : 'Already a user?'}
                <button
                  onClick={() => {
                    setMethod(method === 'SignIn' ? 'SignUp' : 'SignIn');
                    setRegistrationData(null);
                    setPhoneNumber('');
                  }}
                  className="ml-2 underline text-white hover:text-gray-300 transition duration-300 cursor-pointer"
                >
                  {method === 'SignIn' ? 'Sign Up' : 'Sign In'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
}