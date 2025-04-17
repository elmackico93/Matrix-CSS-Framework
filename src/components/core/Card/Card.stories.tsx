import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from './Card';
import { CardProps } from './Card.types';
import { Button } from '../Button/Button';

// Meta information for the Card component
const meta: Meta<CardProps> = {
  title: 'Core/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    glowOnHover: {
      control: 'boolean',
      description: 'Whether the card should have a glow effect on hover'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply'
    },
    children: {
      control: 'text',
      description: 'The content of the card'
    }
  }
};

export default meta;
type Story = StoryObj<CardProps>;

// Simple card
export const Simple: Story = {
  args: {
    children: <div className="p-6">Simple Card Content</div>,
    style: { width: '300px' }
  },
};

// Complete card with all subcomponents
export const Complete: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description text that explains the purpose of this card.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the main content area of the card. It can contain any type of content, including text, images, and other components.</p>
        </CardContent>
        <CardFooter>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm">Cancel</Button>
            <Button variant="primary" size="sm">Confirm</Button>
          </div>
        </CardFooter>
      </>
    ),
    style: { width: '350px' }
  },
};

// Card without glow effect
export const WithoutGlow: Story = {
  args: {
    glowOnHover: false,
    children: (
      <>
        <CardHeader>
          <CardTitle>No Glow Effect</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This card doesn't have the hover glow effect and transform effect.</p>
        </CardContent>
      </>
    ),
    style: { width: '300px' }
  },
};

// Card with custom styles
export const CustomStyles: Story = {
  args: {
    className: 'bg-black border-matrix-primary',
    children: (
      <>
        <CardHeader className="bg-matrix-primary bg-opacity-10">
          <CardTitle>Custom Styled Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This card has custom background colors and border styles.</p>
        </CardContent>
      </>
    ),
    style: { width: '300px' }
  },
};

// Multiple cards in a grid
export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4" style={{ width: '650px' }}>
      <Card>
        <CardHeader>
          <CardTitle>First Card</CardTitle>
        </CardHeader>
        <CardContent>Content for the first card</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Second Card</CardTitle>
        </CardHeader>
        <CardContent>Content for the second card</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Third Card</CardTitle>
        </CardHeader>
        <CardContent>Content for the third card</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Fourth Card</CardTitle>
        </CardHeader>
        <CardContent>Content for the fourth card</CardContent>
      </Card>
    </div>
  ),
};

// Interactive card with hover effects
export const Interactive: Story = {
  render: () => (
    <Card className="cursor-pointer transition-all duration-300" style={{ width: '300px' }}>
      <CardHeader className="transition-colors">
        <CardTitle>Interactive Card</CardTitle>
        <CardDescription>Hover over me to see effects</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card has additional interactive hover effects.</p>
        <p className="mt-2 text-sm text-matrix-text-dim">Try hovering over the card to see the effects.</p>
      </CardContent>
      <CardFooter className="bg-matrix-bg bg-opacity-30 transition-colors">
        <Button variant="ghost" size="sm" className="ml-auto">Learn More →</Button>
      </CardFooter>
    </Card>
  ),
};

// Card with Matrix-themed content
export const MatrixThemed: Story = {
  render: () => (
    <Card className="bg-black" style={{ width: '350px' }}>
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="matrix-code-bg"></div>
      </div>
      <CardHeader className="border-matrix-text">
        <CardTitle className="text-matrix-text-bright">System Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Matrix Connection</span>
            <span className="text-matrix-text-bright">Online</span>
          </div>
          <div className="flex justify-between">
            <span>Security Level</span>
            <span className="text-matrix-text-bright">Alpha</span>
          </div>
          <div className="flex justify-between">
            <span>Data Transfer</span>
            <span className="text-matrix-text-bright">25.3 TB/s</span>
          </div>
          <div className="h-1 bg-matrix-border mt-4">
            <div className="h-full bg-matrix-text w-3/4"></div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-matrix-text">
        <span className="text-xs">SYSTEM ID: 78BX-42</span>
        <span className="text-xs text-matrix-text-bright animate-pulse">ACTIVE</span>
      </CardFooter>
    </Card>
  ),
};