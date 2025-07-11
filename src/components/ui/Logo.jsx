import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

export default function Logo() {
  return (
    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
      <Link to="/" className="block">
        <img
          src={logo}
          alt="PayPact Logo"
          className="w-48 cursor-pointer filter invert brightness-200 transition-all duration-300 ease-in-out hover:scale-110 hover:drop-shadow-lg"
        />
      </Link>
    </div>
  );
}
