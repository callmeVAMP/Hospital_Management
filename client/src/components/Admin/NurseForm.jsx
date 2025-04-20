import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem
} from "@mui/material";

export default function NurseForm({ open, onClose, initialData, onSave }) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    address: "",
    phone: "",
    gender: "",
    email: "", // Optional, if you want to support email
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || "",
        name: initialData.name || "",
        address: initialData.address || "",
        phone: initialData.phone || "",
        gender: initialData.gender || "",
        email: initialData.email || "",
      });
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
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.id || !formData.name) {
      alert("Please fill required fields: Nurse's ID, Nurse Name");
      return;
    }
    if (onSave) {
      onSave(formData);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? "Edit Nurse" : "Add Nurse"}</DialogTitle>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {initialData ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
