import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';

describe('Checkbox Component', () => {
  test('renders checkbox component correctly', () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  test('renders with label when provided', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
  });

  test('renders error message when provided', () => {
    render(<Checkbox label="Accept terms" error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  test('applies error styling when error is provided', () => {
    render(<Checkbox error="This field is required" />);
    expect(screen.getByRole('checkbox')).toHaveClass('border-matrix-danger');
  });

  test('accepts and applies custom className', () => {
    render(<Checkbox className="custom-class" />);
    expect(screen.getByRole('checkbox')).toHaveClass('custom-class');
  });

  test('forwards ref to input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} />);
    
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  test('triggers onChange event when clicked', () => {
    const handleChange = jest.fn();
    render(<Checkbox onChange={handleChange} />);
    
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('can be checked and unchecked', () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');
    
    // Initially unchecked
    expect(checkbox).not.toBeChecked();
    
    // Check
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    
    // Uncheck
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  test('can be initialized as checked', () => {
    render(<Checkbox defaultChecked />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  test('can be disabled', () => {
    render(<Checkbox disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  test('uses provided id for input and label', () => {
    render(<Checkbox id="test-id" label="Test Label" />);
    
    const checkbox = screen.getByLabelText('Test Label');
    expect(checkbox.id).toBe('test-id');
  });

  test('generates unique id when not provided', () => {
    render(
      <>
        <Checkbox label="First Checkbox" />
        <Checkbox label="Second Checkbox" />
      </>
    );
    
    const firstCheckbox = screen.getByLabelText('First Checkbox');
    const secondCheckbox = screen.getByLabelText('Second Checkbox');
    
    expect(firstCheckbox.id).not.toBe(secondCheckbox.id);
  });
});