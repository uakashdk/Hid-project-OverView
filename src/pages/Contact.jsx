import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.utils.toArray('h1, h2, h3, h4').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: el, start: "top 90%" } });
      });
      gsap.utils.toArray('p, .info-group').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, scrollTrigger: { trigger: el, start: "top 90%" } });
      });
      gsap.fromTo('.contact-form-col', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 1, delay: 0.3 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="contact-page container" ref={containerRef}>
      <div className="contact-header">
        <h1 className="contact-title">Let's build<br/>something timeless.</h1>
      </div>

      <div className="contact-grid">
        <div className="contact-info-col">
          <div className="info-group">
            <p className="info-label">Email</p>
            <a href="mailto:info@hidstudio.in" className="info-value">info@hidstudio.in</a>
          </div>
          
          <div className="info-group">
            <p className="info-label">Instagram</p>
            <a href="https://instagram.com/studio_hid" target="_blank" rel="noreferrer" className="info-value">@studio_hid</a>
          </div>

          <div className="info-group">
            <p className="info-label">Studios</p>
            <p className="info-value">Firozabad</p>
            <p className="info-value">Agra</p>
            <p className="info-value">Jaipur</p>
          </div>
        </div>

        <div className="contact-form-col">
          <form className="inquiry-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Your Name" />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="your@email.com" />
            </div>
            
            <div className="form-group">
              <label>Project Details</label>
              <textarea placeholder="Tell us about your vision..." rows="3"></textarea>
            </div>
            
            <button type="submit" className="submit-btn">SEND INQUIRY</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
