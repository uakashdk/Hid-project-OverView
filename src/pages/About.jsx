import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';
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
        '.studio-hero-title > *',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.1, ease: 'power3.out' }
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
      {/* 1. HERO SECTION (Screenshot 1) */}
      <section className="studio-hero studio-reveal">
        <div className="studio-hero-bg">
          <img src="/images/featured4.jpeg" alt="Luxury living interior" />
          <div className="studio-hero-overlay" />
        </div>

        <div className="studio-hero-content container">
          <h1 className="studio-hero-title">
            <span className="studio-hero-script">We</span> CREATE A
            <br />
            SPACE IN WHICH YOU
            <br />
            <span className="studio-hero-live">WANT TO LIVE</span>
          </h1>

          <div className="studio-hero-scroll-btn">
            <ArrowDown size={14} />
          </div>
        </div>
      </section>

      {/* 2. ABOUT US & STATS SECTION (Screenshot 2) */}
      <section className="studio-about studio-reveal">
        <div className="container studio-about-inner">
          <h2 className="studio-about-title">ABOUT US</h2>
          <p className="studio-about-subtitle">
            We have been creating architecture that changes space and inspires people for 10 years
          </p>
          <div className="studio-about-paragraphs">
            <p>
              Architecture is not just walls, lines and shapes. It is an environment that influences
              perception, emotions and lifestyle. At ArchZ, we create not just a building, but a space
              in which you want to live, work, create and relax.
            </p>
            <p>
              Since 2014, we have been designing residential and commercial spaces, combining
              aesthetics and functionality. Our projects are a balance between modern technologies,
              comfort and individuality. We believe that this important detail, the ideal design, is
              the one that remains relevant over the years.
            </p>
          </div>
        </div>
      </section>

      <section className="studio-stats studio-reveal">
        <div className="container studio-stats-inner">
          <p className="studio-section-label">Facts about us</p>
          <div className="studio-stats-grid">
            <div className="studio-stat-card">
              <p className="studio-stat-desc">
                completed projects - from the first residences to large-scale public buildings
              </p>
              <StatCounter target={150} suffix="+" />
            </div>
            <div className="studio-stat-card">
              <p className="studio-stat-desc">
                of clients come from recommendations
              </p>
              <StatCounter target={80} suffix="%" />
            </div>
            <div className="studio-stat-card">
              <p className="studio-stat-desc">
                Team of experts — experienced architects, designers and engineers
              </p>
              <StatCounter target={10} />
            </div>
            <div className="studio-stat-card">
              <p className="studio-stat-desc">
                international awards for innovative approach and aesthetics
              </p>
              <StatCounter target={5} />
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR PHILOSOPHY SECTION */}
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
        <div className="studio-philosophy-overlay-content container">
          <div className="studio-philosophy-title-center">
            <span className="phil-our">OUR</span>
            <span className="phil-title">PHILOSOPHY</span>
          </div>
          <p className="studio-philosophy-text-bottom">
            People who create the architecture of the future understand that design is not only
            visual. It is emotional, functional, and shaped by how a place supports daily life.
          </p>
        </div>
      </section>

      {/* 4. TEAM SECTION (Screenshot 3) */}
      <section className="studio-team studio-reveal">
        <div className="container">
          <div className="studio-team-head-center">
            <h2>People who create the architecture of the future</h2>
            <p>
              Our team is made up of specialists united by a common philosophy and aspiration for
              perfection. We work on projects where aesthetics meets functionality, and modern
              technologies meet classical architectural principles.
            </p>
          </div>

          <div className="studio-team-subbar">
            <span className="team-subbar-label">People in ArchZ</span>
            <div className="team-subbar-arrows">
              <button type="button" className="team-arrow-btn" aria-label="Previous">←</button>
              <button type="button" className="team-arrow-btn" aria-label="Next">→</button>
            </div>
          </div>

          <div className="studio-team-grid">
            <article className="team-member-card">
              <div className="team-member-img">
                <img src="/images/buss2.jpeg" alt="Sergey Kalinin" />
              </div>
              <div className="team-member-info">
                <h3>Sergey Kalinin</h3>
                <p>CHIEF ENGINEER</p>
              </div>
            </article>

            <div className="team-member-col-featured">
              <article className="team-member-card">
                <div className="team-member-img">
                  <img src="/images/founder.png" alt="Alexey Nazarov" />
                </div>
                <div className="team-member-info">
                  <h3>Alexey Nazarov</h3>
                  <p>CHIEF ARCHITECT</p>
                </div>
              </article>
              <div className="team-member-featured-bio">
                <p>
                  Alexey is responsible for the concept and ideology of projects, forming a unique
                  style for each building. He loves non-standard architectural solutions and the
                  integration of natural elements into the urban landscape.
                </p>
                <div className="team-member-meta">
                  <span><strong>Experience:</strong> 15 years</span> |{' '}
                  <span><strong>Specialization:</strong> residential and commercial spaces</span>
                </div>
              </div>
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

            <article className="team-member-card">
              <div className="team-member-img">
                <img src="/images/buss2.jpeg" alt="Aibek Zhanuzakov" />
              </div>
              <div className="team-member-info">
                <h3>Aibek Zhanuzakov</h3>
                <p>PROJECT MANAGER</p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
