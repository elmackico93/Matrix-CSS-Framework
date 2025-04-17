import { ReactElement, ReactNode } from 'react';

export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipProps {
  /**
   * The tooltip content to display
   */
  content: ReactNode;
  
  /**
   * The element that will trigger the tooltip
   */
  children: ReactElement;
  
  /**
   * The position of the tooltip relative to the trigger element
   * @default 'top'
   */
  position?: TooltipPosition;
  
  /**
   * Delay in milliseconds before showing the tooltip
   * @default 300
   */
  delay?: number;
  
  /**
   * Additional CSS classes to apply to the tooltip
   */
  className?: string;
}