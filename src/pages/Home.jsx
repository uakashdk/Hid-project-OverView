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
    }, { threshold: 0.1 }); // triggers when 10% visible
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref} className="stat-number">{count}{hasPlus ? '+' : ''}</span>;
};

const Home = () => {
  const containerRef = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Subtle entrance for the static hero
      gsap.fromTo('.hero-static-bg img', 
        { scale: 1.05 },
        { scale: 1, duration: 2.5, ease: "power3.out" }
      );
      
      gsap.fromTo('.hero-editorial-overlay > *',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, stagger: 0.1, delay: 0.3, ease: "power3.out" }
      );

      // 2. Global Fade In
      gsap.utils.toArray('.home-fade-up').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1.2, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            }
          }
        );
      });

      // 3. Generic Text & Image Animations
      gsap.utils.toArray('h2, h3, h4').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: el, start: "top 90%" } });
      });
      gsap.utils.toArray('img, video').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" } });
      });
      gsap.utils.toArray('p:not(.stat-desc)').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: el, start: "top 90%" } });
      });

    }, containerRef); // Scoped to containerRef

    return () => {
      ctx.revert(); // Complete cleanup
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
          {/* Top Info */}
          <div className="editorial-top">
            <div className="top-left-info">
              <div className="info-row"><span className="red-dot"></span> STUDIO HID · ARCHITECTURE + INTERIORS</div>
              <div className="info-row pill-row"><span className="red-dot"></span> CURRENTLY FEATURED · THE CANOPY</div>
            </div>
          </div>

          {/* Massive Center Title */}
          <div className="editorial-center">
            <h1 className="massive-hid">
              <div className="cut-line-left"></div>
              HID
              <div className="cut-line-right"></div>
            </h1>
          </div>

          {/* Bottom Area */}
          <div className="editorial-bottom">
            <div className="bottom-left-actions">
              <button className="bar-btn bar-btn--light">VIEW SELECTED WORKS <ArrowRight size={16} /></button>
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
                  <div className="card-meta">ONGOING · NEW DELHI</div>
                  <div className="card-footer">
                    VIEW PROJECT <ArrowRight size={12} />
                  </div>
                </div>
              </div>
              <button className="bar-btn bar-btn--dark"><span className="red-dot"></span> GET IN TOUCH</button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stats Bento */}
      <section className="home-stats container home-fade-up">
        <div className="bento-stats-grid">
          <div className="bento-stat-item bento-light">
            <span className="stat-label">INDUSTRY<br/>AWARDS WON</span>
            <StatCounter target={4} hasPlus={false} />
          </div>
          <div className="bento-stat-item bento-light">
            <span className="stat-label">PROFESSIONAL<br/>TEAM OF EXPERTS</span>
            <StatCounter target={20} hasPlus={true} />
          </div>
          <div className="bento-stat-item bento-light bottom-left">
            <span className="stat-label">SUCCESSFUL<br/>PROJECTS</span>
            <StatCounter target={62} hasPlus={false} />
          </div>
          <div className="bento-stat-item bento-dark">
            <p>AWARD WINNING ARCHITECTS & INTERIOR DESIGNERS</p>
            <Link to="/about" className="bar-btn bar-btn--ghost bento-link">READ MORE &gt;</Link>
          </div>
        </div>
      </section>

      {/* 3. Services */}
      <section className="home-services container home-fade-up">
        <h2 className="section-title-large">SERVICES</h2>
          <div className="services-grid">
            <div className="service-row">
              <div className="service-img">
                <img src="/images/wa1.jpeg" alt="Interior Design & Architecture" />
              </div>
              <div className="service-text">
                <p className="service-eyebrow">01 · Architecture</p>
                <h3>INTERIOR DESIGN &<br/>ARCHITECTURE</h3>
                <p className="service-summary">
                  We develop homes and hospitality spaces from the first sketch to the final reveal,
                  balancing structure, proportion, light, and atmosphere in one coherent vision.
                </p>
                <p className="service-detail">
                  From early concept studies to site coordination, every decision is shaped to feel
                  calm, lasting, and deeply connected to the way people move through a space.
                </p>
              </div>
            </div>
            
            <div className="service-row reverse">
              <div className="service-text left-align">
                <p className="service-eyebrow">02 · Planning</p>
                <h3>FULL INTERIOR<br/>DESIGN PLANNING</h3>
                <p className="service-summary">
                  Space planning, lighting, finishes, and furniture direction come together in a clear
                  process that helps each room feel intentional before construction begins.
                </p>
                <p className="service-detail">
                  We map circulation, storage, mood, and material direction so the interior becomes
                  both practical and expressive, with every element working in harmony.
                </p>
              </div>
              <div className="service-img">
                <img src="/images/wa2.jpeg" alt="Design Planning" />
              </div>
            </div>
            
            <div className="service-row">
              <div className="service-img">
                <img src="/images/wa3.jpeg" alt="Procurement" />
              </div>
              <div className="service-text">
                <p className="service-eyebrow">03 · Procurement</p>
                <h3>PROCUREMENT AND<br/>FURNISHING OF THE SPACE</h3>
                <p className="service-summary">
                  We source materials, furniture, lighting, and custom elements with a curated eye,
                  ensuring the final interior feels consistent, refined, and complete.
                </p>
                <p className="service-detail">
                  The process covers vendor coordination, selection support, and finish alignment so
                  every object contributes to one elegant design story.
                </p>
              </div>
            </div>
            
            <div className="service-row reverse">
              <div className="service-text left-align">
                <p className="service-eyebrow">04 · Transformation</p>
                <h3>COMPLETE<br/>RENOVATION SOLUTION</h3>
                <p className="service-summary">
                  From partial upgrades to full transformations, we rework existing spaces with a clear
                  architectural lens so they feel renewed without losing character.
                </p>
                <p className="service-detail">
                  Our team manages the evolution from strategy to execution, shaping better layouts,
                  stronger circulation, and a finished atmosphere that feels quietly elevated.
                </p>
              </div>
              <div className="service-img">
                <img src="/images/wa4.jpeg" alt="Renovation" />
              </div>
          </div>
        </div>
      </section>

      {/* 4. Process */}
      <section className="home-process container home-fade-up">
        <h2 className="section-title-large">OUR PROCESS</h2>
        <div className="process-list">
          <div className="process-item">
            <h3>1. WE LISTEN</h3>
            <p>Understanding your vision, lifestyle, and unique spatial needs is our foundation.</p>
          </div>
          <div className="process-item">
            <h3>2. WE PROPOSE</h3>
            <p>Presenting detailed architectural plans, lighting, and interior aesthetic concepts.</p>
          </div>
          <div className="process-item">
            <h3>3. WE SOURCE</h3>
            <p>Curating exclusive materials, textiles, and art globally for unparalleled elegance.</p>
          </div>
          <div className="process-item">
            <h3>4. WE BUILD</h3>
            <p>Our network of master builders ensures precise, uncompromising execution of the design.</p>
          </div>
          <div className="process-item">
            <h3>5. THE REVEAL</h3>
            <p>Handing over a fully furnished, styled, and beautifully realized sanctuary to you.</p>
          </div>
        </div>
      </section>

      {/* 5. Selected Works Section */}
      <section className="selected-works container home-fade-up">
        <div className="section-header">
          <span className="section-label">( 0 3 ) &nbsp; S E L E C T E D &nbsp; W O R K S</span>
          <h2 className="section-heading">Featured Projects</h2>
        </div>
        
        <div className="projects-grid">
          <div className="project-card">
            <div className="project-image-wrapper">
              <img src="/images/palm2.png" alt="Palm Royale Project" />
            </div>
            <div className="project-info">
              <h3>Palm Royale</h3>
              <p>Architecture</p>
            </div>
          </div>
          
          <div className="project-card">
            <div className="project-image-wrapper">
              <img src="/images/palm3.png" alt="Palm Royale Project" />
            </div>
            <div className="project-info">
              <h3>Palm Royale</h3>
              <p>Interior</p>
            </div>
          </div>
          
          <div className="project-card">
            <div className="project-image-wrapper">
              <img src="/images/palm4.png" alt="Palm Royale Project" />
            </div>
            <div className="project-info">
              <h3>Palm Royale</h3>
              <p>Architecture</p>
            </div>
          </div>
          
          <div className="project-card">
            <div className="project-image-wrapper">
              <img src="/images/palm5.png" alt="Palm Royale Project" />
            </div>
            <div className="project-info">
              <h3>Palm Royale</h3>
              <p>Interior</p>
            </div>
          </div>

          <div className="project-card">
            <div className="project-image-wrapper">
              <img src="/images/palm6.png" alt="Palm Royale Project" />
            </div>
            <div className="project-info">
              <h3>Palm Royale</h3>
              <p>Commercial</p>
            </div>
          </div>
          
          <div className="project-card">
            <div className="project-image-wrapper">
              <img src="/images/featured3.jpeg" alt="The Courtyard House" />
            </div>
            <div className="project-info">
              <h3>The Courtyard House</h3>
              <p>Residential</p>
            </div>
          </div>
          
          <div className="project-card">
            <div className="project-image-wrapper">
              <img src="/images/featured5.jpeg" alt="Lumina Penthouse" />
            </div>
            <div className="project-info">
              <h3>Lumina Penthouse</h3>
              <p>Interior</p>
            </div>
          </div>

          <div className="project-card">
            <div className="project-image-wrapper">
              <img src="/images/featured9.jpeg" alt="Glass Pavilion" />
            </div>
            <div className="project-info">
              <h3>Glass Pavilion</h3>
              <p>Commercial</p>
            </div>
          </div>
          
          <div className="project-card">
            <div className="project-image-wrapper">
              <img src="/images/featured6.jpeg" alt="Oasis Retreat" />
            </div>
            <div className="project-info">
              <h3>Oasis Retreat</h3>
              <p>Hospitality</p>
            </div>
          </div>
        </div>
        
        <div className="view-all-wrapper">
           <Link to="/portfolio" className="bar-btn bar-btn--ghost dark-outline">VIEW ALL PROJECTS <ArrowRight size={16} /></Link>
        </div>
      </section>

      {/* 6. Behind the Scenes Section */}
      <section className="bts-section home-fade-up">
        <div className="container">
          <div className="bts-header">
            <span className="section-label">( 0 5 ) &nbsp; B E H I N D &nbsp; T H E &nbsp; S C E N E S</span>
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
