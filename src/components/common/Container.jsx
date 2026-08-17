import React from 'react';

export const Container = ({ children, className = '' }) => {
  return (
    <div className={`max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
