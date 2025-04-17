import { HTMLAttributes } from 'react';

export type BadgeVariant = 
  | 'default'
  | 'primary'
  | 'secondary' 
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'outline';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The visual style of the badge
   * @default 'default'
   */
  variant?: BadgeVariant;
}