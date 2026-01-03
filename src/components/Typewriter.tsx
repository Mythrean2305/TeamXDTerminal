import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number; // Configurable speed (default 20ms)
  delay?: number;
  onComplete?: () => void;
  onChar?: (char: string) => void;
  className?: string;
  showCursor?: boolean;
}

const Typewriter: React.FC<TypewriterProps> = ({ 
  text, 
  speed = 20, 
  delay = 0, 
  onComplete, 
  onChar,
  className = "",
  showCursor = true
}) => {
  const [displayText, setDisplayText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        const char = text[i];
        
        // Trigger sound effect for non-space characters
        if (char !== ' ' && onChar) {
          onChar(char);
        }
        
        // Use substring logic as specified
        setDisplayText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, started, onComplete, onChar]);

  return (
    <span className={`${className} ${showCursor ? 'cursor-blink' : ''} inline-block whitespace-pre-wrap`}>
      {displayText}
    </span>
  );
};

export default Typewriter;