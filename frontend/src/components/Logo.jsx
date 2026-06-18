import React from 'react';
import logoImg from '../assets/logo.png.png';

const Logo = ({ className, style }) => {
  return (
    <div className={`logo-crop-circle ${className || ''}`} style={style}>
      <img 
        src={logoImg} 
        alt="UK Logo" 
        className="logo-img-inner"
      />
    </div>
  );
};

export default Logo;
