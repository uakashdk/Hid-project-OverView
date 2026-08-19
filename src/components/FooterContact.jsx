import React, { useState, useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FooterContact.css';

gsap.registerPlugin(ScrollTrigger);

const FooterContact = () => {
  const containerRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    consent: false
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero elements animation
      gsap.fromTo(
        '.contact-hero-title > *',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1.1, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-hero-wrapper', start: 'top 85%' }
        }
      );

      gsap.fromTo(
        '.contact-form-panel',
        { opacity: 0, x: 30 },
        {
          opacity: 1, x: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-hero-wrapper', start: 'top 85%' }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.consent) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // Replace with your actual backend endpoint URL
      const response = await fetch('http://localhost:5555/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormSubmitted(true);
        setTimeout(() => {
          setFormSubmitted(false);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            message: '',
            consent: false
          });
        }, 4000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to connect to the server. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-hero-wrapper container" ref={containerRef}>
      <div className="contact-hero-left">
        <div className="contact-hero-title">
          <span className="hero-line-1">LET'S CREATE</span>
          <span className="hero-line-2">YOUR PERFECT</span>
          <span className="hero-line-3">PROJECT</span>
        </div>
      </div>

      <div className="contact-form-panel">
        <h2 className="contact-form-heading">Contact US</h2>

        {formSubmitted ? (
          <div className="contact-success-msg">
            <Check size={22} className="check-icon" />
            <span>Thank you! Your message has been sent successfully. We will get back to you shortly.</span>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-row">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                required
                value={formData.firstName}
                onChange={handleChange}
                aria-label="First name"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                required
                value={formData.lastName}
                onChange={handleChange}
                aria-label="Last name"
              />
            </div>

            <div className="contact-row">
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                required
                value={formData.email}
                onChange={handleChange}
                aria-label="E-mail"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                required
                value={formData.phone}
                onChange={handleChange}
                aria-label="Phone"
              />
            </div>

            <div className="contact-row contact-row-full">
              <input
                type="text"
                name="message"
                placeholder="Message"
                required
                value={formData.message}
                onChange={handleChange}
                aria-label="Message"
              />
            </div>

            <label className="contact-check">
              <input
                type="checkbox"
                name="consent"
                required
                checked={formData.consent}
                onChange={handleChange}
              />
              <span>I accept the consent to processing of personal data</span>
            </label>

            <button type="submit" className="contact-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
            </button>
            {error && <div className="contact-error-msg" style={{ color: '#d9534f', marginTop: '15px', fontSize: '14px' }}>{error}</div>}
          </form>
        )}

        <div className="contact-bottom-info">
          <div className="social-icons">
            <a href="#" aria-label="WhatsApp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
          </div>
          <div className="contact-details">
            <span className="contact-phone">+7 (775) 513 9696</span>
            <span className="contact-email">infostudio@mail.com</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterContact;