import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MatrixCode } from './MatrixCode';
import { MatrixCodeProps } from './MatrixCode.types';

/**
 * The MatrixCode component generates cyberpunk-styled codes (QR, barcode, datamatrix)
 * with customizable Matrix-inspired visual effects.
 */
const meta: Meta<MatrixCodeProps> = {
  title: 'Core/MatrixCode',
  component: MatrixCode,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
          A versatile code generation component with a Matrix aesthetic.
          Supports QR codes, barcodes, and data matrices with various visual effects.
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'text',
      description: 'The data to encode in the code',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Required' },
      }
    },
    type: {
      control: { type: 'select', options: ['qr', 'barcode', 'datamatrix'] },
      description: 'The type of code to generate',
      table: {
        type: { summary: 'MatrixCodeType' },
        defaultValue: { summary: 'qr' },
      }
    },
    size: {
      control: { type: 'range', min: 100, max: 500, step: 10 },
      description: 'The size of the code in pixels',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 200 },
      }
    },
    color: {
      control: 'color',
      description: 'The color of the code (foreground)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#00ff41' },
      }
    },
    bgColor: {
      control: 'color',
      description: 'The background color of the code',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#000000' },
      }
    },
    hasBorder: {
      control: 'boolean',
      description: 'Whether to add a border around the code',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      }
    },
    hasGlowEffect: {
      control: 'boolean',
      description: 'Whether to add a glow effect to the code',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      }
    },
    hasGlitchEffect: {
      control: 'boolean',
      description: 'Whether to add a glitch animation effect',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      }
    },
    hasPulseEffect: {
      control: 'boolean',
      description: 'Whether to add a pulse animation effect',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      }
    },
    hasScanlineEffect: {
      control: 'boolean',
      description: 'Whether to add a scanning line animation',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      }
    },
    hasCodeRain: {
      control: 'boolean',
      description: 'Whether to add Matrix code rain in the background',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      }
    },
    errorCorrectionLevel: {
      control: { type: 'select', options: ['L', 'M', 'Q', 'H'] },
      description: 'Error correction level for QR codes',
      table: {
        type: { summary: 'ErrorCorrectionLevel' },
        defaultValue: { summary: 'H' },
      }
    },
    barcodeFormat: {
      control: {
        type: 'select',
        options: ['CODE128', 'CODE39', 'EAN13', 'EAN8', 'UPC', 'ITF14', 'ITF', 'MSI', 'pharmacode', 'codabar']
      },
      description: 'Format for barcodes',
      table: {
        type: { summary: 'BarcodeFormat' },
        defaultValue: { summary: 'CODE128' },
      }
    },
    onGenerated: {
      action: 'generated',
      description: 'Callback function called when the code is successfully generated',
      table: {
        type: { summary: '() => void' },
      }
    },
    onError: {
      action: 'error',
      description: 'Callback function called when an error occurs during generation',
      table: {
        type: { summary: '(error: Error) => void' },
      }
    }
  }
};

export default meta;
type Story = StoryObj<MatrixCodeProps>;

/**
 * Basic QR code example with default settings.
 */
export const QRCode: Story = {
  args: {
    data: 'https://example.com',
    type: 'qr',
    size: 200
  },
};

/**
 * Standard barcode example using CODE128 format.
 */
export const Barcode: Story = {
  args: {
    data: '1234567890',
    type: 'barcode',
    size: 200
  },
};

/**
 * Data matrix example (currently implemented as a placeholder).
 */
export const DataMatrix: Story = {
  args: {
    data: 'MATRIX-DATA-123',
    type: 'datamatrix',
    size: 200
  },
};

/**
 * QR code with a glowing green effect.
 */
export const GlowingQRCode: Story = {
  args: {
    data: 'https://example.com',
    type: 'qr',
    size: 200,
    hasGlowEffect: true
  },
};

/**
 * QR code with a scanning line animation.
 */
export const ScanlineQRCode: Story = {
  args: {
    data: 'https://example.com',
    type: 'qr',
    size: 200,
    hasScanlineEffect: true
  },
};

/**
 * QR code with a glitch effect that makes it appear digitally corrupted.
 */
export const GlitchQRCode: Story = {
  args: {
    data: 'https://example.com',
    type: 'qr',
    size: 200,
    hasGlitchEffect: true
  },
};

/**
 * QR code with a subtle pulsing animation.
 */
export const PulseQRCode: Story = {
  args: {
    data: 'https://example.com',
    type: 'qr',
    size: 200,
    hasPulseEffect: true
  },
};

/**
 * QR code with Matrix code rain background effect.
 */
export const MatrixRainQRCode: Story = {
  args: {
    data: 'https://example.com',
    type: 'qr',
    size: 200,
    hasCodeRain: true
  },
};

/**
 * Fully themed QR code with multiple visual effects combined.
 */
export const FullyThemedQRCode: Story = {
  args: {
    data: 'https://example.com',
    type: 'qr',
    size: 200,
    hasGlowEffect: true,
    hasScanlineEffect: true,
    hasCodeRain: true
  },
};

/**
 * QR code with custom colors (magenta on dark blue).
 */
export const CustomColorQRCode: Story = {
  args: {
    data: 'https://example.com',
    type: 'qr',
    size: 200,
    color: '#ff00ff', // Magenta
    bgColor: '#000022', // Very dark blue
    hasGlowEffect: true
  },
};

/**
 * Example of the error state when no data is provided.
 */
export const ErrorState: Story = {
  args: {
    // @ts-ignore - Intentionally passing empty data for the story
    data: '',
    type: 'qr',
    size: 200
  },
};

