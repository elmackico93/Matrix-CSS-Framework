import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from './Select';

const defaultOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

describe('Select Component', () => {
  test('renders select component correctly', () => {
    render(<Select options={defaultOptions} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  test('renders correct number of options', () => {
    render(<Select options={defaultOptions} />);
    expect(screen.getAllByRole('option')).toHaveLength(3);
  });

  test('renders with label when provided', () => {
    render(<Select label="Select an option" options={defaultOptions} />);
    expect(screen.getByLabelText('Select an option')).toBeInTheDocument();
  });

  test('renders error message when provided', () => {
    render(<Select options={defaultOptions} error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  test('applies error styling when error is provided', () => {
    render(<Select options={defaultOptions} error="This field is required" />);
    expect(screen.getByRole('combobox')).toHaveClass('border-matrix-danger');
  });

  test('accepts and applies custom className', () => {
    render(<Select options={defaultOptions} className="custom-class" />);
    expect(screen.getByRole('combobox')).toHaveClass('custom-class');
  });

  test('forwards ref to select element', () => {
    const ref = React.createRef<HTMLSelectElement>();
    render(<Select ref={ref} options={defaultOptions} />);
    
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });

  test('handles value change', () => {
    const handleChange = jest.fn();
    render(<Select options={defaultOptions} onChange={handleChange} />);
    
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'option2' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('handles option selection correctly', () => {
    render(<Select options={defaultOptions} />);
    
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'option2' } });
    
    expect(selectElement).toHaveValue('option2');
    expect(screen.getByRole('option', { name: 'Option 2' })).toBeSelected();
  });

  test('can have a default value', () => {
    render(<Select options={defaultOptions} defaultValue="option3" />);
    expect(screen.getByRole('combobox')).toHaveValue('option3');
    expect(screen.getByRole('option', { name: 'Option 3' })).toBeSelected();
  });

  test('can be disabled', () => {
    render(<Select options={defaultOptions} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  test('uses provided id for select and label', () => {
    render(<Select id="custom-id" label="Custom Label" options={defaultOptions} />);
    
    const select = screen.getByLabelText('Custom Label');
    expect(select.id).toBe('custom-id');
  });

  test('generates unique id when not provided', () => {
    render(
      <>
        <Select label="First Select" options={defaultOptions} />
        <Select label="Second Select" options={defaultOptions} />
      </>
    );
    
    const firstSelect = screen.getByLabelText('First Select');
    const secondSelect = screen.getByLabelText('Second Select');
    
    expect(firstSelect.id).not.toBe(secondSelect.id);
  });

  test('applies all passed HTML attributes to the select', () => {
    render(
      <Select
        options={defaultOptions}
        required
        aria-describedby="description"
        data-testid="test-select"
      />
    );
    
    const select = screen.getByTestId('test-select');
    expect(select).toHaveAttribute('required');
    expect(select).toHaveAttribute('aria-describedby', 'description');
  });
});