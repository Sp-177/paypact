import React from 'react';
import {
  FaGoogle,
  FaMicrosoft,
  FaLinkedin,
  FaYahoo,
  FaFacebook,
  FaXTwitter,
  FaApple,
  FaEnvelope,
} from 'react-icons/fa6';
import { useForm } from 'react-hook-form';

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('SignIn Data:', data);
  };

  return (
    <div className="w-full max-w-sm space-y-5">
      {/* Social Login Grid */}
      <div className="grid grid-cols-4 gap-2">
        {[FaGoogle, FaMicrosoft, FaLinkedin, FaYahoo, FaFacebook, FaXTwitter, FaApple, FaEnvelope].map(
          (Icon, i) => (
            <button
              key={i}
              className="flex items-center justify-center p-2 border border-white rounded-lg hover:bg-white hover:text-black transition"
            >
              <Icon size={18} />
            </button>
          )
        )}
      </div>

      {/* Divider */}
      <div className="text-center text-gray-400 text-sm">or</div>

      {/* Email/Phone + Password Login */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email or Phone */}
        <div>
          <label className="block text-sm mb-1">Email or Phone</label>
          <input
            type="text"
            {...register('identifier', {
              required: 'Email or phone is required',
            })}
            placeholder="you@example.com or 9876543210"
            className="border p-2 rounded w-full text-white bg-black placeholder-gray-400"
          />
          {errors.identifier && (
            <p className="text-red-500 text-xs mt-1">
              {errors.identifier.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            {...register('password', {
              required: 'Password is required',
            })}
            placeholder="••••••••"
            className="border p-2 rounded w-full text-white bg-black placeholder-gray-400"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-white text-black py-2 rounded hover:bg-gray-200 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
