import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Phone must be 10 digits starting with 6–9'),
});

export default function SignUp({ setOtpSent }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    const fullPhone = `+91 ${data.phone}`;
    console.log('SignUp Data:', { ...data, fullPhone });
    setOtpSent(true);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm space-y-5"
    >
      <div>
        <label className="block text-sm text-gray-300 mb-1">Email</label>
        <input
          type="email"
          {...register('email')}
          placeholder="you@example.com"
          className="w-full p-2 rounded border bg-black text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm text-gray-300 mb-1">Mobile Number</label>
        <div className="flex gap-2">
          <input
            value="+91"
            disabled
            readOnly
            className="w-1/3 p-2 rounded border bg-black text-white text-center"
          />
          <input
            type="tel"
            {...register('phone')}
            placeholder="9876543210"
            className="w-2/3 p-2 rounded border bg-black text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
          />
        </div>
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
