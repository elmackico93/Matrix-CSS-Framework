import React from 'react';
import { render, screen } from '@testing-library/react';
import { Progress } from './Progress';

describe('Progress Component', () => {
  test('renders progress component correctly', () => {
    render(<Progress value={50} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('sets correct aria attributes based on value and max', () => {
    render(<Progress value={25} max={50} />);
    
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '25');
    expect(progressbar).toHaveAttribute('aria-valuemin', '0');
    expect(progressbar).toHaveAttribute('aria-valuemax', '50');
  });

  test('calculates and displays correct percentage width', () => {
    render(<Progress value={25} max={50} />);
    
    // Should be 50% of container width since 25 is 50% of 50
    const progressBar = screen.getByRole('progressbar').firstChild;
    expect(progressBar).toHaveStyle('width: 50%');
  });

  test('caps percentage at 100% when value > max', () => {
    render(<Progress value={150} max={100} />);
    
    const progressBar = screen.getByRole('progressbar').firstChild;
    expect(progressBar).toHaveStyle('width: 100%');
  });

  test('sets minimum percentage to 0% when value < 0', () => {
    render(<Progress value={-10} max={100} />);
    
    const progressBar = screen.getByRole('progressbar').firstChild;
    expect(progressBar).toHaveStyle('width: 0%');
  });

  test('displays label when showLabel is true', () => {
    render(<Progress value={25} max={100} showLabel />);
    
    expect(screen.getByText('25%')).toBeInTheDocument();
  });

  test('does not display label when showLabel is false', () => {
    render(<Progress value={25} max={100} showLabel={false} />);
    
    expect(screen.queryByText('25%')).not.toBeInTheDocument();
  });

  test('applies different variant classes', () => {
    const { rerender } = render(<Progress variant="default" value={50} />);
    
    let progressBar = screen.getByRole('progressbar').firstChild;
    expect(progressBar).toHaveClass('bg-matrix-primary');
    expect(progressBar).not.toHaveClass('bg-[linear-gradient');
    
    rerender(<Progress variant="striped" value={50} />);
    progressBar = screen.getByRole('progressbar').firstChild;
    expect(progressBar).toHaveClass('bg-[linear-gradient');
    expect(progressBar).toHaveClass('bg-[size:1rem_1rem]');
    expect(progressBar).not.toHaveClass('animate-[progress-bar-stripes');
    
    rerender(<Progress variant="animated" value={50} />);
    progressBar = screen.getByRole('progressbar').firstChild;
    expect(progressBar).toHaveClass('bg-[linear-gradient');
    expect(progressBar).toHaveClass('bg-[size:1rem_1rem]');
    expect(progressBar).toHaveClass('animate-[progress-bar-stripes');
  });

  test('applies different color classes', () => {
    const { rerender } = render(<Progress color="default" value={50} />);
    
    let progressBar = screen.getByRole('progressbar').firstChild;
    expect(progressBar).toHaveClass('bg-matrix-primary');
    
    rerender(<Progress color="success" value={50} />);
    progressBar = screen.getByRole('progressbar').firstChild;
    expect(progressBar).toHaveClass('bg-matrix-success');
    
    rerender(<Progress color="warning" value={50} />);
    progressBar = screen.getByRole('progressbar').firstChild;
    expect(progressBar).toHaveClass('bg-matrix-warning');
    
    rerender(<Progress color="danger" value={50} />);
    progressBar = screen.getByRole('progressbar').firstChild;
    expect(progressBar).toHaveClass('bg-matrix-danger');
    
    rerender(<Progress color="info" value={50} />);
    progressBar = screen.getByRole('progressbar').firstChild;
    expect(progressBar).toHaveClass('bg-matrix-info');
  });

  test('accepts and applies custom className', () => {
    render(<Progress className="custom-class" value={50} />);
    expect(screen.getByRole('progressbar')).toHaveClass('custom-class');
  });

  test('forwards ref to DOM element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Progress ref={ref} value={50} />);
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  test('rounds percentage label to nearest integer', () => {
    render(<Progress value={33.3333} max={100} showLabel />);
    
    expect(screen.getByText('33%')).toBeInTheDocument();
  });
});