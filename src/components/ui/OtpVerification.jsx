import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { sendOtpToPhone, registerWithEmailAndPassword } from '../../auth/firebaseService';
import { useNavigate } from 'react-router-dom';

export default function OtpVerification({ setOtpSent, phoneNumber, registrationData, isRegistration = false }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (!window.confirmationResult) {
        throw new Error('No confirmation result found. Please try again.');
      }

      const result = await window.confirmationResult.confirm(code);
      console.log('✅ OTP Verified → Phone User:', result.user);
      
      if (isRegistration && registrationData) {
        try {
          console.log('🔐 Creating email account after OTP verification...');
          const emailUser = await registerWithEmailAndPassword(
            registrationData.email,
            registrationData.password
          );
          console.log('✅ Email account created successfully:', emailUser);
          alert('Registration successful! Both phone and email verified.');
          navigate('/dashboard');
        } catch (emailError) {
          console.error('❌ Email registration failed after OTP verification:', emailError);
          setError('Phone verified but email registration failed. Please contact support.');
          return;
        }
      } else {
        alert('Phone verification successful!');
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('❌ OTP verification failed:', err.message);
      setError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;

    setLoading(true);
    setError('');

    try {
      setTimer(30);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();

      if (phoneNumber) {
        const confirmationResult = await sendOtpToPhone(phoneNumber);
        window.confirmationResult = confirmationResult;
        console.log('📲 OTP resent to:', phoneNumber);
      } else {
        throw new Error('Phone number missing. Cannot resend OTP.');
      }
    } catch (err) {
      console.error('❌ Resend OTP failed:', err.message);
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 text-center">
        <h2 className="text-lg font-semibold text-white">Enter the OTP sent to your phone</h2>

        <div className="flex justify-center gap-3">
          {otp.map((val, idx) => (
            <motion.input
              key={idx}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={val}
              onChange={(e) => handleChange(e.target.value, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              ref={(el) => (inputRefs.current[idx] = el)}
              className="w-10 h-12 text-xl text-center border border-gray-400 bg-black text-white rounded focus:outline-none focus:border-blue-400 transition-all duration-300"
              whileFocus={{ scale: 1.05 }}
              disabled={loading}
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="text-sm text-gray-400">
          {timer > 0 ? (
            <span>
              Resend OTP in <span className="text-white">{timer}s</span>
            </span>
          ) : (
            <motion.button
              type="button"
              onClick={handleResend}
              whileHover={{ scale: 1.05 }}
              className="text-blue-400 hover:underline"
              disabled={loading}
            >
              {loading ? 'Resending...' : 'Resend OTP'}
            </motion.button>
          )}
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: loading ? 1 : 1.03 }}
          whileTap={{ scale: loading ? 1 : 0.97 }}
          disabled={loading}
          className="w-full bg-white text-black py-2 rounded mt-3 hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Verifying...' : 'Verify & Continue'}
        </motion.button>

        <motion.button
          type="button"
          onClick={() => setOtpSent(false)}
          className="text-red-400 text-sm hover:underline mt-2"
          disabled={loading}
        >
          Change Credentials
        </motion.button>
      </form>

      
    </>
  );
}
