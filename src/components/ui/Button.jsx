import React from 'react';

const Button = ({ children, onClick, className, ...props }) => (
  <button className={`button ${className}`} onClick={onClick} {...props}>
    {children}
  </button>
);

export default Button;