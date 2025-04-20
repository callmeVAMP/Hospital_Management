import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  DialogContentText,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { History } from "@mui/icons-material";

const genderOptions = ["Male", "Female", "Other"];

export default function DoctorForm({ open, onClose, onSave, initialData }) {
  const [doctor, setDoctor] = useState({
    id: "",
    name: "",
    gender: "Male",
    department: "",
    specialization: "",
    degree: "",
    mobile: "",
    email: "",
    joiningDate: "",
    consultationFee: "",
    availability: "",
    clinicLocation: "",
    address: ""
  });

  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [errors, setErrors] = useState({});

  const doctorHistory = [
    { date: "2023-02-12", procedure: "Angioplasty", patient: "John Doe" },
    { date: "2023-04-05", procedure: "Bypass Surgery", patient: "Mary Smith" },
  ];

  useEffect(() => {
    if (initialData) {
      setDoctor(initialData);
    } else {
      setDoctor({
        id: "",
        name: "",
        gender: "Male",
        department: "",
        specialization: "",
        degree: "",
        mobile: "",
        email: "",
        joiningDate: "",
        consultationFee: "",
        availability: "",
        clinicLocation: "",
        address: ""
      });
    }
    setErrors({});
  }, [initialData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Required fields validation
    if (!doctor.id) {
      newErrors.id = "ID is required";
      isValid = false;
    }
    if (!doctor.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!doctor.specialization) {
      newErrors.specialization = "Specialization is required";
      isValid = false;
    }
    if (!doctor.department) {
      newErrors.department = "Department is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    
    // Transform data for backend before passing to parent component
    const transformedData = {
      ...doctor,
      // Force gender to match expected format
      gender: doctor.gender || "Male"
    };
    
    onSave(transformedData);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>
          {initialData ? "Edit Doctor" : "Add Doctor"}
          {initialData && (
            <IconButton
              onClick={() => setShowHistoryModal(true)}
              sx={{ float: "right" }}
            >
              <History />
            </IconButton>
          )}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {/* Essential fields first */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="ID"
                name="id"
                value={doctor.id || ""}
                onChange={handleChange}
                disabled={!!initialData}
                error={!!errors.id}
                helperText={errors.id || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Name"
                name="name"
                value={doctor.name || ""}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                required
                label="Gender"
                name="gender"
                value={doctor.gender || "Male"}
                onChange={handleChange}
              >
                {genderOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Department"
                name="department"
                value={doctor.department || ""}
                onChange={handleChange}
                error={!!errors.department}
                helperText={errors.department || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Specialization"
                name="specialization"
                value={doctor.specialization || ""}
                onChange={handleChange}
                error={!!errors.specialization}
                helperText={errors.specialization || ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Degree"
                name="degree"
                value={doctor.degree || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mobile"
                name="mobile"
                value={doctor.mobile || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={doctor.email || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Joining Date"
                name="joiningDate"
                type="date"
                value={doctor.joiningDate || ""}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Consultation Fee"
                name="consultationFee"
                value={doctor.consultationFee || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Availability"
                name="availability"
                value={doctor.availability || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Clinic Location"
                name="clinicLocation"
                value={doctor.clinicLocation || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={doctor.address || ""}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Doctor History Modal */}
      <Dialog
        open={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Operation History for {doctor.name}
        </DialogTitle>
        <DialogContent dividers>
          {doctorHistory.length > 0 ? (
            <List>
              {doctorHistory.map((entry, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={entry.procedure}
                      secondary={`Date: ${entry.date} — Patient: ${entry.patient}`}
                    />
                  </ListItem>
                  {index < doctorHistory.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          ) : (
            <DialogContentText>No history available.</DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowHistoryModal(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
