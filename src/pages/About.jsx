import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

// Reuse the StatCounter from Home if needed, or just hardcode if it's static. Let's make a simple counter here.
const StatCounter = ({ target, hasPlus, symbol }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const duration = 2000;
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
      }
    }, { threshold: 0.1 });
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref} className="studio-stat-number">{count}{hasPlus ? '+' : ''}{symbol || ''}</span>;
};

const About = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Fade in hero text
      gsap.fromTo('.studio-hero-title', 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
      );

      // Section reveals
      gsap.utils.toArray('.studio-fade-up').forEach((elem) => {
        gsap.fromTo(elem,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 80%"
            }
          }
        );
      });
      
      // Team stagger
      gsap.fromTo('.team-card',
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          stagger: 0.15, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".team-grid",
            start: "top 80%",
          }
        }
      );

      // Generic Text & Image Animations
      gsap.utils.toArray('h2, h3, h4').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: el, start: "top 90%" } });
      });
      gsap.utils.toArray('img, video').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" } });
      });
      gsap.utils.toArray('p:not(.studio-stat-desc)').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: el, start: "top 90%" } });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="studio-page" ref={containerRef}>
      
      {/* 1. Hero Overlay Section */}
      <section className="studio-hero">
        <div className="studio-hero-bg">
          <img src="/images/palm4.png" alt="Studio Background" />
          <div className="studio-hero-overlay"></div>
        </div>
        <div className="studio-hero-content container">
          <h1 className="studio-hero-title">
            <span className="serif-italic">WE</span> CREATE A<br/>
            SPACE IN WHICH YOU<br/>
            WANT TO LIVE
          </h1>
        </div>
      </section>

      {/* 2. About Us Text */}
      <section className="studio-about-text container studio-fade-up">
        <div className="studio-paragraphs">
          <p>
            Architecture is not just walls, lines and shapes. It is an environment that influences perception, emotions and lifestyle. At Studio HID, we create not just a building, but a space in which you want to live, work, create and relax.
          </p>
          <p>
            Since 1993, we have been designing residential and commercial spaces, combining aesthetics and functionality. Our projects are a balance between modern technologies, comfort and individuality. We believe that this important detail, the ideal design, is the one that remains relevant over the years.
          </p>
        </div>
      </section>

      {/* 3. Stats Grid */}
      <section className="studio-stats-section container studio-fade-up">
        <h4 className="studio-stats-heading">Facts about us</h4>
        <div className="studio-stats-grid">
          <div className="studio-stat-box main-stat">
            <p className="studio-stat-desc"><strong>completed projects</strong> - from the first residences to large-scale public buildings</p>
            <div className="studio-stat-number-wrapper">
              <StatCounter target={150} hasPlus={true} />
            </div>
          </div>
          <div className="studio-stat-box">
            <p className="studio-stat-desc"><strong>of clients</strong> come from recommendations</p>
            <div className="studio-stat-number-wrapper">
              <StatCounter target={80} symbol="%" />
            </div>
          </div>
          <div className="studio-stat-box">
            <p className="studio-stat-desc"><strong>Team of experts</strong> — experienced architects, designers and engineers</p>
            <div className="studio-stat-number-wrapper">
              <StatCounter target={10} />
            </div>
          </div>
          <div className="studio-stat-box">
            <p className="studio-stat-desc"><strong>international awards</strong> for innovative approach and aesthetics</p>
            <div className="studio-stat-number-wrapper">
              <StatCounter target={5} />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Philosophy (Arch) */}
      <section className="studio-philosophy studio-fade-up">
        <div className="philosophy-images-container">
          <div className="philosophy-arch-wrapper arch-outer-left">
            <img src="/images/palm2.png" alt="Philosophy Arch Outer Left" className="philosophy-arch-img" />
          </div>
          <div className="philosophy-arch-wrapper arch-left">
            <img src="/images/palm6.png" alt="Philosophy Arch Left" className="philosophy-arch-img" />
          </div>
          <div className="philosophy-arch-wrapper arch-main">
            <img src="/images/palm8.png" alt="Philosophy Arch Main" className="philosophy-arch-img" />
          </div>
          <div className="philosophy-arch-wrapper arch-right">
            <img src="/images/palm7.png" alt="Philosophy Arch Right" className="philosophy-arch-img" />
          </div>
          <div className="philosophy-arch-wrapper arch-outer-right">
            <img src="/images/palm3.png" alt="Philosophy Arch Outer Right" className="philosophy-arch-img" />
          </div>
        </div>
        <h2 className="philosophy-title">OUR<br/>PHILOSOPHY</h2>
        <div className="philosophy-text">
          <p>
            Architecture is not just<br/>
            walls, lines and shapes. It is<br/>
            an environment that<br/>
            influences perception, emotions and lifestyle.
          </p>
        </div>
      </section>

      {/* 5. Team Section */}
      <section className="studio-team-section container studio-fade-up">
        <div className="team-header">
          <h2>People who create the<br/>architecture of the future</h2>
          <p>
            Our team is made of professionals from all over the world. They bring unique perspectives, skills, and cultural insights, allowing us to build innovative and sustainable projects around the globe.
          </p>
        </div>
        
        <div className="team-grid">
          <div className="team-card">
            <img src="/images/founder.png" alt="Team Member 1" />
            <div className="team-info">
              <h4>Tushar Sharma</h4>
              <p>Founder & Principal Architect</p>
            </div>
          </div>
          <div className="team-card">
            <img src="/images/founder.png" alt="Team Member 2" />
            <div className="team-info">
              <h4>Sarah Jenkins</h4>
              <p>Lead Interior Designer</p>
            </div>
          </div>
          <div className="team-card">
            <img src="/images/founder.png" alt="Team Member 3" />
            <div className="team-info">
              <h4>David Chen</h4>
              <p>Senior Architect</p>
            </div>
          </div>
          <div className="team-card">
            <img src="/images/founder.png" alt="Team Member 4" />
            <div className="team-info">
              <h4>Elena Rostova</h4>
              <p>Landscape Architect</p>
            </div>
          </div>
        </div>
        <p className="team-footer-text">Building a new standard in the architecture and design industry.</p>
        <a href="#" className="team-link">Meet all team members &rarr;</a>
      </section>

      {/* 6. Contact Form Section */}
      <section className="studio-contact-section container studio-fade-up">
        <div className="contact-header">
          <h2>LET'S CREATE<br/>
          <span className="grey-text">YOUR PERFECT<br/>PROJECT</span></h2>
          <span className="contact-studio-name">Studio HID</span>
        </div>
        
        <form className="studio-form">
          <div className="form-row">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
          </div>
          <div className="form-row">
            <input type="email" placeholder="Email" />
            <input type="tel" placeholder="Phone" />
          </div>
          <div className="form-row full-width">
            <input type="text" placeholder="Message" />
          </div>
          <div className="form-checkbox">
            <input type="checkbox" id="privacy" />
            <label htmlFor="privacy">I agree to the processing of personal data.</label>
          </div>
          <button type="submit" className="form-submit-btn">SUBMIT</button>
        </form>

        <div className="studio-footer-minimal">
          <div className="social-icons">
            <span>in</span>
            <span>tw</span>
            <span>fb</span>
            <span>ig</span>
          </div>
          <div className="contact-info">
            <span>+91 98765 43210</span>
            <span>hello@studiohid.com</span>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
