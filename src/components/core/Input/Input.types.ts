import { InputHTMLAttributes, ReactNode } from 'react';

/**
 * Available sizes for the Input component
 */
export type InputSize = 
  | 'sm'    // Small size
  | 'md'    // Medium size (default)
  | 'lg';   // Large size

/**
 * Available visual variants for the Input component
 */
export type InputVariant = 
  | 'default'   // Standard input with border
  | 'filled'    // Input with filled background
  | 'outlined'  // Input with thicker outline
  | 'ghosted'   // Input with minimal styling (bottom border only)
  | 'terminal'  // Input with terminal-like styling 
  | 'data'      // Input with data-entry styling and "DATA" label
  | 'cyber';    // Input with cyberpunk-inspired styling

/**
 * Available status states for the Input component
 */
export type InputStatus = 
  | 'default'  // Normal state
  | 'success'  // Success state (green)
  | 'warning'  // Warning state (yellow)
  | 'error'    // Error state (red)
  | 'info';    // Info state (blue)

/**
 * Properties for the Input component
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Label text to display above the input
   */
  label?: string;
  
  /**
   * Error message to display below the input
   */
  error?: string;
  
  /**
   * Helper text to display below the input when there is no error
   */
  helperText?: string;
  
  /**
   * Visual size of the input
   * @default 'md'
   */
  size?: InputSize;
  
  /**
   * Visual style of the input
   * @default 'default'
   */
  variant?: InputVariant;
  
  /**
   * Status state of the input
   * @default 'default'
   */
  status?: InputStatus;
  
  /**
   * Icon or element to display before the input text
   */
  prefix?: ReactNode;
  
  /**
   * Icon or element to display after the input text
   */
  suffix?: ReactNode;
  
  /**
   * Whether the input should take up the full width of its container
   * @default true
   */
  fullWidth?: boolean;
  
  /**
   * Whether the input should have a glowing effect
   * @default false
   */
  hasGlow?: boolean;
  
  /**
   * Whether the input should have a pulsing animation
   * @default false
   */
  animated?: boolean;
  
  /**
   * Additional class name for the container element
   */
  containerClassName?: string;
  
  /**
   * Additional class name for the label element
   */
  labelClassName?: string;
}