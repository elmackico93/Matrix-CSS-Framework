import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Switch } from './Switch';

describe('Switch Component', () => {
  test('renders switch component correctly', () => {
    render(<Switch />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  test('renders with label when provided', () => {
    render(<Switch label="Toggle mode" />);
    expect(screen.getByLabelText('Toggle mode')).toBeInTheDocument();
  });

  test('accepts and applies custom className', () => {
    render(<Switch className="custom-class" />);
    
    // The actual class is applied to the div after the input
    const input = screen.getByRole('checkbox');
    const switchTrack = input.nextElementSibling;
    
    expect(switchTrack).toHaveClass('custom-class');
  });

  test('forwards ref to input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Switch ref={ref} />);
    
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  test('triggers onChange event when clicked', () => {
    const handleChange = jest.fn();
    render(<Switch onChange={handleChange} />);
    
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('can be toggled on and off', () => {
    render(<Switch />);
    const switchInput = screen.getByRole('checkbox');
    
    // Initially unchecked
    expect(switchInput).not.toBeChecked();
    
    // Click to check
    fireEvent.click(switchInput);
    expect(switchInput).toBeChecked();
    
    // Click to uncheck
    fireEvent.click(switchInput);
    expect(switchInput).not.toBeChecked();
  });

  test('can be initialized as checked', () => {
    render(<Switch defaultChecked />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  test('can be disabled', () => {
    render(<Switch disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  test('uses provided id for input and label', () => {
    render(<Switch id="test-id" label="Test Label" />);
    
    const switchInput = screen.getByLabelText('Test Label');
    expect(switchInput.id).toBe('test-id');
  });

  test('generates unique id when not provided', () => {
    render(
      <>
        <Switch label="First Switch" />
        <Switch label="Second Switch" />
      </>
    );
    
    const firstSwitch = screen.getByLabelText('First Switch');
    const secondSwitch = screen.getByLabelText('Second Switch');
    
    expect(firstSwitch.id).not.toBe(secondSwitch.id);
  });

  test('applies all passed HTML attributes to the checkbox input', () => {
    render(
      <Switch
        name="test-switch"
        value="switch-value"
        aria-describedby="description"
        data-testid="test-switch"
      />
    );
    
    const switchInput = screen.getByTestId('test-switch');
    expect(switchInput).toHaveAttribute('name', 'test-switch');
    expect(switchInput).toHaveAttribute('value', 'switch-value');
    expect(switchInput).toHaveAttribute('aria-describedby', 'description');
  });

  test('can be controlled with checked prop', () => {
    const { rerender } = render(<Switch checked={true} readOnly />);
    expect(screen.getByRole('checkbox')).toBeChecked();
    
    rerender(<Switch checked={false} readOnly />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });
});