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
      </div>
    </section>
  );
};

export default FooterContact;
