import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Radio } from './Radio';

describe('Radio Component', () => {
  test('renders radio component correctly', () => {
    render(<Radio />);
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  test('renders with label when provided', () => {
    render(<Radio label="Option 1" />);
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
  });

  test('accepts and applies custom className', () => {
    render(<Radio className="custom-class" />);
    expect(screen.getByRole('radio')).toHaveClass('custom-class');
  });

  test('forwards ref to input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Radio ref={ref} />);
    
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  test('triggers onChange event when clicked', () => {
    const handleChange = jest.fn();
    render(<Radio onChange={handleChange} />);
    
    fireEvent.click(screen.getByRole('radio'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('can be checked', () => {
    render(<Radio />);
    const radio = screen.getByRole('radio');
    
    // Initially unchecked
    expect(radio).not.toBeChecked();
    
    // Check
    fireEvent.click(radio);
    expect(radio).toBeChecked();
  });

  test('can be initialized as checked', () => {
    render(<Radio defaultChecked />);
    expect(screen.getByRole('radio')).toBeChecked();
  });

  test('can be disabled', () => {
    render(<Radio disabled />);
    expect(screen.getByRole('radio')).toBeDisabled();
  });

  test('uses provided id for input and label', () => {
    render(<Radio id="test-id" label="Test Label" />);
    
    const radio = screen.getByLabelText('Test Label');
    expect(radio.id).toBe('test-id');
  });

  test('generates unique id when not provided', () => {
    render(
      <>
        <Radio label="First Radio" />
        <Radio label="Second Radio" />
      </>
    );
    
    const firstRadio = screen.getByLabelText('First Radio');
    const secondRadio = screen.getByLabelText('Second Radio');
    
    expect(firstRadio.id).not.toBe(secondRadio.id);
  });

  test('radio buttons with same name work as a group', () => {
    render(
      <>
        <Radio name="options" value="option1" label="Option 1" />
        <Radio name="options" value="option2" label="Option 2" />
      </>
    );
    
    const option1 = screen.getByLabelText('Option 1');
    const option2 = screen.getByLabelText('Option 2');
    
    // Initially both unchecked
    expect(option1).not.toBeChecked();
    expect(option2).not.toBeChecked();
    
    // Check option 1
    fireEvent.click(option1);
    expect(option1).toBeChecked();
    expect(option2).not.toBeChecked();
    
    // Check option 2 - should uncheck option 1
    fireEvent.click(option2);
    expect(option1).not.toBeChecked();
    expect(option2).toBeChecked();
  });
});