import React, { useState } from 'react';
import { cn } from '../../../utils/cn';
import { SidebarProps } from './Sidebar.types';

/**
 * Main sidebar navigation component for the Matrix CSS UI
 */
const Sidebar: React.FC<SidebarProps> = ({
  className,
  onNavigate,
  activeItem = 'dashboard',
  ...props
}) => {
  const [active, setActive] = useState(activeItem);
  
  // Sample menu items for the static sidebar
  const menuItems = [
    { id: 'dashboard', label: 'DASHBOARD', icon: '◉' },
    { id: 'components', label: 'COMPONENTS', icon: '❏' },
    { id: 'documentation', label: 'DOCUMENTATION', icon: '☰' },
    { id: 'settings', label: 'SETTINGS', icon: '⚙' },
    { id: 'security', label: 'SECURITY', icon: '⌘' },
  ];
  
  const handleItemClick = (itemId: string) => {
    setActive(itemId);
    if (onNavigate) {
      onNavigate(itemId);
    }
  };
  
  return (
    <div 
      className={cn(
        "w-64 min-h-screen bg-matrix-bg border-r border-matrix-border flex flex-col text-matrix-text relative overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Matrix code background effect */}
      <div className="absolute inset-0 opacity-5 pointer-events-none z-0 bg-matrix-overlay"></div>
      
      <div className="sidebar-header py-6 px-4 border-b border-matrix-border text-center relative">
        <div className="text-2xl font-bold text-matrix-text-bright tracking-widest font-matrix-hacker shadow-[0_0_10px_var(--matrix-glow)]">
          MATRIX
        </div>
        <div className="text-xs text-matrix-text-dim mt-1">v1.0.3</div>
      </div>
      
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="list-none m-0 p-0">
          {menuItems.map((item) => (
            <li key={item.id} className="my-0.5">
              <button 
                onClick={() => handleItemClick(item.id)}
                className={cn(
                  "flex items-center w-full text-left py-3 px-4 bg-transparent border-0 text-matrix-text font-matrix-hacker text-base cursor-pointer transition-all duration-200",
                  "hover:bg-matrix-primary hover:bg-opacity-10 hover:text-matrix-text-bright",
                  active === item.id && "text-matrix-text-bright bg-matrix-primary bg-opacity-15 border-l-4 border-matrix-text-bright"
                )}
              >
                <span className="mr-3 text-lg w-5 h-5 flex items-center justify-center">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="py-4 px-4 border-t border-matrix-border">
        <div className="flex items-center text-xs">
          <div className="w-2 h-2 rounded-full bg-matrix-success shadow-[0_0_5px_var(--matrix-success)] mr-2 animate-pulse"></div>
          <span>SYSTEM ONLINE</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;