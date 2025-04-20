import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Typography,
  Paper,
  Box,
  Divider,
} from "@mui/material";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material"; // ✅ import Snackbar and Alert
// Modified to accept props for integration with parent component
export default function AppointmentForm({ initialData = {}, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    PName: "",
    PPhNo: "",
    PGender: "",
    HName: "",
    Problem: "",
    Priority: "",
  });
  const [shouldAutoSubmit, setShouldAutoSubmit] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false); // ✅ for showing message
  const [snackbarMessage, setSnackbarMessage] = useState(""); // optional message


  // Fetch doctor list from backend
  useEffect(() => {
    axios
      .get("http://localhost:3000/doctor/all") // replace with your actual backend URL
      .then((res) => {
        setDoctors(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch doctors", err);
      });
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem("pendingAppointment");
    console.log(savedData)
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      
      setFormData(parsedData);
      localStorage.removeItem("pendingAppointment");
  
      // Try to rebook appointment after slight delay
      setShouldAutoSubmit(true); 
  

     

    }
  }, []);
  
  useEffect(() => {
    if (shouldAutoSubmit) {
      handleSubmit({ preventDefault: () => {} });
      setShouldAutoSubmit(false);
    }
  }, [formData, shouldAutoSubmit]);

  // Load initial data when editing
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        PName: initialData.PName || "",
        PPhNo: initialData.PPhNo || "",
        PGender: initialData.PGender || "",
        HName: initialData.HName || "",
        Problem: initialData.Problem || "",
        Priority: initialData.Priority || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/appointment/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // if (!response.ok) {
      //   throw new Error("Failed to add appointment");
      // }

      if (!response.ok) {
        const result = await response.json(); // Move this up here
        console.log(result.error);
        if (response.status === 404 && result.error === "Patient not found") {
          // Save current form data to localStorage
          localStorage.setItem("pendingAppointment", JSON.stringify(formData));
  
          // Redirect to patient registration page
          window.location.href = "/receptionist/PatientRegistrationForm"; // Update this to your actual route
          return;
        }
        throw new Error(result.error || "Failed to add appointment");
      }

      const result = await response.json();
      console.log("Appointment added:", result);
      setSnackbarMessage("Appointment booked successfully!"); // ✅
      setShowSnackbar(true); // ✅
      setFormData({
        PName: initialData.PName || "",
        PPhNo: initialData.PPhNo || "",
        PGender: initialData.PGender || "",
        HName: initialData.HName || "",
        Problem: initialData.Problem || "",
        Priority: initialData.Priority || "",
      });

      if (onSave) {
        onSave(result);
      }

    } catch (error) {
      console.error("Error adding appointment:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f5f6fa",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          maxWidth: 900,
          width: "100%",
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Book an Appointment
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Patient Info */}
            <Grid item size={6}>
              <TextField
                label="Patient Name"
                name="PName"
                value={formData.PName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item size={6}>
              <TextField
                label="Phone Number"
                name="PPhNo"
                value={formData.PPhNo}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item size={4}>
              <TextField
                select
                label="Gender"
                name="PGender"
                value={formData.PGender}
                onChange={handleChange}
                fullWidth
                required
                size="medium"
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>

            <Grid item size={4}>
              <TextField
                select
                label="Priority"
                name="Priority"
                value={formData.Priority}
                onChange={handleChange}
                fullWidth
                required
                size="medium"
                sx={{ '& .MuiInputBase-root': { height: 56 } }}
              >
                <MenuItem value="Emergency">Emergency</MenuItem>
                <MenuItem value="Normal">Normal</MenuItem>
              </TextField>
            </Grid>

            <Grid item size={4}>
              <TextField
                select
                label="Choose Doctor"
                name="HName"
                value={formData.HName}
                onChange={handleChange}
                fullWidth
                required
                size="medium"
                sx={{ '& .MuiInputBase-root': { height: 56 } }}
              >
                {doctors.map((doc, index) => (
                  <MenuItem key={index} value={doc.HName}>
                    {doc.HName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Problem */}
            <Grid item size={12}>
              <TextField
                label="Describe the Problem"
                name="Problem"
                value={formData.Problem}
                onChange={handleChange}
                fullWidth
                multiline
                minRows={4}
              />
            </Grid>

            {/* Submit and Cancel Buttons */}
            <Grid item xs={12} container spacing={2} justifyContent="flex-end">
              {onCancel && (
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    onClick={onCancel}
                    variant="outlined"
                    fullWidth
                    size="large"
                    sx={{ py: 1.5 }}
                  >
                    Cancel
                  </Button>
                </Grid>
              )}
              <Grid item xs={12} sm={6} md={3}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{ py: 1.5 }}
                >
                  Submit Appointment
                </Button>
                              <button
                id="hidden-auto-submit-btn"
                style={{ display: "none" }}
                onClick={handleSubmit}
                >
                Auto Submit
                </button>

              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setShowSnackbar(false)} severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>

  );
}

