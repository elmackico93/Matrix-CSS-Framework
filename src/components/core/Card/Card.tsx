import React, { HTMLAttributes, forwardRef } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { CardProps, CardHeaderProps, CardTitleProps, CardDescriptionProps, CardContentProps, CardFooterProps, CardStatusIndicatorProps, CardStatusType } from './Card.types';

const cardVariants = cva(
  'relative flex flex-col bg-matrix-panel border border-matrix-border rounded overflow-hidden transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-matrix-panel border-matrix-border',
        elevated: 'border-matrix-border shadow-[0_0_15px_rgba(0,255,65,0.2)]',
        terminal: 'bg-black bg-opacity-80 border-matrix-text font-matrix-hacker',
        outlined: 'bg-transparent border-matrix-border border-2',
        glass: 'bg-matrix-panel bg-opacity-30 backdrop-blur-sm border-[rgba(0,255,65,0.2)]',
        inset: 'bg-matrix-bg border-matrix-border shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]',
        cyber: 'clip-path-cyber bg-matrix-panel border-0',
      },
      status: {
        none: '',
        primary: 'border-l-4 border-l-matrix-primary',
        success: 'border-l-4 border-l-matrix-success',
        warning: 'border-l-4 border-l-matrix-warning',
        danger: 'border-l-4 border-l-matrix-danger',
        info: 'border-l-4 border-l-matrix-info',
      },
      hoverable: {
        true: 'hover:translate-y-[-5px] hover:shadow-[0_5px_15px_rgba(0,255,65,0.1)]',
        false: '',
      },
      hasGlow: {
        true: 'shadow-[0_0_15px_var(--m-glow)] hover:shadow-[0_0_20px_var(--m-glow)]',
        false: '',
      },
      compact: {
        true: 'p-0',
        false: '',
      },
      isDataCard: {
        true: 'font-matrix-hacker text-matrix-text text-sm before:absolute before:top-0 before:right-0 before:text-[10px] before:text-matrix-text-dim before:content-["DATA"]',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      status: 'none',
      hoverable: true,
      hasGlow: false,
      compact: false,
      isDataCard: false,
    },
  }
);

/**
 * Card component for displaying content in a contained box
 * 
 * @example
 * // Basic usage
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card description</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Card content goes here</p>
 *   </CardContent>
 *   <CardFooter>
 *     <Button>Action</Button>
 *   </CardFooter>
 * </Card>
 * 
 * @example
 * // Different variants
 * <Card variant="elevated" hasGlow>Glowing Card</Card>
 * <Card variant="terminal">Terminal Card</Card>
 * <Card variant="cyber">Cyber Card</Card>
 */
const Card = forwardRef<HTMLDivElement, CardProps>(
  ({
    className,
    variant,
    hoverable,
    hasGlow,
    status = 'none',
    compact,
    isDataCard,
    children,
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({
            variant,
            hoverable,
            hasGlow,
            status,
            compact,
            isDataCard,
          }),
          className
        )}
        {...props}
      >
        {hoverable && (
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-matrix-bg via-matrix-text to-matrix-bg opacity-0 transition-opacity duration-500 group-hover:opacity-100 hover:opacity-100" />
        )}
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

/**
 * Header section of a Card
 */
const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'px-6 py-3 border-b border-matrix-border bg-black bg-opacity-20 font-medium',
          className
        )}
        {...props}
      />
    );
  }
);

CardHeader.displayName = 'CardHeader';

/**
 * Title for the Card header
 */
const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn('text-xl font-bold text-matrix-text-bright mb-0', className)}
        {...props}
      />
    );
  }
);

CardTitle.displayName = 'CardTitle';

/**
 * Optional description text for the Card header
 */
const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-matrix-text-dim text-sm', className)}
        {...props}
      />
    );
  }
);

CardDescription.displayName = 'CardDescription';

/**
 * Main content area of the Card
 */
const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('p-6 pt-0 flex-1', className)}
        {...props}
      />
    );
  }
);

CardContent.displayName = 'CardContent';

/**
 * Footer area of the Card, typically for actions or meta information
 */
const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('px-6 py-3 border-t border-matrix-border bg-black bg-opacity-20', className)}
        {...props}
      />
    );
  }
);

CardFooter.displayName = 'CardFooter';

/**
 * Status indicator component that can be used inside a Card
 */
const CardStatusIndicator = ({ type, text, className, ...props }: CardStatusIndicatorProps) => {
  const statusColors = {
    none: 'bg-matrix-border text-matrix-text',
    primary: 'bg-matrix-primary bg-opacity-20 text-matrix-text-bright',
    success: 'bg-matrix-success bg-opacity-20 text-matrix-success',
    warning: 'bg-matrix-warning bg-opacity-20 text-matrix-warning',
    danger: 'bg-matrix-danger bg-opacity-20 text-matrix-danger',
    info: 'bg-matrix-info bg-opacity-20 text-matrix-info',
  };

  if (type === 'none' && !text) return null;

  return (
    <div
      className={cn(
        'px-2 py-1 text-xs rounded border mb-4',
        statusColors[type],
        className
      )}
      {...props}
    >
      {text || type.toUpperCase()}
    </div>
  );
};

CardStatusIndicator.displayName = 'CardStatusIndicator';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardStatusIndicator };