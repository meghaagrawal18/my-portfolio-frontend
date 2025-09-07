// src/components/Navbar.jsx
import React from "react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <ul>
           <li className="theme-toggle-wrapper">
            <ThemeToggle />
          </li>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#skills">Skills</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>

      <style jsx>{`
        .theme-toggle-wrapper {
          display: flex;
          align-items: center;
          margin-left: 1rem;
         
          justify-content: center;
        }
          .navbar {
  display: flex;
  justify-content: flex-end;
}
    .navbar ul {
          display: flex;
          align-items: center; /* Align items vertically */
          list-style: none;
          gap: 1.5rem;
          margin: 0;
          padding: 0;
        }
  .
      `}</style>
    </>
  );
};

export default Navbar;
