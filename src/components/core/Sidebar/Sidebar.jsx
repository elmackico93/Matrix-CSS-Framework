import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import './Sidebar.css';

/**
 * Matrix-themed cyberpunk sidebar component with digital rain animation
 * and hacker-inspired UI elements
 * 
 * @param {Object} props - Component props
 * @param {string} props.activeTab - ID of the currently active tab
 * @param {Function} props.onTabChange - Callback function when tab is changed
 * @param {Array} props.tabs - Array of tab objects with id, label, icon, and optional submenu
 * @param {boolean} props.isExpanded - Whether the sidebar is expanded or collapsed
 * @param {Function} props.onToggleExpand - Callback function to toggle expand/collapse
 * @param {string} props.matrixEffectIntensity - Intensity of the matrix effect ('none', 'low', 'medium', 'high')
 * @param {string} props.className - Additional CSS class names
 * @returns {React.ReactElement} Rendered sidebar
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
  // Ref to track if sidebar is visible on mobile
  const [isMobileVisible, setIsMobileVisible] = useState(false);
  const sidebarRef = useRef(null);
  const animationFrameRef = useRef(null);
  const intervalsRef = useRef([]);
  const touchStartXRef = useRef(0);
  const lastToggleTimeRef = useRef(0);
  
  // Check if we're on mobile
  const isMobile = useCallback(() => {
    return window.innerWidth <= 768;
  }, []);
  
  // Toggle sidebar expanded state with mobile awareness
  const handleToggleExpand = useCallback(() => {
    const now = Date.now();
    // Prevent double-taps (debounce)
    if (now - lastToggleTimeRef.current < 300) return;
    lastToggleTimeRef.current = now;
    
    // If on mobile, we need to handle visibility as well
    if (isMobile()) {
      if (isExpanded) {
        // When collapsing on mobile, update the mobile visibility state
        setIsMobileVisible(false);
        // Small delay to allow CSS transitions to complete
        setTimeout(() => onToggleExpand(false), 50);
      } else {
        // When expanding on mobile, update both states
        setIsMobileVisible(true);
        onToggleExpand(true);
      }
    } else {
      // On desktop, just toggle as normal
      onToggleExpand(!isExpanded);
    }
  }, [isExpanded, onToggleExpand, isMobile]);
  
  // Handle window resize to adjust for mobile/desktop transitions
  useEffect(() => {
    const handleResize = () => {
      // If transitioning from mobile to desktop, ensure proper state
      if (!isMobile() && !isMobileVisible && !isExpanded) {
        // On desktop, collapsed sidebar should still be visible
        setIsMobileVisible(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, isMobileVisible, isExpanded]);
  
  // Memoized toggle submenu handler
  const toggleSubmenu = useCallback((itemId, event) => {
    event.stopPropagation();
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  }, []);
  
  // Generate and animate digital rain with performance optimizations
  useEffect(() => {
    if (matrixEffectIntensity === "none") return;
    
    const matrixChars = "日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789:・.\"=*+-<>¦｜╌Z";
    
    // Set number of raindrops based on intensity
    let numDrops;
    switch (matrixEffectIntensity) {
      case "low": numDrops = 15; break;
      case "high": numDrops = 60; break;
      default: numDrops = 30;
    }
    
    // Create initial rain drops
    const createRaindrops = () => {
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
      return newRain;
    };
    
    setDigitalRain(createRaindrops());
    
    // Using requestAnimationFrame for smoother animation
    let lastUpdateTime = performance.now();
    const updateRain = (currentTime) => {
      // Throttle updates to improve performance
      if (currentTime - lastUpdateTime > 100) { // Update every 100ms
        lastUpdateTime = currentTime;
        
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
            
            // Randomly change character with lower probability to improve performance
            const newChar = Math.random() > 0.98 
              ? matrixChars[Math.floor(Math.random() * matrixChars.length)]
              : drop.char;
              
            return { ...drop, y: newY, char: newChar };
          });
        });
      }
      
      animationFrameRef.current = requestAnimationFrame(updateRain);
    };
    
    animationFrameRef.current = requestAnimationFrame(updateRain);
    
    // Clean up
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [matrixEffectIntensity]);
  
  // Random periodic effects using a consolidated interval approach to reduce timers
  useEffect(() => {
    // Clear previous intervals if any
    intervalsRef.current.forEach(clearInterval);
    intervalsRef.current = [];
    
    // Master interval for all periodic effects
    const masterInterval = setInterval(() => {
      const now = Date.now();
      
      // Glow effect - every ~8 seconds
      if (now % 8000 < 100 && tabs.length > 0 && Math.random() > 0.7) {
        const randomIndex = Math.floor(Math.random() * tabs.length);
        setGlowingItem(tabs[randomIndex].id);
        setTimeout(() => setGlowingItem(null), 1000);
      }
      
      // Trace countdown - every second
      if (now % 1000 < 100) {
        setNodeStatus(prev => {
          const newCountdown = Math.max(0, prev.traceCountdown - 1);
          
          // Reset trace after it reaches zero
          if (newCountdown <= 0 && prev.traceCountdown > 0) {
            setTimeout(() => {
              setNodeStatus(prev => ({
                ...prev,
                traceCountdown: Math.floor(Math.random() * 60) + 30
              }));
            }, 5000);
          }
          
          return { ...prev, traceCountdown: newCountdown };
        });
      }
      
      // Connection flicker - every ~10 seconds
      if (now % 10000 < 100 && Math.random() > 0.9) {
        setNodeStatus(prev => ({ ...prev, online: false }));
        setTimeout(() => {
          setNodeStatus(prev => ({ ...prev, online: true }));
        }, 350);
      }
      
      // Update metrics - every ~5 seconds
      if (now % 5000 < 100) {
        setMetrics({
          cpu: Math.floor(Math.random() * 30) + 30,
          memory: Math.floor(Math.random() * 20) + 70,
          security: Math.floor(Math.random() * 15) + 85
        });
      }
    }, 100); // Check every 100ms
    
    intervalsRef.current.push(masterInterval);
    
    return () => {
      intervalsRef.current.forEach(clearInterval);
      intervalsRef.current = [];
    };
  }, [tabs]);
  
  // Touch gesture handling for swiping the sidebar
  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartXRef.current = e.touches[0].clientX;
    };
    
    const handleTouchEnd = (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchEndX - touchStartXRef.current;
      
      // Calculate distance as percentage of screen width for responsive behavior
      const threshold = window.innerWidth * 0.15; // 15% of screen width
      
      // If close to the left edge, allow swipe right to open
      if (!isExpanded && touchStartXRef.current < 50 && diff > threshold) {
        handleToggleExpand();
      }
      // If sidebar is open, allow swipe left to close
      else if (isExpanded && diff < -threshold) {
        handleToggleExpand();
      }
    };
    
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isExpanded, handleToggleExpand]);
  
  // Memoized cycle access level handler
  const cycleAccessLevel = useCallback(() => {
    setAccessLevel(prev => {
      if (prev === "OPERATOR") return "ADMIN";
      if (prev === "ADMIN") return "ROOT";
      return "OPERATOR";
    });
  }, []);
  
  // Memoized tab click handler
  const handleTabClick = useCallback((tabId) => {
    // Apply "hack" effect to sidebar
    if (sidebarRef.current) {
      sidebarRef.current.classList.add("glow-effect");
      setTimeout(() => {
        sidebarRef.current.classList.remove("glow-effect");
      }, 1000);
    }
    
    onTabChange(tabId);
  }, [onTabChange]);
  
  // Generate a random node number once and memoize it
  const nodeNumber = useRef(Math.floor(Math.random() * 1000)).current;
  
  return (
    <>
      <div 
        ref={sidebarRef}
        className={`matrix-sidebar ${isExpanded ? 'expanded' : 'collapsed'} ${isMobileVisible ? 'mobile-visible' : 'mobile-hidden'} ${className}`}
        role="navigation"
        aria-label="Matrix Navigation"
      >
        {/* Matrix code background effect - only render when needed */}
        {matrixEffectIntensity !== "none" && (
          <div className="matrix-code-background" aria-hidden="true">
            {digitalRain.map((drop, index) => (
              <div
                key={`drop-${index}`}
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
                      role="button"
                      tabIndex="0"
                      title="Click to change access level"
                      onKeyPress={(e) => e.key === 'Enter' && cycleAccessLevel()}
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

          {/* Enhanced toggle button */}
          <button 
            className="toggle-button" 
            onClick={handleToggleExpand}
            aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
            title={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            <div className="toggle-icon">
              <span className="toggle-line toggle-line-1"></span>
              <span className="toggle-line toggle-line-2"></span>
              <span className="toggle-line toggle-line-3"></span>
            </div>
          </button>
        </div>
        
        {/* Navigation section */}
        <nav className="sidebar-nav" aria-label="Main navigation">
          <div className="nav-section-label">
            NAVIGATION
          </div>
          
          <ul>
            {tabs.map(tab => {
              const hasSubmenu = tab.submenu && tab.submenu.length > 0;
              const isItemExpanded = expandedItems[tab.id];
              const isActive = activeTab === tab.id;
              
              return (
                <li 
                  key={tab.id}
                  className={`
                    sidebar-item 
                    ${isActive ? 'active' : ''} 
                    ${glowingItem === tab.id ? 'glow-effect' : ''}
                    ${hasSubmenu && isItemExpanded ? 'expanded' : ''}
                  `}
                >
                  <button 
                    onClick={() => handleTabClick(tab.id)}
                    aria-expanded={hasSubmenu ? (isItemExpanded ? true : false) : undefined}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className={`item-icon ${isActive ? 'glow-text' : ''}`}>
                      {tab.icon || '■'}
                    </span>
                    
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
                        role="button"
                        tabIndex="0"
                        onKeyPress={(e) => e.key === 'Enter' && toggleSubmenu(tab.id, e)}
                        aria-label={isItemExpanded ? "Collapse submenu" : "Expand submenu"}
                      >
                        {isItemExpanded ? '▼' : '▶'}
                      </span>
                    )}
                    
                    {/* Badge if present - always show */}
                    {tab.badge && (
                      <span className="item-badge" aria-label={`${tab.badge} notifications`}>
                        {tab.badge}
                      </span>
                    )}
                  </button>
                  
                  {/* Submenu */}
                  {hasSubmenu && isExpanded && isItemExpanded && (
                    <ul className="sidebar-submenu" role="menu">
                      {tab.submenu.map(subItem => (
                        <li 
                          key={subItem.id} 
                          className="submenu-item" 
                          onClick={() => handleTabClick(subItem.id)}
                          role="menuitem"
                          tabIndex="0"
                          onKeyPress={(e) => e.key === 'Enter' && handleTabClick(subItem.id)}
                        >
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
                  <button 
                    key={cmd} 
                    className="quick-access-button"
                    aria-label={`${cmd} command`}
                  >
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
            <div 
              className={`pulse-dot ${nodeStatus.online ? '' : 'offline'}`}
              aria-hidden="true"
            ></div>
            {isExpanded && (
              <span className="terminal-status">NODE /{nodeNumber}/</span>
            )}
          </div>
          
          {isExpanded && (
            <>
              <div className="system-metrics">
                <div className="metric-row">
                  <span className="metric-label">CPU</span>
                  <div className="metric-bar" role="progressbar" aria-valuenow={metrics.cpu} aria-valuemin="0" aria-valuemax="100">
                    <div className="metric-bar-fill cpu" style={{ width: `${metrics.cpu}%` }}></div>
                  </div>
                  <span className="metric-value">{metrics.cpu}%</span>
                </div>
                
                <div className="metric-row">
                  <span className="metric-label">MEM</span>
                  <div className="metric-bar" role="progressbar" aria-valuenow={metrics.memory} aria-valuemin="0" aria-valuemax="100">
                    <div className="metric-bar-fill mem" style={{ width: `${metrics.memory}%` }}></div>
                  </div>
                  <span className="metric-value">{metrics.memory}%</span>
                </div>
                
                <div className="metric-row">
                  <span className="metric-label">SEC</span>
                  <div className="metric-bar" role="progressbar" aria-valuenow={metrics.security} aria-valuemin="0" aria-valuemax="100">
                    <div className="metric-bar-fill sec" style={{ width: `${metrics.security}%` }}></div>
                  </div>
                  <span className="metric-value">{metrics.security}%</span>
                </div>
              </div>
              
              <div className="trace-countdown">
                <div className="encrypt-status">
                  <span 
                    className={`pulse-dot ${nodeStatus.encrypted ? '' : 'offline'}`} 
                    style={{ width: '4px', height: '4px' }}
                    aria-hidden="true"
                  ></span>
                  <span>CRYPT</span>
                </div>
                <div>T-{nodeStatus.traceCountdown}s</div>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Mobile toggle button that's always visible */}
      <button 
        className={`mobile-toggle-button ${isExpanded ? 'active' : ''}`}
        onClick={handleToggleExpand}
        aria-label={isExpanded ? "Close sidebar" : "Open sidebar"}
      >
        <div className="mobile-toggle-icon">
          <span className="mobile-toggle-line mobile-toggle-line-1"></span>
          <span className="mobile-toggle-line mobile-toggle-line-2"></span>
          <span className="mobile-toggle-line mobile-toggle-line-3"></span>
        </div>
      </button>
    </>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(Sidebar);