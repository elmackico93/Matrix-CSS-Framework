
import { HTMLAttributes } from 'react';

/**
 * Supported code types for the MatrixCode component
 */
export type MatrixCodeType = 'qr' | 'barcode' | 'datamatrix';

/**
 * Error correction levels for QR codes
 * - L: 7% of codewords can be restored
 * - M: 15% of codewords can be restored
 * - Q: 25% of codewords can be restored
 * - H: 30% of codewords can be restored
 */
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

/**
 * Supported barcode formats
 */
export type BarcodeFormat = 
  | 'CODE128' 
  | 'CODE39' 
  | 'EAN13' 
  | 'EAN8' 
  | 'UPC' 
  | 'ITF14'
  | 'ITF' 
  | 'MSI' 
  | 'pharmacode'
  | 'codabar';

/**
 * Properties for the MatrixCode component
 */
export interface MatrixCodeProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The data to encode in the code (URL, text, etc.)
   */
  data: string;
  
  /**
   * The type of code to generate
   * @default 'qr'
   */
  type?: MatrixCodeType;
  
  /**
   * The size of the code in pixels
   * @default 200
   */
  size?: number;
  
  /**
   * The color of the code (foreground)
   * @default '#00ff41' (Matrix green)
   */
  color?: string;
  
  /**
   * The background color of the code
   * @default '#000000' (Black)
   */
  bgColor?: string;
  
  /**
   * Whether to add a border around the code
   * @default true
   */
  hasBorder?: boolean;
  
  /**
   * Whether to add a glow effect to the code
   * @default false
   */
  hasGlowEffect?: boolean;
  
  /**
   * Whether to add a glitch animation effect
   * @default false
   */
  hasGlitchEffect?: boolean;
  
  /**
   * Whether to add a pulse animation effect
   * @default false
   */
  hasPulseEffect?: boolean;
  
  /**
   * Whether to add a scanning line animation
   * @default false
   */
  hasScanlineEffect?: boolean;
  
  /**
   * Whether to add Matrix code rain in the background
   * @default false
   */
  hasCodeRain?: boolean;
  
  /**
   * Error correction level for QR codes
   * @default 'H'
   */
  errorCorrectionLevel?: ErrorCorrectionLevel;
  
  /**
   * Format for barcodes
   * @default 'CODE128'
   */
  barcodeFormat?: BarcodeFormat;
  
  /**
   * Callback function called when the code is successfully generated
   */
  onGenerated?: () => void;
  
  /**
   * Callback function called when an error occurs during generation
   */
  onError?: (error: Error) => void;
}