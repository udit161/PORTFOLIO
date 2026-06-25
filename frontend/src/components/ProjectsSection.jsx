import { useState, useRef, useEffect } from 'react';

const projects = [
  {
    id: 'vartalaap',
    title: 'Vartalaap',
    subtitle: 'Student Social Networking Platform',
    description:
      'A full-featured social networking platform built for students to connect, share ideas, and collaborate. Features real-time messaging, post feeds with Following/All Posts tabs, friend management, notifications, Google OAuth authentication, and a polished responsive UI.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Google OAuth'],
    liveUrl: 'https://vartalaap009.onrender.com/',
    githubUrl: 'https://github.com/udit161/vartalaap',
    demoVideo: '/vartalaap_demo.webp',
    highlights: [
      'Real-time messaging with Socket.io',
      'Google OAuth + JWT authentication',
      'Post feeds with Following & All Posts',
      'Friend requests & notifications system',
      'Responsive mobile-first design',
    ],
  },
];

function ProjectCard({ project, index }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`project-card ${isVisible ? 'project-card--visible' : ''}`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div
        className={`project-video-wrapper ${isVideoHovered ? 'project-video-wrapper--hovered' : ''}`}
        onMouseEnter={() => setIsVideoHovered(true)}
        onMouseLeave={() => setIsVideoHovered(false)}
      >
        <div className="project-video-glow" />
        <img
          src={project.demoVideo}
          alt={`${project.title} Demo`}
          className="project-video"
          loading="lazy"
        />
        <div className="project-video-overlay">
          <div className="project-video-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <span>Live Demo</span>
          </div>
        </div>
      </div>


      <div className="project-content">
        <div className="project-header">
          <div className="project-title-group">
            <h3 className="project-title">{project.title}</h3>
            <span className="project-subtitle">{project.subtitle}</span>
          </div>
          <div className="project-links">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="project-link-btn project-link-btn--live"
              title="View Live"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Live
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="project-link-btn project-link-btn--github"
              title="View Source"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              Code
            </a>
          </div>
        </div>

        <p className="project-description">{project.description}</p>


        <ul className="project-highlights">
          {project.highlights.map((highlight, i) => (
            <li key={i} className="project-highlight-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c2a43f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {highlight}
            </li>
          ))}
        </ul>

        <div className="project-tech-stack">
          {project.techStack.map((tech) => (
            <span key={tech} className="project-tech-tag">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const [isHeadingVisible, setIsHeadingVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeadingVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className={`projects-heading-group ${isHeadingVisible ? 'projects-heading-group--visible' : ''}`}>
        <h1 className="projects-section-title">Featured Projects</h1>
        <div className="projects-section-divider" />
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
