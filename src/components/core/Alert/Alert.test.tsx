import React from 'react';
import { render, screen } from '@testing-library/react';
import { Alert, AlertTitle, AlertDescription } from './Alert';

describe('Alert Component', () => {
  test('renders alert component correctly', () => {
    render(<Alert>Test alert</Alert>);
    expect(screen.getByRole('alert')).toHaveTextContent('Test alert');
  });

  test('applies correct variant classes', () => {
    const { rerender } = render(<Alert variant="primary">Primary Alert</Alert>);
    const alert = screen.getByRole('alert');
    
    expect(alert).toHaveClass('bg-matrix-primary');
    
    rerender(<Alert variant="success">Success Alert</Alert>);
    expect(alert).toHaveClass('bg-matrix-success');
    
    rerender(<Alert variant="warning">Warning Alert</Alert>);
    expect(alert).toHaveClass('bg-matrix-warning');
    
    rerender(<Alert variant="danger">Danger Alert</Alert>);
    expect(alert).toHaveClass('bg-matrix-danger');
    
    rerender(<Alert variant="info">Info Alert</Alert>);
    expect(alert).toHaveClass('bg-matrix-info');
  });

  test('accepts and applies custom className', () => {
    render(<Alert className="custom-class">Custom Alert</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('custom-class');
  });

  test('renders with title and description', () => {
    render(
      <Alert>
        <AlertTitle>Alert Title</AlertTitle>
        <AlertDescription>Alert Description</AlertDescription>
      </Alert>
    );
    
    expect(screen.getByText('Alert Title')).toBeInTheDocument();
    expect(screen.getByText('Alert Description')).toBeInTheDocument();
  });

  test('forwards ref to DOM element', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Alert ref={ref}>Ref Alert</Alert>);
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});