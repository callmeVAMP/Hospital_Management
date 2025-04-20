import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";

const doctors = ["Dr. Smith", "Dr. Johnson", "Dr. Williams"];

export default function AppointmentForm() {
  const navigate = useNavigate();

  // Dummy patient database (could be fetched from a real DB)
  const [patients, setPatients] = useState([
    { patientName: "John Doe", phone: "1234567890" },
    { patientName: "Jane Smith", phone: "9876543210" },
  ]);

  const [appointments, setAppointments] = useState([]);
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

    const exists = patients.some(
      (p) =>
        p.patientName.toLowerCase().trim() ===
          formData.patientName.toLowerCase().trim() &&
        p.phone.trim() === formData.phone.trim()
    );

    if (!exists) {
      // Redirect to register page with form data (optional: pass via state)
      navigate("/Receptionist/PatientRegistrationForm", { state: { prefill: formData } });
      return;
    }

    // Save appointment
    setAppointments([...appointments, formData]);
    console.log("Appointment Booked:", formData);

    // Reset form
    setFormData({
      patientName: "",
      phone: "",
      gender: "",
      doctor: "",
      problem: "",
      priority: "",
    });
  };

  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        mt: 0,
        backgroundColor: "#f0f4ff",
        pt: 10,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          maxWidth: 800,
          width: "100%",
          p: 5,
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Book an Appointment
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
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
                sx={{ "& .MuiInputBase-root": { height: 56 } }}
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
                sx={{ "& .MuiInputBase-root": { height: 56 } }}
              >
                {doctors.map((doc, index) => (
                  <MenuItem key={index} value={doc}>
                    {doc}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

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

            <Grid item size={6}>
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
        </Box>
      </Paper>
    </Box>
  );
}


