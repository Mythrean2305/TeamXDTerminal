import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../ThemeContext';

export default function CustomCursor() {
  const { colors } = useTheme();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  
  // Position and velocity tracking
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const angle = useRef(0);
  const targetAngle = useRef(0);
  const lastMouse = useRef({ x: 0, y: 0, time: Date.now() });

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      
      // Calculate delta movement
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      
      // Update target angle only if there is significant movement to prevent jitter
      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        let newAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        
        // Handle angle wrapping for smooth rotation (prevent 360 flips)
        let diff = newAngle - targetAngle.current;
        while (diff > 180) diff -= 360;
        while (diff < -180) diff += 360;
        
        targetAngle.current += diff;
      }
      
      target.current = { x: e.clientX, y: e.clientY };
      lastMouse.current = { x: e.clientX, y: e.clientY, time: now };
    };

    const animate = () => {
      // Very snappy interpolation (0.35) to minimize visual lag during clicks
      const ease = 0.35;
      pos.current.x += (target.current.x - pos.current.x) * ease;
      pos.current.y += (target.current.y - pos.current.y) * ease;

      // Smooth angle interpolation
      const angleEase = 0.15;
      angle.current += (targetAngle.current - angle.current) * angleEase;

      // Update cursor using translate3d
      // We subtract 16 and 2 to ensure the SVG tip (16, 2) is exactly on the mouse point
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x - 16}px, ${pos.current.y - 2}px, 0) rotate(${angle.current}deg)`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
        
        body {
          margin: 0;
          padding: 0;
        }

        /* Ensure interactive elements still show the custom cursor */
        a, button, input, textarea, [role="button"] {
          cursor: none !important;
        }
      `}</style>
      
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
        style={{ 
          transformOrigin: '16px 2px', // Rotate around the tip of the arrow
          width: '32px',
          height: '32px'
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          style={{
            filter: `drop-shadow(0 0 8px ${colors.glow})`,
            display: 'block'
          }}
        >
          <path
            d="M16 2 C16 2, 18 3, 19.5 5 L28 22 C28.5 23, 28 24, 27 24.5 L17 20.5 C16.5 20.3, 15.5 20.3, 15 20.5 L5 24.5 C4 24, 3.5 23, 4 22 L12.5 5 C14 3, 16 2, 16 2 Z"
            fill="rgba(0,0,0,0.9)"
            stroke={colors.primary}
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </>
  );
}
