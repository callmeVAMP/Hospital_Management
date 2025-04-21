import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from "@mui/material";

export default function TreatmentForm({ open, onClose, onSave, initialData }) {
  const [treatment, setTreatment] = useState({
    id: "",
    treatmentID: null,
    name: "",
    // description: "",
    // cost: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    patientName: "",
  });

  useEffect(() => {
    if (initialData) {
      setTreatment(initialData);
    } else {
      setTreatment({
        id: "",
        treatmentID: null,
        name: "",
        // description: "",
        // cost: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        patientName: "",
      });
    }
  }, [initialData]);

  const type=initialData? "edit" : "add"

  function convertTo24Hour(time12h) {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
  
    if (modifier === 'PM' && hours !== '12') {
      hours = String(parseInt(hours) + 12);
    }
    if (modifier === 'AM' && hours === '12') {
      hours = '00';
    }
  
    return `${hours.padStart(2, '0')}:${minutes}`;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTreatment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // if (!treatment.name || !treatment.patientName) {
    //   alert("Please fill required fields: Treatment Name and Patient Name");
    //   return;
    // }
    // if (!treatment.id) {
    //   treatment.id = Date.now().toString(); // auto-generate ID if not provided
    // }
    // onSave(treatment);
    // onClose();
    if (onSave) {
      onSave(treatment,type);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialData ? "Edit Treatment" : "Add Treatment"}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={6}>
            <TextField
            type="number"
              fullWidth
              label="Treatment ID"
              name="id"
              value={treatment.treatmentID}
              disabled={initialData}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} sx={{ width: '262px' }}>
            <TextField
              fullWidth
              label="Treatment Name *"
              name="name"
              value={treatment.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Patient Name *"
              name="patientName"
              value={treatment.patientName}
              disabled={initialData}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Start Date"
              name="startDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={treatment.startDate}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Start Time"
              name="startTime"
              type="time"
              InputLabelProps={{ shrink: true }}
              value={convertTo24Hour(treatment.startTime)}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="End Date"
              name="endDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={treatment.endDate}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="End Time"
              name="endTime"
              type="time"
              InputLabelProps={{ shrink: true }}
              value={convertTo24Hour(treatment.endTime)}
              onChange={handleChange}
            />
          </Grid>
          {/* <Grid item xs={6}>
            <TextField
              fullWidth
              label="Cost"
              name="cost"
              type="number"
              value={treatment.cost}
              onChange={handleChange}
              inputProps={{ min: 0 }}
            />
          </Grid> */}
          {/* <Grid item xs={12} sx={{ width: '497px' }}>
            <TextField
              fullWidth
              multiline
              label="Description"
              name="description"
              value={treatment.description}
              onChange={handleChange}
              rows={3}
            />
          </Grid> */}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}
       disabled={
        
        !treatment.patientName ||
        
        !treatment.startDate ||
        !treatment.startTime ||
        !treatment.endDate ||
        !treatment.endTime ||
        !treatment.name 
        
      }
        
        
        >
          {initialData ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
