import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from './Modal';
import { ModalProps } from './Modal.types';
import { Button } from '../Button/Button';

// Meta information for the Modal component
const meta: Meta<ModalProps> = {
  title: 'Core/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the modal is visible'
    },
    onClose: {
      action: 'closed',
      description: 'Function to call when the modal should close'
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Whether to show a close button in the top-right corner'
    },
    closeOnBackdropClick: {
      control: 'boolean',
      description: 'Whether to close the modal when clicking on the backdrop'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the modal container'
    }
  }
};

export default meta;
type Story = StoryObj<ModalProps>;

// Interactive version with state for control
export const Interactive: Story = {
  render: function Render() {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <ModalHeader>
            <h2 className="text-lg font-bold text-matrix-text-bright">Modal Title</h2>
          </ModalHeader>
          <ModalBody>
            <p>This is a simple modal with a header, body, and footer.</p>
            <p className="mt-2">
              Click the close button, press ESC, or click outside to close this modal.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={() => setIsOpen(false)}>
              Confirm
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
};

// Basic modal that's always visible in Storybook
export const Basic: Story = {
  args: {
    isOpen: true,
    children: (
      <>
        <ModalHeader>
          <h2 className="text-lg font-bold text-matrix-text-bright">Modal Title</h2>
        </ModalHeader>
        <ModalBody>
          <p>This is a basic modal example. In an actual application, you would control the modal's visibility with the isOpen prop.</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" size="sm">Cancel</Button>
          <Button variant="primary" size="sm">OK</Button>
        </ModalFooter>
      </>
    ),
  },
};

// Modal without close button
export const WithoutCloseButton: Story = {
  args: {
    isOpen: true,
    showCloseButton: false,
    children: (
      <>
        <ModalHeader>
          <h2 className="text-lg font-bold text-matrix-text-bright">No Close Button</h2>
        </ModalHeader>
        <ModalBody>
          <p>This modal doesn't have a close button in the corner.</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" size="sm">OK</Button>
        </ModalFooter>
      </>
    ),
  },
};

// Modal that doesn't close when backdrop is clicked
export const NoBackdropClose: Story = {
  args: {
    isOpen: true,
    closeOnBackdropClick: false,
    children: (
      <>
        <ModalHeader>
          <h2 className="text-lg font-bold text-matrix-text-bright">No Backdrop Close</h2>
        </ModalHeader>
        <ModalBody>
          <p>This modal doesn't close when you click outside of it.</p>
          <p className="mt-2">You must use the close button or press ESC to close it.</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" size="sm">OK</Button>
        </ModalFooter>
      </>
    ),
  },
};

// Modal with custom styling
export const CustomStyling: Story = {
  args: {
    isOpen: true,
    className: "border-matrix-text bg-black max-w-lg",
    children: (
      <>
        <ModalHeader className="border-matrix-text bg-matrix-primary bg-opacity-10">
          <h2 className="text-lg font-bold text-matrix-text-bright">Custom Styled Modal</h2>
        </ModalHeader>
        <ModalBody>
          <p>This modal has custom styling applied, including border color and background.</p>
        </ModalBody>
        <ModalFooter className="border-matrix-text bg-matrix-primary bg-opacity-10">
          <Button variant="outline" size="sm">Cancel</Button>
          <Button variant="primary" size="sm" hasGlow>Confirm</Button>
        </ModalFooter>
      </>
    ),
  },
};

// Alert modal
export const AlertModal: Story = {
  args: {
    isOpen: true,
    className: "border-matrix-danger max-w-sm",
    children: (
      <>
        <ModalHeader className="bg-matrix-danger bg-opacity-10 border-matrix-danger">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-matrix-danger mr-2"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <h2 className="text-lg font-bold text-matrix-danger">Warning</h2>
          </div>
        </ModalHeader>
        <ModalBody>
          <p className="text-center">This action cannot be undone. Are you sure you want to proceed?</p>
        </ModalBody>
        <ModalFooter className="border-matrix-danger">
          <Button variant="outline" size="sm">Cancel</Button>
          <Button variant="danger" size="sm">Delete</Button>
        </ModalFooter>
      </>
    ),
  },
};

// Matrix-themed modal
export const MatrixThemed: Story = {
  args: {
    isOpen: true,
    className: "border-matrix-text shadow-[0_0_15px_var(--m-glow)] max-w-md",
    children: (
      <>
        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
          <div className="matrix-code-bg"></div>
        </div>
        <ModalHeader className="border-matrix-text">
          <h2 className="text-lg font-matrix-hacker text-matrix-text-bright tracking-wide">SYSTEM ACCESS</h2>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-3 font-matrix-hacker">
            <p className="text-matrix-text-bright">INITIATING CONNECTION TO THE MATRIX...</p>
            <div className="flex justify-between">
              <span>USER ID:</span>
              <span className="text-matrix-text-bright">NEO_1</span>
            </div>
            <div className="flex justify-between">
              <span>ACCESS LEVEL:</span>
              <span className="text-matrix-text-bright">ADMINISTRATOR</span>
            </div>
            <div className="flex justify-between">
              <span>STATUS:</span>
              <span className="text-matrix-text-bright animate-pulse">CONNECTED</span>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="border-matrix-text">
          <Button variant="outline" size="sm" className="uppercase tracking-wider">Disconnect</Button>
          <Button variant="terminal" size="sm" hasGlow className="uppercase tracking-wider">
            Enter System
          </Button>
        </ModalFooter>
      </>
    ),
  },
};

// Form modal
export const FormModal: Story = {
  args: {
    isOpen: true,
    className: "max-w-md",
    children: (
      <>
        <ModalHeader>
          <h2 className="text-lg font-bold text-matrix-text-bright">User Registration</h2>
        </ModalHeader>
        <ModalBody>
          <form className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-matrix-text">
                Username
              </label>
              <input
                className="w-full p-2 bg-matrix-bg bg-opacity-90 border border-matrix-border text-matrix-text rounded"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-matrix-text">
                Email
              </label>
              <input
                type="email"
                className="w-full p-2 bg-matrix-bg bg-opacity-90 border border-matrix-border text-matrix-text rounded"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-matrix-text">
                Password
              </label>
              <input
                type="password"
                className="w-full p-2 bg-matrix-bg bg-opacity-90 border border-matrix-border text-matrix-text rounded"
                placeholder="Choose a password"
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" size="sm">Cancel</Button>
          <Button variant="primary" size="sm">Register</Button>
        </ModalFooter>
      </>
    ),
  },
};