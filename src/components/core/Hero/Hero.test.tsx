import React from 'react';
import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';

// Mock requestAnimationFrame for canvas testing
global.requestAnimationFrame = jest.fn(callback => {
  setTimeout(callback, 0);
  return 0;
});

global.cancelAnimationFrame = jest.fn();

describe('Hero Component', () => {
  test('renders hero component with title and subtitle', () => {
    render(
      <Hero title="Test Title" subtitle="Test Subtitle" />
    );
    
    // Check that title and subtitle are rendered
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });
  
  test('renders with children components', () => {
    render(
      <Hero title="Test Title">
        <button>Test Button</button>
      </Hero>
    );
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Test Button');
  });

  test('applies variant classes correctly', () => {
    const { rerender } = render(<Hero variant="default" data-testid="hero" />);
    expect(screen.getByTestId('hero')).toHaveClass('bg-matrix-bg');
    
    rerender(<Hero variant="dark" data-testid="hero" />);
    expect(screen.getByTestId('hero')).toHaveClass('bg-black');
    
    rerender(<Hero variant="terminal" data-testid="hero" />);
    expect(screen.getByTestId('hero')).toHaveClass('bg-matrix-panel');
    expect(screen.getByTestId('hero')).toHaveClass('border-matrix-border');
    
    rerender(<Hero variant="gradient" data-testid="hero" />);
    expect(screen.getByTestId('hero')).toHaveClass('bg-gradient-to-br');
    expect(screen.getByTestId('hero')).toHaveClass('from-matrix-dark');
    
    rerender(<Hero variant="cyber" data-testid="hero" />);
    expect(screen.getByTestId('hero')).toHaveClass('bg-matrix-bg');
    expect(screen.getByTestId('hero')).toHaveClass('relative');
  });

  test('applies size classes correctly', () => {
    const { rerender } = render(<Hero size="sm" data-testid="hero" />);
    expect(screen.getByTestId('hero')).toHaveClass('min-h-[50vh]');
    
    rerender(<Hero size="md" data-testid="hero" />);
    expect(screen.getByTestId('hero')).toHaveClass('min-h-[70vh]');
    
    rerender(<Hero size="lg" data-testid="hero" />);
    expect(screen.getByTestId('hero')).toHaveClass('h-screen');
    
    rerender(<Hero size="auto" data-testid="hero" />);
    expect(screen.getByTestId('hero')).toHaveClass('min-h-min');
    expect(screen.getByTestId('hero')).toHaveClass('py-16');
  });

  test('applies contentAlignment classes correctly', () => {
    const { rerender } = render(<Hero contentAlignment="center" data-testid="hero" />);
    expect(screen.getByTestId('hero')).toHaveClass('text-center');
    expect(screen.getByTestId('hero')).toHaveClass('items-center');
    
    rerender(<Hero contentAlignment="left" data-testid="hero" />);
    expect(screen.getByTestId('hero')).toHaveClass('text-left');
    expect(screen.getByTestId('hero')).toHaveClass('items-start');
    
    rerender(<Hero contentAlignment="right" data-testid="hero" />);
    expect(screen.getByTestId('hero')).toHaveClass('text-right');
    expect(screen.getByTestId('hero')).toHaveClass('items-end');
  });

  test('applies title effects correctly', () => {
    const { rerender } = render(<Hero title="Test" titleEffect="none" />);
    expect(screen.getByText('Test')).not.toHaveClass('text-shadow-[0_0_20px_var(--m-glow),0_0_40px_var(--m-glow)]');
    
    rerender(<Hero title="Test" titleEffect="glow" />);
    expect(screen.getByText('Test')).toHaveClass('text-shadow-[0_0_20px_var(--m-glow),0_0_40px_var(--m-glow)]');
  });

  test('shows version badge when specified', () => {
    const { rerender } = render(<Hero showVersion={false} />);
    expect(screen.queryByText('VERSION 1.0')).not.toBeInTheDocument();
    
    rerender(<Hero showVersion={true} />);
    expect(screen.getByText('VERSION 1.0')).toBeInTheDocument();
    
    rerender(<Hero showVersion={true} version="VERSION 2.0" />);
    expect(screen.getByText('VERSION 2.0')).toBeInTheDocument();
  });

  test('shows scroll indicator when specified', () => {
    const { rerender } = render(<Hero showScrollIndicator={false} />);
    expect(screen.queryByText('Scroll Down')).not.toBeInTheDocument();
    
    rerender(<Hero showScrollIndicator={true} />);
    expect(screen.getByText('Scroll Down')).toBeInTheDocument();
  });

  test('renders rain canvas when hasRainEffect is true', () => {
    const { rerender } = render(<Hero hasRainEffect={false} />);
    expect(screen.queryByRole('canvas')).not.toBeInTheDocument();
    
    rerender(<Hero hasRainEffect={true} />);
    // Canvas element exists but doesn't have a role by default
    expect(document.querySelector('canvas')).toBeInTheDocument();
  });
});