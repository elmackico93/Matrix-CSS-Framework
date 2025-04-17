import React, { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../../utils/cn';
import { ProgressProps } from './Progress.types';

// Variants for the progress container
const progressVariants = cva('h-4 overflow-hidden rounded bg-opacity-30 bg-[rgba(0,30,0,0.3)]', {
  variants: {
    variant: {
      default: '',
      striped: '',
      animated: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

// Variants for the progress bar
const progressBarVariants = cva(
  'h-full flex items-center justify-center text-xs text-white transition-all',
  {
    variants: {
      variant: {
        default: 'bg-matrix-primary',
        striped:
          'bg-matrix-primary bg-[linear-gradient(45deg,rgba(255,255,255,0.15)25%,transparent25%,transparent50%,rgba(255,255,255,0.15)50%,rgba(255,255,255,0.15)75%,transparent75%,transparent)] bg-[size:1rem_1rem]',
        animated:
          'bg-matrix-primary bg-[linear-gradient(45deg,rgba(255,255,255,0.15)25%,transparent25%,transparent50%,rgba(255,255,255,0.15)50%,rgba(255,255,255,0.15)75%,transparent75%,transparent)] bg-[size:1rem_1rem] animate-[progress-bar-stripes_1s_linear_infinite]',
      },
      color: {
        default: 'bg-matrix-primary',
        success: 'bg-matrix-success',
        warning: 'bg-matrix-warning',
        danger: 'bg-matrix-danger',
        info: 'bg-matrix-info',
      },
    },
    defaultVariants: {
      variant: 'default',
      color: 'default',
    },
  }
);

/**
 * Progress component for displaying the completion status of a task or operation
 */
const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, variant, value = 0, max = 100, color, showLabel = false, ...props }, ref) => {
    // Calculate the percentage completed
    const percentage = Math.min(Math.max(0, (value / max) * 100), 100);

    return (
      <div
        ref={ref}
        className={cn(progressVariants({ variant }), className)}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={`${percentage}% complete`}
        {...props}
      >
        <div
          className={cn(progressBarVariants({ variant, color }))}
          style={{ width: `${percentage}%` }}
        >
          {showLabel && `${Math.round(percentage)}%`}
        </div>
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export { Progress };