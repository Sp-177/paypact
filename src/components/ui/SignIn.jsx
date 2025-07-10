import React from 'react';
import { useForm } from 'react-hook-form';
import DropDown from './DropDown';

export default function SignIn({ setOtpSent }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('SignIn Identifier:', data.identifier);
    setOtpSent(true); // Trigger OTP flow
  };

  return (
    <div className="w-full max-w-sm space-y-6">
      <DropDown />

      <div className="text-center text-gray-400 text-sm">or</div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Email or Phone Number</label>
          <input
            type="text"
            {...register('identifier', {
              required: 'This field is required',
              validate: (value) => {
                const emailRegex = /^\S+@\S+\.\S+$/;
                const phoneRegex = /^[6-9]\d{9}$/;
                return (
                  emailRegex.test(value) ||
                  phoneRegex.test(value) ||
                  'Enter a valid email or 10-digit phone number'
                );
              },
            })}
            placeholder="you@example.com or 9876543210"
            className="w-full p-2 rounded border border-white bg-black text-white placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-400"
          />
          {errors.identifier && (
            <p className="text-red-500 text-xs mt-1">{errors.identifier.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-white text-black py-2 rounded hover:bg-gray-200 transition"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
