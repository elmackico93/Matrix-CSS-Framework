import { HTMLAttributes } from 'react';

/**
 * Available visual variants for the Card component
 */
export type CardVariant = 
  | 'default'     // Standard card with border
  | 'elevated'    // Card with shadow/glow effect
  | 'terminal'    // Terminal-like appearance
  | 'outlined'    // Thin border without background
  | 'glass'       // Translucent background effect
  | 'inset'       // Inset shadow effect
  | 'cyber';      // Angled corners like the cyber button

/**
 * Available status colors for the Card component
 */
export type CardStatusType =
  | 'none'        // No status indicator
  | 'primary'     // Primary status color
  | 'success'     // Success status color
  | 'warning'     // Warning status color
  | 'danger'      // Danger/error status color
  | 'info';       // Info status color

/**
 * Properties for the Card component
 */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The visual style of the card
   * @default 'default'
   */
  variant?: CardVariant;
  
  /**
   * Whether the card should have a hover effect
   * @default true
   */
  hoverable?: boolean;

  /**
   * Whether the card should have a glow effect
   * @default false
   */
  hasGlow?: boolean;
  
  /**
   * Status color to apply to the card (usually as a border or indicator)
   * @default 'none'
   */
  status?: CardStatusType;
  
  /**
   * Whether to use compact sizing (less padding)
   * @default false
   */
  compact?: boolean;
  
  /**
   * Whether to apply a code/data visualization style
   * @default false
   */
  isDataCard?: boolean;
}

/**
 * Properties for the CardHeader component
 */
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * Properties for the CardTitle component
 */
export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

/**
 * Properties for the CardDescription component
 */
export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

/**
 * Properties for the CardContent component
 */
export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * Properties for the CardFooter component
 */
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * Properties for the CardStatusIndicator component
 */
export interface CardStatusIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The type of status to display
   */
  type: CardStatusType;
  
  /**
   * Text content of the status
   */
  text?: string;
}