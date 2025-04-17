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
} from "@mui/material";
import { History } from "@mui/icons-material";

export default function DoctorForm({ open, onClose, onSave, initialData }) {
  const [doctor, setDoctor] = useState({
    name: "",
    department: "",
    specialization: "",
    degree: "",
    mobile: "",
    email: "",
    joiningDate: "",
    experience: "",
    consultationFee: "",
    rating: "",
    availability: "",
    clinicLocation: "",
  });

  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const doctorHistory = [
    { date: "2023-02-12", procedure: "Angioplasty", patient: "John Doe" },
    { date: "2023-04-05", procedure: "Bypass Surgery", patient: "Mary Smith" },
  ];

  useEffect(() => {
    if (initialData) {
      setDoctor(initialData);
    } else {
      setDoctor({
        name: "",
        department: "",
        specialization: "",
        degree: "",
        mobile: "",
        email: "",
        joiningDate: "",
        experience: "",
        consultationFee: "",
        rating: "",
        availability: "",
        clinicLocation: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (onSave) {
      onSave(doctor);
    }
    onClose();
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
            {[
              { label: "Name", name: "name" },
              { label: "Department", name: "department" },
              { label: "Specialization", name: "specialization" },
              { label: "Degree", name: "degree" },
              { label: "Mobile", name: "mobile" },
              { label: "Email", name: "email" },
              { label: "Joining Date", name: "joiningDate", type: "date" },
              { label: "Experience (yrs)", name: "experience" },
              { label: "Consultation Fee", name: "consultationFee" },
              { label: "Rating", name: "rating" },
              { label: "Availability", name: "availability" },
              { label: "Clinic Location", name: "clinicLocation" },
            ].map(({ label, name, type = "text" }) => (
              <Grid item xs={12} sm={6} key={name}>
                <TextField
                  fullWidth
                  label={label}
                  name={name}
                  type={type}
                  value={doctor[name]}
                  onChange={handleChange}
                  InputLabelProps={type === "date" ? { shrink: true } : {}}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
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
};
