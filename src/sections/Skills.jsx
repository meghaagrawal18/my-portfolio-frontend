import React, { useEffect, useState } from "react";
import SkillCard from "../components/SkillCard";

const Skills = () => {
  const [skillCategories, setSkillCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/skills"); // Adjust port if needed
        const data = await res.json();
        setSkillCategories(data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  if (loading) {
    return (
      <section id="skills" className="section">
        <div className="container">
          <h2 className="section-title" style={{ color: "var(--text-primary)" }}>
            Skills
          </h2>
          <p
            className="section-subtitle"
            style={{ color: "var(--text-primary)" }}
          >
            Loading skills...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 className="section-title" style={{ color: "var(--text-primary)" }}>
          Skills
        </h2>
        <p
          className="section-subtitle"
          style={{ color: "var(--text-primary)" }}
        >
          Technologies and tools I use to bring ideas to life
        </p>
        <div className="skills-grid grid grid-3">
          {skillCategories.length > 0 ? (
            skillCategories.map((category) => (
              <SkillCard key={category._id} category={category} />
            ))
          ) : (
            <p style={{ textAlign: "center", color: "#aaa" }}>
              No skills added yet.
            </p>
          )}
        </div>
      </div>

      <style jsx>{`
        .section-subtitle {
          text-align: center;
          color: #cccccc;
          font-size: 1.1rem;
          margin-bottom: 3rem;
        }
        .section-title {
          text-align: center;
          color: #ffffff;
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 3rem;
        }
      `}</style>
    </section>
  );
};

export default Skills;
