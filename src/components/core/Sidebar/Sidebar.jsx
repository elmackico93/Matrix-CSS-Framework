import React, { useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar = ({ 
  activeTab, 
  onTabChange, 
  tabs = [], 
  isExpanded = true, 
  onToggleExpand
}) => {
  const [glowingItem, setGlowingItem] = useState(null);
  const [randomChars, setRandomChars] = useState([]);
  
  // Generate Matrix code fall effect
  useEffect(() => {
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    
    // Create array of random characters for the background
    const generateRandomChars = () => {
      const result = [];
      for (let i = 0; i < 100; i++) {
        result.push({
          char: chars[Math.floor(Math.random() * chars.length)],
          x: Math.random() * 100,
          y: Math.random() * 100,
          opacity: Math.random() * 0.2,
          animationDuration: 3 + Math.random() * 5
        });
      }
      return result;
    };
    
    setRandomChars(generateRandomChars());
    
    // Periodically glow a random menu item
    const glowInterval = setInterval(() => {
      if (tabs.length > 0) {
        const randomIndex = Math.floor(Math.random() * tabs.length);
        setGlowingItem(tabs[randomIndex].id);
        setTimeout(() => setGlowingItem(null), 1000);
      }
    }, 5000);
    
    return () => clearInterval(glowInterval);
  }, [tabs]);

  return (
    <div className={`matrix-sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      {/* Matrix code background effect */}
      <div className="matrix-code-background">
        {randomChars.map((item, index) => (
          <div
            key={index}
            className="matrix-code-char"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              opacity: item.opacity,
              animationDuration: `${item.animationDuration}s`
            }}
          >
            {item.char}
          </div>
        ))}
      </div>
      
      <div className="sidebar-header">
        <div className="matrix-logo">
          <span className="logo-text">MATRIX</span>
          <span className="version-text">CSS v1.0</span>
        </div>
        <button 
          className="toggle-button" 
          onClick={onToggleExpand}
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isExpanded ? '◀' : '▶'}
        </button>
      </div>
      
      <div className="sidebar-separator">
        <div className="scanner-line"></div>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          {tabs.map(tab => (
            <li 
              key={tab.id}
              className={`
                sidebar-item 
                ${activeTab === tab.id ? 'active' : ''} 
                ${glowingItem === tab.id ? 'glow-effect' : ''}
              `}
            >
              <button onClick={() => onTabChange(tab.id)}>
                <span className="item-icon">{tab.icon || '■'}</span>
                {isExpanded && <span className="item-text">{tab.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <div className="status-indicator">
          <div className="pulse-dot"></div>
          {isExpanded && <span>SYSTEM ACTIVE</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
