import React, { useState, useEffect, useRef } from 'react';
import './Sidebar.css';

/**
 * Matrix-themed cyberpunk sidebar component with digital rain animation
 * and hacker-inspired UI elements
 */
const Sidebar = ({ 
  activeTab, 
  onTabChange, 
  tabs = [], 
  isExpanded = true, 
  onToggleExpand,
  matrixEffectIntensity = "medium",
  className = ""
}) => {
  const [expandedItems, setExpandedItems] = useState({});
  const [glowingItem, setGlowingItem] = useState(null);
  const [digitalRain, setDigitalRain] = useState([]);
  const [accessLevel, setAccessLevel] = useState("OPERATOR");
  const [nodeStatus, setNodeStatus] = useState({ 
    online: true, 
    encrypted: true, 
    traceCountdown: Math.floor(Math.random() * 60) + 30 
  });
  const [metrics, setMetrics] = useState({
    cpu: 42,
    memory: 78,
    security: 91
  });
  const sidebarRef = useRef(null);
  
  // Toggle submenu expansion
  const toggleSubmenu = (itemId, event) => {
    event.stopPropagation();
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };
  
  // Generate and animate digital rain
  useEffect(() => {
    if (matrixEffectIntensity === "none") return;
    
    const matrixChars = "日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789:・.\"=*+-<>¦｜╌Z";
    
    // Set number of raindrops based on intensity
    let numDrops = 30;
    switch (matrixEffectIntensity) {
      case "low": numDrops = 15; break;
      case "high": numDrops = 60; break;
      default: numDrops = 30;
    }
    
    // Create initial rain drops
    const newRain = [];
    for (let i = 0; i < numDrops; i++) {
      newRain.push({
        char: matrixChars[Math.floor(Math.random() * matrixChars.length)],
        x: Math.random() * 100, // percentage of width
        y: Math.random() * 100 - 100, // start above the viewport
        opacity: Math.random() * 0.3 + (matrixEffectIntensity === "high" ? 0.1 : 0.05),
        speed: Math.random() * 5 + 3,
        size: Math.floor(Math.random() * 4) + 10
      });
    }
    
    setDigitalRain(newRain);
    
    // Update rain animation
    const updateInterval = setInterval(() => {
      setDigitalRain(currentRain => {
        return currentRain.map(drop => {
          // Move the drop down
          let newY = drop.y + drop.speed;
          
          // Reset if it's past the bottom
          if (newY > 200) {
            return {
              char: matrixChars[Math.floor(Math.random() * matrixChars.length)],
              x: Math.random() * 100,
              y: -10, // Start just above the viewport
              opacity: Math.random() * 0.3 + (matrixEffectIntensity === "high" ? 0.1 : 0.05),
              speed: Math.random() * 5 + 3,
              size: Math.floor(Math.random() * 4) + 10
            };
          }
          
          // Randomly change character
          const newChar = Math.random() > 0.95 
            ? matrixChars[Math.floor(Math.random() * matrixChars.length)]
            : drop.char;
            
          return { ...drop, y: newY, char: newChar };
        });
      });
    }, 100);
    
    // Clean up
    return () => clearInterval(updateInterval);
  }, [matrixEffectIntensity]);
  
  // Random periodic effects
  useEffect(() => {
    // Periodically glow a random menu item
    const glowInterval = setInterval(() => {
      if (tabs.length > 0 && Math.random() > 0.7) {
        const randomIndex = Math.floor(Math.random() * tabs.length);
        setGlowingItem(tabs[randomIndex].id);
        setTimeout(() => setGlowingItem(null), 1000);
      }
    }, 8000);
    
    // Decrease trace countdown
    const traceInterval = setInterval(() => {
      setNodeStatus(prev => ({
        ...prev,
        traceCountdown: Math.max(0, prev.traceCountdown - 1)
      }));
      
      // Reset trace after it reaches zero
      if (nodeStatus.traceCountdown <= 1) {
        setTimeout(() => {
          setNodeStatus(prev => ({
            ...prev,
            traceCountdown: Math.floor(Math.random() * 60) + 30
          }));
        }, 5000);
      }
    }, 1000);
    
    // Occasionally flicker connection status
    const flickerInterval = setInterval(() => {
      if (Math.random() > 0.9) {
        setNodeStatus(prev => ({ ...prev, online: false }));
        setTimeout(() => {
          setNodeStatus(prev => ({ ...prev, online: true }));
        }, 350);
      }
    }, 10000);
    
    // Update metrics periodically
    const metricsInterval = setInterval(() => {
      setMetrics({
        cpu: Math.floor(Math.random() * 30) + 30,
        memory: Math.floor(Math.random() * 20) + 70,
        security: Math.floor(Math.random() * 15) + 85
      });
    }, 5000);
    
    return () => {
      clearInterval(glowInterval);
      clearInterval(traceInterval);
      clearInterval(flickerInterval);
      clearInterval(metricsInterval);
    };
  }, [tabs, nodeStatus.traceCountdown]);
  
  // Cycle access level
  const cycleAccessLevel = () => {
    setAccessLevel(prev => {
      if (prev === "OPERATOR") return "ADMIN";
      if (prev === "ADMIN") return "ROOT";
      return "OPERATOR";
    });
  };
  
  // Handler for clicking on a tab
  const handleTabClick = (tabId) => {
    // Apply "hack" effect to sidebar
    if (sidebarRef.current) {
      sidebarRef.current.classList.add("glow-effect");
      setTimeout(() => {
        sidebarRef.current.classList.remove("glow-effect");
      }, 1000);
    }
    
    onTabChange(tabId);
  };
  
  return (
    <div 
      ref={sidebarRef}
      className={`matrix-sidebar ${isExpanded ? 'expanded' : 'collapsed'} ${className}`}
    >
      {/* Matrix code background effect */}
      {matrixEffectIntensity !== "none" && (
        <div className="matrix-code-background">
          {digitalRain.map((drop, index) => (
            <div
              key={index}
              className="matrix-code-char"
              style={{
                left: `${drop.x}%`,
                top: `${drop.y}%`,
                opacity: drop.opacity,
                fontSize: `${drop.size}px`,
                animationDuration: `${drop.speed}s`
              }}
            >
              {drop.char}
            </div>
          ))}
        </div>
      )}
      
      {/* Header */}
      <div className="sidebar-header">
        <div className="matrix-logo">
          {isExpanded ? (
            <>
              <span className="logo-text logo-text-scan">MATRIX.CSS</span>
              <span className="version-text">v1.3.7</span>
              {/* Sub header with access level */}
              <div className="sidebar-sub-header">
                <div className="access-level-wrapper">
                  <span>ACCESS:</span>
                  <span 
                    className="access-level" 
                    onClick={cycleAccessLevel}
                    title="Click to change access level"
                  >
                    {accessLevel}
                  </span>
                </div>
                <div className="connection-status">
                  <span className={`pulse-dot ${nodeStatus.online ? '' : 'offline'}`}></span>
                  <span>UPLINK</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <span className="logo-text glow-text">M</span>
              <div className="sidebar-sub-header">
                <div className="access-level-wrapper mini">
                  <span className="access-level">{accessLevel[0]}</span>
                </div>
              </div>
            </>
          )}
        </div>
        <button 
          className="toggle-button" 
          onClick={onToggleExpand}
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isExpanded ? '[-]' : '[+]'}
        </button>
      </div>
      
      {/* Navigation section */}
      <nav className="sidebar-nav">
        <div className="nav-section-label">
          {/* Always display NAVIGATION text */}
          NAVIGATION
        </div>
        
        <ul>
          {tabs.map(tab => {
            const hasSubmenu = tab.submenu && tab.submenu.length > 0;
            const isExpanded = expandedItems[tab.id];
            const isActive = activeTab === tab.id;
            
            return (
              <li 
                key={tab.id}
                className={`
                  sidebar-item 
                  ${isActive ? 'active' : ''} 
                  ${glowingItem === tab.id ? 'glow-effect' : ''}
                  ${hasSubmenu && isExpanded ? 'expanded' : ''}
                `}
              >
                <button 
                  onClick={() => handleTabClick(tab.id)}
                  aria-expanded={hasSubmenu && isExpanded}
                >
                  <span className={`item-icon ${isActive ? 'glow-text' : ''}`}>
                    {tab.icon || '■'}
                  </span>
                  
                  {/* Always render text elements regardless of sidebar state */}
                  <span className="item-text">
                    {tab.label}
                    {isActive && <div className="scanline-effect"></div>}
                  </span>
                  
                  {/* Submenu indicator - only in expanded view */}
                  {hasSubmenu && isExpanded && (
                    <span 
                      className="submenu-indicator"
                      style={{ marginLeft: 'auto', paddingLeft: '10px' }}
                      onClick={(e) => toggleSubmenu(tab.id, e)}
                    >
                      {isExpanded ? '▼' : '▶'}
                    </span>
                  )}
                  
                  {/* Badge if present - always show */}
                  {tab.badge && (
                    <span className="item-badge">{tab.badge}</span>
                  )}
                </button>
                
                {/* Submenu */}
                {hasSubmenu && isExpanded && isExpanded && (
                  <ul className="sidebar-submenu">
                    {tab.submenu.map(subItem => (
                      <li key={subItem.id} className="submenu-item" onClick={() => handleTabClick(subItem.id)}>
                        <span className="submenu-icon">[+]</span>
                        <span>{subItem.label}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
        
        {/* Quick access buttons - only when expanded */}
        {isExpanded && (
          <div className="quick-access">
            <div className="nav-section-label">QUICK ACCESS</div>
            <div className="quick-access-grid">
              {['SCAN', 'PING', 'EXEC'].map(cmd => (
                <button key={cmd} className="quick-access-button">
                  {cmd}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
      
      {/* Footer with status */}
      <div className="sidebar-footer">
        <div className="status-indicator">
          <div className={`pulse-dot ${nodeStatus.online ? '' : 'offline'}`}></div>
          {isExpanded && (
            <span className="terminal-status">NODE /{Math.floor(Math.random() * 1000)}/</span>
          )}
        </div>
        
        {isExpanded && (
          <>
            <div className="system-metrics">
              <div className="metric-row">
                <span className="metric-label">CPU</span>
                <div className="metric-bar">
                  <div className="metric-bar-fill cpu" style={{ width: `${metrics.cpu}%` }}></div>
                </div>
                <span className="metric-value">{metrics.cpu}%</span>
              </div>
              
              <div className="metric-row">
                <span className="metric-label">MEM</span>
                <div className="metric-bar">
                  <div className="metric-bar-fill mem" style={{ width: `${metrics.memory}%` }}></div>
                </div>
                <span className="metric-value">{metrics.memory}%</span>
              </div>
              
              <div className="metric-row">
                <span className="metric-label">SEC</span>
                <div className="metric-bar">
                  <div className="metric-bar-fill sec" style={{ width: `${metrics.security}%` }}></div>
                </div>
                <span className="metric-value">{metrics.security}%</span>
              </div>
            </div>
            
            <div className="trace-countdown">
              <div className="encrypt-status">
                <span className={`pulse-dot ${nodeStatus.encrypted ? '' : 'offline'}`} style={{ width: '4px', height: '4px' }}></span>
                <span>CRYPT</span>
              </div>
              <div>T-{nodeStatus.traceCountdown}s</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};


export default Sidebar;