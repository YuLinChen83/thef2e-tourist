import clsx from 'clsx';
import React from 'react';

export const Button = ({
  variant,
  className,
  onClick,
  disabled,
  children,
  ...props
}: {
  variant?: string;
  className?: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) => (
  <button
    className={clsx(
      'h-8 flex items-center mr-4 px-4 rounded-3xl whitespace-nowrap',
      variant === 'outlined' &&
        'bg-white text-primary-700 border border-primary-700 hover:bg-primary-100',
      variant === 'filled' && 'text-white bg-primary-700 hover:bg-primary-900',
      className,
    )}
    onClick={onClick}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);

export default Button;
