import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabList, Tab, TabPanel } from './Tabs';
import { TabsProps } from './Tabs.types';

// Meta information for the Tabs component
const meta: Meta<TabsProps> = {
  title: 'Core/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultTab: {
      control: 'text',
      description: 'ID of the initially selected tab'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the tabs container'
    }
  }
};

export default meta;
type Story = StoryObj<TabsProps>;

// Basic tabs with default tab
export const Basic: Story = {
  render: () => (
    <div className="w-[500px]">
      <Tabs>
        <TabList>
          <Tab id="tab1">Tab 1</Tab>
          <Tab id="tab2">Tab 2</Tab>
          <Tab id="tab3">Tab 3</Tab>
        </TabList>
        <TabPanel id="tab1">
          <h3 className="text-lg text-matrix-text-bright mb-4">Content for Tab 1</h3>
          <p>This is the content for the first tab panel. Tab panels contain the main content associated with each tab.</p>
        </TabPanel>
        <TabPanel id="tab2">
          <h3 className="text-lg text-matrix-text-bright mb-4">Content for Tab 2</h3>
          <p>This is the content for the second tab panel. Different panels can contain completely different types of content.</p>
        </TabPanel>
        <TabPanel id="tab3">
          <h3 className="text-lg text-matrix-text-bright mb-4">Content for Tab 3</h3>
          <p>This is the content for the third tab panel. Only one panel is shown at a time based on the selected tab.</p>
        </TabPanel>
      </Tabs>
    </div>
  ),
};

// Tabs with specific default tab
export const WithDefaultTab: Story = {
  render: () => (
    <div className="w-[500px]">
      <Tabs defaultTab="tab2">
        <TabList>
          <Tab id="tab1">Tab 1</Tab>
          <Tab id="tab2">Tab 2</Tab>
          <Tab id="tab3">Tab 3</Tab>
        </TabList>
        <TabPanel id="tab1">
          <p>Content for Tab 1</p>
        </TabPanel>
        <TabPanel id="tab2">
          <p>Content for Tab 2 - This tab is selected by default</p>
        </TabPanel>
        <TabPanel id="tab3">
          <p>Content for Tab 3</p>
        </TabPanel>
      </Tabs>
    </div>
  ),
};

// Tabs with icons
export const WithIcons: Story = {
  render: () => (
    <div className="w-[500px]">
      <Tabs>
        <TabList>
          <Tab id="home" className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" 
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Home
          </Tab>
          <Tab id="profile" className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" 
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Profile
          </Tab>
          <Tab id="settings" className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" 
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            Settings
          </Tab>
        </TabList>
        <TabPanel id="home">
          <h3 className="text-lg text-matrix-text-bright mb-4">Home</h3>
          <p>Welcome to your dashboard. Here you can see an overview of your activity.</p>
        </TabPanel>
        <TabPanel id="profile">
          <h3 className="text-lg text-matrix-text-bright mb-4">Profile</h3>
          <p>This is your profile page. You can update your personal information here.</p>
        </TabPanel>
        <TabPanel id="settings">
          <h3 className="text-lg text-matrix-text-bright mb-4">Settings</h3>
          <p>Configure your account and application settings.</p>
        </TabPanel>
      </Tabs>
    </div>
  ),
};

// Matrix-styled tabs
export const MatrixStyled: Story = {
  render: () => (
    <div className="w-[550px] p-5 bg-black border border-matrix-border rounded">
      <Tabs>
        <TabList className="border-matrix-text">
          <Tab id="system" className="uppercase font-matrix-hacker tracking-wider text-xs">SYSTEM STATUS</Tab>
          <Tab id="network" className="uppercase font-matrix-hacker tracking-wider text-xs">NETWORK</Tab>
          <Tab id="security" className="uppercase font-matrix-hacker tracking-wider text-xs">SECURITY</Tab>
        </TabList>
        
        <TabPanel id="system">
          <div className="font-matrix-hacker">
            <h3 className="text-matrix-text-bright mb-4 text-lg">SYSTEM DIAGNOSTICS</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>OS VERSION:</span>
                  <span className="text-matrix-text-bright">MATRIX 2.0</span>
                </div>
                <div className="flex justify-between">
                  <span>UPTIME:</span>
                  <span className="text-matrix-text-bright">23:45:12</span>
                </div>
                <div className="flex justify-between">
                  <span>PROCESSES:</span>
                  <span className="text-matrix-text-bright">142 ACTIVE</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>CPU USAGE:</span>
                  <span className="text-matrix-text-bright">42%</span>
                </div>
                <div className="flex justify-between">
                  <span>MEMORY:</span>
                  <span className="text-matrix-text-bright">3.2GB/8GB</span>
                </div>
                <div className="flex justify-between">
                  <span>DISK SPACE:</span>
                  <span className="text-matrix-text-bright">249GB FREE</span>
                </div>
              </div>
            </div>
            <div className="h-1 bg-matrix-border mt-4 mb-2">
              <div className="h-full bg-matrix-text w-3/4"></div>
            </div>
            <div className="text-right text-xs text-matrix-text-bright animate-pulse">
              SYSTEM OPERATIONAL
            </div>
          </div>
        </TabPanel>
        
        <TabPanel id="network">
          <div className="font-matrix-hacker">
            <h3 className="text-matrix-text-bright mb-4 text-lg">NETWORK STATUS</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>CONNECTION:</span>
                <span className="text-matrix-text-bright">SECURE TUNNEL</span>
              </div>
              <div className="flex justify-between">
                <span>IP ADDRESS:</span>
                <span className="text-matrix-text-bright">192.168.1.***</span>
              </div>
              <div className="flex justify-between">
                <span>BANDWIDTH:</span>
                <span className="text-matrix-text-bright">84.5 MBPS</span>
              </div>
              <div className="flex justify-between">
                <span>LATENCY:</span>
                <span className="text-matrix-text-bright">12MS</span>
              </div>
            </div>
            <div className="mt-4 p-2 border border-matrix-border bg-matrix-bg bg-opacity-20 text-sm">
              <div className="flex justify-between mb-1">
                <span>DATA TRANSFERS:</span>
                <span className="text-matrix-text-bright">ACTIVE</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs">⬇ 1.2MB/s</span>
                <span className="text-xs">⬆ 0.3MB/s</span>
              </div>
            </div>
          </div>
        </TabPanel>
        
        <TabPanel id="security">
          <div className="font-matrix-hacker">
            <h3 className="text-matrix-text-bright mb-4 text-lg">SECURITY STATUS</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>FIREWALL:</span>
                <span className="text-matrix-success">ACTIVE</span>
              </div>
              <div className="flex justify-between">
                <span>ENCRYPTION:</span>
                <span className="text-matrix-success">AES-256</span>
              </div>
              <div className="flex justify-between">
                <span>LAST SCAN:</span>
                <span className="text-matrix-text-bright">12:42:08</span>
              </div>
              <div className="flex justify-between">
                <span>THREATS DETECTED:</span>
                <span className="text-matrix-danger">3</span>
              </div>
            </div>
            <div className="mt-4 border border-matrix-danger p-3 text-sm">
              <div className="text-matrix-danger mb-2">⚠ WARNING: UNAUTHORIZED ACCESS ATTEMPTS DETECTED</div>
              <div className="text-xs">Last attempt: 20 minutes ago - Source: Unknown</div>
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  ),
};

