import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { TooltipProps } from './Tooltip.types';
import { Button } from '../Button/Button';

// Meta information for the Tooltip component
const meta: Meta<TooltipProps> = {
  title: 'Core/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'Content to display in the tooltip'
    },
    position: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Position of the tooltip relative to the trigger'
    },
    delay: {
      control: 'number',
      description: 'Delay in milliseconds before showing the tooltip'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the tooltip'
    },
    children: {
      description: 'Element that triggers the tooltip'
    }
  }
};

export default meta;
type Story = StoryObj<TooltipProps>;

// Basic tooltip with button trigger
export const Basic: Story = {
  args: {
    content: 'This is a tooltip',
    children: <Button>Hover me</Button>,
  },
};

// Tooltip positions
export const Positions: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 justify-center items-center">
      <Tooltip content="Tooltip on top" position="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip content="Tooltip on right" position="right">
        <Button>Right</Button>
      </Tooltip>
      <Tooltip content="Tooltip on bottom" position="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip content="Tooltip on left" position="left">
        <Button>Left</Button>
      </Tooltip>
    </div>
  ),
};

// Tooltip with short delay
export const ShortDelay: Story = {
  args: {
    content: 'This tooltip appears quickly',
    delay: 100,
    children: <Button>Quick Tooltip</Button>,
  },
};

// Tooltip with long delay
export const LongDelay: Story = {
  args: {
    content: 'This tooltip takes longer to appear',
    delay: 1000,
    children: <Button>Slow Tooltip</Button>,
  },
};

// Tooltip with HTML content
export const HtmlContent: Story = {
  args: {
    content: (
      <div>
        <h4 className="font-bold text-matrix-text-bright mb-1">Formatted Tooltip</h4>
        <p>This tooltip contains <em>HTML</em> content.</p>
        <ul className="list-disc ml-4 mt-1 text-xs">
          <li>Feature one</li>
          <li>Feature two</li>
        </ul>
      </div>
    ),
    children: <Button>HTML Tooltip</Button>,
  },
};

// Tooltip with custom styling
export const CustomStyling: Story = {
  args: {
    content: 'Custom styled tooltip',
    className: 'bg-black border-matrix-text px-4 py-2 text-matrix-text-bright shadow-[0_0_10px_var(--m-glow)]',
    children: <Button variant="primary">Custom Style</Button>,
  },
};

// Tooltips on different elements
export const DifferentTriggers: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <Tooltip content="Button tooltip">
        <Button>Button with tooltip</Button>
      </Tooltip>
      
      <Tooltip content="This appears when you hover the text">
        <span className="text-matrix-text hover:text-matrix-text-bright cursor-help transition-colors">
          Hover this text for info
        </span>
      </Tooltip>
      
      <Tooltip content="You can also use an icon as a trigger">
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
          className="text-matrix-text hover:text-matrix-text-bright cursor-help transition-colors"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      </Tooltip>
    </div>
  ),
};

// Matrix-themed tooltip
export const MatrixThemed: Story = {
  args: {
    content: (
      <div className="font-matrix-hacker tracking-wide">
        <div className="text-xs text-matrix-text-dim mb-1">SYSTEM STATUS</div>
        <div className="text-matrix-text-bright animate-pulse">OPERATIONAL</div>
      </div>
    ),
    className: 'bg-black border-matrix-text shadow-[0_0_10px_var(--m-glow)] px-4 py-2',
    children: (
      <div className="cursor-help border border-matrix-border px-3 py-1 rounded text-matrix-text hover:text-matrix-text-bright transition-colors">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-matrix-text animate-pulse"></span>
          <span className="font-matrix-hacker tracking-wider">DATA NODE #127</span>
        </div>
      </div>
    ),
  },
};

// Interactive example with multiple tooltips
export const InteractiveExample: Story = {
  render: () => (
    <div className="p-5 border border-matrix-border rounded bg-matrix-bg bg-opacity-30 max-w-md">
      <h3 className="text-lg text-matrix-text-bright mb-4 font-medium">System Control Panel</h3>
      
      <div className="grid grid-cols-3 gap-3">
        <Tooltip content="Activate primary systems">
          <Button 
            variant="primary" 
            size="sm"
            className="flex items-center justify-center gap-1"
          >
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
              <path d="M18 15l-6-6-6 6"/>
            </svg>
            Start
          </Button>
        </Tooltip>
        
        <Tooltip content="Pause all operations">
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center justify-center gap-1"
          >
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
              <rect x="6" y="4" width="4" height="16"/>
              <rect x="14" y="4" width="4" height="16"/>
            </svg>
            Pause
          </Button>
        </Tooltip>
        
        <Tooltip content="Emergency shutdown procedure">
          <Button 
            variant="danger" 
            size="sm"
            className="flex items-center justify-center gap-1"
          >
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
              <path d="M18 6L6 18"/>
              <path d="M6 6l12 12"/>
            </svg>
            Stop
          </Button>
        </Tooltip>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <Tooltip 
          content="Current system performance" 
          position="top"
        >
          <div className="cursor-help text-sm text-matrix-text flex gap-2 items-center">
            <span className="w-2 h-2 rounded-full bg-matrix-success"></span>
            <span>Performance: 92%</span>
          </div>
        </Tooltip>
        
        <Tooltip 
          content="Memory usage is approaching capacity"
          position="left"
          className="bg-black text-matrix-warning border-matrix-warning"
        >
          <div className="cursor-help text-sm text-matrix-warning flex gap-2 items-center">
            <span className="w-2 h-2 rounded-full bg-matrix-warning"></span>
            <span>Memory: 83%</span>
          </div>
        </Tooltip>
      </div>
    </div>
  ),
};