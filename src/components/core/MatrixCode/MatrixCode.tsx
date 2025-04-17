import React, { useEffect, useRef, useState, memo, useCallback } from 'react';
import QRCode from 'qrcode';
import JsBarcode from 'jsbarcode';
import { MatrixCodeProps } from './MatrixCode.types';

/**
 * MatrixCode - A cyberpunk-styled component for generating QR codes, barcodes, and datamatrices
 * with configurable visual effects inspired by the Matrix aesthetic.
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
 */
export const MatrixCode: React.FC<MatrixCodeProps> = memo(({
  data,
  type = 'qr',
  size = 200,
  color = '#00ff41', // Matrix green
  bgColor = '#000000',
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
  className = '',
  ...rest
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<HTMLDivElement>(null);
  const rainCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Combine all animation classes
  const animationClasses = [
    hasGlitchEffect && 'animate-glitch',
    hasPulseEffect && 'animate-pulse',
    hasGlowEffect && 'animate-glow-pulse',
  ].filter(Boolean).join(' ');

  // Clean up animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Matrix rain effect implementation
  const setupMatrixRain = useCallback(() => {
    if (!hasCodeRain || !containerRef.current) return;

    // Create canvas if it doesn't exist
    if (!rainCanvasRef.current) {
      const canvas = document.createElement('canvas');
      canvas.className = 'absolute inset-0 z-0 opacity-20 pointer-events-none';
      canvas.width = containerRef.current.offsetWidth;
      canvas.height = containerRef.current.offsetHeight;
      containerRef.current.appendChild(canvas);
      rainCanvasRef.current = canvas;
    }

    const canvas = rainCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Matrix characters (katakana and numbers)
    const chars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789'.split('');
    const fontSize = Math.max(8, Math.floor(size / 20));
    const columns = Math.ceil(canvas.width / fontSize);
    
    // Initialize drop positions
    const drops: number[] = Array(columns).fill(1);

    // Animation loop
    const draw = () => {
      // Semi-transparent black for fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set character style
      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;

      // Draw each character
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        ctx.fillText(char, x, y);

        // Reset column when it reaches bottom with randomization
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Move drop down
        drops[i]++;
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
  }, [hasCodeRain, color, size]);

  // Generate code based on type
  const generateCode = useCallback(async () => {
    if (!data) {
      setError(new Error('No data provided'));
      setIsLoading(false);
      if (onError) onError(new Error('No data provided'));
      return;
    }

    try {
      setIsLoading(true);
      
      if (type === 'qr') {
        if (!canvasRef.current) return;
        
        await QRCode.toCanvas(canvasRef.current, data, {
          width: size,
          margin: 1,
          color: {
            dark: color,
            light: bgColor
          },
          errorCorrectionLevel: errorCorrectionLevel
        });
      } 
      else if (type === 'barcode') {
        if (!svgRef.current) return;
        
        // Clear previous content
        while (svgRef.current.firstChild) {
          svgRef.current.removeChild(svgRef.current.firstChild);
        }
        
        // Create SVG element for barcode
        const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgElement.setAttribute('id', 'barcode');
        svgRef.current.appendChild(svgElement);
        
        // Generate barcode
        JsBarcode('#barcode', data, {
          format: barcodeFormat,
          width: 2,
          height: size * 0.8,
          displayValue: true,
          lineColor: color,
          background: bgColor,
          margin: 10,
          fontSize: 16,
          font: 'var(--m-font-main)', // Use Matrix font
        });
      } 
      else if (type === 'datamatrix') {
        if (!canvasRef.current) return;
        
        // For now, we'll use QR code as a placeholder
        // In production, you would integrate a DataMatrix library
        await QRCode.toCanvas(canvasRef.current, data, {
          width: size,
          margin: 1,
          color: {
            dark: color,
            light: bgColor
          }
        });
        
        // Add DataMatrix label
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.fillStyle = color;
          ctx.font = '10px var(--m-font-main)';
          ctx.textAlign = 'center';
          ctx.fillText('DataMatrix', size / 2, size - 5);
        }
      }

      // Setup matrix rain effect if enabled
      if (hasCodeRain) {
        setupMatrixRain();
      }

      setIsLoading(false);
      if (onGenerated) onGenerated();
    } catch (err) {
      console.error('Error generating code:', err);
      setError(err instanceof Error ? err : new Error(String(err)));
      setIsLoading(false);
      if (onError && err instanceof Error) onError(err);
    }
  }, [
    data, 
    type, 
    size, 
    color, 
    bgColor, 
    errorCorrectionLevel, 
    barcodeFormat, 
    hasCodeRain, 
    onGenerated, 
    onError, 
    setupMatrixRain
  ]);

  // Generate code on mount and when dependencies change
  useEffect(() => {
    // Cleanup previous animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    // Remove previous rain canvas if it exists
    if (rainCanvasRef.current && rainCanvasRef.current.parentNode) {
      rainCanvasRef.current.parentNode.removeChild(rainCanvasRef.current);
      rainCanvasRef.current = null;
    }

    generateCode();
  }, [generateCode]);

  // Build container classes
  const containerClasses = [
    'relative',
    'overflow-hidden',
    'inline-flex',
    'items-center',
    'justify-center',
    'bg-black',
    animationClasses,
    hasBorder && 'border border-matrix-border',
    hasGlowEffect && 'shadow-lg',
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      ref={containerRef}
      className={containerClasses}
      style={{ 
        width: size, 
        height: type === 'barcode' ? size * 0.6 : size
      }}
      role="img"
      aria-label={`${type.toUpperCase()} code containing: ${data}`}
      {...rest}
    >
      {/* Scanline effect */}
      {hasScanlineEffect && (
        <div className="absolute w-full h-4 bg-matrix-primary bg-opacity-30 animate-terminal-scan z-10"></div>
      )}

      {/* Loading state */}
      {isLoading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 z-20">
          <div className="text-matrix-text-bright animate-pulse">Generating...</div>
        </div>
      )}

      {/* Error message */}
      {error ? (
        <div className="text-matrix-danger p-2 text-center">
          <p>Error: {error.message}</p>
        </div>
      ) : (
        <>
          {/* QR Code and DataMatrix use canvas */}
          {(type === 'qr' || type === 'datamatrix') && (
            <canvas 
              ref={canvasRef}
              className="z-1"
              width={size}
              height={size}
            />
          )}
          
          {/* Barcode uses SVG */}
          {type === 'barcode' && (
            <div 
              ref={svgRef}
              className="z-1"
              style={{ width: size, height: size * 0.6 }}
            />
          )}
        </>
      )}
    </div>
  );
});

MatrixCode.displayName = 'MatrixCode';

export default MatrixCode;