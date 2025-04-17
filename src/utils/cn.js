import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function that combines clsx and tailwind-merge
 * Optimizes Tailwind class usage by properly merging classes
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
