import React, { useState, useEffect } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';
import { ProgressProps } from './Progress.types';

// Meta information for the Progress component
const meta: Meta<ProgressProps> = {
  title: 'Core/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current value of the progress bar'
    },
    max: {
      control: { type: 'number', min: 1 },
      description: 'Maximum value of the progress bar'
    },
    variant: {
      control: 'select',
      options: ['default', 'striped', 'animated'],
      description: 'Visual style of the progress bar'
    },
    color: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger', 'info'],
      description: 'Color theme of the progress bar'
    },
    showLabel: {
      control: 'boolean',
      description: 'Whether to show a percentage label'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply'
    }
  }
};

export default meta;
type Story = StoryObj<ProgressProps>;

// Basic progress bar
export const Basic: Story = {
  args: {
    value: 40,
    max: 100,
  },
};

// Progress with label
export const WithLabel: Story = {
  args: {
    value: 60,
    max: 100,
    showLabel: true,
  },
};

// Striped progress bar
export const Striped: Story = {
  args: {
    value: 50,
    max: 100,
    variant: 'striped',
  },
};

// Animated progress bar
export const Animated: Story = {
  args: {
    value: 75,
    max: 100,
    variant: 'animated',
  },
};

// Different color variants
export const Colors: Story = {
  render: () => (
    <div className="w-64 space-y-3">
      <Progress value={70} color="default" />
      <Progress value={70} color="success" />
      <Progress value={70} color="warning" />
      <Progress value={70} color="danger" />
      <Progress value={70} color="info" />
    </div>
  ),
};

// Animated progress that increases over time
export const ProgressingOverTime: Story = {
  render: function AnimatedProgress() {
    const [progress, setProgress] = useState(0);
    
    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 1;
          return newProgress > 100 ? 0 : newProgress;
        });
      }, 100);
      
      return () => {
        clearInterval(timer);
      };
    }, []);
    
    return (
      <div className="w-64">
        <Progress 
          value={progress} 
          max={100} 
          variant="animated" 
          showLabel 
        />
        <div className="mt-2 text-sm text-matrix-text text-center">
          {progress === 100 ? 'Complete!' : 'Loading...'}
        </div>
      </div>
    );
  }
};

// Multiple progress bars showing different completion levels
export const MultipleProgressBars: Story = {
  render: () => (
    <div className="w-64 space-y-4">
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm text-matrix-text">Downloads</span>
          <span className="text-sm text-matrix-text-bright">85%</span>
        </div>
        <Progress value={85} variant="striped" color="success" />
      </div>
      
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm text-matrix-text">Uploads</span>
          <span className="text-sm text-matrix-text-bright">45%</span>
        </div>
        <Progress value={45} variant="striped" color="info" />
      </div>
      
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm text-matrix-text">Processing</span>
          <span className="text-sm text-matrix-text-bright">65%</span>
        </div>
        <Progress value={65} variant="animated" />
      </div>
    </div>
  ),
};

// Matrix-styled progress bar with custom height and design
export const MatrixStyled: Story = {
  render: () => (
    <div className="w-64 p-4 bg-black border border-matrix-border rounded">
      <div className="mb-4">
        <h4 className="font-matrix-hacker text-matrix-text-bright mb-2">SYSTEM DIAGNOSTICS</h4>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1 text-xs font-matrix-hacker">
              <span>CPU LOAD</span>
              <span className="text-matrix-text-bright">78%</span>
            </div>
            <Progress 
              value={78} 
              className="h-2 shadow-[0_0_5px_var(--m-glow)]" 
              variant="striped"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-1 text-xs font-matrix-hacker">
              <span>MEMORY</span>
              <span className="text-matrix-text-bright">45%</span>
            </div>
            <Progress 
              value={45} 
              className="h-2 shadow-[0_0_5px_var(--m-glow)]" 
              variant="striped"
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-1 text-xs font-matrix-hacker">
              <span>NETWORK</span>
              <span className="text-matrix-text-bright">91%</span>
            </div>
            <Progress 
              value={91} 
              className="h-2 shadow-[0_0_5px_var(--m-glow)]" 
              variant="animated"
              color="warning"
            />
          </div>
        </div>
      </div>
      
      <div className="pt-2 border-t border-matrix-border text-center text-xs font-matrix-hacker">
        <span className="text-matrix-text-dim">SYSTEM STATUS:</span>
        <span className="ml-2 text-matrix-text-bright animate-pulse">OPERATIONAL</span>
      </div>
    </div>
  ),
};

// File upload progress simulation
export const FileUpload: Story = {
  render: function FileUploadProgress() {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('Preparing upload...');
    
    useEffect(() => {
      const timer = setTimeout(() => {
        if (progress < 100) {
          setProgress(prev => {
            const increment = Math.floor(Math.random() * 10) + 1;
            const newValue = Math.min(prev + increment, 100);
            
            // Update status based on progress
            if (newValue < 20) {
              setStatus('Preparing upload...');
            } else if (newValue < 50) {
              setStatus('Uploading file...');
            } else if (newValue < 80) {
              setStatus('Processing file...');
            } else if (newValue < 100) {
              setStatus('Almost done...');
            } else {
              setStatus('Upload complete!');
            }
            
            return newValue;
          });
        }
      }, 500);
      
      return () => {
        clearTimeout(timer);
      };
    }, [progress]);
    
    return (
      <div className="w-64 p-3 bg-matrix-panel rounded border border-matrix-border">
        <div className="mb-2 text-sm">
          <div className="font-medium text-matrix-text-bright">file_upload.dat</div>
          <div className="text-xs text-matrix-text-dim">{status}</div>
        </div>
        <Progress 
          value={progress} 
          variant={progress < 100 ? 'animated' : 'default'} 
          color={progress === 100 ? 'success' : 'default'} 
        />
        <div className="mt-1 text-right text-xs text-matrix-text">
          {progress}% complete
        </div>
      </div>
    );
  }
};