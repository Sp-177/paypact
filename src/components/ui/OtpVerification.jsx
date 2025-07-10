import React, { useState, useEffect, useRef } from 'react';

export default function OtpVerification({ setOtpSent }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (val, idx) => {
    if (!/^\d?$/.test(val)) return;
    const updated = [...otp];
    updated[idx] = val;
    setOtp(updated);
    if (val && idx < 5) inputRefs.current[idx + 1]?.focus();
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handleResend = () => {
    setTimer(30);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length === 6) {
      console.log('OTP Submitted:', code);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm space-y-6 text-center"
    >
      <h2 className="text-xl font-semibold text-gray-200">
        Enter OTP sent to{' '}
        <span className="text-blue-400">your email or phone</span>
      </h2>

      <div className="flex justify-center gap-3">
        {otp.map((digit, idx) => (
          <input
            key={idx}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            ref={(el) => (inputRefs.current[idx] = el)}
            className="w-10 h-12 text-xl text-center border rounded border-gray-400 bg-black text-white focus:outline-none focus:border-blue-400"
          />
        ))}
      </div>

      <div className="flex justify-between text-sm text-gray-400 mt-1">
        {timer > 0 ? (
          <span>
            Resend OTP in{' '}
            <span className="text-white font-medium">{timer}s</span>
          </span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            className="text-blue-400 hover:underline"
          >
            Resend OTP
          </button>
        )}

        <button
          type="button"
          onClick={() => setOtpSent(false)}
          className="text-red-400 hover:underline"
        >
          Change Credentials
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-white text-black py-2 rounded hover:bg-gray-200 transition mt-3"
      >
        Verify & Continue
      </button>
    </form>
  );
}
