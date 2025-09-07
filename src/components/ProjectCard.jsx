
import { Card, CardContent, Typography, Box, Chip, IconButton } from "@mui/material"
import { styled } from "@mui/system"

// Custom styled component for the action buttons to match the design
const ActionButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "#333", // Dark background
  borderRadius: "8px",
  color: "#cccccc", // Light text color
  "&:hover": {
    backgroundColor: "#fbbf24", // Accent color on hover
    color: "#000", // Black text on hover
  },
}))

const ProjectCard = ({ project, onViewDetails }) => {
  const visibleTechs = project.technologies.slice(0, 3)
  const remainingCount = project.technologies.length - 3

  return (
    <Card
      sx={{
        backgroundColor: "var(--card-bg-color)", // Matches --bg-secondary
        borderRadius: "16px",
        padding: "1rem", // Adjusted padding for CardContent
        border: "1px solid var(--card-border-color)", // Matches --border-color
        transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease", // Added border-color to transition
        cursor: "pointer",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
          borderColor: "#fbbf24", // Added border-color change on hover
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
           
          height: "100%",
          padding: "1rem", // Inner padding for content
          "&:last-child": {
            paddingBottom: "1rem", // Ensure consistent padding
          },
        }}
      >
        <Typography
          variant="h6"
          component="h3"
          sx={{
            color: "var(--text-primary)" , // Matches --text-primary
            fontWeight: 600,
            marginBottom: "1rem",
          }}
        >
          {project.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color:"var(--text-primary)", // Matches --text-secondary
            marginBottom: "2rem",
            lineHeight: 1.6,
            flexGrow: 1,
          }}
        >
          {project.description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginBottom: "2rem",
          }}
        >
          {visibleTechs.map((tech, index) => (
            <Chip
              key={index}
              label={tech}
              sx={{
                backgroundColor: "#333", // Dark background for tags
                color: "#cccccc", // Light text for tags
                padding: "0.4rem 0.8rem", // Adjust padding for Chip
                borderRadius: "6px",
                fontSize: "0.85rem",
                fontWeight: 500,
                height: "auto", // Allow height to adjust based on padding
              }}
            />
          ))}
          {remainingCount > 0 && (
            <Chip
              label={`+${remainingCount} more`}
              sx={{
                backgroundColor: "#2a2a2a", // Slightly lighter dark for 'more' tag
                color: "#999", // Grey text for 'more' tag
                padding: "0.4rem 0.8rem",
                borderRadius: "6px",
                fontSize: "0.85rem",
                fontWeight: 500,
                height: "auto",
              }}
            />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "auto",
          }}
        >
          <Box sx={{ display: "flex", gap: "0.75rem" }}>
            <ActionButton href={project.github} target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </ActionButton>
            {project.live && (
              <ActionButton href={project.live} target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15,3 21,3 21,9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </ActionButton>
            )}
          </Box>
          <Typography
            variant="caption"
            sx={{ color: "#999", fontSize: "0.9rem", cursor: "pointer" }}
            onClick={() => onViewDetails(project)}
          >
            Click to view details
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ProjectCard
