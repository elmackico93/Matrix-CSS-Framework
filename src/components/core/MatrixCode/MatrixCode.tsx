import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/cn';
import { MatrixCodeProps } from './MatrixCode.types';

/**
 * MatrixCode component for generating cyberpunk-style QR codes, barcodes, and data matrices
 * with Matrix-inspired visual effects.
 * 
 * @example
 * // Basic QR code
 * <MatrixCode data="https://example.com" />
 * 
 * @example
 * // Barcode with glow effect
 * <MatrixCode 
 *   data="1234567890" 
 *   type="barcode" 
 *   hasGlowEffect 
 * />
 * 
 * @example
 * // Data matrix with scan line and glitch effects
 * <MatrixCode 
 *   data="MATRIX-DATA-123" 
 *   type="datamatrix" 
 *   hasScanlineEffect
 *   hasGlitchEffect 
 * />
 */
export const MatrixCode: React.FC<MatrixCodeProps> = ({
  data,
  type = 'qr',
  size = 200,
  color = '#00ff41',
  bgColor = '#000000',
  className,
  hasBorder = true,
  hasGlowEffect = false,
  hasGlitchEffect = false,
  hasPulseEffect = false,
  hasScanlineEffect = false,
  hasCodeRain = false,
  errorCorrectionLevel = 'H',
  barcodeFormat = 'CODE128',
  onGenerated,
  onError,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [generated, setGenerated] = useState(false);
  
  useEffect(() => {
    if (!data) {
      if (onError) onError(new Error('No data provided'));
      return;
    }
    
    const generateCode = async () => {
      try {
        switch (type) {
          case 'qr':
            await generateQRCode();
            break;
          case 'barcode':
            await generateBarcode();
            break;
          case 'datamatrix':
            await generateDataMatrix();
            break;
          default:
            await generateQRCode();
        }
        
        setGenerated(true);
        if (onGenerated) onGenerated();
      } catch (error) {
        console.error('Error generating code:', error);
        if (onError) onError(error as Error);
      }
    };
    
    generateCode();
    
    // Create the code rain effect if enabled
    let codeRainAnimation: number;
    if (hasCodeRain && containerRef.current) {
      codeRainAnimation = createMatrixRainEffect(containerRef.current);
    }
    
    return () => {
      if (codeRainAnimation) {
        cancelAnimationFrame(codeRainAnimation);
      }
    };
  }, [data, type, size, color, bgColor, errorCorrectionLevel, barcodeFormat]);
  
  // Generate QR code using canvas
  const generateQRCode = async () => {
    if (!canvasRef.current) return;
    
    // Dynamically import QRCode.js
    const QRCode = await import('qrcode');
    
    const options = {
      errorCorrectionLevel: errorCorrectionLevel as any,
      margin: 1,
      color: {
        dark: color,
        light: bgColor
      },
      width: size
    };
    
    await QRCode.toCanvas(canvasRef.current, data, options);
  };
  
  // Generate barcode using canvas
  const generateBarcode = async () => {
    if (!canvasRef.current) return;
    
    // Dynamically import JsBarcode
    const JsBarcode = (await import('jsbarcode')).default;
    
    JsBarcode(canvasRef.current, data, {
      format: barcodeFormat,
      lineColor: color,
      background: bgColor,
      width: 2,
      height: size * 0.4,
      displayValue: true,
      fontSize: size * 0.08,
      font: 'monospace',
      textMargin: 2,
      textPosition: 'bottom',
      textAlign: 'center',
      fontOptions: 'bold',
      margin: 10
    });
  };
  
  // Generate data matrix code
  const generateDataMatrix = async () => {
    if (!canvasRef.current) return;
    
    // Note: This is a simplified implementation. In a real component,
    // you would use a library like `datamatrix-svg` or similar.
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    // Clear canvas
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw fake data matrix for demo
    // In a real implementation, use a proper library
    ctx.fillStyle = color;
    
    // Generate a simple pattern based on the data
    const patternSize = Math.min(16, data.length);
    const cellSize = size / (patternSize + 2); // +2 for quiet zone
    
    // Draw finder patterns (L shapes in corners)
    ctx.fillRect(cellSize, cellSize, cellSize, size - 2 * cellSize);
    ctx.fillRect(cellSize, cellSize, size - 2 * cellSize, cellSize);
    
    // Generate pattern from data
    for (let i = 0; i < data.length && i < (patternSize * patternSize); i++) {
      const charCode = data.charCodeAt(i) % 2; // 0 or 1
      if (charCode === 1) {
        const row = Math.floor(i / patternSize) + 2;
        const col = (i % patternSize) + 2;
        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  };
  
  // Create Matrix code rain effect
  const createMatrixRainEffect = (container: HTMLElement) => {
    const canvas = document.createElement('canvas');
    canvas.className = 'absolute inset-0 z-0 pointer-events-none opacity-25';
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return 0;
    
    // Matrix rain characters
    const chars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789'.split('');
    
    // Columns setup
    const fontSize = 10;
    const columns = Math.ceil(canvas.width / fontSize);
    const drops: number[] = [];
    
    // Initialize all columns to start position
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }
    
    // Animation function
    const draw = () => {
      // Add semi-transparent black rectangle to create fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Set color and font
      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;
      
      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Draw character and move down
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Reset when reaching bottom and randomize
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Move down
        drops[i]++;
      }
      
      return requestAnimationFrame(draw);
    };
    
    // Start animation
    return draw();
  };
  
  // Scan line animation component
  const ScanLine = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="w-full h-2 bg-gradient-to-r from-transparent via-matrix-text to-transparent opacity-50 absolute -top-2 animate-scanline"></div>
    </div>
  );
  
  return (
    <div 
      ref={containerRef}
      className={cn(
        'relative inline-flex items-center justify-center bg-matrix-bg',
        hasBorder && 'border-2 border-matrix-border p-4',
        hasGlowEffect && 'shadow-[0_0_15px_var(--matrix-glow)]',
        hasGlitchEffect && 'animate-glitch',
        hasPulseEffect && 'animate-pulse',
        className
      )}
      style={{ 
        width: type === 'barcode' ? size * 1.2 : size * 1.2, 
        height: type === 'barcode' ? size * 0.8 : size * 1.2 
      }}
      {...props}
    >
      {/* Matrix code rain background */}
      {hasCodeRain && (
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
          <div className="matrix-code-bg"></div>
        </div>
      )}
      
      {/* The canvas for rendering the code */}
      <canvas 
        ref={canvasRef}
        width={size}
        height={size}
        className={cn(
          'z-10',
          hasGlitchEffect && 'animate-glitch',
          hasPulseEffect && 'animate-pulse'
        )}
      />
      
      {/* Overlay scan line effect */}
      {hasScanlineEffect && <ScanLine />}
      
      {/* Status indicator for failed generation */}
      {!generated && data && (
        <div className="absolute inset-0 flex items-center justify-center bg-matrix-bg bg-opacity-80 z-20">
          <div className="text-matrix-text animate-pulse">
            Generating...
          </div>
        </div>
      )}
      
      {/* Error state */}
      {!data && (
        <div className="absolute inset-0 flex items-center justify-center bg-matrix-bg z-20">
          <div className="text-matrix-danger">
            No data provided
          </div>
        </div>
      )}
    </div>
  );
};

// Add a keyframes animation for the scanline effect
const style = document.createElement('style');
style.textContent = `
@keyframes scanline {
  0% { transform: translateY(0); }
  100% { transform: translateY(100%); }
}

.animate-scanline {
  animation: scanline 2s linear infinite;
}
`;
document.head.appendChild(style);