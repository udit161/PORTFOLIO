import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import BlackholeBackground from '../components/BlackholeBackground';
import certCwhDataScience from '../assets/cert_cwh_datascience.png';

const certifications = [
  {
    id: 1,
    title: 'The Ultimate Job Ready Data Science Course',
    issuer: 'CodeWithHarry',
    image: certCwhDataScience,
    learnings: [
      'Mastered Python programming from a data science perspective',
      'Learned powerful data analysis using Pandas and NumPy',
      'Learned Machine Learning with Scikit-Learn, RAGs, and SQL for data querying',
      'Built stunning data visualizations with Matplotlib and Seaborn',
      'Gained a solid understanding of core statistics and probability concepts',
      'Cleaned and preprocessed real-world datasets for accurate insights',
      'Worked on real-life projects to apply my skills',
      'Used Jupyter Notebooks for data-driven development',
      'Explored Developer Tools like Quadratic AI',
    ],
  },
];

export default function CertificationsPage() {
  const [visible, setVisible] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    if (lightbox) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightbox]);

  return (
    <div className="wix-portfolio-root">
      <BlackholeBackground />

      <header className="portfolio-header">
        <div className="logo-container">
          <Logo />
        </div>
      </header>

      <div className="certs-page-content">
        {/* Back navigation */}
        <Link to="/" className="certs-back-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Home
        </Link>

        {/* Heading */}
        <div className={`certs-heading-group ${visible ? 'certs-heading-group--visible' : ''}`}>
          <span className="certs-section-label">Achievements</span>
          <h1 className="certs-section-title">Certifications</h1>
          <div className="certs-section-divider" />
        </div>

        {/* Grid of certificate cards */}
        <div className="certs-grid">
          {certifications.map((cert, idx) => (
            <div
              key={cert.id}
              className={`cert-card ${visible ? 'cert-card--visible' : ''}`}
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              {/* Glow effect */}
              <div className="cert-card-glow" />

              {/* Certificate image */}
              <div className="cert-image-wrapper" onClick={() => setLightbox(cert)}>
                <img src={cert.image} alt={cert.title} className="cert-image" />
                <div className="cert-image-overlay">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h6v6" />
                    <path d="M10 14L21 3" />
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  </svg>
                  <span>View Full</span>
                </div>
              </div>

              {/* Certificate info */}
              <div className="cert-info">
                <div className="cert-info-top">
                  <span className="cert-issuer-badge">{cert.issuer}</span>
                </div>
                <h2 className="cert-title">{cert.title}</h2>
                {cert.learnings && cert.learnings.length > 0 && (
                  <ul className="cert-learnings">
                    {cert.learnings.map((item, i) => (
                      <li key={i} className="cert-learning-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightbox && (
        <div className="cert-lightbox" onClick={() => setLightbox(null)}>
          <button className="cert-lightbox-close" onClick={() => setLightbox(null)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <img
            src={lightbox.image}
            alt={lightbox.title}
            className="cert-lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <footer className="portfolio-footer">
        <div className="footer-col col-contact">
          <p className="footer-label">Email</p>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=udit56579@gmail.com" target="_blank" rel="noreferrer" className="footer-val">udit56579@gmail.com</a>
          <p className="footer-label" style={{ marginTop: '16px' }}>Phone</p>
          <p className="footer-val">+91 7388913200</p>
        </div>

        <div className="footer-col col-social">
          <p className="footer-label">Follow Me</p>
          <div className="footer-social-links">
            <a href="https://github.com/udit161" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/udit-kumar-9aa031376" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com/the.sketch.man66/" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=udit56579@gmail.com" target="_blank" rel="noreferrer">Email</a>
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
