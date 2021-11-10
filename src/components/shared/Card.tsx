import clsx from 'clsx';
import React from 'react';

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div
    className={clsx('flex flex-col my-4 p-5 rounded-lg shadow-card hover:shadow-card2', className)}
  >
    {children}
  </div>
);
export default Card;
