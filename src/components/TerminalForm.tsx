
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../ThemeContext';
import Typewriter from './Typewriter';

interface Step {
  id: string;
  question: string;
  type: 'text' | 'email' | 'textarea';
}

const TerminalForm: React.FC = () => {
  const { colors } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [inputValue, setInputValue] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const steps: Step[] = [
    { id: 'name', question: 'IDENTIFY YOURSELF (NAME):', type: 'text' },
    { id: 'email', question: 'ENTRY POINT (EMAIL):', type: 'email' },
    { id: 'message', question: 'TRANSMISSION DATA (MESSAGE):', type: 'textarea' },
  ];

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [currentStep, isCompleted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const currentStepData = steps[currentStep];
    setFormData(prev => ({ ...prev, [currentStepData.id]: inputValue }));
    setInputValue('');

    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsCompleted(true);
      console.log('Form Submitted:', { ...formData, [currentStepData.id]: inputValue });
    }
  };

  if (isCompleted) {
    return (
      <div className="space-y-4">
        <p className="text-green-500 uppercase font-bold">
          <Typewriter text="TRANSMISSION SUCCESSFUL. DATA ENCRYPTED AND STORED." speed={30} />
        </p>
        <div className="p-4 border" style={{ borderColor: colors.primary }}>
          <pre className="text-xs opacity-70" style={{ color: colors.primary }}>
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
        <button 
          onClick={() => {
            setIsCompleted(false);
            setCurrentStep(0);
            setFormData({});
          }}
          className="text-xs underline hover:no-underline"
          style={{ color: colors.primary }}
        >
          INITIATE NEW HANDSHAKE?
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {steps.slice(0, currentStep).map((step, idx) => (
          <div key={step.id} className="opacity-50">
            <p className="text-xs uppercase" style={{ color: colors.accent }}>{step.question}</p>
            <p className="text-lg font-bold" style={{ color: colors.primary }}>&gt; {formData[step.id]}</p>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <p className="text-sm uppercase tracking-widest font-bold" style={{ color: colors.primary }}>
          <Typewriter 
            key={currentStep} 
            text={steps[currentStep].question} 
            speed={20} 
            showCursor={false}
          />
        </p>
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <span className="text-lg font-bold" style={{ color: colors.primary }}>&gt;</span>
          <input
            ref={inputRef}
            type={steps[currentStep].type}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-lg font-mono placeholder:opacity-20"
            style={{ color: colors.primary }}
            placeholder="..."
            autoFocus
          />
        </form>
      </div>

      <div className="text-[10px] opacity-40 uppercase mt-8" style={{ color: colors.accent }}>
        Press ENTER to confirm input
      </div>
    </div>
  );
};

export default TerminalForm;
