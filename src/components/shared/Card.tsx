import clsx from 'clsx';
import React from 'react';

const Card = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={clsx('flex flex-col my-4 p-5 rounded-lg shadow-card hover:shadow-card2', className)}
    onClick={() => onClick && onClick()}
  >
    {console.log(onClick)}
    {children}
  </div>
);
export default Card;
