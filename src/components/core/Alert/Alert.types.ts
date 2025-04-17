import { HTMLAttributes } from 'react';

export type AlertVariant = 
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The visual style of the alert
   * @default 'default'
   */
  variant?: AlertVariant;
}

export interface AlertTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export interface AlertDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}