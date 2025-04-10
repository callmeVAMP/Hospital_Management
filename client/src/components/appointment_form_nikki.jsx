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

