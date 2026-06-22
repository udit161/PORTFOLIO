import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.png.png';

const Logo = ({ className, style }) => {
  return (
    <Link to="/" className={`logo-crop-circle ${className || ''}`} style={style}>
      <img 
        src={logoImg} 
        alt="UK Logo" 
        className="logo-img-inner"
      />
    </Link>
  );
};

export default Logo;
