
const ContactCard = ({ icon, title, value, link }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="contact-card">
      <div className="contact-icon">{icon}</div>
      <h4>{title}</h4>
      <p>{value}</p>

      <style jsx>{`
        .contact-card {
          background-color: var(--card-bg);     /* was #1a1a1a */
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  text-decoration: none;
  color: var(--card-text);              /* was inherit */
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  display: block;
  border: 1px solid var(--card-border); /* was transparent */
        }

        .contact-card:hover {
          transform: translateY(-5px);
        
         border-color: #fbbf24; 
        }

        .contact-icon {
          width: 60px;
          height: 60px;
          background-color: var(--accent);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          color: #ffbf24;
           color: var(--text-primary;
        }

        .contact-card h4 {
          color: var(--text-primary);
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
        }

        .contact-card p {
          color: var(--text-secondary);
        }
      `}</style>
    </a>
  )
}

export default ContactCard
