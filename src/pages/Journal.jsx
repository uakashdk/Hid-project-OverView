import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Journal.css';

gsap.registerPlugin(ScrollTrigger);

const Journal = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.journal-header', 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
      );

      gsap.fromTo('.journal-card',
        { opacity: 0, y: 80 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          stagger: 0.2, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".journal-grid",
            start: "top 85%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const posts = [
    {
      id: 1,
      video: 'plugin1.mp4',
      title: 'The Art of Spatial Flow',
      date: 'OCTOBER 2023',
      description: 'Behind the scenes at our recent residential project, exploring how natural light interacts with raw materials to create a seamless transition between indoor and outdoor spaces.'
    },
    {
      id: 2,
      video: 'plugin2.mp4',
      title: 'Crafting Bespoke Details',
      date: 'NOVEMBER 2023',
      description: 'A glimpse into the meticulous craftsmanship that defines Studio HID. Every texture, every joint, and every surface is deliberately chosen to evoke timeless luxury.'
    },
    {
      id: 3,
      video: 'plugin3.mp4',
      title: 'Architectural Narratives',
      date: 'DECEMBER 2023',
      description: 'Documenting the construction phase. Witnessing the structural skeleton rise before the delicate interior layers are applied, revealing the true scale of the design.'
    }
  ];

  return (
    <div className="journal-page" ref={containerRef}>
      <div className="journal-header container">
        <h1 className="journal-title">Design Chronicles.</h1>
        <p className="journal-subtitle">Behind the scenes, architectural philosophies, and the meticulous process of crafting luxury spaces.</p>
      </div>

      <div className="journal-grid container">
        {posts.map(post => (
          <article className="journal-card" key={post.id}>
            <div className="journal-video-wrapper">
              <video autoPlay loop muted playsInline>
                <source src={`/images/${post.video}`} type="video/mp4" />
              </video>
            </div>
            <div className="journal-content">
              <span className="journal-date">{post.date}</span>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Journal;
