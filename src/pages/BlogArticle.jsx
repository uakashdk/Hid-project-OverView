import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getBlogPostBySlug, getRelatedBlogPosts } from '../data/blogPosts';
import './BlogArticle.css';

const BlogArticle = () => {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return <Navigate to="/blogs" replace />;
  }

  const relatedPosts = getRelatedBlogPosts(post.slug, 2);

  return (
    <article className="blog-article-page">
      <section className="blog-article-hero">
        <div className="container blog-article-hero-inner">
          <Link to="/blogs" className="blog-article-back">
            <ArrowLeft size={14} />
            Back to writing
          </Link>

          <p className="blog-article-kicker">{post.category}</p>
          <h1>{post.title}</h1>
          <div className="blog-article-meta">
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      <section className="blog-article-feature">
        <div className="container blog-article-feature-inner">
          <div className="blog-article-image">
            <img src={post.image} alt={post.title} />
          </div>

          <div className="blog-article-intro">
            <p>{post.intro}</p>
          </div>
        </div>
      </section>

      <section className="blog-article-body">
        <div className="container blog-article-body-inner">
          {post.body.map((section) => (
            <section key={section.heading} className="blog-article-section">
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </section>

      <section className="blog-article-related">
        <div className="container">
          <div className="blog-article-related-head">
            <h2>Related writing</h2>
            <Link to="/blogs" className="blog-article-all-link">
              View all writing <ArrowRight size={14} />
            </Link>
          </div>

          <div className="blog-article-related-grid">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                to={`/blogs/${relatedPost.slug}`}
                className="blog-article-related-card"
              >
                <img src={relatedPost.image} alt={relatedPost.title} />
                <div>
                  <p>{relatedPost.category}</p>
                  <h3>{relatedPost.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
};

export default BlogArticle;
