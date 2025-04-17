import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';
import { RadioProps } from './Radio.types';

// Meta information for the Radio component
const meta: Meta<RadioProps> = {
  title: 'Core/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text to display next to the radio button'
    },
    checked: {
      control: 'boolean',
      description: 'Whether the radio is checked (controlled component)'
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Whether the radio is initially checked (uncontrolled component)'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio is disabled'
    },
    name: {
      control: 'text',
      description: 'Name attribute for form submission and grouping'
    },
    onChange: {
      action: 'changed',
      description: 'Function called when the radio state changes'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply'
    }
  }
};

export default meta;
type Story = StoryObj<RadioProps>;

// Basic radio button
export const Default: Story = {
  args: {
    label: 'Radio Option',
  },
};

// Checked radio button
export const Checked: Story = {
  args: {
    label: 'Selected Option',
    defaultChecked: true,
  },
};

// Disabled radio button
export const Disabled: Story = {
  args: {
    label: 'Disabled Option',
    disabled: true,
  },
};

// Disabled and checked radio button
export const DisabledChecked: Story = {
  args: {
    label: 'Disabled Selected Option',
    disabled: true,
    defaultChecked: true,
  },
};

// Radio button group
export const RadioGroup: Story = {
  render: () => (
    <div className="space-y-0">
      <Radio name="option-group" value="option1" label="Option One" defaultChecked />
      <Radio name="option-group" value="option2" label="Option Two" />
      <Radio name="option-group" value="option3" label="Option Three" />
      <Radio name="option-group" value="option4" label="Option Four (Disabled)" disabled />
    </div>
  ),
};

// Horizontal radio group
export const HorizontalRadioGroup: Story = {
  render: () => (
    <div className="flex gap-4">
      <Radio name="horizontal" value="left" label="Left" />
      <Radio name="horizontal" value="center" label="Center" defaultChecked />
      <Radio name="horizontal" value="right" label="Right" />
    </div>
  ),
};

// Matrix-styled form with radio buttons
export const MatrixStyled: Story = {
  render: () => (
    <div className="p-4 bg-black bg-opacity-70 border border-matrix-border rounded">
      <h3 className="mb-4 text-lg font-matrix-hacker text-matrix-text-bright tracking-wide">
        CONNECTION TYPE
      </h3>
      <div className="space-y-1">
        <Radio 
          name="connection" 
          value="secure" 
          label="Secure Connection" 
          defaultChecked
          className="checked:before:bg-matrix-text checked:shadow-[0_0_5px_var(--m-glow)]"
        />
        <Radio 
          name="connection" 
          value="proxied" 
          label="Proxied Connection" 
          className="checked:before:bg-matrix-text checked:shadow-[0_0_5px_var(--m-glow)]"
        />
        <Radio 
          name="connection" 
          value="direct" 
          label="Direct Connection (Unsafe)" 
          className="checked:before:bg-matrix-text checked:shadow-[0_0_5px_var(--m-glow)]"
        />
      </div>
      
      <div className="mt-6">
        <h3 className="mb-3 text-lg font-matrix-hacker text-matrix-text-bright tracking-wide">
          ACCESS LEVEL
        </h3>
        <div className="space-y-1">
          <Radio 
            name="access" 
            value="user" 
            label="User" 
            defaultChecked
            className="checked:before:bg-matrix-text checked:shadow-[0_0_5px_var(--m-glow)]"
          />
          <Radio 
            name="access" 
            value="admin" 
            label="Administrator" 
            className="checked:before:bg-matrix-text checked:shadow-[0_0_5px_var(--m-glow)]"
          />
          <Radio 
            name="access" 
            value="system" 
            label="System" 
            disabled
            className="checked:before:bg-matrix-text checked:shadow-[0_0_5px_var(--m-glow)]"
          />
        </div>
      </div>
    </div>
  ),
};

// Controlled radio group with custom state management
export const ControlledRadioGroup: Story = {
  render: function ControlledExample() {
    const [selected, setSelected] = React.useState('option1');
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelected(e.target.value);
    };
    
    return (
      <div className="space-y-4">
        <div className="space-y-1">
          <Radio 
            name="controlled" 
            value="option1" 
            label="Option One" 
            checked={selected === 'option1'}
            onChange={handleChange}
          />
          <Radio 
            name="controlled" 
            value="option2" 
            label="Option Two" 
            checked={selected === 'option2'}
            onChange={handleChange}
          />
          <Radio 
            name="controlled" 
            value="option3" 
            label="Option Three" 
            checked={selected === 'option3'}
            onChange={handleChange}
          />
        </div>
        
        <div className="mt-4 p-2 border border-matrix-border rounded bg-matrix-bg bg-opacity-50">
          <p className="text-sm text-matrix-text">
            Selected value: <span className="text-matrix-text-bright">{selected}</span>
          </p>
        </div>
      </div>
    );
  }
};