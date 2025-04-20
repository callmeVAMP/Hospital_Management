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
import axios from "axios"; // Import axios
export default function PatientRegistrationForm() {
  const [formData, setFormData] = useState({
    PName: "",
    //lastName: "",
    PGender: "",
    PPhNo: "",
    PAddr: "",
    DOB: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      // Send the form data to your backend API using Axios
      const response = await axios.post("http://localhost:3000/patient/add", formData);
      console.log("output dataa");
      console.log(response.status);
      if (response.status === 200) {
        // Show success alert if the patient was registered successfully
        setSuccess(true);
        setError(false);
        // After successful patient registration
            const pendingData = localStorage.getItem("pendingAppointment");

            if (pendingData) {
            // Redirect back to appointment form
            window.location.href = "/receptionist/AppointmentForm"; // Update to your actual route
            }

        // Reset the form after submission
        setFormData({
          PName: "",
          //lastName: "",
          PGender: "",
          PPhNo: "",
          PAddr: "",
          DOB: "",
        });

        // Auto-hide success message after 3 seconds
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    } catch (error) {
      // Show error alert if there was an issue with the API request
      setError(true);
      console.error("Error registering patient:", error);
    }
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
          Patient Registration Form
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Collapse in={success}>
          <Alert severity="success" sx={{ mb: 3 }}>
            Patient successfully registered!
          </Alert>
        </Collapse>

        <Collapse in={error}>
          <Alert severity="error" sx={{ mb: 3 }}>
            Error registering patient! Please try again.
          </Alert>
        </Collapse>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item size={6}>
              <TextField
                label="First Name"
                name="PName"
                value={formData.PName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            {/* <Grid size={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid> */}

            <Grid item size={6}>
              <TextField
                select
                label="Gender"
                name="PGender"
                value={formData.PGender}
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
                name="PPhNo"
                value={formData.PPhNo}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item size={12}>
              <TextField
                label="Address"
                name="PAddr"
                value={formData.PAddr}
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
                name="DOB"
                type="date"
                value={formData.DOB}
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
