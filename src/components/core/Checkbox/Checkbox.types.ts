import { InputHTMLAttributes } from 'react';

/**
 * Available visual variants for the Checkbox component
 */
export type CheckboxVariant = 
  | 'default'   // Standard checkbox
  | 'terminal'  // Terminal-style checkbox with monospace font
  | 'cyber'     // Cyberpunk-style checkbox with angled corners
  | 'glow'      // Glowing checkbox with shadow effects
  | 'data'      // Data-centric style with binary indicator
  | 'pulse';    // Animated pulsing checkbox

/**
 * Available sizes for the Checkbox component
 */
export type CheckboxSize = 
  | 'sm'    // Small checkbox
  | 'md'    // Medium checkbox (default)
  | 'lg';   // Large checkbox

/**
 * Available status states for the Checkbox component
 */
export type CheckboxStatus = 
  | 'default'  // Normal state
  | 'error'    // Error state
  | 'success'  // Success state
  | 'warning'; // Warning state

/**
 * Props for the Checkbox component
 */
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /**
   * Label text to display next to the checkbox
   */
  label?: string;
  
  /**
   * Error message to display below the checkbox
   */
  error?: string;
  
  /**
   * Description text to display below the label
   */
  description?: string;
  
  /**
   * Visual style of the checkbox
   * @default 'default'
   */
  variant?: CheckboxVariant;
  
  /**
   * Size of the checkbox
   * @default 'md'
   */
  size?: CheckboxSize;
  
  /**
   * Status state of the checkbox
   * @default 'default'
   */
  status?: CheckboxStatus;
  
  /**
   * Whether the checkbox should have a hover effect
   * @default true
   */
  hasHoverEffect?: boolean;
  
  /**
   * Whether the checkbox should display a focus ring when focused
   * @default true
   */
  hasFocusRing?: boolean;
  
  /**
   * Additional class name for the container element
   */
  containerClassName?: string;
  
  /**
   * Additional class name for the label element
   */
  labelClassName?: string;
}