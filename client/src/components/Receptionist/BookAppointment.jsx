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
  const [appointments, setAppointments] = useState([]); // 👈 new state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Patient Registered:", formData);

    console.log("Submitted:", formData); // log current submission

    // Add current form data to appointments list
    setAppointments((prev) => [...prev, formData]);

    // Optional: log all appointments
    console.log("All Appointments:", [...appointments, formData]);

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
      alignItems: "start", // changed from center to start
      mt: 0, // added margin-top
      backgroundColor: "#f0f4ff",
      pt: 10,
    }}
  >
    <Paper
      elevation={4}
      sx={{
        maxWidth: 800, // increased from 700
        width: "100%",
        p: 5, // increased padding
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

            {/* Gender & Priority */}
            {/* <Grid item xs={12} sm={6}>
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

            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                fullWidth
                required
              >
                <MenuItem value="Emergency">Emergency</MenuItem>
                <MenuItem value="Normal">Normal</MenuItem>
              </TextField>
            </Grid> */}

            {/* Doctor */}
            {/* <Grid item xs={12}>
              <TextField
                select
                label="Choose Doctor"
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                fullWidth
                required
              >
                {doctors.map((doc, index) => (
                  <MenuItem key={index} value={doc}>
                    {doc}
                  </MenuItem>
                ))}
              </TextField>
            </Grid> */}

<Grid item size={4}>
  <TextField
    select
    label="Gender"
    name="gender"
    value={formData.gender}
    onChange={handleChange}
    fullWidth
    required
    size="large"
    // sx={{ '& .MuiInputBase-root': { height: 56 } }} // makes it taller
  >
    <MenuItem value="Male">Male</MenuItem>
    <MenuItem value="Female">Female</MenuItem>
    <MenuItem value="Other">Other</MenuItem>
  </TextField>
</Grid>

<Grid item size={4} >
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

<Grid item size={4} >
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
            <Grid item size={12} >
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

            {/* Submit */}
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

