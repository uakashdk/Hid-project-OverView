import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <>

      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-left-block">
              <div className="footer-feature">
                <p className="footer-feature-kicker">Featured Thought</p>
                <h3>HOUSE OF CURIOSITIES</h3>
                <p>
                  The quest for answers about the world finds its place in textures,
                  light, and quiet detail. Every space becomes a story worth exploring.
                </p>
              </div>
            </div>

            <div className="footer-links-container">
              <div className="footer-nav-col">
                <h4>Navigation</h4>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/portfolio">Selected Works</Link></li>
                </ul>
              </div>
              
              <div className="footer-nav-col">
                <h4>Connect</h4>
                <ul>
                  <li><Link to="/journal">Journal</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                  <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
                </ul>
              </div>
              
              <div className="footer-nav-col">
                <h4>Studio</h4>
                <ul>
                  <li><a href="mailto:info@hidstudio.in">info@hidstudio.in</a></li>
                  <li>Firozabad | Agra | Jaipur</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <h2 className="footer-title">Studio HID.</h2>
            <div className="footer-meta">
              <p>&copy; {new Date().getFullYear()} STUDIO HID.</p>
              <p>ALL RIGHTS RESERVED.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
