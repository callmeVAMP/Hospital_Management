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
} from "@mui/material";

const genders = ["Male", "Female", "Other"];

export default function AddLabTechnician({ open, onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    address: "",
    phone: "",
    gender: "",
    labId: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        id: Date.now().toString(),
        name: "",
        address: "",
        phone: "",
        gender: "",
        labId: "",
      });
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialData ? "Edit Lab Technician" : "Add Lab Technician"}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="Gender"
              value={formData.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
            >
              {genders.map((g) => (
                <MenuItem key={g} value={g}>
                  {g}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Lab ID"
              value={formData.labId}
              onChange={(e) => handleChange("labId", e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ pr: 3, pb: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {initialData ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