// Tabs with custom content
export const CustomContent: Story = {
  render: () => (
    <div className="w-[500px]">
      <Tabs>
        <TabList>
          <Tab id="info">Information</Tab>
          <Tab id="form">Form</Tab>
          <Tab id="chart">Chart</Tab>
        </TabList>
        
        <TabPanel id="info">
          <div className="p-4 border border-matrix-border rounded">
            <h3 className="text-lg text-matrix-text-bright mb-2">Information Panel</h3>
            <p>This tab contains some basic information.</p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Item one</li>
              <li>Item two</li>
              <li>Item three</li>
            </ul>
          </div>
        </TabPanel>
        
        <TabPanel id="form">
          <div className="p-4 border border-matrix-border rounded">
            <h3 className="text-lg text-matrix-text-bright mb-4">Input Form</h3>
            <form className="space-y-4">
              <div>
                <label className="block mb-1 text-sm">Name</label>
                <input 
                  className="w-full p-2 bg-matrix-bg border border-matrix-border rounded text-matrix-text"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Email</label>
                <input 
                  type="email"
                  className="w-full p-2 bg-matrix-bg border border-matrix-border rounded text-matrix-text"
                  placeholder="Enter your email"
                />
              </div>
              <button 
                type="button"
                className="px-4 py-2 bg-matrix-primary bg-opacity-20 text-matrix-text border border-matrix-border rounded hover:bg-opacity-30"
              >
                Submit
              </button>
            </form>
          </div>
        </TabPanel>
        
        <TabPanel id="chart">
          <div className="p-4 border border-matrix-border rounded">
            <h3 className="text-lg text-matrix-text-bright mb-4">Chart Data</h3>
            <div className="h-40 flex items-end gap-2">
              {/* Simple bar chart */}
              {[30, 50, 70, 40, 60, 80, 45].map((height, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-matrix-primary bg-opacity-30 hover:bg-opacity-50 transition-colors"
                    style={{ height: `${height}%` }}
                  ></div>
                  <div className="text-xs mt-1">{`D${index+1}`}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center text-sm text-matrix-text-dim">
              Weekly Activity Report
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  ),
};

// Vertical tabs layout
export const VerticalTabs: Story = {
  render: () => (
    <div className="w-[500px]">
      <Tabs className="flex">
        <TabList className="flex-shrink-0 flex-col border-r border-b-0 border-matrix-border mr-4 pr-0">
          <Tab id="tab1" className="text-left border-r-2 border-b-0 mb-0 -mr-px">Tab 1</Tab>
          <Tab id="tab2" className="text-left border-r-2 border-b-0 mb-0 -mr-px">Tab 2</Tab>
          <Tab id="tab3" className="text-left border-r-2 border-b-0 mb-0 -mr-px">Tab 3</Tab>
        </TabList>
        <div className="flex-grow">
          <TabPanel id="tab1">
            <h3 className="text-lg text-matrix-text-bright mb-2">Content for Tab 1</h3>
            <p>This tab layout arranges tabs vertically on the left side.</p>
          </TabPanel>
          <TabPanel id="tab2">
            <h3 className="text-lg text-matrix-text-bright mb-2">Content for Tab 2</h3>
            <p>Content appears on the right side of the vertical tabs.</p>
          </TabPanel>
          <TabPanel id="tab3">
            <h3 className="text-lg text-matrix-text-bright mb-2">Content for Tab 3</h3>
            <p>Vertical tabs are useful for forms and settings pages.</p>
          </TabPanel>
        </div>
      </Tabs>
    </div>
  ),
};