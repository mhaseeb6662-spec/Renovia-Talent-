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
  const baseStyles = 'inline-flex items-center justify-center text-button font-semibold tracking-normal rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950 active:scale-[0.98] cursor-pointer relative overflow-hidden w-fit flex-none';
  
  const variants = {
    primary: 'shimmer-btn text-white shadow-[0_4px_16px_rgba(37,99,235,0.30)] hover:shadow-[0_8px_24px_rgba(59,130,246,0.40)] border border-blue-400/40 hover:scale-[1.02]',
    secondary: 'bg-[#101621]/90 hover:bg-blue-600/15 text-slate-100 border border-slate-700/80 hover:border-blue-500/50 backdrop-blur-xl shadow-md shadow-black/40 hover:text-blue-300 hover:scale-[1.02]',
    outline: 'bg-transparent text-blue-400 hover:text-blue-300 border border-blue-500/60 hover:border-blue-400 hover:bg-blue-600/10',
    ghost: 'bg-transparent text-slate-300 hover:text-white hover:bg-slate-800/60',
    glass: 'bg-white/10 hover:bg-white/15 text-white border border-white/20 backdrop-blur-xl shadow-xl shadow-black/30'
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs gap-1.5 h-[36px] sm:h-[38px] rounded-lg',
    md: 'px-5 py-2.5 text-sm gap-2 h-[42px] sm:h-[44px] rounded-xl',
    lg: 'px-6 py-2.5 text-button gap-2.5 h-[44px] sm:h-[46px] rounded-xl'
  };

  const combinedClasses = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1 shrink-0" />}
      <span className="relative z-10 whitespace-nowrap leading-none">{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 shrink-0" />}
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
