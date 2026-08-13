import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Portfolio.css';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Fade in hero elements
      gsap.fromTo('.port-hero-text > *', 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.1, ease: "power3.out" }
      );
      
      gsap.fromTo('.port-hero-image img', 
        { scale: 1.1 }, 
        { scale: 1, duration: 2, ease: "power3.out" }
      );

      // Fade sections on scroll
      gsap.utils.toArray('.port-fade-up').forEach((elem) => {
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

      // Generic Text & Image Animations
      gsap.utils.toArray('h2, h3, h4').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: el, start: "top 90%" } });
      });
      gsap.utils.toArray('img, video').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" } });
      });
      gsap.utils.toArray('p').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, scrollTrigger: { trigger: el, start: "top 90%" } });
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div className="portfolio-page" ref={containerRef}>
      
      {/* 1. Split Hero Section */}
      <section className="port-hero">
        <div className="port-hero-text">
          <h1 className="port-title">Studio HID.</h1>
          <p className="port-subtitle">Bespoke luxury architecture and interior design.</p>
          <button className="port-btn-black">SHOP NOW</button>
        </div>
        <div className="port-hero-image">
          <img src="/images/portfolio-hero.jpg" alt="Hero Featured" />
        </div>
      </section>

      {/* 2. Featured Collections (Carousel) */}
      <section className="port-section port-collections port-fade-up">
        <h2 className="port-section-title">FEATURED COLLECTIONS</h2>
        <div className="port-carousel">
          <div className="port-card">
            <div className="port-card-img"><img src="/images/wa1.jpeg" alt="Palm Royale Phase 1" /></div>
            <div className="port-card-info">
              <h3>Palm Royale</h3>
              <p>Architecture</p>
            </div>
          </div>
          <div className="port-card">
            <div className="port-card-img"><img src="/images/wa2.jpeg" alt="Palm Royale Phase 2" /></div>
            <div className="port-card-info">
              <h3>Palm Royale</h3>
              <p>Interior</p>
            </div>
          </div>
          <div className="port-card">
            <div className="port-card-img"><img src="/images/wa3.jpeg" alt="Palm Royale Phase 3" /></div>
            <div className="port-card-info">
              <h3>Palm Royale</h3>
              <p>Architecture</p>
            </div>
          </div>
          <div className="port-card">
            <div className="port-card-img"><img src="/images/wa4.jpeg" alt="Palm Royale Phase 4" /></div>
            <div className="port-card-info">
              <h3>Palm Royale</h3>
              <p>Interior</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Asymmetric About Us */}
      <section className="port-section port-about port-fade-up">
        <div className="port-about-left">
          <h2 className="port-section-title">ABOUT US</h2>
          <p>
            Architecture is not just walls, lines and shapes. It is an environment that influences perception, emotions and lifestyle. At Studio HID, we create not just a building, but a space in which you want to live, work, create and relax.
          </p>
          <p>
            Since 1993, we have been designing residential and commercial spaces, combining aesthetics and functionality. Our projects are a balance between modern technologies, comfort and individuality.
          </p>
        </div>
        <div className="port-about-right">
          <img src="/images/wa5.jpeg" alt="About 1" className="about-img-top" />
          <div className="about-img-row">
            <img src="/images/wa6.jpeg" alt="About 2" className="about-img-bl" />
            <img src="/images/wa7.jpeg" alt="About 3" className="about-img-br" />
          </div>
        </div>
      </section>

      {/* 4. Typologies (Bento Grid) */}
      <section className="port-section port-categories port-fade-up">
        <h2 className="port-section-title">TYPOLOGIES</h2>
        <div className="port-cat-grid">
          <div className="cat-box cat-tall">
            <img src="/images/wa8.jpeg" alt="Residential" />
            <span className="cat-label">RESIDENTIAL</span>
          </div>
          <div className="cat-box cat-wide">
            <img src="/images/wa9.jpeg" alt="Commercial" />
            <span className="cat-label">COMMERCIAL</span>
          </div>
          <div className="cat-box cat-square-1">
            <img src="/images/wa10.jpeg" alt="Interiors" />
            <span className="cat-label">INTERIORS</span>
          </div>
          <div className="cat-box cat-square-2">
            <img src="/images/palm6.png" alt="Hospitality" />
            <span className="cat-label">HOSPITALITY</span>
          </div>
        </div>
        <div className="cat-action">
          <button className="port-btn-black">VIEW CATALOG</button>
        </div>
      </section>

      {/* 5. Newsletter Banner */}
      <section className="port-newsletter port-fade-up">
        <div className="news-image">
          <img src="/images/palm10.png" alt="Newsletter" />
        </div>
        <div className="news-content">
          <h3>Subscribe to our Journal</h3>
          <p>Receive curated architectural insights and studio updates directly to your inbox.</p>
          <div className="news-form">
            <input type="text" placeholder="Your name" />
            <input type="email" placeholder="Your email" />
            <button className="port-btn-black">SEND</button>
          </div>
        </div>
      </section>

      {/* 6. Reviews Carousel */}
      <section className="port-section port-reviews port-fade-up">
        <h2 className="port-section-title">REVIEWS</h2>
        <div className="port-carousel">
          <div className="review-card">
            <div className="review-header">
              <div className="review-avatar"><img src="/images/founder.png" alt="Avatar" /></div>
              <h4>Vogue Architecture</h4>
            </div>
            <p>"Studio HID brings a level of sophistication and timelessness to their spaces that is simply unparalleled. Truly master architects."</p>
          </div>
          <div className="review-card">
            <div className="review-header">
              <div className="review-avatar"><img src="/images/logo.jpg" alt="Avatar" /></div>
              <h4>Architectural Digest</h4>
            </div>
            <p>"The meticulous attention to detail and material harmony creates environments that feel both grounded and effortlessly luxurious."</p>
          </div>
          <div className="review-card">
            <div className="review-header">
              <div className="review-avatar"><img src="/images/founder.png" alt="Avatar" /></div>
              <h4>Design Anthology</h4>
            </div>
            <p>"A brilliant synthesis of modern technology and bespoke craftsmanship. Their commercial spaces redefine the modern workplace."</p>
          </div>
        </div>
      </section>

      {/* 7. Process (Circular Shapes) */}
      <section className="port-section port-process port-fade-up">
        <h2 className="port-section-title text-center">OUR PROCESS</h2>
        <div className="process-grid">
          <div className="process-step">
            <div className="process-circle">
              <img src="/images/wa1.jpeg" alt="Concept" />
            </div>
            <h3>01. Concept</h3>
            <p>We begin by understanding your vision and lifestyle.</p>
          </div>
          <div className="process-step">
            <div className="process-circle">
              <img src="/images/wa2.jpeg" alt="Design" />
            </div>
            <h3>02. Design</h3>
            <p>Crafting bespoke layouts with meticulous attention to detail.</p>
          </div>
          <div className="process-step">
            <div className="process-circle">
              <img src="/images/wa3.jpeg" alt="Execution" />
            </div>
            <h3>03. Execution</h3>
            <p>Bringing the vision to life with uncompromising quality.</p>
          </div>
        </div>
      </section>

      {/* 8. Signature Gallery (Arches and Pills) */}
      <section className="port-section port-signature port-fade-up">
        <h2 className="port-section-title text-center">SIGNATURE GALLERY</h2>
        <div className="signature-grid">
          <div className="sig-item sig-pill">
            <img src="/images/wa4.jpeg" alt="Signature 1" />
          </div>
          <div className="sig-item sig-arch-tall">
            <img src="/images/palm8.png" alt="Signature 2" />
          </div>
          <div className="sig-item sig-circle">
            <img src="/images/wa5.jpeg" alt="Signature 3" />
          </div>
          <div className="sig-item sig-arch-wide">
            <img src="/images/palm2.png" alt="Signature 4" />
          </div>
          <div className="sig-item sig-arch-tall">
            <img src="/images/featured1.jpeg" alt="Featured 1" />
          </div>
          <div className="sig-item sig-circle">
            <img src="/images/featured2.jpeg" alt="Featured 2" />
          </div>
          <div className="sig-item sig-pill">
            <img src="/images/featured3.jpeg" alt="Featured 3" />
          </div>
          <div className="sig-item sig-arch-wide">
            <img src="/images/featured4.jpeg" alt="Featured 4" />
          </div>
          <div className="sig-item sig-arch-tall">
            <img src="/images/featured5.jpeg" alt="Featured 5" />
          </div>
          <div className="sig-item sig-pill">
            <img src="/images/featured6.jpeg" alt="Featured 6" />
          </div>
          <div className="sig-item sig-arch-wide">
            <img src="/images/featured7.jpeg" alt="Featured 7" />
          </div>
          <div className="sig-item sig-circle">
            <img src="/images/featured9.jpeg" alt="Featured 9" />
          </div>
        </div>
      </section>

      {/* 9. Featured Showcase (Full-Bleed) */}
      <section className="port-showcase port-fade-up">
        <div className="showcase-bg">
          <img src="/images/palm4.png" alt="Showcase Background" />
          <div className="showcase-overlay"></div>
        </div>
        <div className="showcase-content">
          <h2 className="showcase-title">CRAFTING LUXURY</h2>
          <p>Every space tells a story of elegance.</p>
        </div>
      </section>

      {/* 10. Footer */}
      <footer className="port-footer">
        <div className="footer-logo">
          <h2>Studio HID.</h2>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <h4>Studio</h4>
            <p>New Delhi, India</p>
            <p>+91 98765 43210</p>
            <p>hello@studiohid.com</p>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/about">About Us</Link>
            <Link to="/journal">Journal</Link>
          </div>
          <div className="footer-col">
            <h4>Social</h4>
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
            <a href="#">Twitter</a>
          </div>
          <div className="footer-col newsletter-col">
            <h4>Newsletter</h4>
            <input type="email" placeholder="Enter your email" />
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Portfolio;
