import React, { forwardRef, useState, useId } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { CheckboxProps as BaseCheckboxProps } from './Checkbox.types';

// Root component wrapper variants
const checkboxContainerVariants = cva(
  'flex items-start mb-4 group',
  {
    variants: {
      disabled: {
        true: 'opacity-60 cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

// Checkbox control variants
const checkboxControlVariants = cva(
  'appearance-none relative bg-matrix-bg border rounded cursor-pointer transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'border-matrix-border before:bg-matrix-primary',
        terminal: 'border-matrix-text before:bg-matrix-text',
        cyber: 'clip-path-cyber border-matrix-border before:bg-matrix-primary',
        glow: 'border-matrix-text shadow-[0_0_5px_var(--m-glow)] before:bg-matrix-text checked:shadow-[0_0_10px_var(--m-glow)]',
        data: 'border-matrix-text before:bg-matrix-text after:content-["01"] after:absolute after:right-0 after:top-0 after:opacity-0 checked:after:opacity-100 after:text-[6px] after:text-matrix-text-bright after:transition-opacity',
        pulse: 'border-matrix-border animate-pulse before:bg-matrix-primary',
      },
      size: {
        sm: 'w-3.5 h-3.5 min-w-[0.875rem] after:w-[4px] after:h-[8px] after:top-[1.5px] after:left-[5px]',
        md: 'w-4 h-4 min-w-[1rem] after:w-[5px] after:h-[10px] after:top-[2px] after:left-[6px]',
        lg: 'w-5 h-5 min-w-[1.25rem] after:w-[7px] after:h-[12px] after:top-[3px] after:left-[7.5px]',
      },
      status: {
        default: '',
        error: 'border-matrix-danger',
        success: 'border-matrix-success',
        warning: 'border-matrix-warning',
      },
      disabled: {
        true: 'cursor-not-allowed',
        false: '',
      },
      hasHoverEffect: {
        true: 'hover:border-matrix-text group-hover:border-matrix-text',
        false: '',
      },
      hasFocusRing: {
        true: 'focus-visible:ring-2 focus-visible:ring-matrix-text focus-visible:ring-opacity-50 focus-visible:outline-none',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      status: 'default',
      disabled: false,
      hasHoverEffect: true,
      hasFocusRing: true,
    },
    compoundVariants: [
      {
        variant: 'glow',
        disabled: true,
        className: 'shadow-none',
      },
    ],
  }
);

// Label variants
const labelVariants = cva(
  'cursor-pointer transition-colors',
  {
    variants: {
      variant: {
        default: 'text-matrix-text',
        terminal: 'font-matrix-hacker tracking-wide text-matrix-text',
        cyber: 'text-matrix-text',
        glow: 'text-matrix-text',
        data: 'font-matrix-alt text-matrix-text',
        pulse: 'text-matrix-text',
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
      isFocused: {
        true: 'text-matrix-text-bright',
        false: '',
      },
      disabled: {
        true: 'cursor-not-allowed',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      isFocused: false,
      disabled: false,
    },
  }
);

// Combined type with CVA variants
export interface CheckboxProps 
  extends BaseCheckboxProps,
    VariantProps<typeof checkboxControlVariants> {
}

/**
 * Matrix-themed Checkbox component with various visual styles and states
 * 
 * @example
 * // Basic usage
 * <Checkbox label="Accept terms" />
 * 
 * @example
 * // With variants and descriptions
 * <Checkbox 
 *   variant="terminal" 
 *   label="ENABLE SYSTEM ACCESS" 
 *   description="Grants access to secure system functions"
 * />
 * 
 * @example
 * // Different sizes
 * <Checkbox size="sm" label="Small option" />
 * <Checkbox size="lg" label="Large option" />
 */
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ 
    className,
    containerClassName,
    labelClassName,
    label, 
    description,
    error,
    variant = 'default',
    size = 'md',
    status = error ? 'error' : 'default',
    id,
    disabled = false,
    hasHoverEffect = true,
    hasFocusRing = true,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const uniqueId = useId();
    const checkboxId = id || `matrix-checkbox-${uniqueId}`;

    return (
      <div className={cn(checkboxContainerVariants({ disabled }), containerClassName)}>
        <div className="flex items-center h-5">
          <input
            id={checkboxId}
            type="checkbox"
            className={cn(
              checkboxControlVariants({
                variant,
                size,
                status,
                disabled,
                hasHoverEffect,
                hasFocusRing,
              }),
              // Custom styles for checked state using pseudo-elements
              "before:absolute before:inset-0 before:scale-0 before:rounded-sm before:transition-transform before:duration-200",
              "checked:before:scale-90",
              // Checkmark styling
              "after:absolute after:border-r-2 after:border-b-2 after:border-matrix-bg after:rotate-45 after:opacity-0",
              "checked:after:opacity-100",
              className
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            ref={ref}
            aria-invalid={status === 'error' ? true : undefined}
            aria-describedby={
              error || description 
                ? `${checkboxId}-description` 
                : undefined
            }
            {...props}
          />
        </div>
        
        {(label || description || error) && (
          <div className={cn("ml-3", labelVariants({ size }).className)}>
            {label && (
              <label 
                htmlFor={checkboxId} 
                className={cn(
                  labelVariants({
                    variant,
                    size, 
                    isFocused, 
                    disabled,
                  }),
                  labelClassName
                )}
              >
                {label}
              </label>
            )}
            
            {(description || error) && (
              <p 
                id={`${checkboxId}-description`}
                className={cn(
                  "mt-1 text-xs",
                  error ? "text-matrix-danger" : "text-matrix-text-dim"
                )}
              >
                {error || description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox, checkboxControlVariants, checkboxContainerVariants, labelVariants };