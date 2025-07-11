import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { sendOtpForRegistration } from '../../auth/firebaseService';

const schema = z.object({
  name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Phone must be 10 digits starting with 6–9'),
});

export default function SignUp({ setOtpSent, setRegistrationData }) {
  const [loading, setLoading] = useState(false);
  const [firebaseError, setFirebaseError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    setFirebaseError(null);
    try {
      // Store registration data for later use after OTP verification
      const phoneWithCode = `+91${data.phone}`;
      setRegistrationData({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone
      });
      
      // Send OTP without creating email account
      await sendOtpForRegistration(phoneWithCode);
      setOtpSent(phoneWithCode); // Pass phone number to parent
    } catch (err) {
      console.error('SignUp error:', err);
      setFirebaseError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div id="recaptcha-container" className="hidden" />


      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Full Name</label>
          <input
            type="text"
            {...register('name')}
            placeholder="John Doe"
            className="w-full p-2 rounded border border-white bg-black text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all duration-300 ease-in-out hover:shadow-md"
            disabled={loading}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Email</label>
          <input
            type="email"
            {...register('email')}
            placeholder="you@example.com"
            className="w-full p-2 rounded border border-white bg-black text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all duration-300 ease-in-out hover:shadow-md"
            disabled={loading}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Password</label>
          <input
            type="password"
            {...register('password')}
            placeholder="••••••••"
            className="w-full p-2 rounded border border-white bg-black text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all duration-300 ease-in-out hover:shadow-md"
            disabled={loading}
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Phone Number</label>
          <div className="flex gap-2">
            <input
              value="+91"
              readOnly
              disabled
              className="w-1/4 p-2 rounded border border-white bg-gray-800 text-white text-center"
            />
            <input
              type="tel"
              {...register('phone')}
              placeholder="9876543210"
              className="w-3/4 p-2 rounded border border-white bg-black text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all duration-300 ease-in-out hover:shadow-md"
              disabled={loading}
            />
          </div>
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>

        {firebaseError && <p className="text-red-500 text-xs text-center">{firebaseError}</p>}

        <motion.button
          whileHover={{ scale: loading ? 1 : 1.03 }}
          whileTap={{ scale: loading ? 1 : 0.97 }}
          disabled={loading}
          type="submit"
          className="w-full bg-white text-black py-2 rounded hover:bg-gray-200 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Registering...' : 'Sign Up'}
        </motion.button>
      </form>
    </>
  );
}