import { ReactNode } from 'react';

// Animation variants for the modal
export type ModalAnimationVariant = 
  'fade' | 'slide' | 'scale' | 'glitch' | 'terminal' | 'none';

// Position variants for the modal
export type ModalPosition = 
  'center' | 'top' | 'right' | 'bottom' | 'left' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

// Size variants for the modal
export type ModalSize = 
  'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

// Theme variants for the modal
export type ModalTheme = 
  'default' | 'terminal' | 'cyber' | 'alert' | 'danger' | 'matrix' | 'neural';

export interface ModalProps {
  /**
   * Whether the modal is visible
   */
  isOpen: boolean;
  
  /**
   * Function to call when the modal should close
   */
  onClose: () => void;
  
  /**
   * The content of the modal
   */
  children: ReactNode;
  
  /**
   * Additional CSS classes to apply to the modal container
   */
  className?: string;
  
  /**
   * Whether to show a close button in the top-right corner
   * @default true
   */
  showCloseButton?: boolean;
  
  /**
   * Whether to close the modal when clicking on the backdrop
   * @default true
   */
  closeOnBackdropClick?: boolean;
  
  /**
   * Whether to close the modal when pressing ESC
   * @default true
   */
  closeOnEsc?: boolean;
  
  /**
   * Animation variant for the modal
   * @default 'fade'
   */
  animation?: ModalAnimationVariant;
  
  /**
   * Duration of the animation in milliseconds
   * @default 300
   */
  animationDuration?: number;
  
  /**
   * Size of the modal
   * @default 'md'
   */
  size?: ModalSize;
  
  /**
   * Position of the modal
   * @default 'center'
   */
  position?: ModalPosition;
  
  /**
   * Strength of the backdrop blur (0-10)
   * @default 2
   */
  backdropBlur?: number;
  
  /**
   * Whether to show a Matrix code rain effect in the backdrop
   * @default false
   */
  showCodeRain?: boolean;
  
  /**
   * Whether to play sound effects on open/close
   * @default false
   */
  enableSoundEffects?: boolean;
  
  /**
   * Predefined theme for the modal
   * @default 'default'
   */
  theme?: ModalTheme;
  
  /**
   * Whether to add a glitch effect to the modal
   * @default false
   */
  hasGlitchEffect?: boolean;
  
  /**
   * Whether to add a glow effect to the modal
   * @default false
   */
  hasGlowEffect?: boolean;
  
  /**
   * Whether the modal content is scrollable
   * @default true
   */
  scrollable?: boolean;
  
  /**
   * ID for the modal for accessibility
   */
  id?: string;
  
  /**
   * Z-index for the modal
   * @default 1000
   */
  zIndex?: number;
  
  /**
   * Custom component to use as the close button
   */
  customCloseButton?: ReactNode;
  
  /**
   * What to display in the modal if isLoading is true
   */
  loadingComponent?: ReactNode;
  
  /**
   * Whether the modal is in a loading state
   * @default false
   */
  isLoading?: boolean;
  
  /**
   * Whether to focus the first focusable element in the modal on open
   * @default true
   */
  autoFocus?: boolean;
  
  /**
   * Callback fired when the modal has opened
   */
  onOpen?: () => void;
  
  /**
   * Callback fired when the modal has closed
   */
  onClosed?: () => void;
  
  /**
   * Whether to add a typing animation to the content
   * @default false
   */
  typewriterEffect?: boolean;
  
  /**
   * Typing speed in milliseconds per character
   * @default 50
   */
  typewriterSpeed?: number;
  
  /**
   * Whether the modal should use full height
   * @default false
   */
  fullHeight?: boolean;
}

export interface ModalHeaderProps {
  /**
   * The content of the modal header
   */
  children: ReactNode;
  
  /**
   * Additional CSS classes to apply to the header
   */
  className?: string;
  
  /**
   * Whether to add a glitch effect to the header
   * @default false
   */
  hasGlitchEffect?: boolean;
  
  /**
   * Whether to add a glow effect to the header
   * @default false
   */
  hasGlowEffect?: boolean;
  
  /**
   * Theme variant for the header
   */
  theme?: ModalTheme;
  
  /**
   * Whether to add a typing animation to the content
   * @default false
   */
  typewriterEffect?: boolean;
  
  /**
   * Typing speed in milliseconds per character
   * @default 50
   */
  typewriterSpeed?: number;
}

export interface ModalBodyProps {
  /**
   * The content of the modal body
   */
  children: ReactNode;
  
  /**
   * Additional CSS classes to apply to the body
   */
  className?: string;
  
  /**
   * Whether the body content is scrollable
   * @default true
   */
  scrollable?: boolean;
  
  /**
   * Whether to add a typing animation to the content
   * @default false
   */
  typewriterEffect?: boolean;
  
  /**
   * Typing speed in milliseconds per character
   * @default 50
   */
  typewriterSpeed?: number;
  
  /**
   * Whether to add a glitch effect to the body
   * @default false
   */
  hasGlitchEffect?: boolean;
  
  /**
   * Whether to add a code rain effect to the body background
   * @default false
   */
  showCodeRain?: boolean;
}

export interface ModalFooterProps {
  /**
   * The content of the modal footer
   */
  children: ReactNode;
  
  /**
   * Additional CSS classes to apply to the footer
   */
  className?: string;
  
  /**
   * Whether to add a glitch effect to the footer
   * @default false
   */
  hasGlitchEffect?: boolean;
  
  /**
   * Whether to add a glow effect to the footer
   * @default false
   */
  hasGlowEffect?: boolean;
  
  /**
   * Theme variant for the footer
   */
  theme?: ModalTheme;
}