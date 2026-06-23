import { Link } from 'react-router-dom';

export default function BioButtons() {
  return (
    <div className="intro-actions">
      <a href="#resume" className="pill-btn primary">Resume</a>
      <Link to="/projects" className="pill-btn secondary">Projects</Link>
      <Link to="/certifications" className="pill-btn secondary">Certifications</Link>
    </div>
  );
}
