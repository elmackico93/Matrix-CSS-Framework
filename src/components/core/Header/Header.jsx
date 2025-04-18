import React, { useState, useEffect, useRef } from 'react';
import './Header.css';

/**
 * Matrix-themed header component with digital rain animation
 * and cyberpunk-style navigation
 * 
 * @param {Object} props - Component props
 * @param {Array} props.navLinks - Array of navigation link objects with id, label
 * @param {string} props.activeTab - ID of the currently active tab
 * @param {Function} props.onTabChange - Callback function when tab is changed
 * @param {string} props.className - Additional CSS class names
 * @returns {React.ReactElement} Rendered header component
 */
const Header = ({ 
  navLinks = [], 
  activeTab, 
  onTabChange,
  className = "" 
}) => {
  // State management
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchStatus, setSearchStatus] = useState('IDLE');
  const [searchInput, setSearchInput] = useState('');
  
  // Refs
  const canvasRef = useRef(null);
  const navRef = useRef(null);
  const logoTextRef = useRef(null);
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Prevent body scrolling when menu is open
    document.body.style.overflow = !mobileMenuOpen ? 'hidden' : '';
  };
  
  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle Matrix rain animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Canvas dimensions match parent container
    const resizeCanvas = () => {
      if (canvas && canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Matrix rain characters
    const matrixChars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    
    // Rain setup
    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -20));
    
    // Draw matrix rain
    let animationFrameId;
    let lastUpdateTime = performance.now();
    
    const draw = (currentTime) => {
      // Throttle updates to improve performance
      if (currentTime - lastUpdateTime > 100) { // Update every 100ms
        lastUpdateTime = currentTime;
        
        // Semi-transparent fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw each droplet
        for (let i = 0; i < drops.length; i++) {
          // Random character
          const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
          
          // Drawing position
          const x = i * fontSize;
          const y = drops[i] * fontSize;
          
          // Random brightness
          ctx.fillStyle = Math.random() < 0.1 ? '#00ff97' : '#00ff41';
          
          // Draw the character
          ctx.fillText(char, x, y);
          
          // Move drop
          drops[i]++;
          
          // Reset to top with randomness
          if (y > canvas.height && Math.random() > 0.98) {
            drops[i] = Math.floor(Math.random() * -20);
          }
        }
      }
      
      // Loop animation
      animationFrameId = requestAnimationFrame(draw);
    };
    
    // Set font before starting animation
    ctx.font = `${fontSize}px monospace`;
    
    // Start drawing
    animationFrameId = requestAnimationFrame(draw);
    
    // Random glitch effect
    const triggerRandomGlitch = () => {
      if (Math.random() > 0.7 && logoTextRef.current) {
        const glitchDuration = Math.random() * 200 + 50;
        logoTextRef.current.style.textShadow = '0 0 20px var(--m-glow)';
        
        setTimeout(() => {
          if (logoTextRef.current) {
            logoTextRef.current.style.textShadow = '';
          }
        }, glitchDuration);
      }
      
      // Schedule next glitch
      setTimeout(triggerRandomGlitch, Math.random() * 5000 + 2000);
    };
    
    // Start random glitches
    triggerRandomGlitch();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  // Handle search interactions
  const handleSearchFocus = () => {
    setSearchStatus('READY');
  };
  
  const handleSearchBlur = () => {
    setTimeout(() => {
      setSearchStatus('IDLE');
    }, 200);
  };
  
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
    if (e.target.value.length > 0) {
      setSearchStatus('SEARCHING');
    } else {
      setSearchStatus('READY');
    }
  };
  
  return (
    <>
      {/* Mobile sidebar backdrop */}
      <div className={`sidebar-backdrop ${mobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}></div>
      
      <nav 
        ref={navRef}
        className={`matrix-nav ${scrolled ? 'scrolled' : ''} ${className}`}
      >
        <div className="nav-glitch-line"></div>
        <div className="nav-container">
          {/* Logo Section with Digital Animation */}
          <div className="nav-logo-container">
            <a href="#" className="nav-logo">
              <span className="logo-bracket">[</span>
              <span className="logo-text" ref={logoTextRef} data-text="MATRIX.CSS">MATRIX.CSS</span>
              <span className="logo-bracket">]</span>
              <span className="logo-cursor">_</span>
            </a>
            <div className="nav-status">
              <span className="status-dot"></span>
              <span className="status-text">SYSTEM ONLINE</span>
            </div>
          </div>
          
          {/* Mobile Menu Toggle */}
          <div 
            className={`nav-menu-toggle ${mobileMenuOpen ? 'active' : ''}`} 
            onClick={toggleMobileMenu}
          >
            <div className="toggle-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="toggle-label">MENU</div>
          </div>
          
          {/* Navigation Links */}
          <div className={`nav-links-container ${mobileMenuOpen ? 'active' : ''}`}>
            <div className="nav-decoration">
              <span className="decoration-dot"></span>
              <span className="decoration-line"></span>
            </div>
            <div className="nav-links">
              {navLinks.map((link, index) => (
                <a 
                  key={link.id} 
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onTabChange(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`nav-link ${activeTab === link.id ? 'active' : ''}`}
                  data-text={link.label}
                >
                  <span className="link-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="link-text">{link.label}</span>
                  <span className="link-highlight"></span>
                  {link.icon && (
                    <span className="link-icon">{link.icon}</span>
                  )}
                </a>
              ))}
            </div>
            
            {/* Search Component */}
            <div className="nav-search">
              <div className="search-container">
                <div className="search-icon">⌕</div>
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="SEARCH SYSTEM..."
                  value={searchInput}
                  onChange={handleSearchInput}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                />
                <div className="search-status">{searchStatus}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Digital Rain Background Effect */}
        <canvas ref={canvasRef} className="nav-bg-canvas" aria-hidden="true"></canvas>
        
        {/* Scanline Effect */}
        <div className="nav-scanline"></div>
      </nav>
    </>
  );
};

export default Header;