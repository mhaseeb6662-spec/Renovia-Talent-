import React from 'react';

export const VideoBackground = ({ videoSrc, posterSrc, overlayStyle, children }) => {
  return (
    <div className="relative w-full">
      {/* Video Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={posterSrc}
          className="absolute inset-0 w-full h-full object-cover motion-reduce:hidden"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        
        {/* Fallback image for reduced motion or failing video */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center hidden motion-reduce:block"
          style={{ backgroundImage: `url(${posterSrc})` }}
        />
        
        {/* Custom Overlay (e.g. gradient fade at bottom to blend) */}
        <div className={`absolute inset-0 ${overlayStyle || 'bg-gradient-to-b from-[#05070D]/80 via-[#05070D]/70 to-[#05070D]'}`} />
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default VideoBackground;
