import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-logo">
            <img src="/images/logo.png" alt="hid" />
          </div>

          <div className="footer-links-container">
            <div className="footer-nav-col">
              <h4>NAVIGATION</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/portfolio">Selected Works</Link></li>
              </ul>
            </div>
            
            <div className="footer-nav-col">
              <h4>CONNECT</h4>
              <ul>
                <li><Link to="/journal">Journal</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
              </ul>
            </div>
            
            <div className="footer-nav-col">
              <h4>STUDIO</h4>
              <ul>
                <li><a href="mailto:info@hidstudio.in">info@hidstudio.in</a></li>
                <li className="footer-address">Firozabad | Agra | Jaipur</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <h2 className="footer-title">Studio HID.</h2>
          <div className="footer-meta">
            <p>&copy; {new Date().getFullYear()} STUDIO HID.</p>
            <p>ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
