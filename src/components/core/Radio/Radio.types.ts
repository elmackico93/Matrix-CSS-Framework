import { InputHTMLAttributes } from 'react';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * Label text to display next to the radio button
   */
  label?: string;
}