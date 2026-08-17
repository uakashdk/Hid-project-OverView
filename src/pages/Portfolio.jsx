import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Heart, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Portfolio.css';

gsap.registerPlugin(ScrollTrigger);

// Original Works / Portfolio Data with Emata Styling Assets
const FEATURED_COLLECTIONS = [
  {
    id: 1,
    title: 'Palm Royale Phase 1',
    category: 'Architecture',
    price: '$2,450,000',
    image: '/images/wa1.jpeg'
  },
  {
    id: 2,
    title: 'Palm Royale Phase 2',
    category: 'Interior',
    price: '$1,890,000',
    image: '/images/wa2.jpeg'
  },
  {
    id: 3,
    title: 'Palm Royale Phase 3',
    category: 'Architecture',
    price: '$3,100,000',
    image: '/images/wa3.jpeg'
  },
  {
    id: 4,
    title: 'Palm Royale Phase 4',
    category: 'Interior',
    price: '$2,150,000',
    image: '/images/wa4.jpeg'
  },
  {
    id: 5,
    title: 'Kanso Lounge Suite',
    category: 'Furniture & Interior',
    price: '$850,000',
    image: '/images/featured1.jpeg'
  },
  {
    id: 6,
    title: 'Solo Villa Residence',
    category: 'Architecture',
    price: '$4,200,000',
    image: '/images/featured2.jpeg'
  }
];

const TYPOLOGIES_DATA = [
  { id: 'residential', label: 'RESIDENTIAL', image: 'images/featured5.jpeg', size: 'tall' },
  { id: 'commercial', label: 'COMMERCIAL', image: '/images/palm5.png', size: 'wide' },
  { id: 'interiors', label: 'INTERIORS', image: '/images/project2.png', size: 'square' },
  { id: 'hospitality', label: 'HOSPITALITY', image: '/images/palm2.png', size: 'square' }
];

const REVIEWS_DATA = [
  {
    id: 1,
    author: 'Vogue Architecture',
    avatar: '/images/founder.png',
    quote: 'Studio HID brings a level of sophistication and timelessness to their spaces that is simply unparalleled. Truly master architects.'
  },
  {
    id: 2,
    author: 'Architectural Digest',
    avatar: '/images/logo.png',
    quote: 'The meticulous attention to detail and material harmony creates environments that feel both grounded and effortlessly luxurious.'
  },
  {
    id: 3,
    author: 'Design Anthology',
    avatar: '/images/founder.png',
    quote: 'A brilliant synthesis of modern technology and bespoke craftsmanship. Their commercial spaces redefine the modern workplace.'
  },
  {
    id: 4,
    author: 'Elle Decor International',
    avatar: '/images/wa1.jpeg',
    quote: 'Refined minimalism at its absolute finest. Studio HID transforms raw space into poetry of light, wood, and form.'
  }
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: '01. Concept',
    desc: 'We begin by understanding your vision, lifestyle, and spatial aspirations to sculpt tailored design solutions.',
    image: '/images/wa1.jpeg'
  },
  {
    step: '02',
    title: '02. Design',
    desc: 'Crafting bespoke layouts with tactile materials, careful lighting, and meticulous architectural detail.',
    image: '/images/wa2.jpeg'
  },
  {
    step: '03',
    title: '03. Execution',
    desc: 'Bringing the vision to life with uncompromising craftsmanship, precision engineering, and turnkey management.',
    image: '/images/wa3.jpeg'
  }
];

const SIGNATURE_GALLERY = [
  { id: 1, type: 'sig-pill', image: '/images/wa4.jpeg' },
  { id: 2, type: 'sig-arch-tall', image: '/images/palm8.png' },
  { id: 3, type: 'sig-circle', image: '/images/wa5.jpeg' },
  { id: 4, type: 'sig-arch-wide', image: '/images/palm2.png' },
  { id: 5, type: 'sig-arch-tall', image: '/images/featured1.jpeg' },
  { id: 6, type: 'sig-circle', image: '/images/featured2.jpeg' },
  { id: 7, type: 'sig-pill', image: '/images/featured3.jpeg' },
  { id: 8, type: 'sig-arch-wide', image: '/images/featured4.jpeg' },
  { id: 9, type: 'sig-arch-tall', image: '/images/featured5.jpeg' },
  { id: 10, type: 'sig-pill', image: '/images/featured6.jpeg' },
  { id: 11, type: 'sig-arch-wide', image: '/images/featured7.jpeg' },
  { id: 12, type: 'sig-circle', image: '/images/featured9.jpeg' }
];