/**
 * Interactive showcase of different QR code styles.
 */
export const QRCodeShowcase: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 p-4 bg-matrix-bg bg-opacity-30 border border-matrix-border rounded max-w-3xl">
      <div className="col-span-2 text-center mb-2">
        <h3 className="text-xl text-matrix-text-bright">Matrix Code Variants</h3>
      </div>
      
      <div className="p-4 bg-matrix-panel border border-matrix-border rounded flex flex-col items-center">
        <h4 className="text-matrix-text-bright mb-2">Standard QR</h4>
        <MatrixCode
          data="https://example.com"
          size={150}
        />
      </div>
      
      <div className="p-4 bg-matrix-panel border border-matrix-border rounded flex flex-col items-center">
        <h4 className="text-matrix-text-bright mb-2">Glowing QR</h4>
        <MatrixCode
          data="https://example.com"
          size={150}
          hasGlowEffect
        />
      </div>
      
      <div className="p-4 bg-matrix-panel border border-matrix-border rounded flex flex-col items-center">
        <h4 className="text-matrix-text-bright mb-2">Animated QR</h4>
        <MatrixCode
          data="https://example.com"
          size={150}
          hasScanlineEffect
          hasPulseEffect
        />
      </div>
      
      <div className="p-4 bg-matrix-panel border border-matrix-border rounded flex flex-col items-center">
        <h4 className="text-matrix-text-bright mb-2">Matrix QR</h4>
        <MatrixCode
          data="https://example.com"
          size={150}
          hasCodeRain
          hasGlowEffect
        />
      </div>
    </div>
  ),
};

/**
 * Showcase of different barcode formats.
 */
export const BarcodeShowcase: Story = {
  render: () => (
    <div className="space-y-4 p-4 bg-matrix-bg bg-opacity-30 border border-matrix-border rounded max-w-3xl">
      <div className="text-center mb-2">
        <h3 className="text-xl text-matrix-text-bright">Matrix Barcode Formats</h3>
      </div>
      
      <div className="p-4 bg-matrix-panel border border-matrix-border rounded flex justify-center">
        <MatrixCode
          data="1234567890"
          type="barcode"
          barcodeFormat="CODE128"
          size={200}
          hasGlowEffect
        />
      </div>
      
      <div className="p-4 bg-matrix-panel border border-matrix-border rounded flex justify-center">
        <MatrixCode
          data="1234567890"
          type="barcode"
          barcodeFormat="CODE39"
          size={200}
          hasGlowEffect
        />
      </div>
      
      <div className="p-4 bg-matrix-panel border border-matrix-border rounded flex justify-center">
        <MatrixCode
          data="5901234123457"
          type="barcode"
          barcodeFormat="EAN13"
          size={200}
          hasGlowEffect
        />
      </div>
    </div>
  ),
};

/**
 * Interactive playground with all visual effects that can be toggled.
 */
export const VisualEffectsPlayground: Story = {
  render: () => {
    // Using React hooks in Storybook
    const [effects, setEffects] = React.useState({
      glow: false,
      glitch: false,
      pulse: false,
      scanline: false,
      codeRain: false
    });
    
    const toggleEffect = (effect: keyof typeof effects) => {
      setEffects(prev => ({
        ...prev,
        [effect]: !prev[effect]
      }));
    };
    
    return (
      <div className="p-6 bg-matrix-bg bg-opacity-30 border border-matrix-border rounded max-w-3xl">
        <h3 className="text-xl text-matrix-text-bright mb-4 text-center">Visual Effects Playground</h3>
        
        <div className="flex flex-wrap gap-8 items-center justify-center">
          <div className="p-6 bg-matrix-dark flex justify-center">
            <MatrixCode
              data="https://example.com"
              size={200}
              hasGlowEffect={effects.glow}
              hasGlitchEffect={effects.glitch}
              hasPulseEffect={effects.pulse}
              hasScanlineEffect={effects.scanline}
              hasCodeRain={effects.codeRain}
            />
          </div>
          
          <div className="space-y-3">
            <h4 className="text-lg text-matrix-text-bright">Toggle Effects</h4>
            
            <div className="space-y-2">
              <button 
                className={`block w-full p-2 border ${effects.glow ? 'bg-matrix-primary text-black' : 'border-matrix-border'}`}
                onClick={() => toggleEffect('glow')}
              >
                Glow Effect {effects.glow ? '✓' : ''}
              </button>
              
              <button 
                className={`block w-full p-2 border ${effects.glitch ? 'bg-matrix-primary text-black' : 'border-matrix-border'}`}
                onClick={() => toggleEffect('glitch')}
              >
                Glitch Effect {effects.glitch ? '✓' : ''}
              </button>
              
              <button 
                className={`block w-full p-2 border ${effects.pulse ? 'bg-matrix-primary text-black' : 'border-matrix-border'}`}
                onClick={() => toggleEffect('pulse')}
              >
                Pulse Effect {effects.pulse ? '✓' : ''}
              </button>
              
              <button 
                className={`block w-full p-2 border ${effects.scanline ? 'bg-matrix-primary text-black' : 'border-matrix-border'}`}
                onClick={() => toggleEffect('scanline')}
              >
                Scanline Effect {effects.scanline ? '✓' : ''}
              </button>
              
              <button 
                className={`block w-full p-2 border ${effects.codeRain ? 'bg-matrix-primary text-black' : 'border-matrix-border'}`}
                onClick={() => toggleEffect('codeRain')}
              >
                Code Rain {effects.codeRain ? '✓' : ''}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};