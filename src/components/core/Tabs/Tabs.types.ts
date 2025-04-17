import { ReactNode } from 'react';

export interface TabsProps {
  /**
   * The ID of the default selected tab
   */
  defaultTab?: string;
  
  /**
   * The content of the tabs component, typically TabList and TabPanels
   */
  children: ReactNode;
  
  /**
   * Additional CSS classes to apply to the tabs container
   */
  className?: string;
}

export interface TabListProps {
  /**
   * The tab buttons and headers
   */
  children: ReactNode;
  
  /**
   * Additional CSS classes to apply to the tab list
   */
  className?: string;
}

export interface TabProps {
  /**
   * Unique identifier for the tab
   */
  id: string;
  
  /**
   * The content of the tab button
   */
  children: ReactNode;
  
  /**
   * Additional CSS classes to apply to the tab
   */
  className?: string;
}

export interface TabPanelProps {
  /**
   * Unique identifier for the tab panel that matches a tab's id
   */
  id: string;
  
  /**
   * The content of the tab panel
   */
  children: ReactNode;
  
  /**
   * Additional CSS classes to apply to the tab panel
   */
  className?: string;
}