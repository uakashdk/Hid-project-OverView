import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowDown } from 'lucide-react';
import './Home.css';

gsap.registerPlugin(ScrollTrigger);

const StatCounter = ({ target, hasPlus }) => {
  const [count, setCount] = React.useState(0);
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

  return (
    <span ref={ref} className="stat-number">
      {count}{hasPlus ? '+' : ''}
    </span>
  );
};

const Home = () => {
  const containerRef = useRef(null);
  const [activeProcess, setActiveProcess] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-static-bg img',
        { scale: 1.05 },
        { scale: 1, duration: 2.5, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.hero-editorial-overlay > *',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, stagger: 0.1, delay: 0.3, ease: 'power3.out' }
      );

      gsap.utils.toArray('.home-fade-up').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
            },
          }
        );
      });

      gsap.utils.toArray('h2, h3, h4').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: { trigger: el, start: 'top 90%' },
          }
        );
      });

      gsap.utils.toArray('img, video').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%' },
          }
        );
      });

      gsap.utils.toArray('p:not(.stat-desc)').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: { trigger: el, start: 'top 90%' },
          }
        );
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="page-wrapper" ref={containerRef}>
      <section className="home-hero-static" id="hero-static-container">
        <div className="hero-static-bg">
          <img src="/images/project1.png" alt="Luxury Architecture Hero" />
          <div className="hero-static-overlay-dark"></div>
        </div>

        <div className="hero-editorial-overlay">
          <div className="editorial-top">
            <div className="top-left-info">
              <div className="info-row">
                <span className="red-dot"></span> STUDIO HID - ARCHITECTURE + INTERIORS
              </div>
              <div className="info-row pill-row">
                <span className="red-dot"></span> CURRENTLY FEATURED - THE CANOPY
              </div>
            </div>
          </div>

          <div className="editorial-center">
            <h1 className="massive-hid">
              <div className="cut-line-left"></div>
              HID
              <div className="cut-line-right"></div>
            </h1>
          </div>

          <div className="editorial-bottom">
            <div className="bottom-left-actions">
              <button className="bar-btn bar-btn--light">
                VIEW SELECTED WORKS <ArrowRight size={16} />
              </button>
              <button className="bar-btn bar-btn--ghost">BEGIN ENQUIRY</button>
            </div>

            <div className="bottom-center-scroll">
              <ArrowDown size={14} /> SCROLL TO EXPLORE
            </div>

            <div className="bottom-right-area">
              <div className="featured-card">
                <div className="card-image">
                  <img src="/images/palm1.png" alt="Palm Royale" />
                </div>
                <div className="card-content">
                  <div className="card-subtitle">FEATURED PROJECT</div>
                  <h3>Palm Royale</h3>
                  <div className="card-meta">ONGOING - NEW DELHI</div>
                  <div className="card-footer">
                    VIEW PROJECT <ArrowRight size={12} />
                  </div>
                </div>
              </div>
              <button className="bar-btn bar-btn--dark">
                <span className="red-dot"></span> GET IN TOUCH
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="home-showcase home-fade-up">
        <div className="home-showcase-layout container">
          <div className="showcase-copy">
            <p className="showcase-eyebrow">AT</p>
            <h2 className="showcase-title">
              <span className="title-prefix"></span> OURA &amp; CO.,
            </h2>
            <p className="showcase-description">
              We deliver creative, detailed interior design concepts for city interiors - from initial
              spatial layout ideas to styling rooms for daily living. With a wide range of services, a
              strong philosophy, and a portfolio full of character, the challenge is to present it all
              cohesively - without overwhelming the user or losing the emotional essence of the brand.
            </p>

            <div className="showcase-image">
              <img src="/images/project1.png" alt="Decorative interior styling" />
            </div>
          </div>

          <div className="showcase-grid">
            <div className="showcase-card showcase-card-light">
              <div className="showcase-card-copy">
                <p>years into reimagining spaces and rewriting the rules of interior design.</p>
                <StatCounter target={4} hasPlus={false} />
              </div>
            </div>

            <div className="showcase-card showcase-card-light">
              <div className="showcase-card-copy">
                <p>designers who know their craft inside and out.</p>
                <StatCounter target={20} hasPlus={false} />
              </div>
            </div>

            <div className="showcase-card showcase-card-light">
              <div className="showcase-card-copy">
                <p>completed projects and countless satisfied clients who trust our work.</p>
                <StatCounter target={62} hasPlus={false} />
              </div>
            </div>

            <div className="showcase-card showcase-card-dark">
              <p>Design isn&apos;t just what you see - it&apos;s how a space lives with you.</p>
              <Link to="/about" className="showcase-link">
                Learn more <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home-editorial-collection home-fade-up">
        <div className="container editorial-collection-shell">
          <div className="editorial-section-head">
            <h2 className="editorial-section-title">SERVICES</h2>
          </div>

          <div className="services-editorial-grid">
            <article className="service-editorial-card">
              <div className="service-editorial-image">
                <img src="/images/service1.jpg" alt="Interior design consulting" />
              </div>
              <div className="service-editorial-body">
                <div>
                  <h3>INTERIOR DESIGN CONSULTING</h3>
                  <ul className="service-bullets">
                    <li>Space Planning</li>
                    <li>Concept Direction</li>
                    <li>Material Direction</li>
                    <li>3D Visualizations</li>
                  </ul>
                </div>
                <p>Space planning, concept direction, and material cues shaped into a calm first vision.</p>
              </div>
            </article>

            <article className="service-editorial-card">
              <div className="service-editorial-image">
                <img src="/images/service2.jpg" alt="Full interior planning" />
              </div>
              <div className="service-editorial-body">
                <div>
                  <h3>FULL INTERIOR DESIGN PLANNING</h3>
                  <ul className="service-bullets">
                    <li>Space Planning</li>
                    <li>Layout &amp; Furniture Specs</li>
                    <li>Technical Drawings</li>
                    <li>3D Visualizations</li>
                  </ul>
                </div>
                <p>Layouts, lighting, and finishes aligned before construction begins.</p>
              </div>
            </article>

            <article className="service-editorial-card">
              <div className="service-editorial-image">
                <img src="/images/service3.jpg" alt="Procurement and furnishing" />
              </div>
              <div className="service-editorial-body">
                <div>
                  <h3>PROCUREMENT AND FURNISHING OF THE SPACE</h3>
                  <ul className="service-bullets">
                    <li>Furniture &amp; Fabric Selection</li>
                    <li>Custom Millwork</li>
                    <li>Lighting &amp; Art Curation</li>
                    <li>Logistics &amp; Installation</li>
                  </ul>
                </div>
                <p>Materials, furniture, and lighting sourced to feel cohesive and complete.</p>
              </div>
            </article>

            <article className="service-editorial-card service-card-tall">
              <div className="service-editorial-image">
                <img src="/images/service4.jpg" alt="Complete renovation solution" />
              </div>
              <div className="service-editorial-body">
                <div>
                  <h3>COMPLETE RENOVATION SOLUTION</h3>
                  <ul className="service-bullets">
                    <li>Full Structural &amp; Spatial Redesign</li>
                    <li>Turnkey Project Execution</li>
                    <li>On-site Supervision</li>
                    <li>Quality Control &amp; Delivery</li>
                  </ul>
                </div>
                <p>Existing spaces reworked with a sharper layout and a more elevated finish.</p>
              </div>
            </article>
          </div>

          <div className="editorial-section-head editorial-section-head--spaced">
            <h2 className="editorial-section-title">
              <span className="title-prefix"></span> OUR PROCESS
            </h2>
          </div>

          <div className="process-editorial-list">
            <div
              className={`process-editorial-row ${activeProcess === 1 ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveProcess(1)}
              onMouseLeave={() => setActiveProcess(null)}
              onClick={() => setActiveProcess(1)}
              role="button"
              tabIndex={0}
            >
              <span className="process-step">1.</span>
              <div className="process-thumb">
                <img src="/images/wa1.jpeg" alt="We listen" />
              </div>
              <h3>WE LISTEN</h3>
              <p>We start with a conversation to understand how you live, work, and how your space should feel.</p>
            </div>

            <div
              className={`process-editorial-row ${activeProcess === 2 ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveProcess(2)}
              onMouseLeave={() => setActiveProcess(null)}
              onClick={() => setActiveProcess(2)}
              role="button"
              tabIndex={0}
            >
              <span className="process-step">2.</span>
              <div className="process-thumb">
                <img src="/images/wa2.jpeg" alt="We imagine" />
              </div>
              <h3>WE IMAGINE</h3>
              <p>We turn ideas into vision. Sketches, material palettes, and spatial layouts shape the initial direction.</p>
            </div>

            <div
              className={`process-editorial-row ${activeProcess === 3 ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveProcess(3)}
              onMouseLeave={() => setActiveProcess(null)}
              onClick={() => setActiveProcess(3)}
              role="button"
              tabIndex={0}
            >
              <span className="process-step">3.</span>
              <div className="process-thumb">
                <img src="/images/featured4.jpeg" alt="We source" />
              </div>
              <h3>WE SOURCE</h3>
              <p>Every material, fixture, and custom element is curated with precise care for quality.</p>
            </div>

            <div
              className={`process-editorial-row ${activeProcess === 4 ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveProcess(4)}
              onMouseLeave={() => setActiveProcess(null)}
              onClick={() => setActiveProcess(4)}
              role="button"
              tabIndex={0}
            >
              <span className="process-step">4.</span>
              <div className="process-thumb">
                <img src="/images/project2.png" alt="We build" />
              </div>
              <h3>WE BUILD</h3>
              <p>Our design team guides execution closely, ensuring details, finishes, and execution align.</p>
            </div>

            <div
              className={`process-editorial-row ${activeProcess === 5 ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveProcess(5)}
              onMouseLeave={() => setActiveProcess(null)}
              onClick={() => setActiveProcess(5)}
              role="button"
              tabIndex={0}
            >
              <span className="process-step">5.</span>
              <div className="process-thumb">
                <img src="/images/wa7.jpeg" alt="We finish" />
              </div>
              <h3>WE FINISH</h3>
              <p>The final stage. Styling and refining so your space feels complete.</p>
            </div>
          </div>

          <div className="editorial-section-head editorial-section-head--spaced">
            <h2 className="editorial-section-title">PORTFOLIO</h2>
          </div>

          <div className="portfolio-editorial-grid">
            <article className="portfolio-editorial-card">
              <div className="portfolio-editorial-image">
                <img src="/images/wa6.jpeg" alt="Maison de Lumiere" />
              </div>
              <div className="portfolio-editorial-body">
                <h3>MAISON DE LUMIERE</h3>
                <p>Residential Interior</p>
              </div>
            </article>

            <article className="portfolio-editorial-card">
              <div className="portfolio-editorial-image">
                <img src="/images/project1.png" alt="The Quiet Home" />
              </div>
              <div className="portfolio-editorial-body">
                <h3>THE QUIET HOME</h3>
                <p>Private Residence</p>
              </div>
            </article>

            <article className="portfolio-editorial-card">
              <div className="portfolio-editorial-image">
                <img src="/images/featured5.jpeg" alt="Casa Novva" />
              </div>
              <div className="portfolio-editorial-body">
                <h3>CASA NOVVA</h3>
                <p>Hospitality Interior</p>
              </div>
            </article>
          </div>

          <div className="view-all-wrapper editorial-link-row">
            <Link to="/portfolio" className="showcase-link portfolio-link">
              Learn more <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bts-section home-fade-up">
        <div className="container">
          <div className="bts-header">
            <span className="section-label">( 0 5 ) - B E H I N D - T H E - S C E N E S</span>
            <h2 className="section-heading">The Making of Luxury</h2>
          </div>
        </div>
        <div className="bts-videos-row">
          <div className="video-wrapper-inline">
            <video autoPlay loop muted playsInline className="bts-video">
              <source src="/images/plugin1.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="video-wrapper-inline">
            <video autoPlay loop muted playsInline className="bts-video">
              <source src="/images/plugin2.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="video-wrapper-inline">
            <video autoPlay loop muted playsInline className="bts-video">
              <source src="/images/plugin3.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
