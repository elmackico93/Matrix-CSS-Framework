import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { ButtonProps } from './Button.types';

// Meta information for the Button component
const meta: Meta<ButtonProps> = {
  title: 'Core/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'outline', 'ghost', 'terminal', 'danger'],
      description: 'The visual style of the button'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon'],
      description: 'The size of the button'
    },
    hasGlow: {
      control: 'boolean',
      description: 'Whether the button should have a glow effect'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled'
    },
    onClick: {
      action: 'clicked',
      description: 'Function called when the button is clicked'
    },
    children: {
      control: 'text',
      description: 'The content of the button'
    }
  }
};

export default meta;
type Story = StoryObj<ButtonProps>;

// Default button
export const Default: Story = {
  args: {
    children: 'Button',
  },
};

// Primary variant
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

// Outline variant
export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
};

// Ghost variant
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

// Terminal variant
export const Terminal: Story = {
  args: {
    variant: 'terminal',
    children: 'Terminal Button',
  },
};

// Danger variant
export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger Button',
  },
};

// Small size
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

// Medium size (default)
export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium Button',
  },
};

// Large size
export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

// Icon button
export const Icon: Story = {
  args: {
    size: 'icon',
    children: (
      <svg
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
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </svg>
    ),
    'aria-label': 'Icon Button',
  },
};

// Button with glow effect
export const WithGlow: Story = {
  args: {
    variant: 'primary',
    hasGlow: true,
    children: 'Glowing Button',
  },
};

// Disabled button
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

// Button with icon and text
export const WithIconAndText: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2"
        >
          <path d="M5 12h14"></path>
          <path d="M12 5l7 7-7 7"></path>
        </svg>
        Button with Icon
      </>
    ),
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="default">Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="terminal">Terminal</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <svg
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
          <path d="M5 12h14"></path>
          <path d="M12 5l7 7-7 7"></path>
        </svg>
      </Button>
    </div>
  ),
};