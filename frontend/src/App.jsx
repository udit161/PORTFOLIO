import userPic from './assets/user_pic.jpg';
import './App.css';

// Pre-generate static stars for performance
const STARS = Array.from({ length: 80 }).map((_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: Math.random() * 2 + 1,
  delay: `${Math.random() * 8}s`,
  duration: `${Math.random() * 4 + 3}s`,
}));

export default function App() {
  return (
    <div className="wix-portfolio-root">
      
      {/* 1. Twinkling Stars Background */}
      <div className="stars-container">
        {STARS.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: star.delay,
              animationDuration: star.duration,
            }}
          />
        ))}
      </div>

      {/* 2. Automated Shooting Stars / Meteorites */}
      <div className="shooting-stars-container">
        <div className="meteorite met-1" />
        <div className="meteorite met-2" />
        <div className="meteorite met-3" />
        <div className="meteorite met-4" />
      </div>

      <div className="wix-portfolio-container">
        
        {/* Left Column: Lavender Card Block */}
        <div className="profile-block">
          <div className="lavender-card">
            <h1 className="hello-title">Hello</h1>
            
            <div className="photo-container-wrapper">
              <div className="photo-container">
                <img src={userPic} alt="Udit Kumar" className="photo-img" />
                
                {/* Social media grid overlapping the image */}
                <div className="social-badge-grid">
                  <a href="https://github.com" target="_blank" rel="noreferrer" title="GitHub" className="social-badge-item">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                      <path d="M9 18c-4.51 2-5-2-7-2"></path>
                    </svg>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" title="LinkedIn" className="social-badge-item">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                  <a href="mailto:udit.kumar@example.com" title="Email" className="social-badge-item">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </a>
                  <a href="https://x.com" target="_blank" rel="noreferrer" title="X" className="social-badge-item">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 4l11.733 16h4.267l-11.733 -16z M4 20l6.768 -6.768 M20 20l-6.768 -6.768"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="name-title-container">
              <h2 className="profile-name">Udit Kumar</h2>
              <p className="profile-title">Web Developer &amp; Aspiring AI Engineer</p>
            </div>
          </div>
        </div>

        {/* Right Column: Bio / Intro Block */}
        <div className="intro-block">
          <div className="intro-content">
            <h1 className="intro-heading">A bit about me</h1>
            <p className="intro-paragraph">
              I'm a paragraph. Click here to add your own text and edit me. It's easy. Just click "Edit Text" or double click me to add your own content and make changes to the font.
            </p>
            <p className="intro-paragraph">
              This is a great place to introduce yourself, share what you do and what makes your work truly unique. I bridge the gap between responsive frontend engineering and intelligent backend workflows.
            </p>
            
            <div className="intro-actions">
              <a href="#resume" className="pill-btn primary">Resume</a>
              <a href="#projects" className="pill-btn secondary">Projects</a>
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="portfolio-footer">
        <div className="footer-col col-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#accessibility">Accessibility Statement</a>
        </div>
        
        <div className="footer-col col-contact">
          <p className="footer-label">Email</p>
          <a href="mailto:udit.kumar@example.com" className="footer-val">udit.kumar@example.com</a>
          <p className="footer-label" style={{ marginTop: '16px' }}>Phone</p>
          <p className="footer-val">123-456-7890</p>
        </div>

        <div className="footer-col col-social">
          <p className="footer-label">Follow Me</p>
          <div className="footer-social-links">
            <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://x.com" target="_blank" rel="noreferrer">X</a>
            <a href="mailto:udit.kumar@example.com">Email</a>
          </div>
        </div>

        <div className="footer-col col-copy">
          <p className="copyright-text">
            &copy; 2026 by Udit Kumar.<br />
            Powered and secured by Udit.
          </p>
        </div>
      </footer>
    </div>
  );
}
