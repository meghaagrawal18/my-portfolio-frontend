
import { Box, Chip, Typography, IconButton } from "@mui/material"
import { styled } from "@mui/system"

// Custom styled components for consistency
const SectionHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  marginBottom: "1rem",
  marginTop: "2rem",
}))

const SectionIcon = styled("span")(({ theme }) => ({
  color: "#fbbf24", // Accent color
  fontSize: "1.2rem",
  fontWeight: "bold",
}))

const BulletList = styled("ul")(({ theme }) => ({
  listStyle: "none",
  padding: 0,
  margin: 0,
  "& li": {
    color: "#cccccc", // Text secondary
    marginBottom: "0.5rem",
    lineHeight: 1.6,
    position: "relative",
    paddingLeft: "1.5rem",
    "&::before": {
      content: '"•"',
      color: "#fbbf24", // Accent color
      fontWeight: "bold",
      position: "absolute",
      left: 0,
      top: 0,
    },
  },
}))

const ProjectDetailsModal = ({ project, onClose }) => {
  if (!project) return null

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1001,
        overflowY: "auto",
        padding: "2rem",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#1a1a1a", // Matches --bg-secondary
          borderRadius: "16px",
          padding: "2rem",
          maxWidth: "900px",
          width: "100%",
          position: "relative",
          maxHeight: "90vh",
          overflowY: "auto",
          border: "1px solid #333",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            color: "#cccccc",
            "&:hover": {
              color: "#fbbf24",
            },
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </IconButton>

        <Typography
          variant="h4"
          component="h2"
          sx={{
            color: "#ffffff", // Text primary
            fontWeight: 700,
            marginBottom: "0.5rem",
          }}
        >
          {project.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#cccccc", // Text secondary
            marginBottom: "1.5rem",
            lineHeight: 1.6,
          }}
        >
          {project.fullDescription}
        </Typography>

        {project.detailsImage && (
          <Box sx={{ marginBottom: "2rem", borderRadius: "8px", overflow: "hidden" }}>
            <img
              src={project.detailsImage || "/placeholder.svg"}
              alt={`${project.title} screenshot`}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </Box>
        )}

        <SectionHeader>
          <SectionIcon>&lt;/&gt;</SectionIcon>
          <Typography variant="h6" component="h3" sx={{ color: "#fbbf24", margin: 0 }}>
            Tech Stack
          </Typography>
        </SectionHeader>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
          {project.technologies.map((tech, index) => (
            <Chip
              key={index}
              label={tech}
              sx={{
                backgroundColor: "#333",
                color: "#cccccc",
                padding: "0.4rem 0.8rem",
                borderRadius: "6px",
                fontSize: "0.85rem",
                fontWeight: 500,
                height: "auto",
              }}
            />
          ))}
        </Box>

        {project.keyFeatures && project.keyFeatures.length > 0 && (
          <>
            <SectionHeader>
              <SectionIcon>✨</SectionIcon>
              <Typography variant="h6" component="h3" sx={{ color: "#fbbf24", margin: 0 }}>
                Key Features
              </Typography>
            </SectionHeader>
            <BulletList>
              {project.keyFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </BulletList>
          </>
        )}

        {project.technicalHighlights && project.technicalHighlights.length > 0 && (
          <>
            <SectionHeader>
              <SectionIcon>⚡</SectionIcon>
              <Typography variant="h6" component="h3" sx={{ color: "#fbbf24", margin: 0 }}>
                Technical Highlights
              </Typography>
            </SectionHeader>
            <BulletList>
              {project.technicalHighlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </BulletList>
          </>
        )}

        {project.challengesSolved && project.challengesSolved.length > 0 && (
          <>
            <SectionHeader>
              <SectionIcon>🎯</SectionIcon>
              <Typography variant="h6" component="h3" sx={{ color: "#fbbf24", margin: 0 }}>
                Challenges Solved
              </Typography>
            </SectionHeader>
            <BulletList>
              {project.challengesSolved.map((challenge, index) => (
                <li key={index}>{challenge}</li>
              ))}
            </BulletList>
          </>
        )}

        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}>
          <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <IconButton
              sx={{
                backgroundColor: "#333",
                borderRadius: "8px",
                color: "#cccccc",
                padding: "0.75rem 1.5rem",
                "&:hover": {
                  backgroundColor: "#fbbf24",
                  color: "#000",
                },
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "0.5rem" }}>
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <Typography variant="button" sx={{ color: "inherit" }}>
                View Code
              </Typography>
            </IconButton>
          </a>
        </Box>
      </Box>
    </Box>
  )
}

export default ProjectDetailsModal
