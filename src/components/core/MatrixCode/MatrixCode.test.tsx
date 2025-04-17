import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import { MatrixCode } from './MatrixCode';

// Mock the libraries used
jest.mock('qrcode', () => ({
  toCanvas: jest.fn().mockImplementation((canvas, data, options) => {
    return Promise.resolve();
  })
}));

jest.mock('jsbarcode', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((selector, data, options) => {
    // Create mock SVG content to simulate how JSBarcode works
    const element = document.querySelector(selector);
    if (element) {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('width', '100');
      rect.setAttribute('height', '30');
      rect.setAttribute('fill', options.lineColor || '#000000');
      element.appendChild(rect);
      
      // Add text element if displayValue is true
      if (options.displayValue) {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.textContent = data;
        text.setAttribute('x', '50');
        text.setAttribute('y', '50');
        element.appendChild(text);
      }
    }
  })
}));

// Mock requestAnimationFrame and cancelAnimationFrame
global.requestAnimationFrame = jest.fn((callback) => {
  return setTimeout(callback, 0);
}) as any;

global.cancelAnimationFrame = jest.fn((id) => {
  clearTimeout(id);
}) as any;

describe('MatrixCode Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('renders with default props', async () => {
    render(<MatrixCode data="https://example.com" />);
    
    // Wait for code generation
    await waitFor(() => {
      const container = screen.getByRole('img');
      expect(container).toBeInTheDocument();
      expect(container).toHaveAttribute('aria-label', 'QR code containing: https://example.com');
    });
  });
  
  it('renders a QR code by default', async () => {
    render(<MatrixCode data="https://example.com" />);
    
    // Check if QRCode.toCanvas was called
    await waitFor(() => {
      expect(require('qrcode').toCanvas).toHaveBeenCalled();
    });
  });
  
  it('renders a barcode when type is set to barcode', async () => {
    render(<MatrixCode data="1234567890" type="barcode" />);
    
    // Check if JsBarcode was called
    await waitFor(() => {
      expect(require('jsbarcode').default).toHaveBeenCalled();
    });
  });
  
  it('shows an error message when no data is provided', async () => {
    // @ts-ignore - Intentionally passing empty data for test
    render(<MatrixCode data="" />);
    
    await waitFor(() => {
      expect(screen.getByText(/Error: No data provided/i)).toBeInTheDocument();
    });
  });
  
  it('applies visual effects when enabled', async () => {
    render(
      <MatrixCode 
        data="https://example.com" 
        hasGlowEffect 
        hasGlitchEffect 
        hasPulseEffect 
      />
    );
    
    await waitFor(() => {
      const container = screen.getByRole('img');
      const className = container.className;
      
      expect(className).toContain('shadow-lg');  // glow effect
      expect(className).toContain('animate-glitch');  // glitch effect
      expect(className).toContain('animate-pulse');  // pulse effect
    });
  });
  
  it('renders scan line effect when enabled', async () => {
    render(<MatrixCode data="https://example.com" hasScanlineEffect />);
    
    await waitFor(() => {
      const scanLine = document.querySelector('.animate-terminal-scan');
      expect(scanLine).toBeInTheDocument();
    });
  });
  
  it('uses custom size when provided', async () => {
    const customSize = 300;
    render(<MatrixCode data="https://example.com" size={customSize} />);
    
    await waitFor(() => {
      const container = screen.getByRole('img');
      expect(container.style.width).toBe(`${customSize}px`);
      expect(container.style.height).toBe(`${customSize}px`);
    });
  });
  
  it('adjusts height for barcode type', async () => {
    const size = 200;
    render(<MatrixCode data="1234567890" type="barcode" size={size} />);
    
    await waitFor(() => {
      const container = screen.getByRole('img');
      expect(container.style.height).toBe(`${size * 0.6}px`);
    });
  });
  
  it('calls onGenerated callback after successful generation', async () => {
    const onGenerated = jest.fn();
    
    render(<MatrixCode data="https://example.com" onGenerated={onGenerated} />);
    
    await waitFor(() => {
      expect(onGenerated).toHaveBeenCalledTimes(1);
    });
  });
  
  it('calls onError callback when an error occurs', async () => {
    const onError = jest.fn();
    
    // Mock QRCode.toCanvas to throw an error
    require('qrcode').toCanvas.mockImplementationOnce(() => {
      throw new Error('Test error');
    });
    
    render(<MatrixCode data="https://example.com" onError={onError} />);
    
    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith(expect.any(Error));
    });
  });
  
  it('applies custom className', async () => {
    render(<MatrixCode data="https://example.com" className="custom-test-class" />);
    
    await waitFor(() => {
      const container = screen.getByRole('img');
      expect(container.className).toContain('custom-test-class');
    });
  });
  
  it('passes additional HTML attributes to the container', async () => {
    render(
      <MatrixCode 
        data="https://example.com" 
        data-testid="matrix-code"
        title="Test QR Code"
      />
    );
    
    await waitFor(() => {
      const container = screen.getByTestId('matrix-code');
      expect(container).toHaveAttribute('title', 'Test QR Code');
    });
  });
  
  it('cleans up animations when unmounted', async () => {
    const { unmount } = render(
      <MatrixCode data="https://example.com" hasCodeRain />
    );
    
    // Wait for code generation
    await waitFor(() => {
      expect(global.requestAnimationFrame).toHaveBeenCalled();
    });
    
    // Unmount and check cleanup
    unmount();
    expect(global.cancelAnimationFrame).toHaveBeenCalled();
  });
});