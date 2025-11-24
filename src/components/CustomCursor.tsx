// app/components/CustomCursor.tsx
'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorOutline = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursorDotCurrent = cursorDot.current;
    const cursorOutlineCurrent = cursorOutline.current;

    if (!cursorDotCurrent || !cursorOutlineCurrent) return;

    // Mouse position variables
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    let dotX = 0;
    let dotY = 0;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateCursor = () => {
      // Dot follows mouse instantly
      dotX = mouseX;
      dotY = mouseY;

      // Outline follows with smooth delay
      outlineX += (mouseX - outlineX) * 0.1;
      outlineY += (mouseY - outlineY) * 0.1;

      // Apply positions
      if (cursorDotCurrent && cursorOutlineCurrent) {
        cursorDotCurrent.style.left = dotX + 'px';
        cursorDotCurrent.style.top = dotY + 'px';
        
        cursorOutlineCurrent.style.left = outlineX + 'px';
        cursorOutlineCurrent.style.top = outlineY + 'px';
      }

      requestAnimationFrame(animateCursor);
    };

    // Hide cursor when mouse leaves window
    const handleMouseLeaveWindow = () => {
      if (cursorDotCurrent && cursorOutlineCurrent) {
        cursorDotCurrent.style.opacity = '0';
        cursorOutlineCurrent.style.opacity = '0';
      }
    };

    const handleMouseEnterWindow = () => {
      if (cursorDotCurrent && cursorOutlineCurrent) {
        cursorDotCurrent.style.opacity = '1';
        cursorOutlineCurrent.style.opacity = '1';
      }
    };

    // Event listeners
    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    // Start animation loop
    animateCursor();

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorDot} 
        className="cursor-dot hidden lg:block"
      ></div>
      <div 
        ref={cursorOutline} 
        className="cursor-outline hidden lg:block"
      ></div>
    </>
  );
}