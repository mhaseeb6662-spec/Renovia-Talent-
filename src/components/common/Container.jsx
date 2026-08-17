import React from 'react';

export const Container = ({ children, className = '' }) => {
  return (
    <div className={`max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
