import { ButtonHTMLAttributes } from 'react';

/**
 * Available visual variants for the Button component
 */
export type ButtonVariant = 
  // Standard variants
  | 'default'
  | 'primary'
  | 'outline'
  | 'ghost'
  | 'terminal'
  | 'danger'
  // Enhanced variants
  | 'neon'
  | 'holographic'
  | 'cyber'
  | '3d'
  | 'pill'
  | 'bordered'
  | 'data'
  // Special effect variants
  | 'glitch'
  | 'pulse';

/**
 * Available size options for the Button component
 */
export type ButtonSize = 
  | 'sm'    // Small
  | 'md'    // Medium (default)
  | 'lg'    // Large
  | 'icon'; // Square button for icons

/**
 * Properties for the Button component
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The visual style of the button
   * @default 'default'
   */
  variant?: ButtonVariant;
  
  /**
   * The size of the button
   * @default 'md'
   */
  size?: ButtonSize;
  
  /**
   * Whether the button should have a glow effect
   * @default false
   */
  hasGlow?: boolean;
  
  /**
   * Whether this button should be rendered as a child component.
   * Used for advanced composition patterns.
   * @default false
   */
  asChild?: boolean;
}