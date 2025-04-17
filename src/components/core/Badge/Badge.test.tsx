import React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge Component', () => {
  test('renders badge component correctly', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  test('applies correct variant classes', () => {
    const { rerender } = render(<Badge variant="primary">Primary</Badge>);
    const badge = screen.getByText('Primary');
    
    expect(badge).toHaveClass('bg-matrix-primary');
    
    rerender(<Badge variant="secondary">Secondary</Badge>);
    expect(screen.getByText('Secondary')).toHaveClass('bg-matrix-secondary');
    
    rerender(<Badge variant="success">Success</Badge>);
    expect(screen.getByText('Success')).toHaveClass('bg-matrix-success');
    
    rerender(<Badge variant="warning">Warning</Badge>);
    expect(screen.getByText('Warning')).toHaveClass('bg-matrix-warning');
    
    rerender(<Badge variant="danger">Danger</Badge>);
    expect(screen.getByText('Danger')).toHaveClass('bg-matrix-danger');
    
    rerender(<Badge variant="info">Info</Badge>);
    expect(screen.getByText('Info')).toHaveClass('bg-matrix-info');
    
    rerender(<Badge variant="outline">Outline</Badge>);
    expect(screen.getByText('Outline')).toHaveClass('bg-transparent');
  });

  test('accepts and applies custom className', () => {
    render(<Badge className="custom-class">Custom Badge</Badge>);
    expect(screen.getByText('Custom Badge')).toHaveClass('custom-class');
  });

  test('forwards ref to DOM element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Badge ref={ref}>Ref Badge</Badge>);
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  test('passes other props to the underlying DOM element', () => {
    render(<Badge data-testid="test-badge">Test Badge</Badge>);
    expect(screen.getByTestId('test-badge')).toHaveTextContent('Test Badge');
  });
});