import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';
import { SelectProps } from './Select.types';

// Meta information for the Select component
const meta: Meta<SelectProps> = {
  title: 'Core/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text to display above the select'
    },
    error: {
      control: 'text',
      description: 'Error message to display below the select'
    },
    options: {
      control: 'object',
      description: 'Array of options to display in the select dropdown'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled'
    },
    required: {
      control: 'boolean',
      description: 'Whether the select is required'
    },
    defaultValue: {
      control: 'text',
      description: 'The initial selected value'
    },
    onChange: {
      action: 'changed',
      description: 'Function called when the select value changes'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply'
    }
  }
};

export default meta;
type Story = StoryObj<SelectProps>;

// Default options for examples
const defaultOptions = [
  { value: '', label: 'Select an option' },
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' },
];

// Basic select
export const Default: Story = {
  args: {
    options: defaultOptions,
  },
};

// Select with label
export const WithLabel: Story = {
  args: {
    label: 'Choose an option',
    options: defaultOptions,
  },
};

// Select with default value
export const WithDefaultValue: Story = {
  args: {
    label: 'Choose an option',
    options: defaultOptions,
    defaultValue: 'option3',
  },
};

// Select with error
export const WithError: Story = {
  args: {
    label: 'Choose an option',
    options: defaultOptions,
    error: 'Please select a valid option',
  },
};

// Disabled select
export const Disabled: Story = {
  args: {
    label: 'Disabled select',
    options: defaultOptions,
    disabled: true,
  },
};

// Required select
export const Required: Story = {
  args: {
    label: 'Required field',
    options: defaultOptions,
    required: true,
  },
};

// Select with grouped options example
export const CountrySelect: Story = {
  render: () => {
    const regions = [
      { value: '', label: 'Select a country' },
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
      { value: 'mx', label: 'Mexico' },
      { value: 'br', label: 'Brazil' },
      { value: 'ar', label: 'Argentina' },
      { value: 'gb', label: 'United Kingdom' },
      { value: 'fr', label: 'France' },
      { value: 'de', label: 'Germany' },
      { value: 'jp', label: 'Japan' },
      { value: 'cn', label: 'China' },
      { value: 'au', label: 'Australia' },
    ];
    
    return (
      <div className="w-64">
        <Select 
          label="Select Country" 
          options={regions} 
        />
      </div>
    );
  },
};

// Controlled select example
export const ControlledSelect: Story = {
  render: function ControlledExample() {
    const [value, setValue] = useState('');
    
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setValue(e.target.value);
    };
    
    return (
      <div className="w-64 space-y-4">
        <Select 
          label="Controlled Select" 
          value={value}
          onChange={handleChange}
          options={defaultOptions} 
        />
        
        <div className="p-2 border border-matrix-border rounded bg-matrix-bg bg-opacity-30">
          <p className="text-sm text-matrix-text">
            Selected value: <span className="text-matrix-text-bright">{value || 'none'}</span>
          </p>
        </div>
      </div>
    );
  },
};

// Matrix-themed select
export const MatrixThemed: Story = {
  render: () => {
    const accessLevels = [
      { value: '', label: 'SELECT ACCESS LEVEL' },
      { value: 'user', label: 'USER' },
      { value: 'operator', label: 'OPERATOR' },
      { value: 'admin', label: 'ADMINISTRATOR' },
      { value: 'system', label: 'SYSTEM' },
    ];
    
    return (
      <div className="w-64 p-4 bg-black border border-matrix-border rounded">
        <h3 className="mb-4 text-lg font-matrix-hacker text-matrix-text-bright tracking-wide">
          SYSTEM ACCESS
        </h3>
        
        <Select 
          options={accessLevels} 
          className="border-matrix-text shadow-[0_0_5px_var(--m-glow)] font-matrix-hacker tracking-wider text-matrix-text-bright" 
        />
        
        <div className="mt-6 flex justify-between">
          <button className="py-1.5 px-4 border border-matrix-border text-matrix-text hover:border-matrix-text hover:text-matrix-text-bright transition-colors text-sm">
            CANCEL
          </button>
          <button className="py-1.5 px-4 border border-matrix-text bg-matrix-primary bg-opacity-20 text-matrix-text-bright hover:bg-opacity-30 transition-colors text-sm">
            CONNECT
          </button>
        </div>
      </div>
    );
  },
};

// Form with multiple selects
export const FormExample: Story = {
  render: () => {
    return (
      <div className="w-80 p-4 border border-matrix-border rounded bg-matrix-bg bg-opacity-30">
        <h3 className="text-matrix-text-bright text-xl mb-4">Profile Settings</h3>
        
        <Select
          label="Country"
          options={[
            { value: '', label: 'Select country' },
            { value: 'us', label: 'United States' },
            { value: 'ca', label: 'Canada' },
            { value: 'uk', label: 'United Kingdom' },
            { value: 'au', label: 'Australia' },
          ]}
          className="mb-2"
          required
        />
        
        <Select
          label="Language"
          options={[
            { value: 'en', label: 'English' },
            { value: 'fr', label: 'French' },
            { value: 'de', label: 'German' },
            { value: 'es', label: 'Spanish' },
            { value: 'ja', label: 'Japanese' },
          ]}
          defaultValue="en"
          className="mb-2"
        />
        
        <Select
          label="Theme"
          options={[
            { value: 'dark', label: 'Dark (Default)' },
            { value: 'light', label: 'Light' },
            { value: 'system', label: 'System Preference' },
          ]}
          defaultValue="dark"
          className="mb-4"
        />
        
        <button 
          className="w-full py-2 px-4 bg-matrix-primary bg-opacity-20 border border-matrix-primary text-matrix-text-bright rounded hover:bg-opacity-30 transition-colors"
        >
          Save Settings
        </button>
      </div>
    );
  },
};