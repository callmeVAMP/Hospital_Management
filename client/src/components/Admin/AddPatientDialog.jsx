import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Grid,
  Collapse,
  Alert,
  Box,
} from "@mui/material";
import { PersonAdd } from "@mui/icons-material";

const AddPatientDialog = ({ open, onClose, onSave, patientData }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    mobile: "",
    address: "",
    dob: "",
  });

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (patientData) {
      setFormData({
        firstName: patientData.firstName || "",
        lastName: patientData.lastName || "",
        gender: patientData.gender || "",
        mobile: patientData.mobile || "",
        address: patientData.address || "",
        dob: patientData.dob || "",
      });
    }
  }, [patientData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const type = patientData ? "edit" : "add";
    onSave(formData, type);
    setSuccess(true);

    setTimeout(() => setSuccess(false), 3000);

    setFormData({
      firstName: "",
      lastName: "",
      gender: "",
      mobile: "",
      address: "",
      dob: "",
    });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <PersonAdd sx={{ mr: 1 }} />
        {patientData ? "Edit Patient Details" : "Add New Patient"}
      </DialogTitle>
      <DialogContent dividers>
        <Collapse in={success}>
          <Alert severity="success" sx={{ mb: 2 }}>
            Patient successfully {patientData ? "updated" : "registered"}!
          </Alert>
        </Collapse>
        <Box component="form">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
              <TextField
                label="Mobile Number"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
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
            <Grid item xs={6}>
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
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={
            !formData.firstName ||
            !formData.lastName ||
            !formData.gender ||
            !formData.mobile ||
            !formData.address ||
            !formData.dob
          }
        >
          {patientData ? "Update" : "Register"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPatientDialog;
