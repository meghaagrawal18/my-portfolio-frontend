import React, { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import ProjectDetailsModal from "../components/ProjectDetailsModal";

const Projects = () => {
  const [projects, setProjects] = useState([]); // store list of projects
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch projects from backend
  useEffect(() => {
    fetch("http://localhost:5001/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(Array.isArray(data) ? data : []); // set fetched projects
      })
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="projects-header">
          <h2 className="section-title" style={{ color: "var(--text-primary)" }}>
            Projects
          </h2>
          <p className="section-subtitle" style={{ color: "var(--text-primary)" }}>
            A showcase of my technical skills and creative solutions
          </p>
        </div>

        <div className="projects-grid">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <ProjectCard
                key={project._id || index}
                project={project}
                onViewDetails={handleViewDetails}
              />
            ))
          ) : (
            <p style={{ textAlign: "center", color: "var(--text-primary)" }}>
              No projects found.
            </p>
          )}
        </div>
      </div>

      {isModalOpen && (
        <ProjectDetailsModal project={selectedProject} onClose={handleCloseModal} />
      )}

      <style jsx>{`
        .projects-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .section-subtitle {
          color: #999;
          font-size: 1.2rem;
          margin: 0;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        @media (min-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 2.5rem;
          }

          .projects-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;
