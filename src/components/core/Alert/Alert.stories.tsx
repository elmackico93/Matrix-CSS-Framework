import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertTitle, AlertDescription } from './Alert';
import { AlertProps } from './Alert.types';

// Meta information for the Alert component
const meta: Meta<AlertProps> = {
  title: 'Core/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger', 'info'],
      description: 'The visual style of the alert'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply'
    },
    children: {
      control: 'text',
      description: 'The content of the alert'
    }
  }
};

export default meta;
type Story = StoryObj<AlertProps>;

// Base Alert
export const Default: Story = {
  args: {
    children: 'This is a default alert message',
  },
};

// Alert with title and description
export const WithTitleAndDescription: Story = {
  args: {
    children: (
      <>
        <AlertTitle>Alert Title</AlertTitle>
        <AlertDescription>
          This is a detailed description of the alert providing more context and information.
        </AlertDescription>
      </>
    ),
  },
};

// Primary variant
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        <AlertTitle>Primary Alert</AlertTitle>
        <AlertDescription>
          This is a primary alert with Matrix styling.
        </AlertDescription>
      </>
    ),
  },
};

// Success variant
export const Success: Story = {
  args: {
    variant: 'success',
    children: (
      <>
        <AlertTitle>Success Alert</AlertTitle>
        <AlertDescription>
          Operation completed successfully.
        </AlertDescription>
      </>
    ),
  },
};

// Warning variant
export const Warning: Story = {
  args: {
    variant: 'warning',
    children: (
      <>
        <AlertTitle>Warning Alert</AlertTitle>
        <AlertDescription>
          Please be cautious with this action.
        </AlertDescription>
      </>
    ),
  },
};

// Danger variant
export const Danger: Story = {
  args: {
    variant: 'danger',
    children: (
      <>
        <AlertTitle>Danger Alert</AlertTitle>
        <AlertDescription>
          Critical error detected in the Matrix.
        </AlertDescription>
      </>
    ),
  },
};

// Info variant
export const Info: Story = {
  args: {
    variant: 'info',
    children: (
      <>
        <AlertTitle>Information Alert</AlertTitle>
        <AlertDescription>
          Here's some useful information you should know.
        </AlertDescription>
      </>
    ),
  },
};

// With icon example
export const WithIcon: Story = {
  args: {
    variant: 'success',
    children: (
      <>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <AlertTitle>Success with Icon</AlertTitle>
        <AlertDescription>
          Your changes have been successfully saved.
        </AlertDescription>
      </>
    ),
  },
};