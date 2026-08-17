import React, { useState, useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const STAGES_DATA = [
  {
    number: '01',
    title: 'PREPARATION AND RESEARCH',
    bullets: [
      'Determining the goals and objectives of the site',
      'Analyzing the target audience',
      'Competitor research',
      'Determination of structure and functionality'
    ]
  },
  {
    number: '02',
    title: 'CONCEPTUALIZATION',
    bullets: [
      'User journey mapping',
      'Developing prototypes (wireframes)',
      'Formation of content strategy'
    ]
  },
  {
    number: '03',
    title: 'DESIGN',
    bullets: [
      'Visual style development',
      'Creating UI-design of pages',
      'Adaptation of design for mobile devices'
    ]
  },
  {
    number: '04',
    title: 'DEVELOPMENT',
    bullets: [
      'Architectural layout design',
      'CMS customization (if required)',
      'Integration of animations and interactive elements'
    ]
  },
  {
    number: '05',
    title: 'TESTING AND OPTIMIZATION',
    bullets: [
      'Checking site performance',
      'Optimization of loading speed',
      'Fixing bugs'
    ]
  },
  {
    number: '06',
    title: 'LAUNCH AND SUPPORT',
    bullets: [
      'Server migration and domain setup',
      'User experience analysis',
      'Finalizing and maintaining the site'
    ]
  }
];

const Contact = () => {
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
        { opacity: 1, y: 0, duration: 1.1, stagger: 0.12, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.contact-form-panel',
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out' }
      );

      // Fade up stages
      gsap.utils.toArray('.contact-stage-card').forEach((elem) => {
        gsap.fromTo(
          elem,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: elem,
              start: 'top 85%'
            }
          }
        );
      });
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
    <div className="contact-page" ref={containerRef}>

      {/* SECTION 1: CONTACT HERO & FORM PANEL */}
      <section className="contact-hero-wrapper container">
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

      {/* SECTION 2: STAGES OF CREATING A PROJECT */}
      <section className="contact-stages-wrapper container">
        <h2 className="stages-main-title">Stages of creating a project</h2>

        <div className="stages-grid">
          {STAGES_DATA.map((stage) => (
            <div key={stage.number} className="contact-stage-card">
              <div className="stage-num-header">
                <span className="stage-number">{stage.number}</span>
                <div className="stage-divider-line"></div>
              </div>

              <ul className="stage-bullets">
                {stage.bullets.map((bullet, idx) => (
                  <li key={idx}>• {bullet}</li>
                ))}
              </ul>

              <h3 className="stage-title">{stage.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: DEDICATED PREMIUM CONTACT BOTTOM BAR */}
      <section className="contact-bottom-bar-wrapper">
        <div className="container contact-bottom-bar">
          <div className="contact-social-icons">
            <a href="#" className="social-circle-icon" aria-label="Phone / WhatsApp">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </a>
            <a href="#" className="social-circle-icon" aria-label="Instagram">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" className="social-circle-icon" aria-label="Facebook">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" className="social-circle-icon" aria-label="YouTube">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
            </a>
          </div>

          <div className="contact-direct-info">
            <a href="tel:+77755138686" className="info-link">+7 (775) 513 8686</a>
            <a href="mailto:archa@mail.com" className="info-link">archa@mail.com</a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
