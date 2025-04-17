import { HTMLAttributes } from 'react';

export type ProgressVariant = 'default' | 'striped' | 'animated';

export type ProgressColor = 'default' | 'success' | 'warning' | 'danger' | 'info';

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The current value of the progress
   * @default 0
   */
  value?: number;
  
  /**
   * The maximum value of the progress
   * @default 100
   */
  max?: number;
  
  /**
   * The visual style of the progress bar
   * @default 'default'
   */
  variant?: ProgressVariant;
  
  /**
   * The color of the progress bar
   * @default 'default'
   */
  color?: ProgressColor;
  
  /**
   * Whether to show the progress value as a percentage label
   * @default false
   */
  showLabel?: boolean;
}