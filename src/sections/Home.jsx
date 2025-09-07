import React, { useState, useEffect } from "react";
import "../index.css"; // Assuming you have a CSS file for Home styles

const Home = ({ onOpenVoiceModal }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [data, setData] = useState(null); // store backend data here
  const words = ["student", "developer", "programmer"];
  const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

  // Fetch data from backend (MongoDB → Express API)

useEffect(() => {
  const API_URL = process.env.REACT_APP_API_URL;
  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/api/home`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const result = await res.json();
      console.log("API result:", result);

      // Assuming the result is a single object or an array with one object
      const homeData = Array.isArray(result) ? result[0] : result;

      if (homeData) {
        // Parse the dynamicWords string to get a proper array
        try {
          // This line is the key to parsing the deeply nested string
          const parsedWords = JSON.parse(JSON.parse(JSON.parse(JSON.parse(homeData.dynamicWords[0]))));
          setData({ ...homeData, dynamicWords: parsedWords });
        } catch (parseError) {
          console.error("Failed to parse dynamicWords:", parseError);
          // Fallback to the hardcoded words if parsing fails
          setData({ ...homeData, dynamicWords: words }); 
        }
      } else {
        setError("No data found.");
      }
    } catch (err) {
      console.error("Error fetching home data:", err);
      setError(err.message);
    } finally {
      setLoading(false); // 👈 This is the critical line to stop loading
    }
  };

  fetchData();
}, []); // The dependency array is empty, so this runs once on mount


  // Dynamic rotating words
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [words.length]);

if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
if (error) return <p style={{ textAlign: "center", color: "red" }}>Error: {error}</p>;
if (!data) return <p style={{ textAlign: "center" }}>No home data found.</p>;

  return (
    <section id="home" className="section home-section">
      <div className="container">
        <div className="home-content">
          <div className="profile-section">
            <div className="profile-image">
              <img src={data?.profileImage} alt="Profile" />

            </div>
                <h1 className="name">{data.name}</h1>

            <p className="title"  style={{ color: "var(--text-primary)" }}>
              I'm a{" "}
              <span className="dynamic-word"  style={{ color: "var(--text-primary)" }}>{words[currentWordIndex]}</span>
            </p>
            <p className="description">
              {data.description}
            </p>

            <div className="cta-buttons">
              <a
  style={{ color: "var(--text-primary)" }}
  href="https://collection.cloudinary.com/duixtwsuc/25be4f601229361a5b01eca781babfe7"
  target="_blank"
  rel="noopener noreferrer"
  className="btn btn-outline-warning btn-lg"
>
  Resume
</a>


             <button
                type="button"
                style={{ color: "var(--text-primary)" }}
                className="btn btn-outline-warning btn-lg" // Use btn-secondary to match previous styling
                onClick={(e) => {
                  e.preventDefault() // Prevent default navigation
                  onOpenVoiceModal() // Call the function to open the voice modal
                }}
              >
                <img
                  src="src\assets\voice-assistants.png" // Assuming this path is correct for your local setup
                  alt="Chat Icon"
                  style={{ width: "30px", height: "30px", marginRight: "8px" }}
                />
                Let's Talk
              </button>
            </div>

            <div className="social-links">
              <a
              style={{ color: "var(--text-primary)" }}
                href={data?.socialLinks?.github} 
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
              style={{ color: "var(--text-primary)" }}
                href={data?.socialLinks?.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.073-1.644-.073-4.849 0-3.204.013-3.583.072-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
              style={{ color: "var(--text-primary)" }}
                href={data?.socialLinks?.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .home-section {
          background: --background-home;
          min-height: 100vh;
        }

        .home-content {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .profile-image {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          margin: 0 auto 2rem;
          overflow: hidden;
          border: 4px solid #fbbf24;
        }

        .profile-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .name {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: --text-primary;
        }

        .title {
          font-size: 1.5rem;
          color: #fbbf24;
          margin-bottom: 1.5rem;
        }

        .description {
          font-size: 1.1rem;
          color: --text-secondary;
          margin-bottom: 3rem;
          line-height: 1.8;
        }

        .cta-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .social-links {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
        }

        .social-links a {
          color: #cccccc;
          transition: color 0.3s ease, transform 0.3s ease;
        }

        .social-links a:hover {
          color: #fbbf24;
          transform: translateY(-2px);
        }

        .dynamic-word {
          color: #fbbf24;
          font-weight: 700;
          animation: fadeInOut 2s ease-in-out infinite;
        }

        @keyframes fadeInOut {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @media (max-width: 768px) {
          .name {
            font-size: 2.5rem;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
};

export default Home;
