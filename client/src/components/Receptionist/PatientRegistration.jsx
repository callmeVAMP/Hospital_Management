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
  Alert,
  Collapse,
} from "@mui/material";

export default function PatientRegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    mobile: "",
    address: "",
    dob: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Do something with formData (e.g. API call)
    console.log("Patient Registered:", formData);

    // Show success alert
    setSuccess(true);

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      gender: "",
      mobile: "",
      address: "",
      dob: "",
    });

    // Auto-hide success message after 3 seconds
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
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
          Patient Registration Form
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Collapse in={success}>
          <Alert severity="success" sx={{ mb: 3 }}>
            Patient successfully registered!
          </Alert>
        </Collapse>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item size={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid size={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item size={6}>
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

            <Grid item size={6}>
              <TextField
                label="Mobile Number"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item size={12}>
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
                multiline
                rows={2}
                required
              />
            </Grid>

            <Grid item size={5}>
              <TextField
                label="Date of Birth"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                fullWidth
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{ py: 1.5 }}
              >
                Register Patient
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}
