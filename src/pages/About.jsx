import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';
import StudioJournalSection from '../components/StudioJournalSection';
import Press from '../components/Press';
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
  const heroContentRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroLineRefs = useRef([]);

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

  useLayoutEffect(() => {
    const titleEl = heroTitleRef.current;
    const contentEl = heroContentRef.current;
    const lineEls = heroLineRefs.current.filter(Boolean);
    if (!titleEl || !contentEl || !lineEls.length) return undefined;

    const baseFontSize = parseFloat(window.getComputedStyle(titleEl).fontSize);

    const fitTitle = () => {
      const availableWidth = contentEl.clientWidth;
      const widestLine = Math.max(...lineEls.map((line) => line.scrollWidth));
      if (!availableWidth || !widestLine) return;

      const scale = Math.min(1, availableWidth / widestLine);
      const fittedSize = Math.max(baseFontSize * scale, 32);
      titleEl.style.fontSize = `${fittedSize}px`;
    };

    fitTitle();

    const observer = new ResizeObserver(fitTitle);
    observer.observe(contentEl);
    window.addEventListener('resize', fitTitle);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', fitTitle);
    };
  }, []);

  return (
    <div className="studio-page" ref={containerRef}>
      {/* 1. HERO SECTION (Screenshot 1) */}
      <section className="studio-hero studio-reveal">
        <div className="studio-hero-bg">
          <img src="/images/featured4.jpeg" alt="Luxury living interior" />
          <div className="studio-hero-overlay" />
        </div>

        <div className="studio-hero-content container" ref={heroContentRef}>
          <h1 className="studio-hero-title" ref={heroTitleRef}>
            <span className="studio-hero-line" ref={(el) => (heroLineRefs.current[0] = el)}>
              <span className="studio-hero-script">
                <span className="studio-script">We</span>
              </span>{' '}
              <span className="studio-hero-core">CREATE A</span>
            </span>
            <span className="studio-hero-line" ref={(el) => (heroLineRefs.current[1] = el)}>
              SPACE IN WHICH YOU
            </span>
            <span
              className="studio-hero-line studio-hero-line--emphasis"
              ref={(el) => (heroLineRefs.current[2] = el)}
            >
              WANT TO LIVE
            </span>
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
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM-SBrawJNHTgR3MjzWoxZEUt06_CEy2LqWGNlnMSgkw&s=10" alt="Sergey Kalinin" />
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

            <article className="team-member-card">
              <div className="team-member-img">
                <img src="/images/buss2.jpeg" alt="Alexey Nazarov" />
              </div>
              <div className="team-member-info">
                <h3>Alexey Nazarov</h3>
                <p>CHIEF ARCHITECT</p>
              </div>
            </article>

            <article className="team-member-card">
              <div className="team-member-img">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSURsXr44Z2Bnh1vB3wb31hrMuIstNp_bcUTb7idYVwVw&s=10" alt="Aibek Zhanuzakov" />
              </div>
              <div className="team-member-info">
                <h3>Aibek Zhanuzakov</h3>
                <p>PROJECT MANAGER</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <StudioJournalSection />

      <Press
        eyebrow=" Studio PRESS"
        heading="Recent press coverage."
        headingEmphasis="press"
        description="Selected features, interviews, and publications about Habitat."
        verticalLabel="(BESPOKE LIVING SPACES — STUDIO)"
      />
      
    </div>
  );
};

export default About;
