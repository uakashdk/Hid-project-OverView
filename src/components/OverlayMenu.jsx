import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import gsap from 'gsap';
import './OverlayMenu.css';

const OverlayMenu = ({ isOpen, onClose }) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(overlayRef.current, 
        { yPercent: -100 }, 
        { yPercent: 0, duration: 0.8, ease: "power4.inOut" }
      );
      gsap.fromTo('.overlay-nav li', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, delay: 0.3, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(overlayRef.current, {
      yPercent: -100, 
      duration: 0.6, 
      ease: "power4.inOut",
      onComplete: onClose
    });
  };

  if (!isOpen) return null;

  return (
    <div className="overlay-menu" ref={overlayRef}>
      <div className="overlay-header container">
         <img src="/images/logo.png" alt="Studio HID" className="overlay-logo" />
         <button onClick={handleClose} className="close-btn">
            <X size={24} color="#fff" />
         </button>
      </div>
      
      <div className="overlay-content container">
        <nav className="overlay-nav">
          <ul>
            <li><Link to="/" onClick={handleClose}>01. Home</Link></li>
            <li><Link to="/about" onClick={handleClose}>02. Studio</Link></li>
            <li><Link to="/portfolio" onClick={handleClose}>03. Works</Link></li>
            <li><Link to="/journal" onClick={handleClose}>04. Journal</Link></li>
            <li><Link to="/contact" onClick={handleClose}>05. Contact</Link></li>
          </ul>
        </nav>
        
        <div className="overlay-info">
           <div className="info-block">
             <p className="info-title">Locations</p>
             <p>Firozabad <br/> Agra <br/> Jaipur</p>
           </div>
           <div className="info-block">
             <p className="info-title">Connect</p>
             <a href="mailto:info@hidstudio.in">info@hidstudio.in</a>
           </div>
        </div>
      </div>
    </div>
  );
};

export default OverlayMenu;
