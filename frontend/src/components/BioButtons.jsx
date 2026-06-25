import { Link } from 'react-router-dom';
import resumePdf from '../assets/Udit_Kumar_Resume.pdf';

export default function BioButtons() {
  return (
    <div className="intro-actions">
      <a href={resumePdf} className="pill-btn primary" target="_blank" rel="noopener noreferrer">Resume</a>
      <Link to="/projects" className="pill-btn secondary">Projects</Link>
      <Link to="/certifications" className="pill-btn secondary">Certifications</Link>
    </div>
  );
}
