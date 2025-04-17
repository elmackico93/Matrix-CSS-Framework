import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import { CheckboxProps } from './Checkbox.types';

// Meta information for the Checkbox component
const meta: Meta<CheckboxProps> = {
  title: 'Core/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text to display next to the checkbox'
    },
    error: {
      control: 'text',
      description: 'Error message to display below the checkbox'
    },
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked (controlled component)'
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Whether the checkbox is initially checked (uncontrolled component)'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled'
    },
    onChange: {
      action: 'changed',
      description: 'Function called when the checkbox state changes'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply'
    }
  }
};

export default meta;
type Story = StoryObj<CheckboxProps>;

// Basic checkbox
export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

// Checked checkbox
export const Checked: Story = {
  args: {
    label: 'I agree to receive marketing emails',
    defaultChecked: true,
  },
};

// Disabled checkbox
export const Disabled: Story = {
  args: {
    label: 'This option is disabled',
    disabled: true,
  },
};

// Checkbox with error
export const WithError: Story = {
  args: {
    label: 'I accept the terms of service',
    error: 'You must accept the terms to continue',
  },
};

// Disabled and checked
export const DisabledChecked: Story = {
  args: {
    label: 'This option is selected but cannot be changed',
    disabled: true,
    defaultChecked: true,
  },
};

// Multiple checkboxes
export const CheckboxGroup: Story = {
  render: () => (
    <div className="space-y-0">
      <Checkbox label="Option One" name="group" value="one" />
      <Checkbox label="Option Two" name="group" value="two" />
      <Checkbox label="Option Three" name="group" value="three" defaultChecked />
      <Checkbox label="Option Four (Disabled)" name="group" value="four" disabled />
    </div>
  ),
};

// Checkbox with long label
export const WithLongLabel: Story = {
  args: {
    label: "I consent to the processing of my personal data according to the Privacy Policy, including the transfer of my data to third parties for processing and storage purposes. This consent can be withdrawn at any time by contacting our support team.",
  },
};

// Matrix-themed custom checkbox
export const MatrixStyled: Story = {
  render: () => (
    <div className="p-4 bg-black bg-opacity-70 border border-matrix-border rounded">
      <h3 className="mb-4 text-lg font-matrix-hacker text-matrix-text-bright">
        System Preferences
      </h3>
      <div className="space-y-2">
        <Checkbox 
          label="Enable Matrix code visualization" 
          defaultChecked
          className="shadow-[0_0_3px_var(--m-glow)] checked:shadow-[0_0_5px_var(--m-glow)]"
        />
        <Checkbox 
          label="Connect to neural network" 
          className="shadow-[0_0_3px_var(--m-glow)] checked:shadow-[0_0_5px_var(--m-glow)]"
        />
        <Checkbox 
          label="Allow system tracking" 
          defaultChecked
          className="shadow-[0_0_3px_var(--m-glow)] checked:shadow-[0_0_5px_var(--m-glow)]"
        />
      </div>
    </div>
  ),
};