import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu } from 'lucide-react';
import OverlayMenu from './OverlayMenu';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();
  const isOverlayNav = location.pathname === '/' || location.pathname === '/journal';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className={`navigation ${isOverlayNav ? 'nav-absolute' : 'nav-static'}`}>
        <div className="nav-container ">
          <div className="nav-left">
            <button
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open Menu"
            >
              <Menu size={24} />
            </button>
            <Link to="/" className="brand">
              <img src="/images/logo.png" alt="hid Studio" className="brand-logo" />
            </Link>
          </div>

          <nav className="nav-center">
            <Link to="/">Home</Link>
            <Link to="/about">Studio</Link>
            <Link to="/portfolio">Works</Link>
            <Link to="/journal">Journal</Link>
            <Link to="/contact">Contact</Link>
          </nav>

          <div className="nav-right">
            {/* <button className="bar-btn bar-btn--light nav-search-btn">
              <Search size={16} />
              <span>SEARCH</span>
              <span className="bar-btn__shortcut">CTRL K</span>
            </button> */}
          </div>
        </div>
      </header>

      <OverlayMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Navigation;
