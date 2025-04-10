import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Typography,
  Paper,
  Box,
} from "@mui/material";

const doctors = ["Dr. Smith", "Dr. Johnson", "Dr. Williams"];

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    patientName: "",
    phone: "",
    gender: "",
    doctor: "",
    problem: "",
    priority: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f0f0f0",
        p: 4,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: "100%",
          width: "100%",
          p: 5,
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Book Appointment
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Patient Name"
                name="patientName"
                fullWidth
                required
                value={formData.patientName}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Phone Number"
                name="phone"
                fullWidth
                required
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                select
                label="Gender"
                name="gender"
                fullWidth
                required
                value={formData.gender}
                onChange={handleChange}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                select
                label="Doctor"
                name="doctor"
                fullWidth
                required
                value={formData.doctor}
                onChange={handleChange}
              >
                {doctors.map((doc, index) => (
                  <MenuItem key={index} value={doc}>
                    {doc}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                select
                label="Priority"
                name="priority"
                fullWidth
                required
                value={formData.priority}
                onChange={handleChange}
              >
                <MenuItem value="Emergency">Emergency</MenuItem>
                <MenuItem value="Normal">Normal</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={8}>
              <TextField
                label="Problem"
                name="problem"
                multiline
                rows={4}
                fullWidth
                value={formData.problem}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={4} display="flex" alignItems="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ height: "100%" }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}
