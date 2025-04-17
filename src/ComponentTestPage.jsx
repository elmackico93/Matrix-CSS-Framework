import React, { useState, useEffect } from 'react';
import './ComponentTestPage.css';
import { Sidebar } from './components/core/Sidebar';

// Import components
// Uncomment as you implement them
// import { Button } from './components/core/Button';
// import { Card } from './components/core/Card';
// import { Input } from './components/core/Input';
//import { Checkbox } from './components/core/Checkbox';
// import { Radio } from './components/core/Radio';
// import { Select } from './components/core/Select';
// import { Modal } from './components/core/Modal';
// import { Alert } from './components/core/Alert';
// import { Badge } from './components/core/Badge';
// import { Progress } from './components/core/Progress';
// import { Tooltip } from './components/core/Tooltip';
// import { Tabs, TabPane } from './components/core/Tabs';
// import { Switch } from './components/core/Switch';
// import { Dropdown } from './components/core/Dropdown';

/**
 * Comprehensive test page for Matrix CSS components
 * This page displays all components with different configurations
 */
function ComponentTestPage() {
  // State for interactive components
  const [activeTab, setActiveTab] = useState('buttons');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [switchOn, setSwitchOn] = useState(false);
  const [selectValue, setSelectValue] = useState('default');
  const [showAlert, setShowAlert] = useState(false);
  const [progress, setProgress] = useState(45);
  const [matrixCodeType, setMatrixCodeType] = useState('qr');
  const [matrixCodeData, setMatrixCodeData] = useState('https://example.com');
  const [matrixCodeEffects, setMatrixCodeEffects] = useState({
      glow: true,
      glitch: false,
      scanline: false,
      codeRain: false
  });
  
  // Sidebar state
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  
  // States for modal examples
  const [activeModalType, setActiveModalType] = useState('default');
  const [terminalCommands, setTerminalCommands] = useState([
    '> INITIATING CONNECTION TO THE MATRIX...',
    '> USER AUTHENTICATION REQUIRED',
    '> ACCESS LEVEL: ADMINISTRATOR',
    '> SECURITY CLEARANCE: ALPHA-7',
    '> STATUS: CONNECTED',
    '',
    'Ready for input. Type "help" for available commands.'
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const [glitching, setGlitching] = useState(true);
  
  // Define sidebar tabs based on the navigation items
  const sidebarTabs = [
    { id: 'buttons', label: 'BUTTONS', icon: '▢' },
    { id: 'cards', label: 'CARDS', icon: '◰' },
    { id: 'inputs', label: 'INPUTS', icon: '◧' },
    { id: 'checkboxes', label: 'CHECKBOXES', icon: '☑' },
    { id: 'radios', label: 'RADIOS', icon: '◉' },
    { id: 'selects', label: 'SELECTS', icon: '⊝' },
    { id: 'switches', label: 'SWITCHES', icon: '⊜' },
    { id: 'progress', label: 'PROGRESS', icon: '◫' },
    { id: 'alerts', label: 'ALERTS', icon: '⚠' },
    { id: 'modals', label: 'MODALS', icon: '⊞' },
    { id: 'badges', label: 'BADGES', icon: '◈' },
    { id: 'tooltips', label: 'TOOLTIPS', icon: '◍' },
    { id: 'tabs', label: 'TABS', icon: '⊟' },
    { id: 'matrix-code', label: 'MATRIX CODE', icon: '⊟' },
  ];
  
  // Glitch effect for access denied modal
  useEffect(() => {
    if (isModalOpen && activeModalType === 'access') {
      const glitchInterval = setInterval(() => {
        setGlitching(prev => !prev);
      }, 300);
      
      return () => clearInterval(glitchInterval);
    }
  }, [isModalOpen, activeModalType]);

  // Helper function to render a component card
  const ComponentSection = ({ title, children }) => (
    <section className="component-section">
      <h3 className="section-title">{title}</h3>
      <div className="component-showcase">
        {children}
      </div>
    </section>
  );

  // Toggle progress value for demo
  const toggleProgress = () => {
    setProgress(prev => prev >= 90 ? 10 : prev + 20);
  };

  // Custom Button component if actual component not yet implemented
  const MatrixButton = ({ children, variant = '', size = '', className = '', ...props }) => (
    <button 
      className={`matrix-button ${variant} ${size} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
  
  // Handle terminal commands
  const handleTerminalCommand = (e) => {
    e.preventDefault();
    const command = terminalInput.trim().toLowerCase();
    
    let response = [];
    
    if (command === 'help') {
      response = [
        'AVAILABLE COMMANDS:',
        '- help: Display this help message',
        '- status: Check system status',
        '- scan: Scan for security vulnerabilities',
        '- exit: Close terminal session'
      ];
    } else if (command === 'status') {
      response = [
        'SYSTEM STATUS:',
        '- CPU: 72% OPERATIONAL',
        '- MEMORY: 45% UTILIZED',
        '- SECURITY: ACTIVE',
        '- ENCRYPTION: ENABLED'
      ];
    } else if (command === 'scan') {
      response = [
        'INITIATING SECURITY SCAN...',
        'SCANNING NETWORK PERIMETER...',
        'SCANNING DATABASE ACCESS POINTS...',
        'SCANNING AUTHENTICATION PROTOCOLS...',
        'SCAN COMPLETE. NO VULNERABILITIES DETECTED.'
      ];
    } else if (command === 'exit') {
      response = ['TERMINATING SESSION...'];
      setTimeout(() => setIsModalOpen(false), 1000);
    } else if (command !== '') {
      response = [`UNKNOWN COMMAND: "${command}". TYPE "help" FOR AVAILABLE COMMANDS.`];
    }
    
    setTerminalCommands([...terminalCommands, `> ${command}`, ...response, '']);
    setTerminalInput('');
    
    // Auto-scroll to bottom
    setTimeout(() => {
      const terminal = document.getElementById('terminal-content');
      if (terminal) {
        terminal.scrollTop = terminal.scrollHeight;
      }
    }, 10);
  };
  
  // Function to open modal with specific type
  const openModal = (type) => {
    setActiveModalType(type);
    setIsModalOpen(true);
  };
  
  // Function to copy code snippet to clipboard
  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code)
      .then(() => {
        alert('Code copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  // Mock Input component for the test page
  const MatrixInput = ({ 
    label, 
    placeholder, 
    type = 'text', 
    variant = 'default', 
    size = 'md', 
    status = 'default', 
    prefix, 
    suffix,
    hasGlow,
    error,
    helperText,
    fullWidth = true,
    disabled,
    required,
    className = '',
    ...props 
  }) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = props.id || Math.random().toString(36).substring(2, 9);
    const inputType = type === 'password' && showPassword ? 'text' : type;
    
    // Variant classes
    const variantClasses = {
      default: "bg-matrix-bg bg-opacity-90 border-matrix-border border",
      filled: "bg-matrix-secondary bg-opacity-20 border-transparent border",
      outlined: "bg-transparent border-matrix-border border-2",
      ghosted: "bg-transparent border-b border-matrix-border rounded-none",
      terminal: "bg-black font-matrix-hacker border border-matrix-text tracking-wider"
    };
    
    // Size classes
    const sizeClasses = {
      sm: "p-1.5 text-xs",
      md: "p-2 text-sm",
      lg: "p-3 text-base"
    };
    
    // Status classes
    const statusClasses = {
      default: "border-matrix-border",
      success: "border-matrix-success",
      warning: "border-matrix-warning",
      error: "border-matrix-danger",
      info: "border-matrix-info"
    };
    
    const iconPadding = [
      prefix ? "pl-9" : "",
      (suffix || type === 'password') ? "pr-9" : ""
    ].join(" ");
    
    return (
      <div className={`mb-4 ${fullWidth ? "w-full" : "w-auto"}`}>
        {label && (
          <label htmlFor={inputId} className="block mb-2 text-sm font-medium text-matrix-text">
            {label}
            {required && <span className="ml-1 text-matrix-danger">*</span>}
          </label>
        )}
        <div className="relative">
          {prefix && (
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-matrix-text-dim">
              {prefix}
            </div>
          )}
          <input
            id={inputId}
            type={inputType}
            className={`
              block w-full rounded focus:outline-none 
              placeholder:text-matrix-text-dim text-matrix-text
              transition-all duration-200 focus:ring-2
              ${variantClasses[variant]} 
              ${sizeClasses[size]} 
              ${statusClasses[status]}
              ${iconPadding}
              ${hasGlow ? "shadow-[0_0_10px_var(--matrix-glow)] focus:shadow-[0_0_15px_var(--matrix-glow)]" : ""}
              ${className}
            `}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            {...props}
          />
          {suffix && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-matrix-text-dim">
              {suffix}
            </div>
          )}
          {type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-matrix-text-dim hover:text-matrix-text-bright"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              )}
            </button>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-matrix-danger">{error}</p>}
        {helperText && !error && <p className="mt-1 text-xs text-matrix-text-dim">{helperText}</p>}
      </div>
    );
  };

  
  // Render appropriate tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'buttons':
        return (
          <div className="tab-content">
            <ComponentSection title="Standard Button Variants">
              <div className="flex-grid">
                <MatrixButton>Default Button</MatrixButton>
                <MatrixButton variant="primary">Primary Button</MatrixButton>
                <MatrixButton variant="danger">Danger Button</MatrixButton>
                <MatrixButton variant="ghost">Ghost Button</MatrixButton>
              </div>
              <div className="mt-4">
                <pre className="bg-black p-2 rounded text-sm overflow-auto">
                  <code>
                    {`<button class="matrix-button">Default Button</button>
<button class="matrix-button primary">Primary Button</button>
<button class="matrix-button danger">Danger Button</button>
<button class="matrix-button ghost">Ghost Button</button>`}
                  </code>
                </pre>
              </div>
            </ComponentSection>

            <ComponentSection title="Special Button Variants">
              <div className="flex-grid">
                <MatrixButton variant="neon">Neon</MatrixButton>
                <MatrixButton variant="holographic">Holographic</MatrixButton>
                <MatrixButton variant="cyber">Cyber</MatrixButton>
                <MatrixButton variant="three-d">3D</MatrixButton>
              </div>
              <div className="mt-4">
                <pre className="bg-black p-2 rounded text-sm overflow-auto">
                  <code>
                    {`<button class="matrix-button neon">Neon</button>
<button class="matrix-button holographic">Holographic</button>
<button class="matrix-button cyber">Cyber</button>
<button class="matrix-button three-d">3D</button>`}
                  </code>
                </pre>
              </div>
            </ComponentSection>

            <ComponentSection title="Advanced Button Variants">
              <div className="flex-grid">
                <MatrixButton variant="pill">Pill Button</MatrixButton>
                <MatrixButton variant="bordered">Bordered</MatrixButton>
                <MatrixButton variant="data">Data</MatrixButton>
                <MatrixButton variant="glitch">Glitch</MatrixButton>
                <MatrixButton variant="pulse">Pulse</MatrixButton>
              </div>
              <div className="mt-4">
                <pre className="bg-black p-2 rounded text-sm overflow-auto">
                  <code>
                    {`<button class="matrix-button pill">Pill Button</button>
<button class="matrix-button bordered">Bordered</button>
<button class="matrix-button data">Data</button>
<button class="matrix-button glitch">Glitch</button>
<button class="matrix-button pulse">Pulse</button>`}
                  </code>
                </pre>
              </div>
            </ComponentSection>

            <ComponentSection title="Button Sizes">
              <div className="flex-grid">
                <MatrixButton size="sm">Small Button</MatrixButton>
                <MatrixButton size="md">Medium Button</MatrixButton>
                <MatrixButton size="lg">Large Button</MatrixButton>
              </div>
              <div className="mt-4">
                <pre className="bg-black p-2 rounded text-sm overflow-auto">
                  <code>
                    {`<button class="matrix-button sm">Small Button</button>
<button class="matrix-button md">Medium Button</button>
<button class="matrix-button lg">Large Button</button>`}
                  </code>
                </pre>
              </div>
            </ComponentSection>

            <ComponentSection title="Button States">
              <div className="flex-grid">
                <MatrixButton>Normal Button</MatrixButton>
                <MatrixButton disabled>Disabled Button</MatrixButton>
                <MatrixButton className="loading">Loading Button</MatrixButton>
                <MatrixButton className="active">Active Button</MatrixButton>
              </div>
              <div className="mt-4">
                <pre className="bg-black p-2 rounded text-sm overflow-auto">
                  <code>
                    {`<button class="matrix-button">Normal Button</button>
<button class="matrix-button" disabled>Disabled Button</button>
<button class="matrix-button loading">Loading Button</button>
<button class="matrix-button active">Active Button</button>`}
                  </code>
                </pre>
              </div>
            </ComponentSection>

            <ComponentSection title="Button with Icons">
              <div className="flex-grid">
                <MatrixButton>
                  <span className="icon">◉</span> Start
                </MatrixButton>
                <MatrixButton>
                  Delete <span className="icon">✗</span>
                </MatrixButton>
                <MatrixButton variant="primary">
                  <span className="icon">↻</span> Refresh
                </MatrixButton>
              </div>
              <div className="mt-4">
                <pre className="bg-black p-2 rounded text-sm overflow-auto">
                  <code>
                    {`<button class="matrix-button">
  <span class="icon">◉</span> Start
</button>
<button class="matrix-button">
  Delete <span class="icon">✗</span>
</button>
<button class="matrix-button primary">
  <span class="icon">↻</span> Refresh
</button>`}
                  </code>
                </pre>
              </div>
            </ComponentSection>

            <ComponentSection title="Combined Button Styles">
              <div className="flex-grid">
                <MatrixButton variant="neon" size="sm">Small Neon</MatrixButton>
                <MatrixButton variant="primary" className="loading">Loading Primary</MatrixButton>
                <MatrixButton variant="pulse" size="lg">Large Pulse</MatrixButton>
                <MatrixButton variant="glitch" className="active">Active Glitch</MatrixButton>
              </div>
              <div className="mt-4">
                <pre className="bg-black p-2 rounded text-sm overflow-auto">
                  <code>
                    {`<button class="matrix-button neon sm">Small Neon</button>
<button class="matrix-button primary loading">Loading Primary</button>
<button class="matrix-button pulse lg">Large Pulse</button>
<button class="matrix-button glitch active">Active Glitch</button>`}
                  </code>
                </pre>
              </div>
            </ComponentSection>
            
            <ComponentSection title="Interactive Demo">
              <div className="flex-grid">
                <MatrixButton variant="neon" onClick={() => setIsModalOpen(true)}>Open Modal</MatrixButton>
                <MatrixButton variant="glitch" onClick={() => setShowAlert(true)}>Trigger Alert</MatrixButton>
                <MatrixButton variant="pulse" onClick={toggleProgress}>Update Progress</MatrixButton>
              </div>
              <div className="mt-4">
                <div className="matrix-progress">
                  <div className="progress-bar animated" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="mt-2 text-sm">Current progress: {progress}%</p>
              </div>
            </ComponentSection>
          </div>
        );
      
        case 'cards':
          return (
            <div className="tab-content">
              <ComponentSection title="Basic Card Variants">
                <div className="card-grid">
                  <div className="matrix-card">
                    <div className="card-header">Default Card</div>
                    <div className="card-body">
                      <p>This is a standard card component with a header and body.</p>
                    </div>
                  </div>
        
                  <div className="matrix-card elevated">
                    <div className="card-header">Elevated Card</div>
                    <div className="card-body">
                      <p>This card has an elevated appearance with a glow effect.</p>
                    </div>
                  </div>
        
                  <div className="matrix-card compact">
                    <div className="card-header">Compact Card</div>
                    <div className="card-body">
                      <p>A more compact version with less padding.</p>
                    </div>
                  </div>
                </div>
              </ComponentSection>
        
              <ComponentSection title="Advanced Card Variants">
                <div className="card-grid">
                  <div className="matrix-card" style={{ background: 'black', borderColor: 'var(--matrix-text)' }}>
                    <div className="card-header" style={{ borderColor: 'var(--matrix-text)', fontFamily: 'var(--m-font-hacker)' }}>
                      Terminal Card
                    </div>
                    <div className="card-body">
                      <p>Terminal-style card with monospace font and darker background.</p>
                    </div>
                  </div>
        
                  <div className="matrix-card" style={{ background: 'transparent', borderWidth: '2px' }}>
                    <div className="card-header">Outlined Card</div>
                    <div className="card-body">
                      <p>Card with transparent background and thicker border.</p>
                    </div>
                  </div>
        
                  <div className="matrix-card" style={{ 
                    background: 'rgba(15, 15, 15, 0.3)', 
                    backdropFilter: 'blur(2px)',
                    border: '1px solid rgba(0, 255, 65, 0.2)'
                  }}>
                    <div className="card-header">Glass Card</div>
                    <div className="card-body">
                      <p>Card with translucent glass effect background.</p>
                    </div>
                  </div>
                </div>
              </ComponentSection>
        
              <ComponentSection title="Special Effect Cards">
                <div className="card-grid">
                  <div className="matrix-card" style={{
                    background: 'var(--m-bg)',
                    boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.5)'
                  }}>
                    <div className="card-header">Inset Card</div>
                    <div className="card-body">
                      <p>Card with an inset shadow effect for depth.</p>
                    </div>
                  </div>
        
                  <div className="matrix-card" style={{
                    clipPath: 'polygon(0 10%, 10% 0, 90% 0, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0 90%)'
                  }}>
                    <div className="card-header">Cyber Card</div>
                    <div className="card-body">
                      <p>Card with angled corners for a cyberpunk aesthetic.</p>
                    </div>
                  </div>
        
                  <div className="matrix-card animate-flicker">
                    <div className="card-header">Flicker Card</div>
                    <div className="card-body">
                      <p>Card with a flickering animation effect.</p>
                    </div>
                  </div>
                </div>
              </ComponentSection>
        
              <ComponentSection title="Card Status Indicators">
                <div className="card-grid">
                  <div className="matrix-card" style={{ borderLeft: '4px solid var(--m-primary)' }}>
                    <div className="card-header">Primary Status</div>
                    <div className="card-body">
                      <p>Card with primary status indicator.</p>
                    </div>
                  </div>
        
                  <div className="matrix-card" style={{ borderLeft: '4px solid var(--m-success)' }}>
                    <div className="card-header">Success Status</div>
                    <div className="card-body">
                      <p>Card indicating a successful operation.</p>
                    </div>
                  </div>
        
                  <div className="matrix-card" style={{ borderLeft: '4px solid var(--m-warning)' }}>
                    <div className="card-header">Warning Status</div>
                    <div className="card-body">
                      <p>Card indicating a warning or caution.</p>
                    </div>
                  </div>
        
                  <div className="matrix-card" style={{ borderLeft: '4px solid var(--m-danger)' }}>
                    <div className="card-header">Danger Status</div>
                    <div className="card-body">
                      <p>Card indicating an error or danger.</p>
                    </div>
                  </div>
                </div>
              </ComponentSection>
        
              <ComponentSection title="Card with Data Visualization">
                <div className="matrix-card" style={{ 
                  fontFamily: 'var(--m-font-hacker)',
                  textShadow: '0 0 5px var(--m-glow)',
                  position: 'relative'
                }}>
                  <div className="card-header">
                    <div style={{ 
                      position: 'absolute', 
                      top: '2px',
                      right: '6px',
                      fontSize: '0.6rem',
                      opacity: '0.6'
                    }}>DATA_NODE_127</div>
                    System Status
                  </div>
                  <div className="card-body">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>CPU USAGE:</span>
                          <span style={{ color: 'var(--m-text-bright)' }}>68%</span>
                        </div>
                        <div className="matrix-progress" style={{ height: '4px', marginTop: '4px' }}>
                          <div className="progress-bar" style={{ width: '68%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>MEMORY:</span>
                          <span style={{ color: 'var(--m-text-bright)' }}>42%</span>
                        </div>
                        <div className="matrix-progress" style={{ height: '4px', marginTop: '4px' }}>
                          <div className="progress-bar" style={{ width: '42%' }}></div>
                        </div>
                      </div>
                    </div>
                    <div style={{ 
                      textAlign: 'center', 
                      color: 'var(--m-text-bright)', 
                      animation: 'pulse 3s infinite'
                    }}>
                      SYSTEM OPERATIONAL
                    </div>
                  </div>
                </div>
              </ComponentSection>
        
              <ComponentSection title="Card with Actions">
                <div className="matrix-card">
                  <div className="card-header">Interactive Card</div>
                  <div className="card-body">
                    <p>This card contains interactive elements like buttons.</p>
                    <p>Click the buttons below to perform actions.</p>
                  </div>
                  <div className="card-footer">
                    <MatrixButton variant="ghost" size="sm">Cancel</MatrixButton>
                    <MatrixButton variant="primary" size="sm">Confirm</MatrixButton>
                  </div>
                </div>
              </ComponentSection>
            </div>
          );
          
      case 'inputs':
        return (
          <div className="tab-content">
            <ComponentSection title="Input Variants">
              <div className="input-grid">
                <MatrixInput 
                  label="Default Variant" 
                  placeholder="Default input style"
                  variant="default"
                />
                <MatrixInput 
                  label="Filled Variant" 
                  placeholder="Filled input style"
                  variant="filled"
                />
                <MatrixInput 
                  label="Outlined Variant" 
                  placeholder="Outlined input style"
                  variant="outlined"
                />
                <MatrixInput 
                  label="Ghosted Variant" 
                  placeholder="Ghosted input style"
                  variant="ghosted"
                />
                <MatrixInput 
                  label="Terminal Variant" 
                  placeholder="TERMINAL INPUT"
                  variant="terminal"
                />
              </div>
              <div className="mt-4">
                <pre className="bg-black p-2 rounded text-sm overflow-auto">
                  <code>
                    {`// Basic input variants
<Input variant="default" label="Default Variant" placeholder="Default input style" />
<Input variant="filled" label="Filled Variant" placeholder="Filled input style" />
<Input variant="outlined" label="Outlined Variant" placeholder="Outlined input style" />
<Input variant="ghosted" label="Ghosted Variant" placeholder="Ghosted input style" />
<Input variant="terminal" label="Terminal Variant" placeholder="TERMINAL INPUT" />`}
                  </code>
                </pre>
              </div>
            </ComponentSection>

            <ComponentSection title="Input Sizes">
              <div className="input-grid">
                <MatrixInput 
                  label="Small Input" 
                  placeholder="Small size input"
                  size="sm"
                />
                <MatrixInput 
                  label="Medium Input" 
                  placeholder="Medium size input (default)"
                  size="md"
                />
                <MatrixInput 
                  label="Large Input" 
                  placeholder="Large size input"
                  size="lg"
                />
              </div>
              <div className="mt-4">
                <pre className="bg-black p-2 rounded text-sm overflow-auto">
                  <code>
                    {`// Input sizes
<Input size="sm" label="Small Input" placeholder="Small size input" />
<Input size="md" label="Medium Input" placeholder="Medium size input (default)" />
<Input size="lg" label="Large Input" placeholder="Large size input" />`}
                  </code>
                </pre>
              </div>
            </ComponentSection>

            <ComponentSection title="Input States">
              <div className="input-grid">
                <MatrixInput 
                  label="Default State" 
                  placeholder="Normal input state"
                />
                <MatrixInput 
                  label="Success State" 
                  placeholder="Success input state"
                  value="Valid input"
                  status="success"
                />
                <MatrixInput 
                  label="Warning State" 
                  placeholder="Warning input state"
                  value="Check this value"
                  status="warning"
                />
                <MatrixInput 
                  label="Error State" 
                  placeholder="Error input state"
                  value="Invalid input"
                  error="This field has an error"
                  status="error"
                />
                <MatrixInput 
                  label="Info State" 
                  placeholder="Info input state"
                  value="Special input"
                  status="info"
                />
              </div>
              <div className="mt-4">
                <pre className="bg-black p-2 rounded text-sm overflow-auto">
                  <code>
                    {`// Input states
<Input label="Default State" placeholder="Normal input state" />
<Input label="Success State" placeholder="Success input state" value="Valid input" status="success" />
<Input label="Warning State" placeholder="Warning input state" value="Check this value" status="warning" />
<Input label="Error State" placeholder="Error input state" value="Invalid input" error="This field has an error" />
<Input label="Info State" placeholder="Info input state" value="Special input" status="info" />`}
                  </code>
                </pre>
              </div>
            </ComponentSection>

            <ComponentSection title="Input Special Features">
              <div className="input-grid">
                <MatrixInput 
                  label="With Helper Text" 
                  placeholder="Enter text here"
                  helperText="This is helper text providing additional information"
                />
                <MatrixInput 
                  label="Required Input" 
                  placeholder="This field is required"
                  required
                />
                <MatrixInput 
                  label="With Glow Effect" 
                  placeholder="Input with glow effect"
                  hasGlow
                />
                <MatrixInput 
                  label="Disabled Input" 
                  placeholder="Input is disabled"
                  value="Cannot edit this"
                  disabled
                />
                <MatrixInput 
                  label="Read-only Input" 
                  placeholder="Input is read-only"
                  value="Cannot edit this"
                  readOnly
                />
              </div>
              <div className="mt-4">
                <pre className="bg-black p-2 rounded text-sm overflow-auto">
                  <code>
                    {`// Input special features
<Input label="With Helper Text" placeholder="Enter text here" helperText="This is helper text providing additional information" />
<Input label="Required Input" placeholder="This field is required" required />
<Input label="With Glow Effect" placeholder="Input with glow effect" hasGlow />
<Input label="Disabled Input" placeholder="Input is disabled" value="Cannot edit this" disabled />
<Input label="Read-only Input" placeholder="Input is read-only" value="Cannot edit this" readOnly />`}
                  </code>
                </pre>
              </div>
            </ComponentSection>

            <ComponentSection title="Input with Icons">
              <div className="input-grid">
                <MatrixInput 
                  label="With Prefix Icon" 
                  placeholder="Search..."
                  prefix={
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  }
                />
                <MatrixInput 
                  label="With Suffix Icon" 
                  placeholder="Enter username"
                  suffix={
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  }
                />
                <MatrixInput 
                  label="Password with Toggle" 
                  placeholder="Enter password"
                  type="password"
                />
                <MatrixInput 
                  label="With Text Prefix & Suffix" 
                  placeholder="0.00"
                  prefix="$"
                  suffix="USD"
                />
              </div>
              <div className="mt-4">
                <pre className="bg-black p-2 rounded text-sm overflow-auto">
                  <code>
                    {`// Input with icons and affixes
<Input 
  label="With Prefix Icon" 
  placeholder="Search..."
  prefix={<SearchIcon />}
/>
<Input 
  label="With Suffix Icon" 
  placeholder="Enter username"
  suffix={<UserIcon />}
/>
<Input 
  label="Password with Toggle" 
  placeholder="Enter password"
  type="password"
/>
<Input 
  label="With Text Prefix & Suffix" 
  placeholder="0.00"
  prefix="$"
  suffix="USD"
/>`}
                  </code>
                </pre>
              </div>
            </ComponentSection>

            <ComponentSection title="Input Types">
              <div className="input-grid">
                <MatrixInput 
                  label="Text Input" 
                  placeholder="Regular text input"
                  type="text"
                />
                <MatrixInput 
                  label="Number Input" 
                  placeholder="Enter a number"
                  type="number"
                />
                <MatrixInput 
                  label="Email Input" 
                  placeholder="Enter your email"
                  type="email"
                />
                <MatrixInput 
                  label="Password Input" 
                  placeholder="Enter your password"
                  type="password"
                />
                <MatrixInput 
                  label="Date Input" 
                  type="date"
                />
                <MatrixInput 
                  label="Time Input" 
                  type="time"
                />
              </div>
              <div className="mt-4">
                <pre className="bg-black p-2 rounded text-sm overflow-auto">
                  <code>
                    {`// Input types
<Input label="Text Input" placeholder="Regular text input" type="text" />
<Input label="Number Input" placeholder="Enter a number" type="number" />
<Input label="Email Input" placeholder="Enter your email" type="email" />
<Input label="Password Input" placeholder="Enter your password" type="password" />
<Input label="Date Input" type="date" />
<Input label="Time Input" type="time" />`}
                  </code>
                </pre>
              </div>
            </ComponentSection>

            <ComponentSection title="Matrix-Themed Examples">
              <div className="input-grid">
                <MatrixInput 
                  label="ACCESS CODE" 
                  placeholder="ENTER ACCESS CODE"
                  variant="terminal"
                  hasGlow
                />
                <MatrixInput 
                  label="SEARCH DATABASE" 
                  placeholder="QUERY..."
                  variant="terminal"
                  prefix={
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  }
                  hasGlow
                />
                <div className="bg-black p-4 rounded border border-matrix-text col-span-2">
                  <div className="font-matrix-hacker text-matrix-text-bright mb-2 tracking-wider">LOGIN TERMINAL</div>
                  <MatrixInput 
                    label="USERNAME"
                    placeholder="ENTER USERNAME"
                    variant="terminal"
                    className="mb-2"
                  />
                  <MatrixInput 
                    label="PASSWORD"
                    placeholder="ENTER PASSWORD"
                    type="password"
                    variant="terminal"
                    className="mb-3"
                  />
                  <MatrixButton variant="neon" className="w-full">
                    ACCESS SYSTEM
                  </MatrixButton>
                </div>
              </div>
            </ComponentSection>

            <ComponentSection title="Combined Input Features">
              <div className="input-grid">
                <MatrixInput 
                  label="Enhanced Search" 
                  placeholder="Search..."
                  variant="filled"
                  prefix={
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  }
                  hasGlow
                  size="lg"
                />
                <MatrixInput 
                  label="Security Code" 
                  placeholder="Enter security code"
                  variant="outlined"
                  suffix={
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  }
                  status="success"
                  helperText="Code verified successfully"
                />
                <MatrixInput 
                  label="Critical Input" 
                  placeholder="Enter value"
                  required
                  status="error"
                  error="This field cannot be empty"
                  variant="ghosted"
                  size="md"
                />
                <MatrixInput 
                  label="READ-ONLY DATA" 
                  value="SYSTEM:MATRIX:001:ALPHA"
                  readOnly
                  variant="terminal"
                  hasGlow
                />
              </div>
              <div className="mt-4">
                <pre className="bg-black p-2 rounded text-sm overflow-auto">
                  <code>
                    {`// Combined input features
<Input 
  label="Enhanced Search" 
  placeholder="Search..."
  variant="filled"
  prefix={<SearchIcon />}
  hasGlow
  size="lg"
/>
<Input 
  label="Security Code" 
  placeholder="Enter security code"
  variant="outlined"
  suffix={<LockIcon />}
  status="success"
  helperText="Code verified successfully"
/>
<Input 
  label="Critical Input" 
  placeholder="Enter value"
  required
  status="error"
  error="This field cannot be empty"
  variant="ghosted"
  size="md"
/>
<Input 
  label="READ-ONLY DATA" 
  value="SYSTEM:MATRIX:001:ALPHA"
  readOnly
  variant="terminal"
  hasGlow
/>`}
                  </code>
                </pre>
              </div>
            </ComponentSection>
          </div>
        );

      case 'checkboxes':
        return (
          <div className="tab-content">
            <ComponentSection title="Checkbox Variants">
              <div className="control-grid">
                <div className="control-group">
                  <h4 className="group-label">Default Variant</h4>
                  <label className="matrix-checkbox">
                    <input 
                      type="checkbox" 
                      checked={checked}
                      onChange={() => setChecked(!checked)}
                    />
                    <span className="checkbox-label">Default Checkbox</span>
                  </label>
                  <div className="description">Current state: {checked ? 'Checked' : 'Unchecked'}</div>
                </div>

                <div className="control-group">
                  <h4 className="group-label">Terminal Style</h4>
                  <label className="matrix-checkbox checkbox-terminal">
                    <input type="checkbox" defaultChecked />
                    <span className="checkbox-label">TERMINAL CHECKBOX</span>
                  </label>
                </div>

                <div className="control-group">
                  <h4 className="group-label">Cyber Style</h4>
                  <label className="matrix-checkbox">
                    <input 
                      type="checkbox" 
                      className="cyber-checkbox"
                    />
                    <span className="checkbox-label">Cyber Checkbox</span>
                  </label>
                </div>

                <div className="control-group">
                  <h4 className="group-label">Glow Effect</h4>
                  <label className="matrix-checkbox">
                    <input 
                      type="checkbox" 
                      defaultChecked
                      className="glow-checkbox"
                    />
                    <span className="checkbox-label">Glowing Checkbox</span>
                  </label>
                </div>
              </div>
              <div className="mt-4">
                <pre className="bg-black p-2 rounded text-sm overflow-auto">
                  <code>
                  {`<!-- Default Checkbox -->
          <label class="matrix-checkbox">
            <input type="checkbox" />
            <span class="checkbox-label">Default Checkbox</span>
          </label>

          <!-- Terminal Checkbox -->
          <label class="matrix-checkbox checkbox-terminal">
            <input type="checkbox" />
            <span class="checkbox-label">TERMINAL CHECKBOX</span>
          </label>

          <!-- Cyber Style Checkbox -->
          <label class="matrix-checkbox">
            <input type="checkbox" class="cyber-checkbox" />
            <span class="checkbox-label">Cyber Checkbox</span>
          </label>

          <!-- Glow Effect Checkbox -->
          <label class="matrix-checkbox">
            <input type="checkbox" class="glow-checkbox" />
            <span class="checkbox-label">Glowing Checkbox</span>
          </label>`}
                  </code>
                </pre>
              </div>
            </ComponentSection>

            <ComponentSection title="Matrix Themed Example">
              <div className="p-4 bg-black bg-opacity-70 border border-matrix-border rounded">
                <h3 className="mb-4 text-lg font-matrix-hacker text-matrix-text-bright">
                  MATRIX SYSTEM PREFERENCES
                </h3>
                <div className="space-y-2">
                  {/* Use the new matrix-terminal-checkbox class for all checkboxes */}
                  <label className="matrix-terminal-checkbox">
                    <input 
                      type="checkbox" 
                      defaultChecked
                    />
                    <span className="checkbox-text">ENABLE CODE RAIN VISUALIZATION</span>
                  </label>
                  
                  <label className="matrix-terminal-checkbox">
                    <input 
                      type="checkbox"
                    />
                    <span className="checkbox-text">CONNECT TO NEURAL NETWORK</span>
                  </label>
                  
                  <label className="matrix-terminal-checkbox">
                    <input 
                      type="checkbox" 
                      defaultChecked
                    />
                    <span className="checkbox-text">ALLOW SYSTEM TRACKING</span>
                  </label>
                  <p className="mt-1 text-xs text-matrix-danger ml-10">WARNING: ACTIVE TRACKING DETECTED</p>
                  
                  <label className="matrix-terminal-checkbox disabled">
                    <input 
                      type="checkbox" 
                      disabled
                    />
                    <span className="checkbox-text">ADMIN CONTROL PANEL</span>
                  </label>
                  <p className="mt-1 text-xs text-matrix-text-dim ml-10">REQUIRES LEVEL 10 CLEARANCE</p>
                </div>
              </div>
              <div className="mt-4">
                <pre className="bg-black p-2 rounded text-sm overflow-auto">
                  <code>
                  {`<!-- Matrix Terminal Style Checkbox -->
          <label class="matrix-terminal-checkbox">
            <input type="checkbox" />
            <span class="checkbox-text">MATRIX SYSTEM OPTION</span>
          </label>
          <!-- Disabled Matrix Terminal Checkbox -->
          <label class="matrix-terminal-checkbox disabled">
            <input type="checkbox" disabled />
            <span class="checkbox-text">RESTRICTED OPTION</span>
          </label>`}
                  </code>
                </pre>
              </div>
            </ComponentSection>

            <ComponentSection title="Checkbox Sizes">
              <div className="control-grid">
                <div className="control-group">
                  <h4 className="group-label">Small Size</h4>
                  <label className="matrix-checkbox">
                    <input 
                      type="checkbox" 
                      className="w-3.5 h-3.5"
                    />
                    <span className="checkbox-label text-xs">Small Checkbox</span>
                  </label>
                </div>

                <div className="control-group">
                  <h4 className="group-label">Medium Size (Default)</h4>
                  <label className="matrix-checkbox">
                    <input 
                      type="checkbox" 
                      defaultChecked
                    />
                    <span className="checkbox-label">Medium Checkbox</span>
                  </label>
                </div>

                <div className="control-group">
                  <h4 className="group-label">Large Size</h4>
                  <label className="matrix-checkbox">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5"
                    />
                    <span className="checkbox-label text-base">Large Checkbox</span>
                  </label>
                </div>
              </div>
              <div className="mt-4">
                <pre className="bg-black p-2 rounded text-sm overflow-auto">
                  <code>
                  {`<Checkbox size="sm" label="Small Checkbox" />
          <Checkbox size="md" label="Medium Checkbox" />
          <Checkbox size="lg" label="Large Checkbox" />`}
                  </code>
                </pre>
              </div>
            </ComponentSection>

            <ComponentSection title="Checkbox States">
              <div className="control-grid">
                <div className="control-group">
                  <h4 className="group-label">Default State</h4>
                  <label className="matrix-checkbox">
                    <input 
                      type="checkbox" 
                    />
                    <span className="checkbox-label">Unchecked by Default</span>
                  </label>
                </div>

                <div className="control-group">
                  <h4 className="group-label">Checked State</h4>
                  <label className="matrix-checkbox">
                    <input 
                      type="checkbox" 
                      defaultChecked
                    />
                    <span className="checkbox-label">Checked by Default</span>
                  </label>
                </div>

                <div className="control-group">
                  <h4 className="group-label">Disabled States</h4>
                  <label className="matrix-checkbox disabled">
                    <input 
                      type="checkbox" 
                      disabled
                    />
                    <span className="checkbox-label">Disabled Unchecked</span>
                  </label>
                  <label className="matrix-checkbox disabled">
                    <input 
                      type="checkbox" 
                      disabled
                      defaultChecked
                    />
                    <span className="checkbox-label">Disabled Checked</span>
                  </label>
                </div>

                <div className="control-group">
                  <h4 className="group-label">Error State</h4>
                  <label className="matrix-checkbox">
                    <input 
                      type="checkbox"
                      className="border-matrix-danger"
                    />
                    <span className="checkbox-label">Checkbox with Error</span>
                  </label>
                  <p className="mt-1 text-xs text-matrix-danger">This field is required</p>
                </div>
              </div>
              <div className="mt-4">
                <pre className="bg-black p-2 rounded text-sm overflow-auto">
                  <code>
                  {`<Checkbox label="Unchecked by Default" />
          <Checkbox label="Checked by Default" defaultChecked />
          <Checkbox label="Disabled Unchecked" disabled />
          <Checkbox label="Disabled Checked" disabled defaultChecked />
          <Checkbox label="Checkbox with Error" error="This field is required" />`}
                  </code>
                </pre>
              </div>
            </ComponentSection>

            <ComponentSection title="Checkbox with Description">
              <div className="control-grid vertical">
                <div className="control-group">
                  <label className="matrix-checkbox">
                    <input 
                      type="checkbox" 
                      defaultChecked
                    />
                    <span className="checkbox-label">Advanced Mode</span>
                  </label>
                  <p className="mt-1 text-xs text-matrix-text-dim">Enables advanced features for power users</p>

                  <label className="matrix-checkbox mt-3">
                    <input 
                      type="checkbox" 
                    />
                    <span className="checkbox-label">Data Analytics</span>
                  </label>
                  <p className="mt-1 text-xs text-matrix-text-dim">Collect anonymous usage data to improve the system</p>

                  <label className="matrix-checkbox checkbox-terminal mt-3">
                    <input 
                      type="checkbox"
                      disabled
                    />
                    <span className="checkbox-label checkbox-terminal">SYSTEM ADMINISTRATION</span>
                  </label>
                  <p className="mt-1 text-xs text-matrix-text-dim">Grants elevated permissions (requires approval)</p>
                </div>
              </div>
              <div className="mt-4">
                <pre className="bg-black p-2 rounded text-sm overflow-auto">
                  <code>
                  {`<Checkbox 
            label="Advanced Mode" 
            description="Enables advanced features for power users" 
            defaultChecked
          />

          <Checkbox 
            label="Data Analytics" 
            description="Collect anonymous usage data to improve the system" 
          />

          <Checkbox 
            variant="terminal"
            label="SYSTEM ADMINISTRATION" 
            description="Grants elevated permissions (requires approval)" 
            disabled
          />`}
                  </code>
                </pre>
              </div>
            </ComponentSection>

            <ComponentSection title="Checkbox Group Example">
              <div className="control-grid vertical">
                <div className="control-group">
                  <h4 className="group-label">Select System Features:</h4>
                  <label className="matrix-checkbox">
                    <input 
                      type="checkbox" 
                      name="features" 
                      value="firewall" 
                      defaultChecked
                      className="animate-checkbox-glow border-matrix-text"
                    />
                    <span className="checkbox-label">Firewall Protection</span>
                  </label>
                  <label className="matrix-checkbox">
                    <input 
                      type="checkbox" 
                      name="features" 
                      value="encryption"
                      className="animate-checkbox-glow border-matrix-text"
                    />
                    <span className="checkbox-label">Data Encryption</span>
                  </label>
                  <label className="matrix-checkbox">
                    <input 
                      type="checkbox" 
                      name="features" 
                      value="monitoring" 
                      defaultChecked
                      className="animate-checkbox-glow border-matrix-text"
                    />
                    <span className="checkbox-label">System Monitoring</span>
                  </label>
                  <label className="matrix-checkbox">
                    <input 
                      type="checkbox" 
                      name="features" 
                      value="backups"
                      className="animate-checkbox-glow border-matrix-text"
                    />
                    <span className="checkbox-label">Automated Backups</span>
                  </label>
                </div>
              </div>
              <div className="mt-4">
                <pre className="bg-black p-2 rounded text-sm overflow-auto">
                  <code>
                  {`<div className="checkbox-group">
            <h4 className="checkbox-group-title">Select System Features:</h4>
            <Checkbox variant="glow" label="Firewall Protection" name="features" value="firewall" defaultChecked />
            <Checkbox variant="glow" label="Data Encryption" name="features" value="encryption" />
            <Checkbox variant="glow" label="System Monitoring" name="features" value="monitoring" defaultChecked />
            <Checkbox variant="glow" label="Automated Backups" name="features" value="backups" />
          </div>`}
                  </code>
                </pre>
              </div>
            </ComponentSection>
          </div>
        );
        
      case 'radios':
        return (
          <div className="tab-content">
            <ComponentSection title="Radio Variants">
              <div className="control-grid">
                <div className="control-group">
                  <label className="matrix-radio">
                    <input 
                      type="radio" 
                      name="demo-radio" 
                      value="option1"
                      checked={radioValue === 'option1'}
                      onChange={() => setRadioValue('option1')}
                    />
                    <span className="radio-label">Default Radio</span>
                  </label>
                  <div className="description">Current value: {radioValue}</div>
                </div>

                <div className="control-group">
                  <label className="matrix-radio">
                    <input 
                      type="radio" 
                      name="demo-radio" 
                      value="option2"
                      checked={radioValue === 'option2'}
                      onChange={() => setRadioValue('option2')}
                    />
                    <span className="radio-label">Second Option</span>
                  </label>
                </div>

                <div className="control-group">
                  <label className="matrix-radio disabled">
                    <input 
                      type="radio" 
                      name="demo-radio" 
                      value="option3"
                      disabled
                    />
                    <span className="radio-label">Disabled Option</span>
                  </label>
                </div>
              </div>
            </ComponentSection>

            <ComponentSection title="Radio Group">
              <div className="control-grid vertical">
                <div className="control-group">
                  <h4 className="group-label">Select Connection Type:</h4>
                  <label className="matrix-radio">
                    <input type="radio" name="connection" value="secure" defaultChecked />
                    <span className="radio-label">Secure Connection</span>
                  </label>
                  <label className="matrix-radio">
                    <input type="radio" name="connection" value="proxied" />
                    <span className="radio-label">Proxied Connection</span>
                  </label>
                  <label className="matrix-radio">
                    <input type="radio" name="connection" value="direct" />
                    <span className="radio-label">Direct Connection (Unsafe)</span>
                  </label>
                </div>
              </div>
            </ComponentSection>
          </div>
        );

      case 'selects':
        return (
          <div className="tab-content">
            <ComponentSection title="Select Variants">
              <div className="control-grid">
                <div className="control-group">
                  <label htmlFor="default-select" className="block mb-2 text-sm font-medium text-matrix-text">Default Select</label>
                  <select 
                    id="default-select"
                    className="block w-full p-2 bg-matrix-bg border text-matrix-text border-matrix-border rounded"
                    value={selectValue}
                    onChange={(e) => setSelectValue(e.target.value)}
                  >
                    <option value="default">Choose an option</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                  <div className="mt-1 text-xs text-matrix-text-dim">Current value: {selectValue}</div>
                </div>

                <div className="control-group">
                  <label htmlFor="disabled-select" className="block mb-2 text-sm font-medium text-matrix-text">Disabled Select</label>
                  <select 
                    id="disabled-select"
                    className="block w-full p-2 bg-matrix-bg border text-matrix-text border-matrix-border rounded opacity-50"
                    disabled
                  >
                    <option>Disabled select</option>
                  </select>
                </div>
              </div>
            </ComponentSection>

            <ComponentSection title="Select with Option Groups">
              <div className="control-grid">
                <div className="control-group">
                  <label htmlFor="grouped-select" className="block mb-2 text-sm font-medium text-matrix-text">Country Selection</label>
                  <select 
                    id="grouped-select"
                    className="block w-full p-2 bg-matrix-bg border text-matrix-text border-matrix-border rounded"
                  >
                    <option value="">Select a country</option>
                    <optgroup label="North America">
                      <option value="us">United States</option>
                      <option value="ca">Canada</option>
                      <option value="mx">Mexico</option>
                    </optgroup>
                    <optgroup label="Europe">
                      <option value="uk">United Kingdom</option>
                      <option value="fr">France</option>
                      <option value="de">Germany</option>
                    </optgroup>
                    <optgroup label="Asia">
                      <option value="jp">Japan</option>
                      <option value="cn">China</option>
                      <option value="in">India</option>
                    </optgroup>
                  </select>
                </div>

                <div className="control-group">
                  <label htmlFor="matrix-styled-select" className="block mb-2 text-sm font-matrix-hacker text-matrix-text-bright">ACCESS LEVEL</label>
                  <select 
                    id="matrix-styled-select"
                    className="block w-full p-2 bg-black border text-matrix-text-bright border-matrix-text rounded font-matrix-hacker tracking-wide shadow-[0_0_5px_var(--m-glow)]"
                  >
                    <option value="">SELECT ACCESS LEVEL</option>
                    <option value="user">USER</option>
                    <option value="operator">OPERATOR</option>
                    <option value="admin">ADMINISTRATOR</option>
                    <option value="system" disabled>SYSTEM</option>
                  </select>
                </div>
              </div>
            </ComponentSection>
          </div>
        );

      case 'switches':
        return (
          <div className="tab-content">
            <ComponentSection title="Switch Variants">
              <div className="control-grid">
                <div className="control-group">
                  <label className="matrix-switch">
                    <input 
                      type="checkbox" 
                      checked={switchOn} 
                      onChange={() => setSwitchOn(!switchOn)} 
                    />
                    <span className="switch-slider"></span>
                    <span className="switch-label">Toggle Switch</span>
                  </label>
                  <div className="description">Current state: {switchOn ? 'ON' : 'OFF'}</div>
                </div>

                <div className="control-group">
                  <label className="matrix-switch disabled">
                    <input type="checkbox" disabled />
                    <span className="switch-slider"></span>
                    <span className="switch-label">Disabled Switch</span>
                  </label>
                </div>
              </div>
            </ComponentSection>

            <ComponentSection title="Switch Sizes">
              <div className="control-grid">
                <div className="control-group">
                  <label className="matrix-switch sm">
                    <input type="checkbox" defaultChecked />
                    <span className="switch-slider"></span>
                    <span className="switch-label">Small Switch</span>
                  </label>
                </div>

                <div className="control-group">
                  <label className="matrix-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="switch-slider"></span>
                    <span className="switch-label">Default Switch</span>
                  </label>
                </div>

                <div className="control-group">
                  <label className="matrix-switch lg">
                    <input type="checkbox" defaultChecked />
                    <span className="switch-slider"></span>
                    <span className="switch-label">Large Switch</span>
                  </label>
                </div>
              </div>
            </ComponentSection>

            <ComponentSection title="Matrix Themed Switches">
              <div className="p-4 bg-black bg-opacity-70 border border-matrix-text rounded">
                <h3 className="mb-4 text-lg font-matrix-hacker text-matrix-text-bright">SYSTEM CONTROLS</h3>
                <div className="space-y-3">
                  <label className="matrix-switch" style={{ textShadow: '0 0 5px var(--m-glow)' }}>
                    <input type="checkbox" defaultChecked />
                    <span className="switch-slider" style={{ boxShadow: '0 0 5px var(--m-glow)' }}></span>
                    <span className="switch-label font-matrix-hacker">MAIN POWER</span>
                  </label>
                  
                  <label className="matrix-switch" style={{ textShadow: '0 0 5px var(--m-glow)' }}>
                    <input type="checkbox" defaultChecked />
                    <span className="switch-slider" style={{ boxShadow: '0 0 5px var(--m-glow)' }}></span>
                    <span className="switch-label font-matrix-hacker">SECURITY SYSTEM</span>
                  </label>
                  
                  <label className="matrix-switch" style={{ textShadow: '0 0 5px var(--m-glow)' }}>
                    <input type="checkbox" />
                    <span className="switch-slider" style={{ boxShadow: '0 0 5px var(--m-glow)' }}></span>
                    <span className="switch-label font-matrix-hacker">STEALTH MODE</span>
                  </label>
                  
                  <label className="matrix-switch disabled" style={{ textShadow: '0 0 5px var(--m-glow)' }}>
                    <input type="checkbox" disabled />
                    <span className="switch-slider" style={{ boxShadow: '0 0 5px var(--m-glow)' }}></span>
                    <span className="switch-label font-matrix-hacker">OVERRIDE PROTOCOL</span>
                  </label>
                </div>
              </div>
            </ComponentSection>
          </div>
        );

      case 'progress':
        return (
          <div className="tab-content">
            <ComponentSection title="Progress Bar Variants">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-matrix-text">Default Progress</span>
                    <span className="text-sm text-matrix-text-bright">50%</span>
                  </div>
                  <div className="matrix-progress">
                    <div className="progress-bar" style={{ width: '50%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-matrix-text">Striped Progress</span>
                    <span className="text-sm text-matrix-text-bright">60%</span>
                  </div>
                  <div className="matrix-progress">
                    <div className="progress-bar striped" style={{ width: '60%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-matrix-text">Animated Progress</span>
                    <span className="text-sm text-matrix-text-bright">70%</span>
                  </div>
                  <div className="matrix-progress">
                    <div className="progress-bar animated" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
            </ComponentSection>

            <ComponentSection title="Progress Bar Colors">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-matrix-text">Default</span>
                    <span className="text-sm text-matrix-text-bright">40%</span>
                  </div>
                  <div className="matrix-progress">
                    <div className="progress-bar" style={{ width: '40%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-matrix-text">Success</span>
                    <span className="text-sm text-matrix-success">80%</span>
                  </div>
                  <div className="matrix-progress">
                    <div className="progress-bar success" style={{ width: '80%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-matrix-text">Warning</span>
                    <span className="text-sm text-matrix-warning">60%</span>
                  </div>
                  <div className="matrix-progress">
                    <div className="progress-bar warning" style={{ width: '60%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-matrix-text">Danger</span>
                    <span className="text-sm text-matrix-danger">90%</span>
                  </div>
                  <div className="matrix-progress">
                    <div className="progress-bar danger" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </div>
            </ComponentSection>

            <ComponentSection title="Interactive Progress">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-matrix-text">Current Progress</span>
                  <span className="text-sm text-matrix-text-bright">{progress}%</span>
                </div>
                <div className="matrix-progress mb-4">
                  <div className="progress-bar animated" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="flex gap-2">
                  <MatrixButton onClick={() => setProgress(prev => Math.max(0, prev - 10))}>
                    Decrease
                  </MatrixButton>
                  <MatrixButton onClick={() => setProgress(prev => Math.min(100, prev + 10))}>
                    Increase
                  </MatrixButton>
                  <MatrixButton onClick={() => setProgress(0)}>
                    Reset
                  </MatrixButton>
                  <MatrixButton onClick={() => setProgress(100)} variant="primary">
                    Complete
                  </MatrixButton>
                </div>
              </div>
            </ComponentSection>

            <ComponentSection title="Matrix Themed Example">
              <div className="p-4 bg-black bg-opacity-70 border border-matrix-text rounded">
                <h3 className="mb-4 text-lg font-matrix-hacker text-matrix-text-bright">SYSTEM DIAGNOSTICS</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 font-matrix-hacker">
                      <span>CPU LOAD</span>
                      <span className="text-matrix-text-bright">78%</span>
                    </div>
                    <div className="matrix-progress" style={{ height: '4px' }}>
                      <div className="progress-bar animated" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1 font-matrix-hacker">
                      <span>MEMORY</span>
                      <span className="text-matrix-text-bright">45%</span>
                    </div>
                    <div className="matrix-progress" style={{ height: '4px' }}>
                      <div className="progress-bar" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1 font-matrix-hacker">
                      <span>NETWORK</span>
                      <span className="text-matrix-warning">91%</span>
                    </div>
                    <div className="matrix-progress" style={{ height: '4px' }}>
                      <div className="progress-bar warning animated" style={{ width: '91%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1 font-matrix-hacker">
                      <span>DISK SPACE</span>
                      <span className="text-matrix-danger">96%</span>
                    </div>
                    <div className="matrix-progress" style={{ height: '4px' }}>
                      <div className="progress-bar danger" style={{ width: '96%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </ComponentSection>
          </div>
        );

      case 'alerts':
        return (
          <div className="tab-content">
            <ComponentSection title="Alert Variants">
              <div className="space-y-4">
                <div className="matrix-alert">
                  <div className="alert-content">
                    <p className="alert-message">This is a default alert that provides information.</p>
                  </div>
                </div>
                
                <div className="matrix-alert success">
                  <div className="alert-icon">✓</div>
                  <div className="alert-content">
                    <div className="alert-title">Success</div>
                    <p className="alert-message">Operation completed successfully.</p>
                  </div>
                </div>
                
                <div className="matrix-alert warning">
                  <div className="alert-icon">⚠</div>
                  <div className="alert-content">
                    <div className="alert-title">Warning</div>
                    <p className="alert-message">This action might have unexpected consequences.</p>
                  </div>
                </div>
                
                <div className="matrix-alert danger">
                  <div className="alert-icon">✕</div>
                  <div className="alert-content">
                    <div className="alert-title">Error</div>
                    <p className="alert-message">A critical error has occurred. Please try again later.</p>
                  </div>
                </div>
                
                <div className="matrix-alert info">
                  <div className="alert-icon">ℹ</div>
                  <div className="alert-content">
                    <div className="alert-title">Information</div>
                    <p className="alert-message">Here's some useful information that you should know.</p>
                  </div>
                </div>
              </div>
            </ComponentSection>

            <ComponentSection title="Dismissible Alerts">
              <div className="space-y-4">
                {showAlert && (
                  <div className="matrix-alert danger dismissible">
                    <div className="alert-icon">⚠</div>
                    <div className="alert-content">
                      <div className="alert-title">System Warning</div>
                      <p className="alert-message">Critical system resources are running low.</p>
                    </div>
                    <button className="alert-close" onClick={() => setShowAlert(false)}>✕</button>
                  </div>
                )}
                
                <MatrixButton onClick={() => setShowAlert(true)} disabled={showAlert}>
                  Show Alert
                </MatrixButton>
              </div>
            </ComponentSection>

            <ComponentSection title="Matrix Themed Alerts">
              <div className="space-y-4">
                <div className="matrix-alert" style={{ background: 'black', border: '1px solid var(--m-text)' }}>
                  <div className="alert-content">
                    <div className="alert-title font-matrix-hacker text-matrix-text-bright">SYSTEM NOTIFICATION</div>
                    <p className="alert-message font-matrix-hacker">Routine maintenance scheduled for 0200 hours.</p>
                  </div>
                </div>
                
                <div className="matrix-alert danger" style={{ background: 'black', borderLeft: '4px solid var(--m-danger)' }}>
                  <div className="alert-content">
                    <div className="alert-title font-matrix-hacker text-matrix-danger">SECURITY BREACH DETECTED</div>
                    <p className="alert-message">Unauthorized access attempt at node 127.0.0.1</p>
                    <div className="mt-2 flex justify-end">
                      <MatrixButton variant="danger" size="sm">Lockdown</MatrixButton>
                    </div>
                  </div>
                </div>
              </div>
            </ComponentSection>
          </div>
        );

      case 'modals':
        return (
          <div className="tab-content">
            <ComponentSection title="Enhanced Modal System">
              <div className="space-y-4">
                <p className="text-matrix-text mb-4">
                  Our Matrix CSS framework includes advanced modal implementations with cyberpunk styling, terminal effects, 
                  and interactive features. Choose a modal type to preview:
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <MatrixButton onClick={() => openModal('default')}>
                    Standard Modal
                  </MatrixButton>
                  
                  <MatrixButton variant="terminal" onClick={() => openModal('terminal')}>
                    Terminal Modal
                  </MatrixButton>
                  
                  <MatrixButton variant="danger" onClick={() => openModal('access')}>
                    Access Denied
                  </MatrixButton>
                  
                  <MatrixButton variant="primary" onClick={() => openModal('neural')}>
                    Neural Interface
                  </MatrixButton>
                </div>
              </div>
            </ComponentSection>

            <ComponentSection title="Modal Features">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <span className="matrix-badge">Typewriter Effect</span>
                  <span className="matrix-badge">Code Rain Background</span>
                  <span className="matrix-badge">Glitch Animations</span>
                  <span className="matrix-badge">Custom Positioning</span>
                  <span className="matrix-badge">Sound Effects</span>
                  <span className="matrix-badge">Interactive Terminal</span>
                  <span className="matrix-badge">Digital Distortion</span>
                  <span className="matrix-badge">Glow Effects</span>
                </div>
                
                <div className="mt-4 bg-matrix-panel border border-matrix-border p-4 rounded">
                  <h4 className="text-matrix-text-bright mb-2">Implementation Features:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-matrix-text">
                    <li>Multiple animation variants (fade, slide, scale, glitch)</li>
                    <li>Customizable backdrop blur and overlay effects</li>
                    <li>Accessibility support with keyboard navigation</li>
                    <li>Theme variants for different context (terminal, alert, matrix)</li>
                    <li>Optional sound effects for open/close events</li>
                    <li>Full-screen and responsive sizing options</li>
                    <li>TypeWriter effect for authentic terminal feel</li>
                  </ul>
                </div>
              </div>
            </ComponentSection>
            
            {/* Modal Implementations */}
            {isModalOpen && activeModalType === 'default' && (
              <div className="matrix-modal-backdrop" onClick={() => setIsModalOpen(false)}>
                <div className="matrix-modal" onClick={e => e.stopPropagation()}>
                  <div className="modal-header">
                    <h3 className="modal-title">Standard Modal</h3>
                    <button className="modal-close" onClick={() => setIsModalOpen(false)}>✕</button>
                  </div>
                  <div className="modal-body">
                    <p>This is a standard modal with header, body, and footer sections.</p>
                    <p className="mt-2">
                      Modals are useful for focused content that requires user attention or interaction.
                    </p>
                    <p className="mt-2">
                      This basic modal includes a semi-transparent backdrop, close button, and organized content sections.
                    </p>
                  </div>
                  <div className="modal-footer">
                    <MatrixButton variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                      Cancel
                    </MatrixButton>
                    <MatrixButton variant="primary" size="sm" onClick={() => setIsModalOpen(false)}>
                      Confirm
                    </MatrixButton>
                  </div>
                </div>
              </div>
            )}
            
            {/* Terminal Modal */}
            {isModalOpen && activeModalType === 'terminal' && (
              <div className="matrix-modal-backdrop" onClick={() => setIsModalOpen(false)}>
                <div 
                  className="bg-black border-2 border-matrix-text rounded w-full max-w-2xl shadow-lg shadow-matrix-glow"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="border-b border-matrix-text p-3 flex justify-between items-center bg-black">
                    <h2 className="text-lg text-matrix-text-bright font-bold tracking-wide font-matrix-hacker">MATRIX TERMINAL</h2>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" onClick={() => setIsModalOpen(false)}></div>
                    </div>
                  </div>
                  
                  <div 
                    id="terminal-content"
                    className="p-4 bg-black text-matrix-text font-mono text-sm h-80 overflow-y-auto relative"
                  >
                    {/* Code rain background effect */}
                    <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
                      <div className="matrix-code-bg"></div>
                    </div>
                    
                    {terminalCommands.map((line, index) => (
                      <div key={index} className="whitespace-pre-wrap mb-1">
                        {line}
                      </div>
                    ))}
                    
                    <form onSubmit={handleTerminalCommand} className="flex mt-2 relative z-10">
                      <span className="mr-2">{'>'}</span>
                      <input
                        type="text"
                        value={terminalInput}
                        onChange={(e) => setTerminalInput(e.target.value)}
                        className="flex-1 bg-transparent border-none outline-none text-matrix-text"
                        autoFocus
                      />
                    </form>
                  </div>
                  
                  <div className="border-t border-matrix-text p-3 flex justify-end gap-2 bg-black">
                    <MatrixButton 
                      variant="outline" 
                      size="sm" 
                      className="border-matrix-text text-matrix-text"
                      onClick={() => setIsModalOpen(false)}
                    >
                      DISCONNECT
                    </MatrixButton>
                  </div>
                </div>
              </div>
            )}
            
            {/* Neural Interface Modal */}
            {isModalOpen && activeModalType === 'neural' && (
              <div className="matrix-modal-backdrop" onClick={() => setIsModalOpen(false)}>
                <div 
                  className="bg-black border-2 border-cyan-500 rounded w-full max-w-2xl shadow-lg shadow-cyan-500/30 relative overflow-hidden"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="absolute inset-0 bg-cyan-900/10 pointer-events-none"></div>
                  
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300FFFF' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}></div>
                  </div>
                  
                  <div className="border-b border-cyan-500 p-3 flex justify-between items-center bg-black relative">
                    <h2 className="text-lg text-cyan-400 font-bold tracking-wide">NEURAL INTERFACE</h2>
                    <div className="flex items-center">
                      <div className="text-cyan-500 text-xs mr-3 flex items-center">
                        <span className="w-2 h-2 bg-cyan-500 rounded-full mr-1 animate-pulse"></span>
                        MIND CONNECTED
                      </div>
                      <button 
                        className="text-cyan-400 hover:text-cyan-200"
                        onClick={() => setIsModalOpen(false)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-black">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="col-span-2 flex justify-center">
                        <div className="relative">
                          <div className="w-24 h-24 border-4 border-cyan-500/50 rounded-full flex items-center justify-center">
                            <div className="w-16 h-16 border-2 border-cyan-400/70 rounded-full flex items-center justify-center animate-pulse">
                              <div className="w-8 h-8 bg-cyan-400/90 rounded-full"></div>
                            </div>
                          </div>
                          <div className="absolute top-0 left-0 w-full h-full border-t-4 border-r-4 border-cyan-400/30 rounded-full animate-spin"></div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="bg-black/70 border border-cyan-700 p-3 rounded">
                          <div className="text-xs text-cyan-600 mb-1">COGNITIVE PROCESSING</div>
                          <div className="flex justify-between mb-1">
                            <span>Pattern Recognition</span>
                            <span className="text-cyan-400">87%</span>
                          </div>
                          <div className="h-1 bg-black rounded overflow-hidden">
                            <div className="h-full bg-cyan-400 w-[87%]"></div>
                          </div>
                        </div>
                        
                        <div className="bg-black/70 border border-cyan-700 p-3 rounded">
                          <div className="text-xs text-cyan-600 mb-1">MEMORY ACCESS</div>
                          <div className="flex justify-between mb-1">
                            <span>Neural Indexing</span>
                            <span className="text-cyan-400">62%</span>
                          </div>
                          <div className="h-1 bg-black rounded overflow-hidden">
                            <div className="h-full bg-cyan-400 w-[62%]"></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="bg-black/70 border border-cyan-700 p-3 rounded">
                          <div className="text-xs text-cyan-600 mb-1">SENSORY FEEDBACK</div>
                          <div className="flex justify-between mb-1">
                            <span>Visual Cortex</span>
                            <span className="text-cyan-400">93%</span>
                          </div>
                          <div className="h-1 bg-black rounded overflow-hidden">
                            <div className="h-full bg-cyan-400 w-[93%]"></div>
                          </div>
                        </div>
                        
                        <div className="bg-black/70 border border-cyan-700 p-3 rounded">
                          <div className="text-xs text-cyan-600 mb-1">NEURAL BANDWIDTH</div>
                          <div className="flex justify-between mb-1">
                            <span>Data Transfer</span>
                            <span className="text-cyan-400">75%</span>
                          </div>
                          <div className="h-1 bg-black rounded overflow-hidden">
                            <div className="h-full bg-cyan-400 w-[75%]"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-cyan-500 p-3 flex justify-between bg-black">
                    <span className="text-cyan-400 text-sm">User: <span className="text-cyan-200">NEO_1</span></span>
                    <div className="flex gap-2">
                      <MatrixButton 
                        variant="outline" 
                        size="sm"
                        className="border-cyan-500 text-cyan-400 hover:bg-cyan-900/30" 
                        onClick={() => setIsModalOpen(false)}
                      >
                        Disconnect
                      </MatrixButton>
                      <MatrixButton 
                        variant="primary"
                        size="sm"
                        className="bg-cyan-600/80 text-black hover:bg-cyan-500"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Explore Matrix
                      </MatrixButton>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Access Denied Modal */}
            {isModalOpen && activeModalType === 'access' && (
              <div className="matrix-modal-backdrop" onClick={() => setIsModalOpen(false)}>
                <div 
                  className={`bg-black border-2 border-red-500 rounded w-full max-w-md shadow-lg shadow-red-500/30 ${glitching ? 'translate-x-[1px]' : '-translate-x-[1px]'} transition-transform duration-50`}
                  onClick={e => e.stopPropagation()}
                >
                  <div className={`border-b border-red-500 p-3 flex items-center bg-black relative ${glitching ? 'translate-y-[1px]' : ''}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500 mr-2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                    <h2 className="text-lg text-red-500 font-bold tracking-wide">ACCESS DENIED</h2>
                    <button 
                      className="absolute right-3 top-3 text-red-400 hover:text-red-200"
                      onClick={() => setIsModalOpen(false)}
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="p-4 bg-black">
                    <div className={`text-center mb-4 ${glitching ? 'opacity-90' : 'opacity-100'}`}>
                      <div className="inline-block p-3 bg-red-500/10 rounded-full mb-2">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-500">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2"></path>
                        </svg>
                      </div>
                      <h3 className="text-xl text-red-500 font-bold animate-pulse">AUTHENTICATION FAILED</h3>
                    </div>
                    
                    <div className={`bg-black border border-red-500/50 p-3 mb-4 rounded ${glitching ? 'translate-x-[2px]' : ''}`}>
                      <p className="text-red-200 font-mono bg-black p-2 text-sm">
                        <span className="text-red-400">ERROR CODE:</span> 403<br/>
                        <span className="text-red-400">MESSAGE:</span> Insufficient permissions<br/>
                        <span className="text-red-400">TIMESTAMP:</span> {new Date().toISOString()}<br/>
                        <span className="text-red-400">ATTEMPTS:</span> 3/3
                      </p>
                    </div>
                    
                    <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded border border-red-500/30">
                      This security incident has been logged. Multiple failed attempts have resulted in temporary account lockout.
                    </div>
                  </div>
                  
                  <div className="border-t border-red-500 p-3 flex justify-end gap-2 bg-black">
                    <MatrixButton 
                      variant="outline" 
                      size="sm"
                      className="border-red-500 text-red-400 hover:bg-red-900/30"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Back
                    </MatrixButton>
                    <MatrixButton 
                      variant="danger"
                      size="sm"
                      className="bg-red-600/70 text-white hover:bg-red-500"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Reset Credentials
                    </MatrixButton>
                  </div>
                </div>
              </div>
            )}
            
            <ComponentSection title="Implementation Code">
              <div className="bg-black p-4 rounded text-xs overflow-auto max-h-80 border border-matrix-border">
                <pre className="text-matrix-text">
                {`// Import the enhanced Modal component
import { 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter 
} from './components/core/Modal';

// Example usage
function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        animation="slide"
        theme="matrix"
        hasGlowEffect
        showCodeRain
        typewriterEffect
      >
        <ModalHeader hasGlitchEffect>
          <h2 className="text-lg font-bold text-matrix-text-bright">
            SYSTEM ACCESS
          </h2>
        </ModalHeader>
        <ModalBody>
          <p>INITIATING CONNECTION TO THE MATRIX...</p>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span>USER ID:</span>
              <span className="text-matrix-text-bright">NEO_1</span>
            </div>
            <div className="flex justify-between">
              <span>ACCESS LEVEL:</span>
              <span className="text-matrix-text-bright">ADMINISTRATOR</span>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline">Disconnect</Button>
          <Button variant="terminal" hasGlow>Enter System</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}`}
                </pre>
              </div>
            </ComponentSection>
          </div>
        );

      case 'badges':
        return (
          <div className="tab-content">
            <ComponentSection title="Badge Variants">
              <div className="flex flex-wrap gap-2">
                <span className="matrix-badge">Default</span>
                <span className="matrix-badge primary">Primary</span>
                <span className="matrix-badge success">Success</span>
                <span className="matrix-badge warning">Warning</span>
                <span className="matrix-badge danger">Danger</span>
                <span className="matrix-badge info">Info</span>
              </div>
            </ComponentSection>

            <ComponentSection title="Badge Shapes">
              <div className="flex flex-wrap gap-2">
                <span className="matrix-badge">Square</span>
                <span className="matrix-badge pill">Pill Shape</span>
              </div>
            </ComponentSection>

            <ComponentSection title="Badge Sizes">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="matrix-badge sm">Small</span>
                <span className="matrix-badge">Default</span>
                <span className="matrix-badge lg">Large</span>
              </div>
            </ComponentSection>

            <ComponentSection title="Badges with Icons">
              <div className="flex flex-wrap gap-2">
                <span className="matrix-badge primary">
                  <span className="badge-icon">✓</span>
                  Active
                </span>
                <span className="matrix-badge danger">
                  <span className="badge-icon">!</span>
                  Critical
                </span>
                <span className="matrix-badge info">
                  <span className="badge-icon">ℹ</span>
                  Info
                </span>
              </div>
            </ComponentSection>
          </div>
        );

      case 'tooltips':
        return (
          <div className="tab-content">
            <ComponentSection title="Tooltip Positions">
              <div className="tooltip-grid">
                <div className="tooltip-container">
                  <button className="matrix-button tooltip-trigger">Top Tooltip</button>
                  <div className="matrix-tooltip top">Tooltip appears above</div>
                </div>
                
                <div className="tooltip-container">
                  <button className="matrix-button tooltip-trigger">Right Tooltip</button>
                  <div className="matrix-tooltip right">Tooltip appears to the right</div>
                </div>
                
                <div className="tooltip-container">
                  <button className="matrix-button tooltip-trigger">Bottom Tooltip</button>
                  <div className="matrix-tooltip bottom">Tooltip appears below</div>
                </div>
                
                <div className="tooltip-container">
                  <button className="matrix-button tooltip-trigger">Left Tooltip</button>
                  <div className="matrix-tooltip left">Tooltip appears to the left</div>
                </div>
              </div>
            </ComponentSection>

            <ComponentSection title="Tooltip Styles">
              <div className="tooltip-grid">
                <div className="tooltip-container">
                  <button className="matrix-button primary tooltip-trigger">Hover Me</button>
                  <div className="matrix-tooltip top" style={{ background: 'black', border: '1px solid var(--m-text)', boxShadow: '0 0 5px var(--m-glow)' }}>
                    <span className="font-matrix-hacker">MATRIX DATA</span>
                  </div>
                </div>
              </div>
            </ComponentSection>
          </div>
        );

        case 'matrix-code':
  return (
    <div className="tab-content">
      <ComponentSection title="Matrix QR Codes">
        <div className="flex-grid">
          <MatrixCode
            data="https://matrix.org"
            type="qr"
            size={180}
            hasGlowEffect
          />
          <MatrixCode
            data="https://example.com/matrix"
            type="qr"
            size={180}
            hasScanlineEffect
            hasCodeRain
          />
          <MatrixCode
            data="MATRIX-QR-SECURE"
            type="qr"
            size={180}
            hasGlitchEffect
          />
        </div>
        <div className="mt-4">
          <pre className="bg-black p-2 rounded text-sm overflow-auto">
            <code>
{`<MatrixCode
  data="https://example.com"
  type="qr"
  size={180}
  hasGlowEffect
/>

<MatrixCode
  data="https://example.com/matrix"
  type="qr"
  size={180}
  hasScanlineEffect
  hasCodeRain
/>`}
            </code>
          </pre>
        </div>
      </ComponentSection>

      <ComponentSection title="Matrix Barcodes">
        <div className="flex-grid">
          <MatrixCode
            data="1234567890"
            type="barcode"
            size={180}
            hasGlowEffect
          />
          <MatrixCode
            data="MATRIX-123456"
            type="barcode"
            size={180}
            barcodeFormat="CODE39"
            hasGlitchEffect
          />
          <MatrixCode
            data="987654321"
            type="barcode"
            size={180}
            barcodeFormat="EAN8"
            hasPulseEffect
          />
        </div>
        <div className="mt-4">
          <pre className="bg-black p-2 rounded text-sm overflow-auto">
            <code>
{`<MatrixCode
  data="1234567890"
  type="barcode"
  size={180}
  hasGlowEffect
/>

<MatrixCode
  data="MATRIX-123456"
  type="barcode"
  barcodeFormat="CODE39"
  size={180}
  hasGlitchEffect
/>`}
            </code>
          </pre>
        </div>
      </ComponentSection>

      <ComponentSection title="Matrix Data Matrix">
        <div className="flex-grid">
          <MatrixCode
            data="DATA-MATRIX"
            type="datamatrix"
            size={180}
            hasGlowEffect
          />
          <MatrixCode
            data="SECURE-DATA-123"
            type="datamatrix"
            size={180}
            hasCodeRain
            hasScanlineEffect
          />
        </div>
        <div className="mt-4">
          <pre className="bg-black p-2 rounded text-sm overflow-auto">
            <code>
{`<MatrixCode
  data="DATA-MATRIX"
  type="datamatrix"
  size={180}
  hasGlowEffect
/>

<MatrixCode
  data="SECURE-DATA-123"
  type="datamatrix"
  size={180}
  hasCodeRain
  hasScanlineEffect
/>`}
            </code>
          </pre>
        </div>
      </ComponentSection>

      <ComponentSection title="Matrix Effects">
        <div className="flex-grid">
          <div className="matrix-card" style={{maxWidth: '300px'}}>
            <div className="card-header">Glow Effect</div>
            <div className="card-body flex justify-center p-4">
              <MatrixCode
                data="GLOW-EFFECT"
                type="qr"
                size={150}
                hasGlowEffect
              />
            </div>
          </div>
          
          <div className="matrix-card" style={{maxWidth: '300px'}}>
            <div className="card-header">Scanline Effect</div>
            <div className="card-body flex justify-center p-4">
              <MatrixCode
                data="SCAN-EFFECT"
                type="qr"
                size={150}
                hasScanlineEffect
              />
            </div>
          </div>
          
          <div className="matrix-card" style={{maxWidth: '300px'}}>
            <div className="card-header">Glitch Effect</div>
            <div className="card-body flex justify-center p-4">
              <MatrixCode
                data="GLITCH-EFFECT"
                type="qr"
                size={150}
                hasGlitchEffect
              />
            </div>
          </div>
          
          <div className="matrix-card" style={{maxWidth: '300px'}}>
            <div className="card-header">Code Rain Effect</div>
            <div className="card-body flex justify-center p-4">
              <MatrixCode
                data="RAIN-EFFECT"
                type="qr"
                size={150}
                hasCodeRain
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <pre className="bg-black p-2 rounded text-sm overflow-auto">
            <code>
{`// Effect props:
// hasGlowEffect - Adds a green glow around the code
// hasScanlineEffect - Adds a scanning line animation
// hasGlitchEffect - Adds a glitching animation effect
// hasPulseEffect - Adds a pulsing animation effect
// hasCodeRain - Adds Matrix code rain in the background`}
            </code>
          </pre>
        </div>
      </ComponentSection>

      <ComponentSection title="Interactive Demo">
        <div className="bg-matrix-bg bg-opacity-20 border border-matrix-border p-4 rounded">
          <h3 className="text-matrix-text-bright mb-4 font-matrix-hacker tracking-wide">MATRIX CODE GENERATOR</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-matrix-text">
                  Code Type
                </label>
                <select className="matrix-select w-full">
                  <option value="qr">QR Code</option>
                  <option value="barcode">Barcode</option>
                  <option value="datamatrix">Data Matrix</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-matrix-text">
                  Data
                </label>
                <input
                  type="text"
                  className="matrix-input w-full"
                  placeholder="Enter data to encode"
                  defaultValue="https://example.com"
                />
              </div>
              
              <div className="space-y-2 mb-4">
                <h4 className="text-sm font-medium text-matrix-text">Effects</h4>
                
                <label className="matrix-checkbox">
                  <input type="checkbox" defaultChecked />
                  <span className="checkbox-label">Glow Effect</span>
                </label>
                
                <label className="matrix-checkbox">
                  <input type="checkbox" />
                  <span className="checkbox-label">Glitch Effect</span>
                </label>
                
                <label className="matrix-checkbox">
                  <input type="checkbox" />
                  <span className="checkbox-label">Scanline Effect</span>
                </label>
                
                <label className="matrix-checkbox">
                  <input type="checkbox" />
                  <span className="checkbox-label">Code Rain</span>
                </label>
              </div>
              
              <button className="matrix-button neon">
                Generate Code
              </button>
            </div>
            
            <div className="flex items-center justify-center p-4 bg-black border border-matrix-border">
              <MatrixCode
                data="https://example.com"
                type="qr"
                size={200}
                hasGlowEffect
              />
            </div>
          </div>
        </div>
      </ComponentSection>
    </div>
  );

      case 'tabs':
        return (
          <div className="tab-content">
            <ComponentSection title="Horizontal Tabs">
              <div className="matrix-tabs">
                <div className="tab-list" role="tablist">
                  <button role="tab" className="tab-item active">Tab 1</button>
                  <button role="tab" className="tab-item">Tab 2</button>
                  <button role="tab" className="tab-item">Tab 3</button>
                </div>
                <div role="tabpanel" className="tab-panel">
                  <h4 className="text-lg text-matrix-text-bright mb-2">Tab 1 Content</h4>
                  <p>This is the content for the first tab panel. Only one tab panel is shown at a time.</p>
                </div>
              </div>
            </ComponentSection>

            <ComponentSection title="Vertical Tabs">
              <div className="matrix-tabs vertical">
                <div className="tab-list" role="tablist">
                  <button role="tab" className="tab-item active">Tab 1</button>
                  <button role="tab" className="tab-item">Tab 2</button>
                  <button role="tab" className="tab-item">Tab 3</button>
                </div>
                <div role="tabpanel" className="tab-panel">
                  <h4 className="text-lg text-matrix-text-bright mb-2">Tab 1 Content</h4>
                  <p>Vertical tabs are useful for forms, settings pages, and dashboards with many sections.</p>
                </div>
              </div>
            </ComponentSection>

            <ComponentSection title="Matrix Themed Tabs">
              <div className="matrix-tabs" style={{ borderColor: 'var(--m-text)' }}>
                <div className="tab-list" role="tablist" style={{ borderColor: 'var(--m-text)' }}>
                  <button role="tab" className="tab-item active font-matrix-hacker uppercase text-xs tracking-wider">SYSTEM</button>
                  <button role="tab" className="tab-item font-matrix-hacker uppercase text-xs tracking-wider">NETWORK</button>
                  <button role="tab" className="tab-item font-matrix-hacker uppercase text-xs tracking-wider">SECURITY</button>
                </div>
                <div role="tabpanel" className="tab-panel">
                  <h4 className="text-lg text-matrix-text-bright mb-2 font-matrix-hacker">SYSTEM STATUS</h4>
                  <div className="grid grid-cols-2 gap-4 font-matrix-hacker">
                    <div className="flex justify-between">
                      <span>VERSION:</span>
                      <span className="text-matrix-text-bright">2.0.14</span>
                    </div>
                    <div className="flex justify-between">
                      <span>UPTIME:</span>
                      <span className="text-matrix-text-bright">14:32:07</span>
                    </div>
                  </div>
                </div>
              </div>
            </ComponentSection>
          </div>
        );
      
      default:
        return <div>Select a component to view</div>;
    }
  };

  return (
    <div className="matrix-component-test-page">
      {/* Add the sidebar component */}
      <Sidebar 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={sidebarTabs}
        isExpanded={sidebarExpanded}
        onToggleExpand={() => setSidebarExpanded(!sidebarExpanded)}
      />
      
      <div className={`matrix-content-wrapper ${sidebarExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}`} 
           style={{ 
             marginLeft: sidebarExpanded ? '220px' : '60px',
             transition: 'margin-left var(--matrix-time-med) ease-in-out'
           }}>
        <header className="test-page-header">
          <div className="scanner-line"></div>
          <h1>Matrix CSS Components</h1>
          <p className="header-description">Comprehensive test page for all Matrix-themed components</p>
        </header>

        <div className="test-page-navigation">
          {sidebarTabs.map(tab => (
            <button 
              key={tab.id}
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <main className="test-page-content">
          {renderTabContent()}
        </main>

        <footer className="test-page-footer">
          <div className="scanner-line"></div>
          <p>Matrix CSS Component Library v1.0</p>
        </footer>
      </div>
    </div>
  );
}

export default ComponentTestPage;
