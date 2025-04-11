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

const doctors = ["Dr. Smith", "Dr. Johnson", "Dr. Williams"];

// Modified to accept props for integration with parent component
export default function AppointmentForm({ initialData = {}, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    patientName: "",
    phone: "",
    gender: "",
    doctor: "",
    problem: "",
    priority: "",
  });

  // Load initial data when editing
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        patientName: initialData.patientName || "",
        phone: initialData.phone || "",
        gender: initialData.gender || "",
        doctor: initialData.doctor || "",
        problem: initialData.problem || "",
        priority: initialData.priority || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call parent component's onSave function
    if (onSave) {
      onSave(formData);
    } else {
      console.log(formData);
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
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item size={6}>
              <TextField
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item size={4}>
              <TextField
                select
                label="Gender"
                name="gender"
                value={formData.gender}
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
                name="priority"
                value={formData.priority}
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
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                fullWidth
                required
                size="medium"
                sx={{ '& .MuiInputBase-root': { height: 56 } }}
              >
                {doctors.map((doc, index) => (
                  <MenuItem key={index} value={doc}>
                    {doc}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Problem */}
            <Grid item size={12}>
              <TextField
                label="Describe the Problem"
                name="problem"
                value={formData.problem}
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
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}


