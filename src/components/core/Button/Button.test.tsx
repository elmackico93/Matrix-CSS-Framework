import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  test('renders button component correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  test('applies correct variant classes', () => {
    const { rerender } = render(<Button variant="primary">Primary Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-matrix-primary');
    
    rerender(<Button variant="outline">Outline Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-transparent');
    expect(screen.getByRole('button')).toHaveClass('border-matrix-text');
    
    rerender(<Button variant="ghost">Ghost Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-transparent');
    expect(screen.getByRole('button')).toHaveClass('border-transparent');
    
    rerender(<Button variant="terminal">Terminal Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-black');
    expect(screen.getByRole('button')).toHaveClass('font-matrix-hacker');
    
    rerender(<Button variant="danger">Danger Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-matrix-danger');
  });

  test('applies correct size classes', () => {
    const { rerender } = render(<Button size="sm">Small Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-8');
    expect(screen.getByRole('button')).toHaveClass('text-xs');
    
    rerender(<Button size="md">Medium Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-10');
    expect(screen.getByRole('button')).toHaveClass('text-sm');
    
    rerender(<Button size="lg">Large Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-12');
    expect(screen.getByRole('button')).toHaveClass('text-base');
    
    rerender(<Button size="icon">Icon Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-10');
    expect(screen.getByRole('button')).toHaveClass('w-10');
  });

  test('applies glow effect when hasGlow is true', () => {
    render(<Button hasGlow>Glowing Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('shadow-[0_0_10px_var(--m-glow)]');
  });

  test('accepts and applies custom className', () => {
    render(<Button className="custom-class">Custom Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  test('forwards ref to DOM element', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref Button</Button>);
    
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  test('passes onClick handler to button', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Button</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies disabled state correctly', () => {
    render(<Button disabled>Disabled Button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-50');
  });
});