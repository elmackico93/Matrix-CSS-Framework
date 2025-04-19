import React, { useState, useEffect, useRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { HeroProps } from './Hero.types';

// Enhanced glitch text component
const EnhancedGlitchText: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  return (
    <div className={cn("relative font-matrix-hacker", className)}>
      {/* Main text */}
      <span className="relative z-[2] text-[var(--m-text-bright)] mix-blend-screen">
        {text}
      </span>
      
      {/* Glitch layers */}
      <span
        className="absolute top-0 left-0 w-full h-full z-[1] text-[#00f8] opacity-50 blur-[0.5px] animate-[glitch-offset_3.5s_infinite_alternate-reverse]"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)', transform: 'translateX(-2px)' }}
        aria-hidden="true"
      >
        {text}
      </span>
      
      <span
        className="absolute top-0 left-0 w-full h-full z-[1] text-[#f008] opacity-50 blur-[0.5px] animate-[glitch-offset_2.5s_infinite_alternate]"
        style={{ clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)', transform: 'translateX(2px)' }}
        aria-hidden="true"
      >
        {text}
      </span>
    </div>
  );
};

// Define hero variants using class-variance-authority
const heroVariants = cva(
  'relative flex flex-col justify-center items-center text-center px-4 overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-matrix-bg',
        dark: 'bg-black',
        terminal: 'bg-matrix-panel border border-matrix-border',
        gradient: 'bg-gradient-to-br from-matrix-dark to-matrix-panel',
        cyber: 'bg-matrix-bg relative after:absolute after:inset-0 after:bg-[radial-gradient(circle,rgba(0,255,65,0.1)_0%,rgba(0,0,0,0)_70%)] after:z-0',
      },
      size: {
        sm: 'min-h-[50vh]',
        md: 'min-h-[70vh]',
        lg: 'h-screen',
        auto: 'min-h-min py-16',
      },
      contentAlignment: {
        center: 'text-center items-center',
        left: 'text-left items-start',
        right: 'text-right items-end',
      },
      titleEffect: {
        none: '',
        glitch: '',
        glow: 'text-shadow-[0_0_20px_var(--m-glow),0_0_40px_var(--m-glow)] animate-[pulse_3s_infinite]',
        both: 'text-shadow-[0_0_20px_var(--m-glow),0_0_40px_var(--m-glow)] animate-[pulse_3s_infinite]',
      },
      hasRainEffect: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'lg',
      contentAlignment: 'center',
      titleEffect: 'both',
      hasRainEffect: true,
    },
  }
);

/**
 * Hero component with Matrix-inspired visual effects and styling
 * 
 * @example
 * // Basic usage
 * <Hero title="MATRIX.CSS" subtitle="A cyberpunk design framework">
 *   <Button variant="primary">Get Started</Button>
 * </Hero>
 * 
 * @example
 * // With custom styling and props
 * <Hero 
 *   variant="cyber"
 *   size="lg"
 *   title="ENTER THE MATRIX" 
 *   subtitle="Immerse your users in the digital realm with our framework"
 *   titleEffect="glitch"
 *   hasRainEffect={true}
 * >
 *   <div className="flex gap-4">
 *     <Button variant="primary">Documentation</Button>
 *     <Button variant="outline">Components</Button>
 *   </div>
 * </Hero>
 */
