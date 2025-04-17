import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import { BadgeProps } from './Badge.types';

// Meta information for the Badge component
const meta: Meta<BadgeProps> = {
  title: 'Core/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'info', 'outline'],
      description: 'The visual style of the badge'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply'
    },
    children: {
      control: 'text',
      description: 'The content of the badge'
    }
  }
};

export default meta;
type Story = StoryObj<BadgeProps>;

// Basic badge
export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

// Primary variant
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary',
  },
};

// Secondary variant
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

// Success variant
export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success',
  },
};

// Warning variant
export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning',
  },
};

// Danger variant
export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger',
  },
};

// Info variant
export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Info',
  },
};

// Outline variant
export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
};

// Multiple badges in various styles
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

// Badge with icon
export const WithIcon: Story = {
  render: () => (
    <Badge variant="primary" className="flex items-center gap-1">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="12" 
        height="12" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
      New
    </Badge>
  ),
};