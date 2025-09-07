"use client"

import { useState, useEffect, useRef } from "react"

const SectionIndicator = () => {
  const [activeSection, setActiveSection] = useState("home")
  const sectionRefs = useRef({})

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Projects", id: "projects" },
    { name: "Skills", id: "skills" },
    { name: "Contact", id: "contact" },
  ]

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px", // Adjust this to control when a section becomes active
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    navItems.forEach((item) => {
      const section = document.getElementById(item.id)
      if (section) {
        sectionRefs.current[item.id] = section
        observer.observe(section)
      }
    })

    return () => {
      navItems.forEach((item) => {
        const section = sectionRefs.current[item.id]
        if (section) {
          observer.unobserve(section)
        }
      })
    }
  }, [])

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const navbarHeight = document.querySelector(".navbar")?.offsetHeight || 0
      const sectionTop = section.offsetTop - navbarHeight

      window.scrollTo({
        top: sectionTop,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="section-indicator">
      <div className="indicator-line"></div>
      <div className="indicator-dots">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`indicator-dot ${activeSection === item.id ? "active" : ""}`}
            onClick={() => scrollToSection(item.id)}
            aria-label={`Scroll to ${item.name} section`}
          >
            <span className="sr-only">{item.name}</span>
          </button>
        ))}
      </div>

      <style jsx>{`
        .section-indicator {
          position: fixed;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 999;
        }

        .indicator-line {
          width: 2px;
          height: calc(100% - 40px); /* Adjust based on dot size */
          background-color: #333; /* Darker line */
          position: absolute;
          top: 20px; /* Half of dot size */
          bottom: 20px; /* Half of dot size */
        }

        .indicator-dots {
          display: flex;
          flex-direction: column;
          gap: 15px; /* Space between dots */
        }

        .indicator-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #fbbf24; /* Inactive dot color */
          border: 2px solid #555;
          cursor: pointer;
          transition: background-color 0.3s ease, border-color 0.3s ease, transform 0.2s ease;
          position: relative;
          z-index: 1; /* Ensure dots are above the line */
          padding: 0; /* Remove default button padding */
        }

        .indicator-dot.active {
          background-color: #fbbf24; /* Active dot color */
          border-color: var(--accent);
          transform: scale(1.2); /* Slightly larger when active */
        }

        .indicator-dot:hover {
          background-color: #fbbf24;
          border-color: var(--accent);
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        @media (max-width: 768px) {
          .section-indicator {
            display: none; /* Hide on smaller screens if it clutters the UI */
          }
        }
      `}</style>
    </div>
  )
}

export default SectionIndicator
