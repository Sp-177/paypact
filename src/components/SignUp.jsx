import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Zod schema
const schema = z.object({
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  countryCode: z
    .string()
    .regex(/^\+\d{1,4}$/, 'Enter valid country code like +91, +1'),
  phone: z
    .string()
    .regex(/^\d{6,14}$/, 'Phone must be 6–14 digit number without spaces'),
});

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      countryCode: '+91',
    },
  });

  const onSubmit = (data) => {
    const fullPhone = `${data.countryCode} ${data.phone}`;
    console.log('SignUp Data:', { ...data, fullPhone });
    // You can add navigation or API calls here
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm space-y-4"
    >
      {/* Email */}
      <div>
        <label className="block text-sm mb-1">Email</label>
        <input
          type="email"
          {...register('email')}
          className="border p-2 rounded w-full text-white bg-black placeholder-gray-400"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm mb-1">Password</label>
        <input
          type="password"
          {...register('password')}
          className="border p-2 rounded w-full text-white bg-black placeholder-gray-400"
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm mb-1">Phone Number</label>
        <div className="flex gap-2">
          <input
            type="text"
            {...register('countryCode')}
            className="border p-2 rounded w-1/3 text-white bg-black placeholder-gray-400"
            placeholder="+91"
          />
          <input
            type="tel"
            {...register('phone')}
            placeholder="9876543210"
            className="border p-2 rounded w-2/3 text-white bg-black placeholder-gray-400"
          />
        </div>
        {errors.countryCode && (
          <p className="text-red-500 text-xs mt-1">
            {errors.countryCode.message}
          </p>
        )}
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-white text-black py-2 rounded hover:bg-gray-200 transition"
      >
        Sign Up
      </button>
    </form>
  );
}
