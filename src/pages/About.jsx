import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const StatCounter = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;

      let start = 0;
      const duration = 1600;
      const increment = target / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      observer.disconnect();
    }, { threshold: 0.15 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="studio-stat-number">
      {count}
      {suffix}
    </span>
  );
};

const About = () => {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    consent: false
  });
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('Submitting...');
    try {
      const response = await fetch('http://localhost:5555/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitStatus('Message sent successfully!');
        setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '', consent: false });
      } else {
        setSubmitStatus('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('Failed to send message. Please try again.');
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.studio-hero-copy > *',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.08, ease: 'power3.out' }
      );

      gsap.utils.toArray('.studio-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 1.05,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 82%' },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="studio-page" ref={containerRef}>
      <section className="studio-hero studio-reveal">
        <div className="studio-hero-topline">
          <span>ABOUT</span>
          <span>STUDIO HID</span>
          <span>ARCHITECTURE + INTERIORS</span>
        </div>

        <div className="studio-hero-copy container">
          <p className="studio-hero-kicker">WE</p>
          <h1 className="studio-hero-title">
            CREATE A
            <br />
            SPACE IN WHICH YOU
            <br />
            WANT TO LIVE
          </h1>
        </div>

        <div className="studio-hero-image-wrap">
          <img src="/images/hero.png" alt="Studio interior hero" />
        </div>
      </section>

      <section className="studio-about studio-reveal">
        <div className="container studio-about-inner">
          <h2>ABOUT US</h2>
          <p className="studio-about-lead">
            We design spaces that feel calm, intentional, and deeply lived in. Every project is
            shaped around light, proportion, material, and the way people move through a room.
          </p>
          <p className="studio-about-body">
            Since 1993, our studio has worked across residential and commercial projects, balancing
            aesthetics with functionality. We believe good design should feel enduring, personal,
            and quietly confident rather than loud or temporary.
          </p>
        </div>
      </section>

      <section className="studio-stats studio-reveal">
        <div className="container studio-stats-inner">
          <p className="studio-section-label">Facts about us</p>
          <div className="studio-stats-grid">
            <div className="studio-stat-card studio-stat-card-large">
              <p className="studio-stat-caption">completed projects</p>
              <StatCounter target={150} suffix="+" />
            </div>
            <div className="studio-stat-card">
              <p className="studio-stat-caption">of clients return or refer us</p>
              <StatCounter target={80} suffix="%" />
            </div>
            <div className="studio-stat-card">
              <p className="studio-stat-caption">team members</p>
              <StatCounter target={10} />
            </div>
            <div className="studio-stat-card">
              <p className="studio-stat-caption">international awards</p>
              <StatCounter target={5} />
            </div>
          </div>
        </div>
      </section>

      <section className="studio-philosophy studio-reveal">
        <div className="studio-philosophy-arch">
          <div className="arch arch-sm arch-left">
            <img src="/images/palm2.png" alt="" />
          </div>
          <div className="arch arch-md arch-mid-left">
            <img src="/images/palm6.png" alt="" />
          </div>
          <div className="arch arch-lg arch-center">
            <img src="/images/palm8.png" alt="" />
          </div>
          <div className="arch arch-md arch-mid-right">
            <img src="/images/palm7.png" alt="" />
          </div>
          <div className="arch arch-sm arch-right">
            <img src="/images/palm3.png" alt="" />
          </div>
        </div>
        <div className="studio-philosophy-copy container">
          <div className="studio-philosophy-title">
            <span>OUR</span>
            <span>PHILOSOPHY</span>
          </div>
          <p>
            People who create the architecture of the future understand that design is not only
            visual. It is emotional, functional, and shaped by how a place supports daily life.
          </p>
        </div>
      </section>

      <section className="studio-team studio-reveal">
        <div className="container">
          <div className="studio-team-head">
            <h2>People who create the architecture of the future</h2>
            <p>
              Our team combines strategy, design, and execution to build spaces that feel timeless
              and deeply personal.
            </p>
          </div>

          <div className="studio-team-grid">
            <article className="team-card">
              <img src="/images/founder.png" alt="Tushar Sharma" />
              <div className="team-card-copy">
                <h3>Tushar Sharma</h3>
                <p>Founder & Principal Architect</p>
              </div>
            </article>
            <article className="team-card">
              <img src="/images/founder.png" alt="Sarah Jenkins" />
              <div className="team-card-copy">
                <h3>Sarah Jenkins</h3>
                <p>Lead Interior Designer</p>
              </div>
            </article>
            <article className="team-card">
              <img src="/images/founder.png" alt="David Chen" />
              <div className="team-card-copy">
                <h3>David Chen</h3>
                <p>Senior Architect</p>
              </div>
            </article>
            <article className="team-card">
              <img src="/images/founder.png" alt="Elena Rostova" />
              <div className="team-card-copy">
                <h3>Elena Rostova</h3>
                <p>Project Designer</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="studio-contact studio-reveal">
        <div className="container studio-contact-inner">
          <div className="studio-contact-head">
            <h2>
              LET&apos;S CREATE
              <br />
              YOUR PERFECT
              <br />
              PROJECT
            </h2>
            <span>Studio HID</span>
          </div>

          <form className="studio-form" onSubmit={handleSubmit}>
            <div className="studio-form-row">
              <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" required />
              <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" required />
            </div>
            <div className="studio-form-row">
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required />
              <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone" required />
            </div>
            <div className="studio-form-row studio-form-row-full">
              <input type="text" name="message" value={formData.message} onChange={handleInputChange} placeholder="Tell us about your project" required />
            </div>
            <div className="studio-form-actions">
              <label>
                <input type="checkbox" name="consent" checked={formData.consent} onChange={handleInputChange} required />
                I agree to the processing of personal data.
              </label>
              <button type="submit">SUBMIT</button>
            </div>
            {submitStatus && <p style={{ marginTop: '1rem', color: '#666' }}>{submitStatus}</p>}
          </form>

          <div className="studio-footer-minimal">
            <div className="studio-socials">
              <span>IN</span>
              <span>TW</span>
              <span>FB</span>
              <span>IG</span>
            </div>
            <div className="studio-contact-details">
              <span>+91 98765 43210</span>
              <span>hello@studiohid.com</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
