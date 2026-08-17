import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Journal.css';

gsap.registerPlugin(ScrollTrigger);

const FEATURED_PROJECTS = [
  {
    id: 'aura-villa',
    title: 'Aura Villa',
    category: 'LUXURY RESIDENCE',
    image: '/images/project1.png'
  },
  {
    id: 'the-grandeur',
    title: 'The Grandeur',
    category: 'INTERIOR',
    image: '/images/project2.png'
  },
  {
    id: 'the-courtyard-estate',
    title: 'The Courtyard Estate',
    category: 'LUXURY ARCHITECTURE',
    image: '/images/wa3.jpeg'
  },
  {
    id: 'aero-one-pavilion',
    title: 'Aero One Pavilion',
    category: 'COMMERCIAL',
    image: '/images/wa4.jpeg'
  }
];

const BEHIND_THE_SCENES = [
  {
    id: 1,
    title: 'Grand Residence Entrance & Floral Gallery',
    video: 'plugin1.mp4',
    fallbackImg: '/images/wa5.jpeg',
    tag: 'STUDIO HID // BEHIND THE SCENES'
  },
  {
    id: 2,
    title: 'Living Lounge & Warm Ambient Illumination',
    video: 'plugin2.mp4',
    fallbackImg: '/images/wa6.jpeg',
    tag: 'STUDIO HID // BEHIND THE SCENES'
  },
  {
    id: 3,
    title: 'Architectural Inspection & Spatial Filming',
    video: 'plugin3.mp4',
    fallbackImg: '/images/wa7.jpeg',
    tag: 'STUDIO HID // BEHIND THE SCENES'
  }
];

const Journal = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Fade in hero section
      gsap.fromTo(
        '.journal-hero > *',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out' }
      );

      // Scroll reveal sections
      gsap.utils.toArray('.journal-fade-up').forEach((elem) => {
        gsap.fromTo(
          elem,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
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

  return (
    <div className="journal-page" ref={containerRef}>

      {/* 1. HERO HEADLINE & STATS */}
      <section className="journal-hero container">
        <div className="journal-hero-top">
          <div className="journal-hero-left">
            <span className="journal-tag">WHO WE ARE</span>
            <h1 className="journal-hero-title">
              Leading architecture studio making wellness-oriented luxury.
            </h1>
          </div>

          <div className="journal-hero-right">
            <p className="journal-hero-subtext">
              FROM HIGH-END RESIDENCES TO EXCLUSIVE COMMERCIAL SPACES, WE BRING ELEVATED DESIGN TO LIFE.
            </p>
            <div className="journal-stats-grid">
              <div className="stat-item">
                <span className="stat-num">9+</span>
                <span className="stat-label">YEARS</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">70</span>
                <span className="stat-label">PROJECTS</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">14</span>
                <span className="stat-label">CITIES COVERED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE FOUNDER FEATURE */}
      <section className="journal-section journal-founder-section journal-fade-up container">
        <div className="founder-card-box">
          <div className="founder-img-col">
            <div className="founder-img-wrapper">
              <img src="/images/founder.png" alt="Tushar Sharma - Chief Architect & Founder" />
            </div>
            <span className="founder-caption">CHIEF ARCHITECT & FOUNDER</span>
          </div>

          <div className="founder-text-col">
            <span className="section-tag">THE FOUNDER</span>
            <h2 className="founder-name">Tushar Sharma</h2>
            <p className="founder-title">Chief Architect & Founder</p>

            <div className="founder-bio">
              <p>
                Tushar Sharma is a celebrated architect & interior designer known for his refined modern luxury and timeless architectural design. As the founder of Studio HID, he brings over a decade of hands-on experience, transforming spaces into bespoke, high-end environments with elegance, fine materiality, and architectural integrity.
              </p>
              <p>
                Guided by his philosophy of "architectural luxury as a lifestyle", Tushar's visionary leadership continues to elevate residential, commercial, and hospitality interiors. Each project is crafted with custom detailing, natural illumination, and harmonious spatial flow, creating spaces that inspire, calm, and deliver an extraordinary living experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROJECTS */}
      <section className="journal-section journal-projects-section journal-fade-up container">
        <h2 className="journal-section-title">Featured Projects</h2>

        <div className="projects-grid">
          {FEATURED_PROJECTS.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-img-holder">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <span className="project-category">{project.category}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="projects-action">
          <Link to="/portfolio" className="journal-pill-btn">
            VIEW ALL PROJECTS →
          </Link>
        </div>
      </section>

      {/* 4. OUR PHILOSOPHY (Dark Container) */}
      <section className="journal-philosophy-wrapper journal-fade-up">
        <div className="container">
          <span className="section-tag section-tag-light">WHAT WE BELIEVE</span>
          <h2 className="philosophy-title">Our Philosophy</h2>

          <div className="philosophy-grid">
            <div className="philosophy-card">
              <span className="phil-num">01</span>
              <h3>TIMELESS ELEGANCE</h3>
              <p>
                Creating spaces that transcend fleeting trends, seamlessly blending material richness with enduring spatial proportion.
              </p>
            </div>

            <div className="philosophy-card">
              <span className="phil-num">02</span>
              <h3>CONTEXTUAL PURITY</h3>
              <p>
                Design rooted in its environment—integrating natural light, local stone, and tailored architectural contours.
              </p>
            </div>

            <div className="philosophy-card">
              <span className="phil-num">03</span>
              <h3>BESPOKE CRAFTSMANSHIP</h3>
              <p>
                Every custom detail, lighting installation, and joinery fixture is crafted with uncompromised precision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE MAKING OF LUXURY (Behind The Scenes) */}
      <section className="journal-section journal-bts-section journal-fade-up container">
        <span className="section-tag"> BEHIND THE SCENES</span>
        <h2 className="journal-section-title">The Making of Luxury</h2>

        <div className="bts-grid">
          {BEHIND_THE_SCENES.map((item) => (
            <div key={item.id} className="bts-card">
              <div className="bts-media-holder">
                <video autoPlay loop muted playsInline poster={item.fallbackImg}>
                  <source src={`/images/${item.video}`} type="video/mp4" />
                </video>
                <div className="bts-overlay-tag">{item.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FEATURED QUOTE */}
      <section className="journal-section journal-quote-section journal-fade-up container">
        <div className="quote-box">
          <span className="section-tag"> WHAT ARCHITECTS SAY</span>
          <blockquote className="featured-quote">
            "Studio HID brings a level of sophistication and timelessness to their spaces that is simply unparalleled. Truly master architects."
          </blockquote>
          <cite className="quote-author">— VOGUE ARCHITECTURE</cite>
        </div>
      </section>

      {/* 7. CALL TO ACTION (Have a project in mind?) */}
      <section className="journal-section journal-cta-section journal-fade-up container">
        <div className="cta-box">
          <h2 className="cta-title">Have a project in mind?</h2>
          <Link to="/contact" className="journal-btn-black">
            START A PROJECT →
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Journal;
