import React from 'react';

export const SectionHeading = ({
  badge,
  title,
  subtitle,
  centered = false,
  className = ''
}) => {
  return (
    <div className={`space-y-4 ${centered ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'} ${className}`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#101621]/90 border border-blue-500/40 text-blue-300 text-label font-semibold backdrop-blur-xl shadow-lg shadow-blue-500/10 ${centered ? 'mx-auto' : ''}`}>
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
          <span>{badge}</span>
        </div>
      )}
      
      {title && (
        <h2 className="text-h1 font-bold text-white tracking-[-0.025em] [text-wrap:balance]">
          {title}
        </h2>
      )}
      
      {subtitle && (
        <p className={`text-body-lg text-slate-300 font-normal leading-relaxed max-w-[65ch] ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