const Portfolio = () => {
  const containerRef = useRef(null);
  const collectionsSliderRef = useRef(null);
  const reviewsSliderRef = useRef(null);

  // States
  const [wishlist, setWishlist] = useState([1]);
  const [newsEmail, setNewsEmail] = useState('');
  const [newsName, setNewsName] = useState('');
  const [newsSubmitted, setNewsSubmitted] = useState(false);

  // Progress bar tracking states
  const [collectionsProgress, setCollectionsProgress] = useState(0);
  const [reviewsProgress, setReviewsProgress] = useState(0);

  // GSAP Animations
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Fade in hero text & image
      gsap.fromTo(
        '.emata-hero-text > *',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.emata-hero-image img',
        { scale: 1.08, opacity: 0.8 },
        { scale: 1, opacity: 1, duration: 1.8, ease: 'power3.out' }
      );

      // Fade up scroll sections
      gsap.utils.toArray('.emata-fade-up').forEach((elem) => {
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

  // Collections Slider Scroll Progress
  const updateCollectionsProgress = () => {
    if (!collectionsSliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = collectionsSliderRef.current;
    const maxScroll = scrollWidth - clientWidth;
    const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
    setCollectionsProgress(progress);
  };

  const scrollCollections = (direction) => {
    if (!collectionsSliderRef.current) return;
    const scrollAmount = 320;
    collectionsSliderRef.current.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    });
  };

  // Reviews Slider Scroll Progress
  const updateReviewsProgress = () => {
    if (!reviewsSliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = reviewsSliderRef.current;
    const maxScroll = scrollWidth - clientWidth;
    const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
    setReviewsProgress(progress);
  };

  const scrollReviews = (direction) => {
    if (!reviewsSliderRef.current) return;
    const scrollAmount = 350;
    reviewsSliderRef.current.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    });
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsEmail) {
      setNewsSubmitted(true);
      setTimeout(() => {
        setNewsEmail('');
        setNewsName('');
      }, 4000);
    }
  };

  return (
    <div className="emata-works-page" ref={containerRef}>

      {/* 1. HERO SECTION (Split 2 Columns - Emata Style) */}
      <section className="emata-hero">
        <div className="emata-hero-left">
          <div className="emata-hero-text">
            <h1 className="emata-title">Studio HID.</h1>
            <p className="emata-subtitle">Bespoke luxury architecture and interior design.</p>
            <p className="emata-hero-copy">
              We shape refined homes, hospitality spaces, and commercial interiors through
              careful planning, tactile materials, and a calm architectural language.
            </p>
            <button
              className="emata-btn-black"
              onClick={() => {
                const collectionsEl = document.getElementById('collections');
                if (collectionsEl) collectionsEl.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              SHOP NOW
            </button>
          </div>
        </div>

        <div className="emata-hero-right">
          <div className="emata-hero-image">
            <img src="/images/portfolio-hero.jpg" alt="Studio HID Hero Architecture" />
          </div>
        </div>
      </section>

      {/* 2. FEATURED COLLECTIONS (Bestsellers Style Carousel) */}
      <section className="emata-section emata-collections emata-fade-up" id="collections">
        <h2 className="emata-section-title">FEATURED COLLECTIONS</h2>

        <div
          className="emata-carousel"
          ref={collectionsSliderRef}
          onScroll={updateCollectionsProgress}
        >
          {FEATURED_COLLECTIONS.map((item) => {
            const isLiked = wishlist.includes(item.id);
            return (
              <div key={item.id} className="emata-product-card">
                <button
                  className={`emata-card-heart ${isLiked ? 'active' : ''}`}
                  onClick={() => toggleWishlist(item.id)}
                  aria-label="Toggle Wishlist"
                >
                  <Heart size={18} fill={isLiked ? '#111' : 'none'} stroke="#111" />
                </button>

                <div className="emata-card-img-holder">
                  <img src={item.image} alt={item.title} />
                  <Link to={`/portfolio/${item.id}`} className="emata-quick-view-btn">
                    Explore Project →
                  </Link>
                </div>

                <div className="emata-card-info">
                  <h3 className="emata-card-title">{item.title}</h3>
                  <p className="emata-card-category">{item.category}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Slider Controls */}
        <div className="emata-slider-controls">
          <div className="emata-progress-bar">
            <div
              className="emata-progress-fill"
              style={{ width: `${Math.max(15, collectionsProgress)}%` }}
            ></div>
          </div>
          <div className="emata-slider-arrows">
            <button className="emata-arrow-btn" onClick={() => scrollCollections('prev')} aria-label="Previous">
              <ArrowLeft size={16} />
            </button>
            <button className="emata-arrow-btn" onClick={() => scrollCollections('next')} aria-label="Next">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 3. ABOUT US SECTION (Asymmetric Emata Multi-Image Layout) */}
      <section className="emata-section emata-about emata-fade-up">
        <h2 className="emata-section-title">ABOUT US</h2>

        <div className="emata-about-top-row">
          <div className="emata-about-text-top">
            <p>
              Architecture is not just walls, lines and shapes. It is an environment that
              influences perception, emotions and lifestyle. At Studio HID, we create not just
              a building, but a space in which you want to live, work, create and relax.
            </p>
          </div>
          <div className="emata-about-img-wide">
            <img src="/images/wa5.jpeg" alt="Studio HID Architectural Sofa Detail" />
          </div>
        </div>

        <div className="emata-about-bottom-row">
          <div className="emata-about-img-small">
            <img src="/images/wa6.jpeg" alt="Interior Shadow Detail" />
          </div>

          <div className="emata-about-text-bottom">
            <p>
              Since 1993, we have been designing residential and commercial spaces, combining
              aesthetics and functionality. Our projects are a balance between modern technologies,
              comfort and individuality.
            </p>
            <Link to="/about" className="emata-link-more">
              See more <span className="arrow-line">→</span>
            </Link>
          </div>

          <div className="emata-about-img-small">
            <img src="/images/wa7.jpeg" alt="Material Texture Detail" />
          </div>
        </div>
      </section>

      {/* 4. TYPOLOGIES SECTION (Bento Grid) */}
      <section className="emata-section emata-typologies emata-fade-up">
        <h2 className="emata-section-title">TYPOLOGIES</h2>

        <div className="emata-cat-grid">
          {TYPOLOGIES_DATA.map((cat) => (
            <div key={cat.id} className={`cat-box cat-${cat.size}`}>
              <img src={cat.image} alt={cat.label} />
              <span className="cat-label">{cat.label}</span>
            </div>
          ))}
        </div>

        <div className="cat-action">
          <Link to="/contact" className="emata-btn-black">VIEW CATALOG</Link>
        </div>
      </section>

      {/* 5. NEWSLETTER CARD BANNER (Emata Split Style) */}
      <section className="emata-newsletter-wrapper emata-fade-up">
        <div className="emata-newsletter-card">
          <div className="emata-news-img-box">
            <img src="/images/palm10.png" alt="Studio HID Journal" />
          </div>

          <div className="emata-news-content-box">
            <h3 className="emata-news-heading">Subscribe to our Journal</h3>
            <p className="emata-news-sub">
              Receive curated architectural insights, design trends, and studio updates directly to your inbox.
            </p>

            {newsSubmitted ? (
              <div className="emata-news-success">
                <Check size={20} className="check-icon" />
                <span>Thank you for subscribing to Studio HID Journal!</span>
              </div>
            ) : (
              <form className="emata-news-form" onSubmit={handleNewsletterSubmit}>
                <div className="emata-input-group">
                  <input
                    type="email"
                    placeholder="Your Email"
                    required
                    value={newsEmail}
                    onChange={(e) => setNewsEmail(e.target.value)}
                  />
                </div>
                <div className="emata-input-group">
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={newsName}
                    onChange={(e) => setNewsName(e.target.value)}
                  />
                </div>
                <button type="submit" className="emata-btn-black emata-send-btn">
                  SEND
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 6. REVIEWS SECTION */}
      <section className="emata-section emata-reviews emata-fade-up">
        <h2 className="emata-section-title">REVIEWS</h2>

        <div
          className="emata-reviews-slider"
          ref={reviewsSliderRef}
          onScroll={updateReviewsProgress}
        >
          {REVIEWS_DATA.map((rev) => (
            <div key={rev.id} className="emata-review-card">
              <div className="emata-review-author">
                <div className="emata-review-avatar">
                  <img src={rev.avatar} alt={rev.author} />
                </div>
                <span className="emata-review-name">{rev.author}</span>
              </div>
              <p className="emata-review-text">"{rev.quote}"</p>
            </div>
          ))}
        </div>

        {/* Slider Controls */}
        <div className="emata-slider-controls">
          <div className="emata-progress-bar">
            <div
              className="emata-progress-fill"
              style={{ width: `${Math.max(25, reviewsProgress)}%` }}
            ></div>
          </div>
          <div className="emata-slider-arrows">
            <button className="emata-arrow-btn" onClick={() => scrollReviews('prev')} aria-label="Previous">
              <ArrowLeft size={16} />
            </button>
            <button className="emata-arrow-btn" onClick={() => scrollReviews('next')} aria-label="Next">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 7. OUR PROCESS (Circular Steps) */}
      <section className="emata-section emata-process emata-fade-up">
        <h2 className="emata-section-title text-center">OUR PROCESS</h2>
        <div className="process-grid">
          {PROCESS_STEPS.map((proc, index) => (
            <div key={index} className="process-step">
              <div className="process-circle">
                <img src={proc.image} alt={proc.title} />
              </div>
              <h3>{proc.title}</h3>
              <p>{proc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. SIGNATURE GALLERY (Staggered Arches and Pills) */}
      <section className="emata-section emata-signature emata-fade-up">
        <h2 className="emata-section-title text-center">SIGNATURE GALLERY</h2>
        <div className="signature-grid">
          {SIGNATURE_GALLERY.map((sig) => (
            <div key={sig.id} className={`sig-item ${sig.type}`}>
              <img src={sig.image} alt={`Signature ${sig.id}`} />
            </div>
          ))}
        </div>
      </section>

      {/* 9. FEATURED SHOWCASE (Full-Bleed Banner) */}
      <section className="emata-showcase emata-fade-up">
        <div className="showcase-bg">
          <img src="/images/palm4.png" alt="Crafting Luxury Background" />
          <div className="showcase-overlay"></div>
        </div>
        <div className="showcase-content">
          <h2 className="showcase-title">CRAFTING LUXURY</h2>
          <p>Every space tells a story of elegance.</p>
        </div>
      </section>

    </div>
  );
};

export default Portfolio;
