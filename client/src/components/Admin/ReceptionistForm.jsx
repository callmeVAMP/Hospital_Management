import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";

export default function ReceptionistForm({ open, onClose, initialData, onSuccess }) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    address: "",
    phone: "",
    gender: "",
    email: "",
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        id: "",
        name: "",
        address: "",
        phone: "",
        gender: "",
        email: "",
      });
    }
  }, [initialData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.id || !formData.name) {
      setSnackbar({ open: true, message: "ID and Name are required.", severity: "error" });
      return;
    }

    try {
      if (initialData) {
        // Update existing receptionist
        await axios.put(`/admin/update_receptionist/${formData.id}`, {
          HName: formData.name,
          HAddr: formData.address,
          HPhNo: formData.phone,
          HGender: formData.gender,
          Email: formData.email,
        });
        setSnackbar({ open: true, message: "Receptionist updated successfully.", severity: "success" });
      } else {
        // Add new receptionist
        await axios.post("/admin/add_receptionist", {
          HID: formData.id,
          HName: formData.name,
          HAddr: formData.address,
          HPhNo: formData.phone,
          HGender: formData.gender,
          Email: formData.email,
        });
        setSnackbar({ open: true, message: "Receptionist added successfully.", severity: "success" });
      }
      if (onSuccess) onSuccess(); // Notify parent to refresh data
      onClose();
    } catch (error) {
      setSnackbar({
        open: true,
        message: error?.response?.data || "An error occurred.",
        severity: "error",
      });
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{initialData ? "Edit Receptionist" : "Add Receptionist"}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              margin="dense"
              label="ID *"
              name="id"
              fullWidth
              value={formData.id}
              onChange={handleChange}
              disabled={!!initialData}
            />
            <TextField
              margin="dense"
              label="Name *"
              name="name"
              fullWidth
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Address"
              name="address"
              fullWidth
              value={formData.address}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Phone Number"
              name="phone"
              fullWidth
              value={formData.phone}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              label="Email"
              name="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              select
              label="Gender"
              name="gender"
              fullWidth
              value={formData.gender}
              onChange={handleChange}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {initialData ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
