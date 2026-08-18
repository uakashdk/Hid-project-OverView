import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowDown, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const portfolioCarouselRef = useRef(null);
  const portfolioCardRefs = useRef([]);
  const [activeProcess, setActiveProcess] = useState(null);
  const [activePortfolioIndex, setActivePortfolioIndex] = useState(2);

  const portfolioItems = [
    {
      title: 'MAISON DE LUMIÈRE',
      description: 'creates an atmosphere of serenity and clarity — a home that glows from within.',
      image: '/images/wa6.jpeg',
      alt: 'Maison de Lumière',
    },
    {
      title: 'THE QUIET HOME',
      description: 'is a sanctuary of stillness and simplicity, designed to offer a retreat from the noise of the outside world.',
      image: '/images/project1.png',
      alt: 'The Quiet Home',
    },
    {
      title: 'CASA NOVAK',
      description: 'blends modern elegance with subtle character, creating a home that feels both curated and deeply personal.',
      image: '/images/featured5.jpeg',
      alt: 'Casa Novak',
    },
    {
      title: 'ATELIER NOIR',
      description: 'pairs bold contrast with quiet restraint for a home that feels tailored, calm, and contemporary.',
      image: '/images/wa8.jpeg',
      alt: 'Atelier Noir',
    },
    {
      title: 'SILK COURT',
      description: 'uses layered textures and soft light to create a balanced and welcoming interior mood.',
      image: '/images/wa9.jpeg',
      alt: 'Silk Court',
    },
    {
      title: 'LATTICE HOUSE',
      description: 'brings together linear forms and warm finishes for a clean but lived-in result.',
      image: '/images/wa6.jpeg',
      alt: 'Lattice House',
    },
  ];

  const clampPortfolioIndex = (index) => {
    if (index < 0) return portfolioItems.length - 1;
    if (index >= portfolioItems.length) return 0;
    return index;
  };

  const focusPortfolioCard = (index) => {
    const nextIndex = clampPortfolioIndex(index);
    setActivePortfolioIndex(nextIndex);

    const track = portfolioCarouselRef.current;
    const card = portfolioCardRefs.current[nextIndex];
    if (track && card) {
      const targetLeft = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
      track.scrollTo({
        left: targetLeft,
        behavior: 'smooth',
      });
    }
  };

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
              {/* <div className="info-row">
                <span className="red-dot"></span> STUDIO HID - ARCHITECTURE + INTERIORS
              </div> */}
              {/* <div className="info-row pill-row">
                <span className="red-dot"></span> CURRENTLY FEATURED - THE CANOPY
              </div> */}
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
            <h2 className="showcase-title">
              <span className="title-prefix"></span> <span className='At-var'>AT</span> HBI &amp; STUDIO.,
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

          <div className="services-ss-layout">

            {/* TOP ROW: 2 horizontal images */}
            <div className="services-top-row">

              {/* Card 01 â€” large left, color */}
              <div className="svc-block svc-block--large">
                <div className="svc-img svc-img--color">
                  <img src="/images/service1.jpg" alt="Interior design consulting" />
                </div>
                <div className="svc-caption svc-caption--below">
                  <div className="svc-title-wrap">
                    <h3 className="svc-title">INTERIOR DESIGN<br />CONSULTING</h3>
                  </div>
                  <div className="svc-details">
                    <ul className="svc-list">
                      <li>Initial Consultation</li>
                      <li>Recommendations for Improving the Existing Interior</li>
                    </ul>
                    <span className="svc-num">01</span>
                  </div>
                </div>
              </div>

              {/* Card 02 â€” smaller right, B&W, text beside image */}
              <div className="svc-block svc-block--side">
                <div className="svc-img svc-img--bw">
                  <img src="/images/service2.jpg" alt="Full interior planning" />
                </div>
                <div className="svc-caption svc-caption--side">
                  <div className="svc-title-pair">
                    <h3 className="svc-title svc-title--left">FULL<br />PLANNING</h3>
                    <div className="svc-right-col">
                      <h3 className="svc-title svc-title--right">INTERIOR DESIGN</h3>
                      <ul className="svc-list svc-list--right">
                        <li>Space Planning</li>
                        <li>Stylistic Solutions</li>
                        <li>3D Visualizations</li>
                        <li>Material and Furniture Selection</li>
                      </ul>
                      <span className="svc-num">02</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM ROW: 3 vertical images â€” image only, all equal */}
            <div className="services-bottom-row">

              {/* Card 03 â€” left vertical, color */}
              <div className="svc-block svc-block--vert svc-block--mid">
                <div className="svc-img svc-img--vert svc-img--color">
                  <img src="/images/service3.jpg" alt="Procurement and furnishing" />
                </div>
              </div>

              {/* Card â€” middle vertical, B&W construction */}
              <div className="svc-block svc-block--vert svc-block--mid">
                <div className="svc-img svc-img--vert svc-img--bw">
                  <img src="/images/service4.jpg" alt="Complete renovation solution" />
                </div>
              </div>

              {/* Card 04 â€” right vertical, color */}
              <div className="svc-block svc-block--vert svc-block--mid">
                <div className="svc-img svc-img--vert svc-img--color">
                  <img src="/images/service5.png" alt="Renovation" />
                </div>
              </div>
            </div>

            {/* BOTTOM ROW CAPTIONS â€” below all 3 images, aligned per column */}
            <div className="services-bottom-captions">

              {/* Left col: title + number 03 only */}
              <div className="svc-bottom-cap">
                <h3 className="svc-title">PROCUREMENT AND FURNISHING<br /><span className="svc-title-indent">OF THE SPACE</span></h3>
                <span className="svc-num svc-num--left">03</span>
              </div>

              {/* Middle col: description list only */}
              <div className="svc-bottom-cap">
                <ul className="svc-list">
                  <li>Procurement of Furniture, Appliances, and Finishing Materials</li>
                  <li>Supplier Coordination and Logistics Management</li>
                </ul>
              </div>

              {/* Right col: title pair + description + number 04 */}
              <div className="svc-bottom-cap">
                <div className="svc-title-pair svc-title-pair--row">
                  <h3 className="svc-title">COMPLETE<br />SOLUTION</h3>
                  <h3 className="svc-title">RENOVATION</h3>
                </div>
                <div className="svc-details">
                  <ul className="svc-list">
                    <li>Full Supervision of Renovation Works</li>
                  </ul>
                  <span className="svc-num">04</span>
                </div>
              </div>
            </div>
          </div>

          <div className="editorial-section-head editorial-section-head--spaced">
            <h2 className="editorial-section-title">
              <span className="process-prefix">OUR</span> PROCESS
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

          <div className="portfolio-carousel-shell">
            <button
              type="button"
              className="portfolio-carousel-nav portfolio-carousel-nav--left"
              onClick={() => focusPortfolioCard(activePortfolioIndex - 1)}
              aria-label="Scroll portfolio left"
            >
              <ChevronLeft size={26} />
            </button>

            <div
              className="portfolio-carousel"
              ref={portfolioCarouselRef}
              aria-label="Portfolio carousel"
              style={{
                display: 'grid',
                gridAutoFlow: 'column',
                gridAutoColumns: 'clamp(17rem, 30vw, 28rem)',
                gap: '1.25rem',
                width: '100%',
                minWidth: 0,
                overflowX: 'auto',
                overflowY: 'visible',
                scrollSnapType: 'x mandatory',
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                padding: '1.5rem 0 2.25rem',
              }}
            >
              {portfolioItems.map((item, index) => (
                <article
                  key={item.title}
                  ref={(el) => {
                    portfolioCardRefs.current[index] = el;
                  }}
                  className={`portfolio-editorial-card ${index === activePortfolioIndex ? 'is-active' : ''}`}
                  onClick={() => focusPortfolioCard(index)}
                  role="button"
                  tabIndex={0}
                  style={{ scrollSnapAlign: 'center' }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      focusPortfolioCard(index);
                    }
                  }}
                >
                  <div className="portfolio-editorial-image">
                    <img src={item.image} alt={item.alt} />
                  </div>
                  <div className="portfolio-editorial-body">
                    <h3>{item.title}</h3>
                    <p className="portfolio-desc">{item.description}</p>
                    <Link to="/portfolio" className="portfolio-learn-more">
                      Preview <ArrowRight size={12} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <button
              type="button"
              className="portfolio-carousel-nav portfolio-carousel-nav--right"
              onClick={() => focusPortfolioCard(activePortfolioIndex + 1)}
              aria-label="Scroll portfolio right"
            >
              <ChevronRight size={26} />
            </button>
          </div>

          <div className="view-all-wrapper editorial-link-row">
            <Link to="/portfolio" className="showcase-link portfolio-link">
              Learn more <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        {/* 6. FEATURED QUOTE */}
      <section className="journal-section journal-quote-section journal-fade-up container">
        <div className="quote-box">
          <span className="section-tag"> WHAT ARCHITECTS SAY</span>
          <blockquote className="featured-quote">
            "Studio HID brings a level of sophistication and timelessness to their spaces that is simply unparalleled. Truly master architects."
          </blockquote>
          <cite className="quote-author">â€” VOGUE ARCHITECTURE</cite>
        </div>
      </section>
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

