import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded relative border font-matrix transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-matrix-text focus:ring-opacity-50 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'bg-matrix-panel border-matrix-border text-matrix-text hover:bg-matrix-secondary hover:text-matrix-text-bright before:absolute before:inset-0 before:border-t-2 before:border-t-matrix-text before:opacity-0 hover:before:opacity-100 before:transition-opacity',
        primary:
          'bg-matrix-primary bg-opacity-20 border-matrix-primary text-matrix-text-bright hover:bg-opacity-30 hover:border-matrix-text-bright',
        outline:
          'bg-transparent border-matrix-text text-matrix-text hover:bg-matrix-text hover:bg-opacity-10',
        ghost:
          'bg-transparent border-transparent text-matrix-text hover:bg-matrix-text hover:bg-opacity-10',
        terminal:
          'bg-black bg-opacity-60 border-matrix-text text-matrix-text font-matrix-hacker hover:text-matrix-text-bright hover:border-matrix-text-bright hover:shadow-[0_0_10px_var(--m-glow)]',
        danger:
          'bg-matrix-danger bg-opacity-20 border-matrix-danger text-matrix-danger hover:bg-opacity-30',
        
        // Enhanced Variants
        neon:
          'bg-transparent border-2 border-matrix-text text-matrix-text shadow-[0_0_10px_var(--m-glow),inset_0_0_10px_var(--m-glow)] hover:text-matrix-text-bright hover:shadow-[0_0_15px_var(--m-glow),inset_0_0_15px_var(--m-glow)] hover:border-matrix-text-bright transition-all',
        
        holographic:
          'bg-[rgba(0,40,0,0.3)] backdrop-blur-sm border border-[rgba(0,255,65,0.3)] text-matrix-text shadow-[inset_0_0_10px_rgba(0,255,65,0.3)] hover:bg-[rgba(0,60,0,0.4)] hover:border-[rgba(0,255,65,0.6)] hover:shadow-[inset_0_0_15px_rgba(0,255,65,0.5),0_0_20px_rgba(0,255,65,0.4)] hover:text-matrix-text-bright transition-all',
        
        cyber:
          'clip-path-cyber bg-gradient-to-br from-[rgba(7,39,7,0.8)] to-[rgba(10,63,10,0.8)] border-0 text-matrix-text hover:bg-gradient-to-br hover:from-[rgba(10,63,10,0.9)] hover:to-[rgba(0,255,65,0.3)] hover:text-matrix-text-bright transition-colors',
        
        '3d':
          'bg-gradient-to-b from-[rgba(10,63,10,0.9)] to-[rgba(7,39,7,0.9)] border-0 text-matrix-text shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-3px_0_rgba(0,0,0,0.3),0_4px_0_rgba(0,0,0,0.3),0_5px_5px_rgba(0,0,0,0.3)] hover:translate-y-[-2px] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-3px_0_rgba(0,0,0,0.3),0_6px_0_rgba(0,0,0,0.3),0_7px_7px_rgba(0,0,0,0.3)] active:translate-y-[2px] active:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-1px_0_rgba(0,0,0,0.3),0_2px_0_rgba(0,0,0,0.3)] transition-all',
        
        pill:
          'rounded-full bg-matrix-secondary border border-matrix-border text-matrix-text hover:bg-[rgba(0,40,0,0.6)] hover:text-matrix-text-bright hover:border-matrix-text transition-colors',
        
        bordered:
          'bg-transparent border-2 border-matrix-border text-matrix-text hover:bg-[rgba(0,255,65,0.1)] hover:border-matrix-text hover:text-matrix-text-bright transition-all',
        
        data:
          'bg-matrix-secondary border border-matrix-border text-matrix-text hover:bg-[rgba(0,40,0,0.6)] hover:border-matrix-text group relative overflow-hidden before:content-["01001110"] before:absolute before:left-0 before:top-0 before:w-full before:text-center before:text-matrix-text-bright before:-translate-y-full before:group-hover:translate-y-0 before:opacity-0 before:group-hover:opacity-100 before:transition-all before:duration-300 hover:text-transparent transition-colors',
        
        // New Variants
        glitch:
          'bg-matrix-bg border border-matrix-text text-matrix-text relative overflow-hidden before:content-[""] before:absolute before:inset-0 before:bg-matrix-text before:opacity-0 before:z-[-1] hover:before:opacity-10 after:content-[""] after:absolute after:left-0 after:top-0 after:w-full after:h-full after:bg-[rgba(0,255,65,0.2)] after:translate-x-[-110%] after:skew-x-[20deg] hover:after:translate-x-[110%] after:transition-transform after:duration-500 hover:text-matrix-text-bright hover:animate-glitch transition-colors',
        
        pulse:
          'bg-matrix-panel border border-matrix-text text-matrix-text relative overflow-hidden hover:text-matrix-text-bright before:absolute before:inset-0 before:border-2 before:border-matrix-text before:scale-[1.05] before:opacity-0 hover:before:opacity-100 hover:before:scale-100 before:transition-all before:duration-700 before:ease-out after:absolute after:inset-0 after:bg-matrix-primary after:opacity-0 after:z-[-1] hover:after:opacity-10 after:transition-opacity after:duration-500 animate-pulse',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10 p-0',
      },
      hasGlow: {
        true: 'shadow-[0_0_10px_var(--m-glow)] hover:shadow-[0_0_15px_var(--m-glow)] animate-glow-pulse',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      hasGlow: false,
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Whether this button should be rendered as a child component.
   * For advanced composition patterns.
   * @default false
   */
  asChild?: boolean;
}

/**
 * Button component with multiple visual variants optimized for the Matrix UI theme.
 * 
 * @example
 * // Basic usage
 * <Button>Default Button</Button>
 * 
 * @example
 * // With variants
 * <Button variant="primary">Primary Button</Button>
 * <Button variant="neon" hasGlow={true}>Glowing Neon Button</Button>
 * <Button variant="glitch">Glitch Effect Button</Button>
 * <Button variant="pulse">Pulsing Button</Button>
 * 
 * @example
 * // With sizes
 * <Button size="sm">Small Button</Button>
 * <Button size="lg">Large Button</Button>
 * <Button size="icon"><SomeIconComponent /></Button>
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, hasGlow, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, hasGlow, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };