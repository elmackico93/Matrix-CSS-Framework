import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { MatrixCode } from './MatrixCode';
import { MatrixCodeProps } from './MatrixCode.types';

// Meta information for the MatrixCode component
const meta: Meta<MatrixCodeProps> = {
  title: 'Core/MatrixCode',
  component: MatrixCode,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'text',
      description: 'The data to encode in the code'
    },
    type: {
      control: { type: 'select', options: ['qr', 'barcode', 'datamatrix'] },
      description: 'The type of code to generate'
    },
    size: {
      control: { type: 'number', min: 100, max: 500, step: 10 },
      description: 'The size of the code in pixels'
    },
    color: {
      control: 'color',
      description: 'The color of the code (foreground)'
    },
    bgColor: {
      control: 'color',
      description: 'The background color of the code'
    },
    hasBorder: {
      control: 'boolean',
      description: 'Whether to add a border around the code'
    },
    hasGlowEffect: {
      control: 'boolean',
      description: 'Whether to add a glow effect to the code'
    },
    hasGlitchEffect: {
      control: 'boolean',
      description: 'Whether to add a glitch animation effect'
    },
    hasPulseEffect: {
      control: 'boolean',
      description: 'Whether to add a pulse animation effect'
    },
    hasScanlineEffect: {
      control: 'boolean',
      description: 'Whether to add a scanning line animation'
    },
    hasCodeRain: {
      control: 'boolean',
      description: 'Whether to add Matrix code rain in the background'
    },
    errorCorrectionLevel: {
      control: { type: 'select', options: ['L', 'M', 'Q', 'H'] },
      description: 'Error correction level for QR codes'
    },
    barcodeFormat: {
      control: {
        type: 'select',
        options: ['CODE128', 'CODE39', 'EAN13', 'EAN8', 'UPC', 'ITF14', 'ITF', 'MSI', 'pharmacode', 'codabar']
      },
      description: 'Format for barcodes'
    }
  }
};

export default meta;
type Story = StoryObj<MatrixCodeProps>;

// Basic QR code
export const QRCode: Story = {
  args: {
    data: 'https://example.com',
    type: 'qr',
    size: 200
  },
};

// Basic barcode
export const Barcode: Story = {
  args: {
    data: '1234567890',
    type: 'barcode',
    size: 200
  },
};

// Data matrix
export const DataMatrix: Story = {
  args: {
    data: 'MATRIX-DATA-123',
    type: 'datamatrix',
    size: 200
  },
};

// QR code with glow effect
export const GlowingQRCode: Story = {
  args: {
    data: 'https://example.com',
    type: 'qr',
    size: 200,
    hasGlowEffect: true
  },
};

// QR code with scan line effect
export const ScanlineQRCode: Story = {
  args: {
    data: 'https://example.com',
    type: 'qr',
    size: 200,
    hasScanlineEffect: true
  },
};

// QR code with glitch effect
export const GlitchQRCode: Story = {
  args: {
    data: 'https://example.com',
    type: 'qr',
    size: 200,
    hasGlitchEffect: true
  },
};

// QR code with pulse effect
export const PulseQRCode: Story = {
  args: {
    data: 'https://example.com',
    type: 'qr',
    size: 200,
    hasPulseEffect: true
  },
};

// QR code with Matrix code rain
export const MatrixRainQRCode: Story = {
  args: {
    data: 'https://example.com',
    type: 'qr',
    size: 200,
    hasCodeRain: true
  },
};

// Fully themed QR code with all effects
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

// Custom colored QR code
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

// No data provided (error state)
export const ErrorState: Story = {
  args: {
    // @ts-ignore - Intentionally passing empty data for the story
    data: '',
    type: 'qr',
    size: 200
  },
};

// QR code showcase with different features
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

// Barcode showcase with different formats
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
          data="1234567890123"
          type="barcode"
          barcodeFormat="EAN13"
          size={200}
          hasGlowEffect
        />
      </div>
    </div>
  ),
};