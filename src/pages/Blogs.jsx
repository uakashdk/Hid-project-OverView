import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';
import './Blogs.css';

const Blogs = () => {
  const featured = BLOG_POSTS[0];
  const rest = BLOG_POSTS.slice(1);

  return (
    <div className="blogs-page">
      <section className="blogs-hero">
        <div className="container blogs-hero-inner">
          <div className="blogs-hero-copy">
            <p className="blogs-kicker">Studio Journal</p>
            <h1>Notes from the studio.</h1>
            <p className="blogs-intro">
              Long-form writing, project notes, and short essays from Habitat on residential
              design, interior atmospheres, and the craft of building calm, enduring spaces.
            </p>
          </div>

          <div className="blogs-hero-featured">
            <p className="blogs-featured-label">Featured writing</p>
            <Link to={`/blogs/${featured.slug}`} className="blogs-featured-card">
              <img src={featured.image} alt={featured.title} />
              <div className="blogs-featured-content">
                <div className="blogs-meta">
                  <span>{featured.category}</span>
                  <span>{featured.date}</span>
                  <span>{featured.readTime}</span>
                </div>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <span className="blogs-read-more">
                  Read article <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="blogs-list-section">
        <div className="container blogs-list-shell">
          <div className="blogs-list-head">
            <h2>All writing</h2>
            <p>More articles coming soon.</p>
          </div>

          <div className="blogs-list">
            {rest.map((post) => (
              <Link key={post.slug} to={`/blogs/${post.slug}`} className="blogs-list-item">
                <div className="blogs-list-item-image">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="blogs-list-item-body">
                  <div className="blogs-meta">
                    <span>{post.category}</span>
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
