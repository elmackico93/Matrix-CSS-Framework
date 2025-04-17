
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MatrixCode } from './MatrixCode';

// Mock the dynamic imports
jest.mock('qrcode', () => ({
  toCanvas: jest.fn().mockImplementation((canvas, data, options) => {
    return Promise.resolve();
  })
}));

jest.mock('jsbarcode', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((canvas, data, options) => {
    // Mock implementation
  })
}));

describe('MatrixCode Component', () => {
  test('renders with default props', () => {
    render(<MatrixCode data="https://example.com" />);
    
    // Should have a canvas element
    expect(document.querySelector('canvas')).toBeInTheDocument();
    
    // Should have Matrix styles
    const container = document.querySelector('div');
    expect(container).toHaveClass('border-2');
    expect(container).toHaveClass('border-matrix-border');
  });
  
  test('shows error state when no data is provided', () => {
    // @ts-ignore - Intentionally passing empty data for test
    render(<MatrixCode data="" />);
    
    expect(screen.getByText('No data provided')).toBeInTheDocument();
  });
  
  test('applies glow effect when enabled', () => {
    render(<MatrixCode data="https://example.com" hasGlowEffect />);
    
    const container = document.querySelector('div');
    expect(container).toHaveClass('shadow-[0_0_15px_var(--matrix-glow)]');
  });
  
  test('applies glitch animation when enabled', () => {
    render(<MatrixCode data="https://example.com" hasGlitchEffect />);
    
    const container = document.querySelector('div');
    expect(container).toHaveClass('animate-glitch');
  });
  
  test('applies pulse animation when enabled', () => {
    render(<MatrixCode data="https://example.com" hasPulseEffect />);
    
    const container = document.querySelector('div');
    expect(container).toHaveClass('animate-pulse');
  });
  
  test('renders scan line when enabled', () => {
    render(<MatrixCode data="https://example.com" hasScanlineEffect />);
    
    // Should have scan line element
    const scanLine = document.querySelector('.animate-scanline');
    expect(scanLine).toBeInTheDocument();
  });
  
  test('renders barcode with correct dimensions', () => {
    render(<MatrixCode data="1234567890" type="barcode" size={200} />);
    
    const container = document.querySelector('div');
    // Barcode should have wider width than height
    expect(container?.style.width).toBe('240px'); // 200 * 1.2
    expect(container?.style.height).toBe('160px'); // 200 * 0.8
  });
  
  test('applies custom className', () => {
    render(<MatrixCode data="https://example.com" className="custom-class" />);
    
    const container = document.querySelector('div');
    expect(container).toHaveClass('custom-class');
  });
  
  test('calls onGenerated callback when code is generated', async () => {
    const onGenerated = jest.fn();
    
    render(<MatrixCode data="https://example.com" onGenerated={onGenerated} />);
    
    // Wait for the code to be generated
    await new Promise(resolve => setTimeout(resolve, 0));
    
    expect(onGenerated).toHaveBeenCalledTimes(1);
  });
  
  test('calls onError callback when an error occurs', async () => {
    const onError = jest.fn();
    
    // @ts-ignore - Intentionally passing empty data for test
    render(<MatrixCode data="" onError={onError} />);
    
    // Wait for the error to be caught
    await new Promise(resolve => setTimeout(resolve, 0));
    
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(expect.any(Error));
  });
});