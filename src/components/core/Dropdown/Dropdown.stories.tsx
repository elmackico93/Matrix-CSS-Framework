import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Dropdown, DropdownItem, DropdownDivider, DropdownHeader } from './Dropdown';
import { DropdownProps } from './Dropdown.types';
import { Button } from '../Button/Button';

// Meta information for the Dropdown component
const meta: Meta<DropdownProps> = {
  title: 'Core/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Alignment of the dropdown menu relative to the trigger'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the dropdown container'
    },
    dropdownClassName: {
      control: 'text',
      description: 'Additional CSS classes for the dropdown menu'
    },
    trigger: {
      description: 'Element that triggers the dropdown'
    },
    children: {
      description: 'Content of the dropdown menu'
    }
  }
};

export default meta;
type Story = StoryObj<DropdownProps>;

// Basic dropdown with a button trigger
export const Basic: Story = {
  args: {
    trigger: <Button>Open Menu</Button>,
    children: (
      <>
        <DropdownItem>Profile</DropdownItem>
        <DropdownItem>Settings</DropdownItem>
        <DropdownItem>Help</DropdownItem>
        <DropdownDivider />
        <DropdownItem>Sign out</DropdownItem>
      </>
    ),
  },
};

// Dropdown aligned to the right
export const RightAligned: Story = {
  args: {
    trigger: <Button>Right-aligned Menu</Button>,
    align: 'right',
    children: (
      <>
        <DropdownItem>Profile</DropdownItem>
        <DropdownItem>Settings</DropdownItem>
        <DropdownItem>Help</DropdownItem>
        <DropdownDivider />
        <DropdownItem>Sign out</DropdownItem>
      </>
    ),
  },
};

// Dropdown with header sections
export const WithHeaders: Story = {
  args: {
    trigger: <Button>Menu with Headers</Button>,
    children: (
      <>
        <DropdownHeader>User</DropdownHeader>
        <DropdownItem>Profile</DropdownItem>
        <DropdownItem>Account</DropdownItem>
        <DropdownDivider />
        <DropdownHeader>System</DropdownHeader>
        <DropdownItem>Settings</DropdownItem>
        <DropdownItem>Security</DropdownItem>
        <DropdownDivider />
        <DropdownItem>Sign out</DropdownItem>
      </>
    ),
  },
};

// Dropdown with disabled items
export const WithDisabledItems: Story = {
  args: {
    trigger: <Button>Menu with Disabled Items</Button>,
    children: (
      <>
        <DropdownItem>Available Option</DropdownItem>
        <DropdownItem disabled>Unavailable Option</DropdownItem>
        <DropdownItem>Another Available Option</DropdownItem>
        <DropdownDivider />
        <DropdownItem disabled>Restricted Option</DropdownItem>
      </>
    ),
  },
};

// Dropdown with icons in items
export const WithIcons: Story = {
  args: {
    trigger: <Button variant="primary">Menu with Icons</Button>,
    children: (
      <>
        <DropdownItem className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" 
               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          Profile
        </DropdownItem>
        <DropdownItem className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" 
               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
          Settings
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" 
               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Sign out
        </DropdownItem>
      </>
    ),
  },
};

// Custom styled Matrix-themed dropdown
export const MatrixThemed: Story = {
  args: {
    trigger: (
      <Button 
        variant="terminal" 
        hasGlow={true}
        className="uppercase tracking-wider font-matrix-hacker"
      >
        Access Matrix
      </Button>
    ),
    dropdownClassName: "bg-black border-matrix-text shadow-[0_0_15px_var(--m-glow)] w-56",
    children: (
      <>
        <DropdownHeader className="text-matrix-text-bright text-center border-b border-matrix-text pb-2">
          SYSTEM ACCESS
        </DropdownHeader>
        <DropdownItem className="hover:bg-matrix-primary hover:bg-opacity-10 mt-1">
          <div className="flex items-center">
            <span className="text-matrix-text-bright mr-2">&gt;</span>
            <span>Enter the Matrix</span>
          </div>
        </DropdownItem>
        <DropdownItem className="hover:bg-matrix-primary hover:bg-opacity-10">
          <div className="flex items-center">
            <span className="text-matrix-text-bright mr-2">&gt;</span>
            <span>User Database</span>
          </div>
        </DropdownItem>
        <DropdownItem className="hover:bg-matrix-primary hover:bg-opacity-10">
          <div className="flex items-center">
            <span className="text-matrix-text-bright mr-2">&gt;</span>
            <span>System Controls</span>
          </div>
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem className="text-matrix-danger hover:bg-matrix-danger hover:bg-opacity-10">
          <div className="flex items-center">
            <span className="text-matrix-danger mr-2">!</span>
            <span>Emergency Shutdown</span>
          </div>
        </DropdownItem>
      </>
    ),
  },
};

// Dropdown with a different trigger element (not a button)
export const CustomTrigger: Story = {
  args: {
    trigger: (
      <div className="flex items-center gap-2 cursor-pointer text-matrix-text hover:text-matrix-text-bright">
        <span>User Profile</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" 
             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </div>
    ),
    children: (
      <>
        <DropdownItem>My Account</DropdownItem>
        <DropdownItem>Privacy Settings</DropdownItem>
        <DropdownDivider />
        <DropdownItem>Log Out</DropdownItem>
      </>
    ),
  },
};