import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';
import './StudioJournalSection.css';

const StudioJournalSection = () => {
  return (
    <section className="studio-journal-section">
      <div className="container studio-journal-shell">
        <div className="studio-journal-head">
          <div>
            <p className="studio-journal-kicker">Studio Journal</p>
            <h2 className="studio-journal-title">Recent writing from the studio.</h2>
          </div>

          <p className="studio-journal-intro">
            Long-form notes, project reflections, and design essays shaped around the way your
            studio already speaks: calm, precise, and architectural.
          </p>
        </div>

        <div className="studio-journal-grid">
          {BLOG_POSTS.map((post) => (
            <Link key={post.slug} to={`/blogs/${post.slug}`} className="studio-journal-card">
              <div className="studio-journal-card-media">
                <img src={post.image} alt={post.title} />
              </div>

              <div className="studio-journal-card-body">
                <div className="studio-journal-card-meta">
                  <span>{post.category}</span>
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>

                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>

                <span className="studio-journal-card-link">
                  Read article <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="studio-journal-footer">
          <Link to="/blogs" className="studio-journal-view-all">
            View all writing <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StudioJournalSection;
