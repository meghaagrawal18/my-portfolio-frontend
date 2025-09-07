import React, { useState, useEffect } from "react";
import "./About.css";

const About = () => {
  const [about, setAbout] = useState(null);

  useEffect(() => {
     const API_URL = process.env.REACT_APP_API_URL;
    fetch(`${API_URL}/api/about`)
      .then((res) => res.json())
      .then((data) => {
        // If it's an array (e.g., [ { ... } ] ), take first element
        setAbout(Array.isArray(data) ? data[0] : data);
      })
      .catch((err) => console.error("Error fetching about:", err));
  }, []);

  if (!about) return <p>Loading...</p>;

  return (
    <section id="about" className="section">
      <div className="container">
        {/* Header */}
        <div className="about-header">
          <h2 className="section-title" style={{ color: "var(--text-primary)" }}>
            About Me
          </h2>
          <p
            className="section-subtitle"
            style={{ color: "var(--text-primary)" }}
          >
            Get to know the person behind the code
          </p>
        </div>

        {/* Content */}
        <div className="about-content">
          {/* Who Am I Section */}
          <div className="who-am-i-section">
            <div className="section-header">
              <span className="section-icon">&lt;/&gt;</span>
              <h3 style={{ color: "var(--text-primary)" }}>Who I Am</h3>
            </div>

            <div className="who-am-i-content">
              <p style={{ color: "var(--text-primary)" }}>{about.whoAmI}</p>
              <p style={{ color: "var(--text-primary)" }}>
                I have worked on AI-driven systems like CareSync, a healthcare
                platform designed for rural environments, and a machine
                learning-based vehicle recognition and analytics solution. I
                enjoy exploring new technologies, contributing to open-source
                initiatives, and collaborating with communities that push the
                boundaries of what's possible in tech.
              </p>
              <button
                className="github-btn"
                onClick={() =>
                  window.open("https://github.com/meghaagrawal18", "_blank")
                }
              >
                <span className="btn-icon">&lt;/&gt;</span>
                GitHub Profile
              </button>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="about-tabs">
            <div className="tab-content">
              {/* Currently Exploring */}
              <div className="tab-section">
                <div className="section-header">
                  <span className="section-icon">⚡</span>
                  <h4 style={{ color: "var(--text-primary)" }}>
                    Currently Exploring
                  </h4>
                </div>
                <p
                  className="section-description"
                  style={{ color: "var(--text-primary)" }}
                >
                  These are the areas I am actively learning and working on:
                </p>
                <ul
                  className="bullet-list"
                  style={{ color: "var(--text-primary)" }}
                >
                  <p>{about.additionalInfo}</p>
                </ul>
              </div>

              {/* Experience */}
              <div className="tab-section">
                <div className="section-header">
                  <span className="section-icon">💼</span>
                  <h4 style={{ color: "var(--text-primary)" }}>Experience</h4>
                </div>
                <p
                  className="section-description"
                  style={{ color: "var(--text-primary)" }}
                >
                  Key experiences and achievements that define my journey:
                </p>

                <div
                  className="experience-list"
                  style={{ color: "var(--text-primary)" }}
                >
                  {about.experiences && about.experiences.length > 0 ? (
                    about.experiences.map((exp, index) => (
                      <div key={index} className="experience-item">
                        <h5 style={{ color: "var(--text-primary)" }}>
                          {exp.title}
                        </h5>
                        <p style={{ color: "var(--text-primary)" }}>
                          {exp.description}
                        </p>
                        <span className="experience-date">{exp.period}</span>
                      </div>
                    ))
                  ) : (
                    <p>No experiences added yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
