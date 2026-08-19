import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

// Layout Components
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import FooterContact from './components/FooterContact';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import ProjectDetail from './pages/ProjectDetail';
import Services from './pages/Services';
import Journal from './pages/Journal';
import Blogs from './pages/Blogs';
import BlogArticle from './pages/BlogArticle';
import Contact from './pages/Contact';
import Inquiry from './pages/Inquiry';
import Testimonials from './pages/Testimonials';
import FAQ from './pages/FAQ';
// import Preloader from "./components/Preloader";

function App() {
  const location = useLocation();

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/works" element={<Portfolio />} />
          <Route path="/portfolio/:id" element={<ProjectDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogArticle />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/inquiry" element={<Inquiry />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </main>
      {location.pathname !== '/contact' && <FooterContact />}
      <Footer />
      {/* {loading && <Preloader onFinish={() => setLoading(false)} />}
      <div className={`site-content ${loading ? "is-hidden" : "reveal"}`}>
      </div> */}
    </>
  );
}

export default App;
