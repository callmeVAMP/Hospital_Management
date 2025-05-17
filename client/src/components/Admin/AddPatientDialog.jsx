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
  console.log("data" ,patientData)
  const [formData, setFormData] = useState({
    patientName: patientData.patientName || "",
    gender: "",
    patientPhone: patientData.patientPhone || "",
    address: "",
    dob: "",
  });

  const [success, setSuccess] = useState(false);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if(onSave)
    console.log({...formData,...patientData})
      onSave({...formData,...patientData});
    // setSuccess(true);

    // setTimeout(() => setSuccess(false), 3000);

    setFormData({
      name: "",
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
         Add New Patient
      </DialogTitle>
      <DialogContent dividers>
        <Collapse in={success}>
          <Alert severity="success" sx={{ mb: 2 }}>
            Patient added successfully!
          </Alert>
        </Collapse>
        <Box component="form" >
          <Grid container spacing={2}>
            <Grid size={{xs:6}}>
              <TextField
                label="Patient Name"
                name="name"
                value={formData.patientName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            
            <Grid size={{xs:6}}>
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

          </Grid>

          <Grid container spacing={2} mt={2}>
            <Grid size={{xs:6}}>
              <TextField
                label="Phone Number"
                name="mobile"
                value={formData.patientPhone}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid size={{xs:6}}>
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

          <Grid container spacing={2} mt={2}>
            <Grid size={{xs:12}}>
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
            !formData.patientName ||
            !formData.gender ||
            !formData.patientPhone ||
            !formData.address ||
            !formData.dob
          }
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPatientDialog;
