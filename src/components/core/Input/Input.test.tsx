import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input Component', () => {
  test('renders input component correctly', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('renders with label when provided', () => {
    render(<Input label="Username" />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  test('renders error message when provided', () => {
    render(<Input error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  test('applies error styling when error is provided', () => {
    render(<Input error="This field is required" />);
    expect(screen.getByRole('textbox')).toHaveClass('border-matrix-danger');
  });

  test('applies custom className to input', () => {
    render(<Input className="custom-class" />);
    expect(screen.getByRole('textbox')).toHaveClass('custom-class');
  });

  test('forwards ref to input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  test('handles value change', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);
    
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('displays placeholder text when provided', () => {
    render(<Input placeholder="Enter your name" />);
    expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
  });

  test('can be disabled', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  test('can have a default value', () => {
    render(<Input defaultValue="Default text" />);
    expect(screen.getByRole('textbox')).toHaveValue('Default text');
  });

  test('uses provided id for input and label', () => {
    render(<Input id="custom-id" label="Custom Label" />);
    
    const input = screen.getByLabelText('Custom Label');
    expect(input.id).toBe('custom-id');
  });

  test('generates unique id when not provided', () => {
    render(
      <>
        <Input label="First Input" />
        <Input label="Second Input" />
      </>
    );
    
    const firstInput = screen.getByLabelText('First Input');
    const secondInput = screen.getByLabelText('Second Input');
    
    expect(firstInput.id).not.toBe(secondInput.id);
  });

  test('applies all passed HTML attributes to the input', () => {
    render(
      <Input
        maxLength={10}
        required
        aria-describedby="description"
        data-testid="test-input"
      />
    );
    
    const input = screen.getByTestId('test-input');
    expect(input).toHaveAttribute('maxLength', '10');
    expect(input).toHaveAttribute('required');
    expect(input).toHaveAttribute('aria-describedby', 'description');
  });
});