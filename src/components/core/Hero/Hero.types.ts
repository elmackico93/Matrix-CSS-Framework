import { HTMLAttributes } from 'react';
import { VariantProps } from 'class-variance-authority';
import { heroVariants } from './Hero';

/**
 * Available visual variants for the Hero component
 */
export type HeroVariant = 
  | 'default'   // Standard Matrix background
  | 'dark'      // Dark black background
  | 'terminal'  // Terminal-like appearance with border
  | 'gradient'  // Gradient background from dark to panel color
  | 'cyber';    // Cyberpunk-style with glow effects

/**
 * Available size options for the Hero component
 */
export type HeroSize = 
  | 'sm'      // Small hero (50vh)
  | 'md'      // Medium hero (70vh)
  | 'lg'      // Large hero (100vh/full screen)
  | 'auto';   // Auto height based on content

/**
 * Content alignment options for the Hero component
 */
export type ContentAlignment = 
  | 'center'  // Center-aligned (default)
  | 'left'    // Left-aligned
  | 'right';  // Right-aligned

/**
 * Title effect options for the Hero component
 */
export type TitleEffect = 
  | 'none'    // No special effects
  | 'glitch'  // Glitch effect only
  | 'glow'    // Glow effect only
  | 'both';   // Both glitch and glow effects

/**
 * Properties for the Hero component
 */
export interface HeroProps 
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof heroVariants> {
  /**
   * Main title text for the hero section
   */
  title?: string;
  
  /**
   * Subtitle or description text
   */
  subtitle?: string;
  
  /**
   * Additional class names for the title element
   */
  titleClassName?: string;
  
  /**
   * Additional class names for the subtitle element
   */
  subtitleClassName?: string;
  
  /**
   * Additional class names for the content container
   */
  contentClassName?: string;
  
  /**
   * Whether to show a scroll indicator at the bottom
   * @default false
   */
  showScrollIndicator?: boolean;
  
  /**
   * Whether to show a version badge
   * @default false
   */
  showVersion?: boolean;
  
  /**
   * Version text to display if showVersion is true
   * @default "VERSION 1.0"
   */
  version?: string;
}