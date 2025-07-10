import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

export default function Logo() {
  return (
    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-20">
      <Link to="/">
        <img
          src={logo}
          alt="PayPact Logo"
          className="w-48 cursor-pointer filter invert brightness-200 hover:scale-105 transition-transform duration-200"
        />
      </Link>
    </div>
  );
}
