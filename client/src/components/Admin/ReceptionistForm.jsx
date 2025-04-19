import React, { useState, useEffect } from "react";
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

export default function ReceptionistForm({ open, onClose, initialData, onSave }) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    address: "",
    phone: "",
    gender: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

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
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.id || !formData.name) {
      alert("Please fill required fields: Receptionist's ID, Receptionist's Name");
      return;
    }

    const successMsg = initialData
      ? "Receptionist Information Updated Successfully"
      : "New Receptionist Added Successfully";

    if (onSave) {
      onSave(formData);
    }

    setSnackbarMsg(successMsg);
    setSnackbarOpen(true);
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{initialData ? "Edit Receptionist" : "Add Receptionist"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="ID *"
            name="id"
            fullWidth
            value={formData.id}
            onChange={handleChange}
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
          <Button onClick={handleSubmit} variant="contained">
            {initialData ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: "100%" }}>
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </>
  );
}
