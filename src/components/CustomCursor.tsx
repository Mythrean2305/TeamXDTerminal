import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../ThemeContext';

export default function CustomCursor() {
  const { colors } = useTheme();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);
  
  // Position and velocity tracking
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const angle = useRef(0);
  const targetAngle = useRef(0);
  const lastMouse = useRef({ x: 0, y: 0, time: Date.now() });

  useEffect(() => {
    // Check if device is touch-enabled
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Only enable on desktop/mouse devices to save mobile performance
    if (isTouchDevice) {
      setShouldRender(false);
      return;
    }

    setShouldRender(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      
      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        let newAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        
        let diff = newAngle - targetAngle.current;
        while (diff > 180) diff -= 360;
        while (diff < -180) diff += 360;
        
        targetAngle.current += diff;
      }
      
      target.current = { x: e.clientX, y: e.clientY };
      lastMouse.current = { x: e.clientX, y: e.clientY, time: now };
    };

    let animationId: number;
    const animate = () => {
      const ease = 0.35;
      pos.current.x += (target.current.x - pos.current.x) * ease;
      pos.current.y += (target.current.y - pos.current.y) * ease;

      const angleEase = 0.15;
      angle.current += (targetAngle.current - angle.current) * angleEase;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x - 16}px, ${pos.current.y - 2}px, 0) rotate(${angle.current}deg)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  if (!shouldRender) return null;

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

        a, button, input, textarea, [role="button"] {
          cursor: none !important;
        }
      `}</style>
      
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
        style={{ 
          transformOrigin: '16px 2px',
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