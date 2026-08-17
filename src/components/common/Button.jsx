import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  className = '',
  icon: Icon,
  iconPosition = 'right',
  type = 'button',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center text-button font-semibold tracking-normal rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950 active:scale-[0.98] cursor-pointer relative overflow-hidden h-[48px] sm:h-[52px] w-fit flex-none';
  
  const variants = {
    primary: 'shimmer-btn text-white shadow-[0_10px_30px_rgba(37,99,235,0.25)] hover:shadow-[0_15px_35px_rgba(59,130,246,0.35)] border border-blue-400/30 hover:scale-[1.02]',
    secondary: 'bg-[#101621]/90 hover:bg-blue-600/15 text-slate-100 border border-slate-700/80 hover:border-blue-500/50 backdrop-blur-xl shadow-md shadow-black/40 hover:text-blue-300 hover:scale-[1.02]',
    outline: 'bg-transparent text-blue-400 hover:text-blue-300 border border-blue-500/60 hover:border-blue-400 hover:bg-blue-600/10',
    ghost: 'bg-transparent text-slate-300 hover:text-white hover:bg-slate-800/60',
    glass: 'bg-white/10 hover:bg-white/15 text-white border border-white/20 backdrop-blur-xl shadow-xl shadow-black/30'
  };

  const sizes = {
    sm: 'px-5 text-sm gap-2 h-[42px] sm:h-[46px]',
    md: 'px-6 text-button gap-2.5 h-[48px] sm:h-[52px]',
    lg: 'px-7 text-button gap-3 h-[50px] sm:h-[54px]'
  };

  const combinedClasses = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:-translate-x-1" />}
      <span className="relative z-10 whitespace-nowrap">{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />}
    </>
  );

  if (href) {
    return (
      <a href={href} className={`group ${combinedClasses}`} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={`group ${combinedClasses}`} {...props}>
      {content}
    </button>
  );
};

export default Button;
