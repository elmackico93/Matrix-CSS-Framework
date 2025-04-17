import React, { useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';
import { 
  ModalProps, 
  ModalHeaderProps, 
  ModalBodyProps, 
  ModalFooterProps,
  ModalAnimationVariant,
  ModalPosition,
  ModalSize,
  ModalTheme
} from './Modal.types';

// Helper to get animation classnames based on variant
const getAnimationClasses = (
  variant: ModalAnimationVariant, 
  isClosing: boolean
): string => {
  const base = 'transition-all';
  
  if (variant === 'none') {
    return '';
  }
  
  const animationMap: Record<ModalAnimationVariant, { in: string, out: string }> = {
    'fade': { 
      in: 'animate-fade-in opacity-100', 
      out: 'animate-fade-out opacity-0' 
    },
    'slide': { 
      in: 'translate-y-0 opacity-100', 
      out: 'translate-y-4 opacity-0' 
    },
    'scale': { 
      in: 'scale-100 opacity-100', 
      out: 'scale-95 opacity-0' 
    },
    'glitch': { 
      in: 'opacity-100', 
      out: 'opacity-0' 
    },
    'terminal': { 
      in: 'opacity-100', 
      out: 'opacity-0' 
    },
    'none': { 
      in: '', 
      out: '' 
    },
  };
  
  return `${base} ${isClosing ? animationMap[variant].out : animationMap[variant].in}`;
};

// Helper to get size classes
const getSizeClasses = (size: ModalSize): string => {
  const sizeMap: Record<ModalSize, string> = {
    'xs': 'max-w-xs',
    'sm': 'max-w-sm',
    'md': 'max-w-md',
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
    'full': 'max-w-full w-full h-full m-0 rounded-none',
  };
  
  return sizeMap[size];
};

// Helper to get position classes
const getPositionClasses = (position: ModalPosition): string => {
  const positionMap: Record<ModalPosition, string> = {
    'center': 'items-center justify-center',
    'top': 'items-start justify-center pt-16',
    'right': 'items-center justify-end pr-16',
    'bottom': 'items-end justify-center pb-16',
    'left': 'items-center justify-start pl-16',
    'top-left': 'items-start justify-start pt-16 pl-16',
    'top-right': 'items-start justify-end pt-16 pr-16',
    'bottom-left': 'items-end justify-start pb-16 pl-16',
    'bottom-right': 'items-end justify-end pb-16 pr-16',
  };
  
  return positionMap[position];
};

// Helper to get theme classes
const getThemeClasses = (theme: ModalTheme): string => {
  const themeMap: Record<ModalTheme, string> = {
    'default': 'bg-matrix-panel border-matrix-border',
    'terminal': 'bg-black border-matrix-text font-matrix-hacker text-matrix-text',
    'cyber': 'bg-matrix-dark border-matrix-primary',
    'alert': 'bg-matrix-panel border-matrix-warning',
    'danger': 'bg-matrix-panel border-matrix-danger',
    'matrix': 'bg-black border-matrix-text',
    'neural': 'bg-matrix-dark border-matrix-text-bright',
  };
  
  return themeMap[theme];
};

// TypeWriter component for terminal effect
const TypeWriter: React.FC<{ 
  text: string | React.ReactNode; 
  speed?: number;
  onComplete?: () => void;
  className?: string;
}> = ({ text, speed = 50, onComplete, className }) => {
  const [displayText, setDisplayText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  
  useEffect(() => {
    if (typeof text !== 'string') return;
    
    let i = 0;
    setDisplayText('');
    
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        if (onComplete) onComplete();
      }
    }, speed);
    
    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    
    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [text, speed, onComplete]);
  
  if (typeof text !== 'string') {
    return <>{text}</>;
  }
  
  return (
    <div className={cn('font-matrix-hacker', className)}>
      {displayText}
      <span className={cn('animate-blink', cursorVisible ? 'opacity-100' : 'opacity-0')}>█</span>
    </div>
  );
};

// Matrix code rain background component
const CodeRain: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none z-0">
      <div className="matrix-code-bg"></div>
    </div>
  );
};

// Custom audio effects
const useAudioEffect = (enableSoundEffects: boolean) => {
  const playOpenSound = useCallback(() => {
    if (!enableSoundEffects) return;
    
    // Simple synthesized sound using Web Audio API
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContext();
      
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.3);
    } catch (e) {
      console.error('Web Audio API not supported', e);
    }
  }, [enableSoundEffects]);
  
  const playCloseSound = useCallback(() => {
    if (!enableSoundEffects) return;
    
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContext();
      
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(220, audioCtx.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.3);
    } catch (e) {
      console.error('Web Audio API not supported', e);
    }
  }, [enableSoundEffects]);
  
  return { playOpenSound, playCloseSound };
};

