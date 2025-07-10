import React from 'react';
import logo from '../../assets/logo.png';

export default function Logo() {
  return (
    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
      <img
        src={logo}
        alt="PayPact Logo"
        className="w-48 filter invert brightness-200"
      />
    </div>
  );
}
