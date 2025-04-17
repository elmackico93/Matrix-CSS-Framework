import React, { forwardRef, useState } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { InputProps as BaseInputProps } from './Input.types';

// Input container variants
const inputContainerVariants = cva(
  'relative mb-4',
  {
    variants: {
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      fullWidth: true,
    },
  }
);

// Input field variants
const inputVariants = cva(
  'block transition-all duration-200 font-matrix focus:outline-none placeholder:text-matrix-text-dim',
  {
    variants: {
      variant: {
        default: 'bg-matrix-bg bg-opacity-90 border border-matrix-border rounded focus:ring-2 focus:ring-matrix-text',
        filled: 'bg-matrix-secondary bg-opacity-20 border-transparent border focus:ring-2 focus:ring-matrix-text rounded',
        outlined: 'bg-transparent border-matrix-border border-2 focus:border-matrix-text focus:ring-1 focus:ring-matrix-text rounded',
        ghosted: 'bg-transparent border-b border-matrix-border focus:border-matrix-text rounded-none',
        terminal: 'bg-black font-matrix-hacker border border-matrix-text focus:ring-2 focus:ring-matrix-text rounded tracking-wider',
        data: 'bg-black font-matrix-hacker border border-matrix-text focus:ring-2 focus:ring-matrix-text rounded tracking-wider uppercase before:content-["DATA"] before:absolute before:top-0 before:right-1 before:text-[8px] before:text-matrix-text-dim before:opacity-70',
        cyber: 'clip-path-cyber bg-matrix-bg bg-opacity-90 border border-matrix-text focus:ring-2 focus:ring-matrix-text transition-all duration-200',
      },
      size: {
        sm: 'p-1.5 text-xs',
        md: 'p-2 text-sm',
        lg: 'p-3 text-base',
      },
      status: {
        default: 'border-matrix-border',
        success: 'border-matrix-success focus:ring-matrix-success',
        warning: 'border-matrix-warning focus:ring-matrix-warning',
        error: 'border-matrix-danger focus:ring-matrix-danger', 
        info: 'border-matrix-info focus:ring-matrix-info',
      },
      hasPrefix: {
        true: 'pl-9',
        false: '',
      },
      hasSuffix: {
        true: 'pr-9',
        false: '',
      },
      hasGlow: {
        true: 'shadow-[0_0_10px_var(--m-glow)] focus:shadow-[0_0_15px_var(--m-glow)]',
        false: '',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
      animated: {
        true: 'animate-pulse',
        false: '',
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      status: 'default',
      hasPrefix: false,
      hasSuffix: false,
      hasGlow: false,
      fullWidth: true,
      animated: false,
    },
  }
);

// Helper text variants
const helperTextVariants = cva(
  'mt-1 text-xs',
  {
    variants: {
      status: {
        default: 'text-matrix-text-dim',
        success: 'text-matrix-success',
        warning: 'text-matrix-warning',
        error: 'text-matrix-danger',
        info: 'text-matrix-info',
      },
    },
    defaultVariants: {
      status: 'default',
    },
  }
);

// Extend the InputProps from Input.types.ts with CVA variants
export interface InputProps 
  extends BaseInputProps,
    VariantProps<typeof inputVariants> {}

/**
 * Input component with multiple visual variants optimized for the Matrix UI theme.
 * 
 * @example
 * // Basic usage
 * <Input label="Username" placeholder="Enter username" />
 * 
 * @example
 * // With variants and status
 * <Input 
 *   variant="terminal" 
 *   status="success" 
 *   label="Access Code" 
 *   hasGlow 
 * />
 * 
 * @example
 * // With prefix and suffix
 * <Input 
 *   prefix={<SearchIcon />} 
 *   suffix={<ClearIcon />} 
 *   placeholder="Search..."
 * />
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className,
    containerClassName,
    labelClassName,
    label,
    error,
    helperText,
    id,
    variant = 'default',
    size = 'md',
    status = error ? 'error' : 'default',
    prefix,
    suffix,
    fullWidth = true,
    hasGlow = false,
    animated = false,
    type = 'text',
    ...props 
  }, ref) => {
    const inputId = id || `matrix-input-${Math.random().toString(36).substring(2, 9)}`;
    const [showPassword, setShowPassword] = useState(false);
    const hasPrefix = Boolean(prefix);
    const hasSuffix = Boolean(suffix) || type === 'password';

    // Handle password visibility toggle
    const inputType = type === 'password' && showPassword ? 'text' : type;
    const handleTogglePassword = () => setShowPassword(!showPassword);

    return (
      <div className={cn(inputContainerVariants({ fullWidth }), containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block mb-2 text-sm font-medium text-matrix-text",
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {prefix && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-matrix-text-dim">
              {prefix}
            </div>
          )}
          <input
            id={inputId}
            type={inputType}
            className={cn(
              inputVariants({
                variant,
                size,
                status,
                hasPrefix,
                hasSuffix,
                hasGlow,
                fullWidth,
                animated,
              }),
              "text-matrix-text",
              className
            )}
            ref={ref}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error || helperText ? `${inputId}-description` : undefined}
            {...props}
          />
          {suffix && !hasSuffix && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-matrix-text-dim">
              {suffix}
            </div>
          )}
          {type === 'password' && (
            <button
              type="button"
              onClick={handleTogglePassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-matrix-text-dim hover:text-matrix-text-bright focus:outline-none focus:text-matrix-text-bright"
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              {showPassword ? (
                // Eye closed icon
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              ) : (
                // Eye open icon
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              )}
            </button>
          )}
        </div>
        
        {(error || helperText) && (
          <p 
            id={`${inputId}-description`}
            className={cn(
              helperTextVariants({ status }),
              "mt-1"
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input, inputVariants };