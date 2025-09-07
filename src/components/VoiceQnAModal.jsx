"use client"

import { useEffect } from "react"
import { Box, IconButton } from "@mui/material"
import VoiceQnA from "./VoiceQnA" // Import the VoiceQnA component

const VoiceQnAModal = ({ onClose }) => {
  // Effect to manage body overflow when modal is open/closed
  useEffect(() => {
    document.body.classList.add("no-scroll")
    return () => {
      document.body.classList.remove("no-scroll")
    }
  }, [])

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
        zIndex: 1001, // Ensure it's above other content but below SectionIndicator
        overflowY: "auto",
        padding: "2rem",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#1a1a1a", // Matches --bg-secondary
          borderRadius: "16px",
          padding: "2rem",
          maxWidth: "600px", // Adjusted max-width for the voice app
          width: "100%",
          position: "relative",
          maxHeight: "90vh",
          overflowY: "auto",
          border: "1px solid #333",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
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
        <VoiceQnA /> {/* Render the VoiceQnA component inside the modal */}
      </Box>

      <style jsx>{`
        /* Custom Scrollbar for Webkit browsers */
        /* Target the inner Box that has overflowY: auto */
        .MuiBox-root[style*="max-height: 90vh"]::-webkit-scrollbar {
          width: 8px; /* Width of the scrollbar */
        }

        .MuiBox-root[style*="max-height: 90vh"]::-webkit-scrollbar-track {
          background: #2a2a2a; /* Color of the track */
          border-radius: 10px;
        }

        .MuiBox-root[style*="max-height: 90vh"]::-webkit-scrollbar-thumb {
          background-color: var(--accent); /* Color of the scroll thumb */
          border-radius: 10px;
          border: 2px solid #2a2a2a; /* Padding around the thumb */
        }

        .MuiBox-root[style*="max-height: 90vh"]::-webkit-scrollbar-thumb:hover {
          background-color: #f59e0b; /* Darker accent on hover */
        }
      `}</style>
    </Box>
  )
}

export default VoiceQnAModal
