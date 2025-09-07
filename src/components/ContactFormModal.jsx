import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Snackbar,
} from "@mui/material";

const ContactFormModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5001/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message.");
      }

      setSnackbar({
        open: true,
        message: result.message,
        severity: "success",
      });

      // Clear the form and close the modal after a short delay for feedback
      setTimeout(() => {
        setFormData({ name: "", email: "", message: "" });
        onClose();
      }, 1500);
    } catch (error) {
      console.error("Error:", error);
      setSnackbar({
        open: true,
        message: error.message,
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

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
          backgroundColor: "#1a1a1a",
          borderRadius: "16px",
          padding: "2rem",
          maxWidth: "500px",
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
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </IconButton>

        <Typography
          variant="h5"
          component="h2"
          sx={{
            color: "#ffffff",
            fontWeight: 700,
            marginBottom: "0.5rem",
            textAlign: "center",
          }}
        >
          Send Message
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#cccccc",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          {"Let's start the conversation"}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{ marginBottom: "1.5rem" }}>
            <Typography variant="body2" sx={{ color: "#ffffff", marginBottom: "0.5rem" }}>
              Name
            </Typography>
            <TextField
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#333",
                  "& fieldset": { borderColor: "#555" },
                  "&:hover fieldset": { borderColor: "#fbbf24" },
                  "&.Mui-focused fieldset": { borderColor: "#fbbf24" },
                  "& input": { color: "#ffffff" },
                },
                "& .MuiInputLabel-root": { color: "#cccccc" },
              }}
            />
          </Box>

          <Box sx={{ marginBottom: "1.5rem" }}>
            <Typography variant="body2" sx={{ color: "#ffffff", marginBottom: "0.5rem" }}>
              Email
            </Typography>
            <TextField
              fullWidth
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#333",
                  "& fieldset": { borderColor: "#555" },
                  "&:hover fieldset": { borderColor: "#fbbf24" },
                  "&.Mui-focused fieldset": { borderColor: "#fbbf24" },
                  "& input": { color: "#ffffff" },
                },
                "& .MuiInputLabel-root": { color: "#cccccc" },
              }}
            />
          </Box>

          <Box sx={{ marginBottom: "1.5rem" }}>
            <Typography variant="body2" sx={{ color: "#ffffff", marginBottom: "0.5rem" }}>
              Message
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={5}
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#333",
                  "& fieldset": { borderColor: "#555" },
                  "&:hover fieldset": { borderColor: "#fbbf24" },
                  "&.Mui-focused fieldset": { borderColor: "#fbbf24" },
                  "& textarea": { color: "#ffffff" },
                },
                "& .MuiInputLabel-root": { color: "#cccccc" },
              }}
            />
          </Box>

          <Button
            type="submit"
            fullWidth
            disabled={loading}
            sx={{
              backgroundColor: "#fbbf24",
              color: "#000",
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              fontWeight: 600,
              "&:hover": { backgroundColor: "#f59e0b" },
            }}
          >
            {loading ? "Sending..." : "Send message"}
          </Button>
        </form>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbar.message}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
};

export default ContactFormModal;