import React from 'react';
import { useForm } from 'react-hook-form';
import DropDown from './DropDown';

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
      <DropDown />

      <div className="text-center text-gray-400 text-sm">or</div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Email or Phone</label>
          <input
            type="text"
            {...register('identifier', { required: 'Required field' })}
            placeholder="you@example.com or 9876543210"
            className="w-full p-2 rounded border bg-black text-white placeholder-gray-400"
          />
          {errors.identifier && (
            <p className="text-red-500 text-xs mt-1">{errors.identifier.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
            placeholder="••••••••"
            className="w-full p-2 rounded border bg-black text-white placeholder-gray-400"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

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