// Modal implementation
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEsc = true,
  animation = 'fade',
  animationDuration = 300,
  size = 'md',
  position = 'center',
  backdropBlur = 2,
  showCodeRain = false,
  enableSoundEffects = false,
  theme = 'default',
  hasGlitchEffect = false,
  hasGlowEffect = false,
  scrollable = true,
  id,
  zIndex = 1000,
  customCloseButton,
  loadingComponent,
  isLoading = false,
  autoFocus = true,
  onOpen,
  onClosed,
  typewriterEffect = false,
  typewriterSpeed = 50,
  fullHeight = false,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { playOpenSound, playCloseSound } = useAudioEffect(enableSoundEffects);
  
  // Handle modal open effect
  useEffect(() => {
    if (isOpen && !mounted) {
      setMounted(true);
      if (onOpen) onOpen();
      playOpenSound();
      
      // Auto focus first focusable element
      if (autoFocus && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length > 0) {
          (focusableElements[0] as HTMLElement).focus();
        }
      }
    }
  }, [isOpen, autoFocus, mounted, onOpen, playOpenSound]);
  
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && closeOnEsc) {
        handleClose();
      }
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEsc]);
  
  // Handle body scroll
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);
  
  const handleClose = useCallback(() => {
    playCloseSound();
    
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setMounted(false);
      onClose();
      if (onClosed) onClosed();
    }, animationDuration);
  }, [animationDuration, onClose, onClosed, playCloseSound]);
  
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === backdropRef.current) {
      handleClose();
    }
  }, [closeOnBackdropClick, handleClose]);
  
  // If modal is not open and not in closing animation, return null
  if ((!isOpen && !isClosing) || !mounted) return null;
  
  const backdropStyle = {
    backdropFilter: `blur(${backdropBlur}px)`,
    WebkitBackdropFilter: `blur(${backdropBlur}px)`,
    transitionDuration: `${animationDuration}ms`,
    zIndex
  };
  
  const modalContent = (
    <div
      ref={backdropRef}
      className={cn(
        'fixed inset-0 bg-matrix-overlay flex p-4',
        getPositionClasses(position),
        getAnimationClasses(animation, isClosing)
      )}
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      style={backdropStyle}
    >
      {showCodeRain && <CodeRain />}
      
      <div
        ref={modalRef}
        className={cn(
          'relative border rounded shadow-lg w-full transform transition-all',
          getSizeClasses(size),
          getThemeClasses(theme),
          hasGlitchEffect && 'animate-glitch',
          hasGlowEffect && 'shadow-[0_0_15px_var(--matrix-glow)]',
          fullHeight && 'h-full',
          className
        )}
        style={{ transitionDuration: `${animationDuration}ms` }}
        id={id}
      >
        {isLoading && loadingComponent ? (
          loadingComponent
        ) : (
          <>
            {showCloseButton && (
              <button
                className="absolute top-3 right-3 text-matrix-text-dim hover:text-matrix-text-bright z-10"
                onClick={handleClose}
                aria-label="Close modal"
              >
                {customCloseButton || (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                )}
              </button>
            )}
            
            {typewriterEffect ? (
              <TypeWriter 
                text={children} 
                speed={typewriterSpeed}
                className="p-4"
              />
            ) : (
              children
            )}
          </>
        )}
      </div>
    </div>
  );
  
  // Use portal for rendering
  return createPortal(modalContent, document.body);
};

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  className,
  children,
  hasGlitchEffect = false,
  hasGlowEffect = false,
  theme,
  typewriterEffect = false,
  typewriterSpeed = 50
}) => {
  const themeClasses = theme ? getThemeClasses(theme) : '';
  
  return (
    <div
      className={cn(
        'border-b border-matrix-border p-4 font-matrix-hacker',
        hasGlitchEffect && 'animate-glitch',
        hasGlowEffect && 'text-shadow-[0_0_10px_var(--matrix-glow)]',
        themeClasses,
        className
      )}
    >
      {typewriterEffect ? (
        <TypeWriter text={children} speed={typewriterSpeed} />
      ) : (
        children
      )}
    </div>
  );
};

export const ModalBody: React.FC<ModalBodyProps> = ({
  className,
  children,
  scrollable = true,
  typewriterEffect = false,
  typewriterSpeed = 50,
  hasGlitchEffect = false,
  showCodeRain = false
}) => {
  return (
    <div 
      className={cn(
        'p-4 relative',
        scrollable && 'overflow-y-auto max-h-[70vh]',
        hasGlitchEffect && 'animate-glitch',
        className
      )}
    >
      {showCodeRain && <CodeRain />}
      
      {typewriterEffect ? (
        <TypeWriter text={children} speed={typewriterSpeed} />
      ) : (
        children
      )}
    </div>
  );
};

export const ModalFooter: React.FC<ModalFooterProps> = ({
  className,
  children,
  hasGlitchEffect = false,
  hasGlowEffect = false,
  theme
}) => {
  const themeClasses = theme ? getThemeClasses(theme) : '';
  
  return (
    <div
      className={cn(
        'border-t border-matrix-border p-4 flex justify-end space-x-2',
        hasGlitchEffect && 'animate-glitch',
        hasGlowEffect && 'text-shadow-[0_0_10px_var(--matrix-glow)]',
        themeClasses,
        className
      )}
    >
      {children}
    </div>
  );
};