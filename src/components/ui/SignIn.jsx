import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import DropDown from './DropDown';
import { motion, AnimatePresence } from 'framer-motion';
import {
  sendOtpToPhone,
  loginWithEmailAndPassword,
} from '../../auth/firebaseService';

export default function SignIn({ setOtpSent }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const identifier = watch('identifier');

  useEffect(() => {
    const isEmail = /\D/.test(identifier || '');
    setShowPassword(isEmail);
  }, [identifier]);

  const onSubmit = async (data) => {
    const isPhone = /^[6-9]\d{9}$/.test(data.identifier);
    setLoading(true);
    setError('');

    try {
      if (isPhone) {
        console.log('📱 Phone login → OTP:', data.identifier);
        const phoneWithCode = `+91${data.identifier.trim()}`;
        const confirmationResult = await sendOtpToPhone(phoneWithCode);
        window.confirmationResult = confirmationResult;
        setOtpSent(phoneWithCode); // Pass phone number to parent
      } else {
        console.log('📧 Email login → Password:', {
          email: data.identifier,
          password: data.password,
        });
        const user = await loginWithEmailAndPassword(
          data.identifier,
          data.password
        );
        console.log('✅ Login successful:', user);
        // Handle successful login (redirect, etc.)
      }
    } catch (error) {
      console.error('❌ Auth error:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm space-y-6">
      <DropDown />

      <div className="text-center text-gray-400 text-sm">or</div>

      {/* 🔐 Invisible reCAPTCHA container */}
      <div id="recaptcha-container" className="hidden" />


      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Identifier Input */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Email or Phone Number
          </label>
          <input
            type="text"
            {...register('identifier', {
              required: 'This field is required',
              validate: (val) => {
                const emailRegex = /^\S+@\S+\.\S+$/;
                const phoneRegex = /^[6-9]\d{9}$/;
                return (
                  emailRegex.test(val) ||
                  phoneRegex.test(val) ||
                  'Enter a valid email or 10-digit phone number'
                );
              },
            })}
            placeholder="you@example.com or 9876543210"
            className="w-full p-2 rounded border border-white bg-black text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all duration-300 ease-in-out hover:shadow-md"
            disabled={loading}
          />
          {errors.identifier && (
            <p className="text-red-500 text-xs mt-1">
              {errors.identifier.message}
            </p>
          )}
        </div>

        {/* Password Input (shown only for email login) */}
        <AnimatePresence>
          {showPassword && (
            <motion.div
              key="password"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <label className="block text-sm text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                {...register('password', {
                  required: 'Password is required for email login',
                  minLength: {
                    value: 6,
                    message: 'Minimum 6 characters',
                  },
                })}
                placeholder="••••••••"
                className="w-full p-2 rounded border border-white bg-black text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all duration-300 ease-in-out hover:shadow-md"
                disabled={loading}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-xs text-center">{error}</p>
        )}

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: loading ? 1 : 1.03 }}
          whileTap={{ scale: loading ? 1 : 0.97 }}
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black py-2 rounded hover:bg-gray-200 transition-all duration-300 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : 'Continue'}
        </motion.button>
      </form>
    </div>
  );
}