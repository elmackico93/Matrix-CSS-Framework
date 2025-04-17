import { HTMLAttributes } from 'react';

export interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Current active item id
   * @default 'dashboard'
   */
  activeItem?: string;
  
  /**
   * Callback function when a menu item is clicked
   */
  onNavigate?: (itemId: string) => void;
}