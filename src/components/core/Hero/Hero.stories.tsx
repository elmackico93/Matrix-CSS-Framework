import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Hero } from './Hero';
import { HeroProps } from './Hero.types';
import { Button } from '../Button';

// Meta information for the Hero component
const meta: Meta<HeroProps> = {
  title: 'Core/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'dark', 'terminal', 'gradient', 'cyber'],
      description: 'The visual style of the hero section'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'auto'],
      description: 'The size/height of the hero section'
    },
    contentAlignment: {
      control: 'select',
      options: ['center', 'left', 'right'],
      description: 'Alignment of content within the hero section'
    },
    titleEffect: {
      control: 'select',
      options: ['none', 'glitch', 'glow', 'both'],
      description: 'Visual effects applied to the title'
    },
    hasRainEffect: {
      control: 'boolean',
      description: 'Whether to display the matrix rain animation in the background'
    },
    title: {
      control: 'text',
      description: 'Primary heading of the hero section'
    },
    subtitle: {
      control: 'text',
      description: 'Secondary text below the title'
    },
    showScrollIndicator: {
      control: 'boolean',
      description: 'Whether to show a scroll down indicator'
    },
    showVersion: {
      control: 'boolean',
      description: 'Whether to show a version badge'
    },
    version: {
      control: 'text',
      description: 'Version text to display'
    }
  }
};

export default meta;
type Story = StoryObj<HeroProps>;

// Default hero
export const Default: Story = {
  args: {
    title: 'MATRIX.CSS',
    subtitle: 'Immerse your users in the digital realm with the complete Matrix-inspired design framework.',
    children: (
      <div className="flex gap-4 justify-center">
        <Button variant="primary">Get Started</Button>
        <Button variant="outline">Documentation</Button>
      </div>
    ),
  },
};

// Dark variant
export const Dark: Story = {
  args: {
    variant: 'dark',
    title: 'ENTER THE VOID',
    subtitle: 'A minimalist dark environment for your cyberpunk interfaces.',
    children: (
      <Button variant="neon" hasGlow>Access System</Button>
    ),
  },
};

// Terminal variant
export const Terminal: Story = {
  args: {
    variant: 'terminal',
    title: 'TERMINAL',
    titleEffect: 'glitch',
    subtitle: 'Command line interface for your digital operations.',
    children: (
      <Button variant="terminal">$ Initialize System</Button>
    ),
  },
};

// Gradient variant
export const Gradient: Story = {
  args: {
    variant: 'gradient',
    title: 'NEURAL NETWORK',
    titleEffect: 'glow',
    subtitle: 'Advanced AI systems for your next-gen applications.',
    children: (
      <div className="flex gap-4 justify-center">
        <Button variant="primary" hasGlow>Connect</Button>
        <Button variant="ghost">About AI</Button>
      </div>
    ),
  },
};

// Cyber variant
export const Cyber: Story = {
  args: {
    variant: 'cyber',
    title: 'CYBERPUNK',
    titleEffect: 'both',
    subtitle: 'High-tech and low-life aesthetics for modern web applications.',
    children: (
      <div className="flex gap-4 justify-center">
        <Button variant="cyber">Hack the System</Button>
        <Button variant="bordered">Exit</Button>
      </div>
    ),
  },
};

// Small size
export const Small: Story = {
  args: {
    size: 'sm',
    title: 'COMPACT HERO',
    subtitle: 'A smaller hero section for less prominent pages.',
    children: (
      <Button variant="outline">Continue</Button>
    ),
  },
};

// Auto size
export const AutoHeight: Story = {
  args: {
    size: 'auto',
    title: 'FLEXIBLE HEIGHT',
    subtitle: 'This hero section adapts to its content height.',
    children: (
      <div className="flex flex-col gap-8 items-center">
        <p className="text-matrix-text max-w-2xl">
          This hero section has extra content to demonstrate the auto height functionality.
          The height will adjust based on the content rather than taking up a fixed viewport height.
        </p>
        <Button variant="primary">Continue</Button>
      </div>
    ),
  },
};

// Left-aligned content
export const LeftAligned: Story = {
  args: {
    contentAlignment: 'left',
    title: 'LEFT ALIGNED',
    subtitle: 'This hero section has content aligned to the left side.',
    children: (
      <div className="flex gap-4">
        <Button variant="primary">Primary Action</Button>
        <Button variant="outline">Secondary Action</Button>
      </div>
    ),
  },
};

// Without rain effect
export const NoRainEffect: Story = {
  args: {
    hasRainEffect: false,
    title: 'CLEAN INTERFACE',
    subtitle: 'A hero section without the matrix rain background for a cleaner look.',
    children: (
      <Button variant="primary">Get Started</Button>
    ),
  },
};

// With scroll indicator and version
export const WithExtras: Story = {
  args: {
    title: 'FULL FEATURED',
    subtitle: 'This hero includes all available features like scroll indicator and version badge.',
    showScrollIndicator: true,
    showVersion: true,
    version: 'VERSION 2.1.0',
    children: (
      <div className="flex gap-4 justify-center">
        <Button variant="primary">Primary Action</Button>
        <Button variant="outline">Secondary Action</Button>
      </div>
    ),
  },
};