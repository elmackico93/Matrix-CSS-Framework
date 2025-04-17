import { InputHTMLAttributes } from 'react';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * Label text to display next to the switch
   */
  label?: string;
}