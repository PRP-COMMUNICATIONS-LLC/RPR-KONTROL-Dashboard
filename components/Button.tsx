
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out';
  
  const variantStyles = {
    primary: 'bg-rpr-cyan hover:bg-rpr-teal text-rpr-black', // Cyan background, Black text
    secondary: 'bg-rpr-slate hover:bg-rpr-cyan hover:text-rpr-black text-rpr-white', // Slate background, White text, Cyan on hover
    danger: 'bg-red-600 hover:bg-red-700 text-rpr-white', // Keep standard red for danger
  };

  const sizeStyles = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg px-6 py-3',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
