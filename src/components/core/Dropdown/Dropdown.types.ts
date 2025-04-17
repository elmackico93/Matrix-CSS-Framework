import { ReactNode } from 'react';

export interface DropdownProps {
  /**
   * The element that will trigger the dropdown when clicked
   */
  trigger: ReactNode;
  
  /**
   * The content to display within the dropdown
   */
  children: ReactNode;
  
  /**
   * The alignment of the dropdown relative to the trigger
   * @default 'left'
   */
  align?: 'left' | 'right';
  
  /**
   * Additional CSS classes to apply to the trigger container
   */
  className?: string;
  
  /**
   * Additional CSS classes to apply to the dropdown menu
   */
  dropdownClassName?: string;
}

export interface DropdownItemProps {
  /**
   * The content of the dropdown item
   */
  children: ReactNode;
  
  /**
   * Function to call when the item is clicked
   */
  onClick?: () => void;
  
  /**
   * Additional CSS classes to apply to the item
   */
  className?: string;
  
  /**
   * Whether the dropdown item is disabled
   * @default false
   */
  disabled?: boolean;
}

export interface DropdownHeaderProps {
  /**
   * The content of the dropdown header
   */
  children: ReactNode;
  
  /**
   * Additional CSS classes to apply to the header
   */
  className?: string;
}