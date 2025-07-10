import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  countryCode: z.string().regex(/^\+\d{1,4}$/, 'e.g. +91'),
  phone: z.string().regex(/^\d{6,14}$/, '6–14 digits only'),
});

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { countryCode: '+91' },
  });

  const onSubmit = (data) => {
    console.log('SignUp Data:', {
      ...data,
      fullPhone: `${data.countryCode} ${data.phone}`,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
      <div>
        <label className="block text-sm mb-1">Email</label>
        <input
          type="email"
          {...register('email')}
          placeholder="you@example.com"
          className="w-full p-2 rounded border bg-black text-white placeholder-gray-400"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm mb-1">Password</label>
        <input
          type="password"
          {...register('password')}
          placeholder="••••••••"
          className="w-full p-2 rounded border bg-black text-white placeholder-gray-400"
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm mb-1">Phone Number</label>
        <div className="flex gap-2">
          <input
            type="text"
            {...register('countryCode')}
            className="w-1/3 p-2 rounded border bg-black text-white placeholder-gray-400"
            placeholder="+91"
          />
          <input
            type="tel"
            {...register('phone')}
            className="w-2/3 p-2 rounded border bg-black text-white placeholder-gray-400"
            placeholder="9876543210"
          />
        </div>
        {errors.countryCode && (
          <p className="text-red-500 text-xs mt-1">{errors.countryCode.message}</p>
        )}
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-white text-black py-2 rounded hover:bg-gray-200 transition"
      >
        Sign Up
      </button>
    </form>
  );
}
