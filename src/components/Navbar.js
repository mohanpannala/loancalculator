import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ColorModeContext } from '../contexts/ColorModeContext';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { mode } = useContext(ColorModeContext);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Exchange Rates(LIVE)', path: '/exchange-rates' },
    { label: 'Error Page', path: '/errorpage' },
  ];

  const isActive = (path) => location.pathname === path;
  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className={`navbar ${mode}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Loan Calculator
        </Link>
        
        <div className="menu-toggle" onClick={toggleMenu}>
          ☰
        </div>
        
        <ThemeToggle />

        <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? 'active-link' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
         
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
