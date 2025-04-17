import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { InputProps } from './Input.types';

// Meta information for the Input component
const meta: Meta<InputProps> = {
  title: 'Core/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text to display above the input'
    },
    error: {
      control: 'text',
      description: 'Error message to display below the input'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text to display when the input is empty'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled'
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required'
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search'],
      description: 'The type of input'
    },
    onChange: {
      action: 'changed',
      description: 'Function called when the input value changes'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply'
    }
  }
};

export default meta;
type Story = StoryObj<InputProps>;

// Basic text input
export const Default: Story = {
  args: {
    placeholder: 'Enter text here',
  },
};

// Input with label
export const WithLabel: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
  },
};

// Input with error message
export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    error: 'Please enter a valid email address',
    value: 'invalid-email',
  },
};

// Disabled input
export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    disabled: true,
  },
};

// Required input
export const Required: Story = {
  args: {
    label: 'Required Field',
    placeholder: 'This field is required',
    required: true,
  },
};

// Password input
export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
  },
};

// Email input
export const Email: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'user@example.com',
  },
};

// Number input
export const Number: Story = {
  args: {
    label: 'Age',
    type: 'number',
    placeholder: 'Enter your age',
    min: 0,
    max: 120,
  },
};

// With default value
export const WithDefaultValue: Story = {
  args: {
    label: 'Pre-filled Input',
    defaultValue: 'This is pre-filled text',
  },
};

// Form with multiple inputs
export const FormExample: Story = {
  render: () => (
    <div className="w-80 p-4 border border-matrix-border rounded bg-matrix-bg bg-opacity-30">
      <h3 className="text-matrix-text-bright text-xl mb-4 font-matrix-hacker">Matrix Login</h3>
      <Input
        label="Username"
        placeholder="Enter your username"
        required
        className="mb-2"
      />
      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        required
        className="mb-4"
      />
      <button 
        className="w-full py-2 px-4 bg-matrix-primary bg-opacity-20 border border-matrix-primary text-matrix-text-bright rounded hover:bg-opacity-30 transition-colors"
      >
        Login
      </button>
    </div>
  ),
};

// Matrix-themed custom input
export const MatrixThemed: Story = {
  args: {
    label: 'ACCESS CODE',
    placeholder: 'ENTER ACCESS CODE',
    className: "border-matrix-text shadow-[0_0_5px_var(--m-glow)] font-matrix-hacker tracking-wider",
  },
};

// Search input with icon
export const SearchInput: Story = {
  render: () => (
    <div className="relative w-64">
      <svg
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-matrix-text-dim"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <Input
        placeholder="Search..."
        className="pl-10"
      />
    </div>
  ),
};