import { SelectHTMLAttributes } from 'react';

export interface SelectOption {
  /**
   * The value of the option used for form submission
   */
  value: string;
  
  /**
   * The text displayed to the user
   */
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /**
   * Label text to display above the select
   */
  label?: string;
  
  /**
   * Error message to display below the select
   */
  error?: string;
  
  /**
   * Array of options to display in the select dropdown
   */
  options: SelectOption[];
}