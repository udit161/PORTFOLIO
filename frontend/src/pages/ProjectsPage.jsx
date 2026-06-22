import { useEffect } from 'react';
import Logo from '../components/Logo';
import ProjectsSection from '../components/ProjectsSection';
import BlackholeBackground from '../components/BlackholeBackground';

export default function ProjectsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="wix-portfolio-root">
      <BlackholeBackground />
      
      <header className="portfolio-header">
        <div className="logo-container">
          <Logo />
        </div>
      </header>

      <div className="projects-page-content">
        <ProjectsSection />
      </div>

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
