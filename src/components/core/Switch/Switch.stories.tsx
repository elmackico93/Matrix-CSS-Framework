import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';
import { SwitchProps } from './Switch.types';

// Meta information for the Switch component
const meta: Meta<SwitchProps> = {
  title: 'Core/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text to display next to the switch'
    },
    checked: {
      control: 'boolean',
      description: 'Whether the switch is checked (controlled component)'
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Whether the switch is initially checked (uncontrolled component)'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled'
    },
    onChange: {
      action: 'changed',
      description: 'Function called when the switch state changes'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply'
    }
  }
};

export default meta;
type Story = StoryObj<SwitchProps>;

// Basic switch
export const Default: Story = {
  args: {
    label: 'Toggle switch',
  },
};

// Checked switch
export const Checked: Story = {
  args: {
    label: 'Active toggle',
    defaultChecked: true,
  },
};

// Disabled switch
export const Disabled: Story = {
  args: {
    label: 'Disabled toggle',
    disabled: true,
  },
};

// Disabled and checked switch
export const DisabledChecked: Story = {
  args: {
    label: 'Disabled active toggle',
    disabled: true,
    defaultChecked: true,
  },
};

// Switch without label
export const WithoutLabel: Story = {
  args: {},
};

// Controlled switch example
export const ControlledSwitch: Story = {
  render: function ControlledExample() {
    const [checked, setChecked] = useState(false);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(e.target.checked);
    };
    
    return (
      <div className="space-y-4">
        <Switch 
          label={`Switch is ${checked ? 'ON' : 'OFF'}`}
          checked={checked}
          onChange={handleChange}
        />
        
        <div className="p-2 border border-matrix-border rounded bg-matrix-bg bg-opacity-50">
          <p className="text-sm text-matrix-text">
            Status: <span className="text-matrix-text-bright">{checked ? 'Active' : 'Inactive'}</span>
          </p>
        </div>
      </div>
    );
  }
};

// Multiple switches for form settings
export const MultipleSettings: Story = {
  render: () => (
    <div className="w-72 p-4 border border-matrix-border rounded bg-matrix-bg bg-opacity-30">
      <h3 className="text-matrix-text-bright text-xl mb-4">Settings</h3>
      
      <div className="space-y-2">
        <Switch label="Enable notifications" defaultChecked />
        <Switch label="Dark mode" defaultChecked />
        <Switch label="Automatic updates" />
        <Switch label="Analytics" defaultChecked />
        <Switch label="Developer mode" />
      </div>
      
      <div className="mt-4 pt-4 border-t border-matrix-border flex justify-end">
        <button className="px-4 py-2 bg-matrix-primary bg-opacity-20 border border-matrix-primary text-matrix-text-bright rounded-sm hover:bg-opacity-30 transition-colors text-sm">
          Save Settings
        </button>
      </div>
    </div>
  ),
};

// Matrix-themed switches
export const MatrixThemed: Story = {
  render: () => (
    <div className="w-80 p-5 bg-black border border-matrix-text rounded">
      <h3 className="mb-6 text-xl font-matrix-hacker text-matrix-text-bright tracking-wide text-center">
        MATRIX SYSTEM SETTINGS
      </h3>
      
      <div className="space-y-3">
        <Switch 
          label="ENABLE CODE RAIN VISUALIZATION" 
          defaultChecked
          className="shadow-[0_0_5px_var(--m-glow)] peer-checked:shadow-[0_0_10px_var(--m-glow)]"
        />
        <Switch 
          label="NEURAL NETWORK CONNECTION" 
          defaultChecked
          className="shadow-[0_0_5px_var(--m-glow)] peer-checked:shadow-[0_0_10px_var(--m-glow)]"
        />
        <Switch 
          label="ADVANCED TERMINAL MODE" 
          className="shadow-[0_0_5px_var(--m-glow)] peer-checked:shadow-[0_0_10px_var(--m-glow)]"
        />
        <Switch 
          label="SECURE CONNECTION PROTOCOL" 
          defaultChecked
          className="shadow-[0_0_5px_var(--m-glow)] peer-checked:shadow-[0_0_10px_var(--m-glow)]"
        />
        <Switch 
          label="SYSTEM MONITORING (ADMIN ONLY)" 
          disabled
          className="shadow-[0_0_5px_var(--m-glow)] peer-checked:shadow-[0_0_10px_var(--m-glow)]"
        />
      </div>
      
      <div className="mt-6 flex justify-between">
        <button className="px-4 py-2 border border-matrix-border text-sm text-matrix-text hover:border-matrix-text hover:text-matrix-text-bright transition-colors">
          RESET
        </button>
        <button className="px-4 py-2 border border-matrix-text bg-matrix-primary bg-opacity-20 text-sm text-matrix-text-bright hover:bg-opacity-30 transition-colors shadow-[0_0_5px_var(--m-glow)]">
          APPLY
        </button>
      </div>
    </div>
  ),
};

// Toggle theme example
export const ThemeToggle: Story = {
  render: function ThemeToggleExample() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    
    const handleToggle = () => {
      setIsDarkMode(!isDarkMode);
    };
    
    return (
      <div 
        className={`p-6 transition-colors duration-300 rounded-lg ${
          isDarkMode 
            ? 'bg-black border border-matrix-text text-matrix-text' 
            : 'bg-gray-100 border border-gray-300 text-gray-800'
        }`}
        style={{ width: '300px' }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-lg font-medium ${isDarkMode ? 'text-matrix-text-bright' : 'text-gray-800'}`}>
            {isDarkMode ? 'Matrix Theme' : 'Light Theme'}
          </h3>
          
          <Switch 
            checked={isDarkMode}
            onChange={handleToggle}
            className={isDarkMode ? 'peer-checked:after:bg-matrix-text' : 'peer-checked:after:bg-blue-500'}
          />
        </div>
        
        <p className={`text-sm ${isDarkMode ? 'text-matrix-text' : 'text-gray-600'}`}>
          Toggle between dark Matrix theme and light theme to see the difference.
        </p>
        
        <div className={`mt-4 p-3 rounded ${isDarkMode ? 'bg-matrix-panel' : 'bg-white border border-gray-200'}`}>
          <p className={`text-sm ${isDarkMode ? 'text-matrix-text-bright' : 'text-gray-800'}`}>
            Current theme: {isDarkMode ? 'Dark' : 'Light'}
          </p>
        </div>
      </div>
    );
  },
};