const Hero = React.forwardRef<HTMLDivElement, HeroProps>(
  ({
    className,
    children,
    variant,
    size,
    contentAlignment,
    titleEffect,
    hasRainEffect,
    title,
    subtitle,
    titleClassName,
    subtitleClassName,
    contentClassName,
    showScrollIndicator = false,
    showVersion = false,
    version = 'VERSION 1.0',
    ...props
  }, ref) => {
    const rainCanvasRef = useRef<HTMLCanvasElement>(null);
    const [isCanvasReady, setIsCanvasReady] = useState(false);
    const [titleVisible, setTitleVisible] = useState(false);
    const [subtitleVisible, setSubtitleVisible] = useState(false);
    
    // Initialize matrix rain animation
    useEffect(() => {
      if (!rainCanvasRef.current || !hasRainEffect) return;

      const canvas = rainCanvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas dimensions
      const resizeCanvas = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      };

      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      setIsCanvasReady(true);

      // Matrix characters (including Japanese katakana for authenticity)
      const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      
      // Set up columns
      const fontSize = 16;
      const columns = Math.floor(canvas.width / fontSize);
      const drops: number[] = [];
      
      // Initialize drops
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -20);
      }
      
      // Animation function
      const draw = () => {
        // Semi-transparent black background for the trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set green text color
        ctx.fillStyle = '#00ff41';
        ctx.font = `${fontSize}px monospace`;
        
        // Loop over each column
        for (let i = 0; i < drops.length; i++) {
          // Random character
          const char = chars[Math.floor(Math.random() * chars.length)];
          
          // Randomize brightness for some characters
          if (Math.random() > 0.95) {
            ctx.fillStyle = '#00ff97'; // Brighter green
          } else {
            ctx.fillStyle = '#00ff41'; // Regular green
          }
          
          // Draw character
          ctx.fillText(char, i * fontSize, drops[i] * fontSize);
          
          // Move drops down
          drops[i]++;
          
          // Reset to top with randomness
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = Math.floor(Math.random() * -20);
          }
        }
        
        animationRef.current = requestAnimationFrame(draw);
      };
      
      // Start animation
      const animationRef = { current: requestAnimationFrame(draw) };
      
      return () => {
        window.removeEventListener('resize', resizeCanvas);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, [hasRainEffect]);

    // Fade in title and subtitle with delay
    useEffect(() => {
      // Title appears first
      const titleTimer = setTimeout(() => {
        setTitleVisible(true);
      }, 200);
      
      // Subtitle appears slightly after
      const subtitleTimer = setTimeout(() => {
        setSubtitleVisible(true);
      }, 600);
      
      return () => {
        clearTimeout(titleTimer);
        clearTimeout(subtitleTimer);
      };
    }, []);

    return (
      <section
        ref={ref}
        className={cn(heroVariants({ variant, size, contentAlignment, titleEffect, hasRainEffect }), className)}
        {...props}
      >
        {/* Digital Rain Canvas */}
        {hasRainEffect && (
          <canvas 
            ref={rainCanvasRef}
            className={cn(
              "absolute top-0 left-0 w-full h-full -z-10",
              isCanvasReady ? "opacity-100" : "opacity-0",
              "transition-opacity duration-1000"
            )}
            aria-hidden="true"
          />
        )}
        
        {/* Hero Content */}
        <div className={cn(
          "relative z-2 max-w-4xl w-full",
          contentClassName
        )}>
          {/* Title */}
          {title && (
            <div 
              className={cn(
                "mb-8",
                "transition-all duration-800 ease-out",
                titleVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-6",
                titleClassName
              )}
            >
              <h1 className="text-[clamp(3rem,8vw,8rem)] font-bold tracking-[6px] mb-2 uppercase">
                {titleEffect === 'glitch' || titleEffect === 'both' ? (
                  <EnhancedGlitchText 
                    text={title} 
                    className={titleEffect === 'both' ? "text-shadow-[0_0_20px_var(--m-glow),0_0_40px_var(--m-glow)] animate-[pulse_3s_infinite]" : ""} 
                  />
                ) : (
                  <span className={cn(
                    titleEffect === 'glow' || titleEffect === 'both' 
                      ? "text-shadow-[0_0_20px_var(--m-glow),0_0_40px_var(--m-glow)] animate-[pulse_3s_infinite]" 
                      : ""
                  )}>
                    {title}
                  </span>
                )}
              </h1>
              <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--m-text)] to-transparent my-5 animate-[expand_2s_ease]"></div>
            </div>
          )}
          
          {/* Subtitle area */}
          {subtitle && (
            <div 
              className={cn(
                "subtitle-container relative w-full",
                "transition-all duration-500 ease-in-out",
                subtitleVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-4",
                subtitleClassName
              )}
            >
              {/* Backdrop blur effect */}
              <div className="absolute inset-0 backdrop-blur-sm rounded bg-gradient-to-b from-[rgba(0,0,0,0.25)] to-[rgba(0,0,0,0.5)] border border-[var(--m-border)]"></div>
              
              <p className="relative z-1 text-[clamp(1rem,2vw,1.5rem)] max-w-3xl mx-auto mb-12 leading-relaxed text-shadow-[0_0_10px_var(--m-glow)] p-5 rounded">
                {subtitle}
              </p>
            </div>
          )}
          
          {/* Children content (buttons, etc.) */}
          {children && (
            <div className="mt-8">
              {children}
            </div>
          )}
          
          {/* Version badge */}
          {showVersion && (
            <div className="mt-12 opacity-80 text-[0.9rem]">
              <span className="py-[0.3rem] px-[0.8rem] text-[0.9rem] tracking-[1px] border border-[var(--m-border)] rounded bg-[rgba(0,0,0,0.3)]">
                {version}
              </span>
            </div>
          )}
        </div>
        
        {/* Scroll indicator */}
        {showScrollIndicator && (
          <div className="absolute bottom-[2rem] left-1/2 transform -translate-x-1/2 animate-[bounce_2s_infinite] cursor-pointer">
            <a href="#content" className="text-[var(--m-text)] flex flex-col items-center no-underline">
              <span className="text-[0.8rem] block mb-2 uppercase tracking-[2px]">
                Scroll Down
              </span>
              <span className="block transform rotate-45 w-[15px] h-[15px] border-r-2 border-b-2 border-[var(--m-text)]"></span>
            </a>
          </div>
        )}
        
        {/* Global styles for animations */}
        <style jsx>{`
          @keyframes pulse {
            0%, 100% { opacity: 0.9; text-shadow: 0 0 20px var(--m-glow); }
            50% { opacity: 1; text-shadow: 0 0 30px var(--m-glow), 0 0 40px var(--m-glow); }
          }
          
          @keyframes expand {
            from { transform: scaleX(0); }
            to { transform: scaleX(1); }
          }
          
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); }
            40% { transform: translateY(-15px) translateX(-50%); }
            60% { transform: translateY(-10px) translateX(-50%); }
          }
          
          @keyframes glitch-offset {
            0% { transform: translateX(0); }
            25% { transform: translateX(-2px); }
            50% { transform: translateX(0); }
            75% { transform: translateX(2px); }
            100% { transform: translateX(0); }
          }
        `}</style>
      </section>
    );
  }
);

Hero.displayName = 'Hero';

export { Hero, heroVariants };