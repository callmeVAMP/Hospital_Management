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

export default function TreatmentForm({ open, onClose, onSave, initialData }) {
  const [treatment, setTreatment] = useState({
    name: "",
    type: "",
    description: "",
    cost: "",
    startDate: "",
    endDate: "",
    doctorInCharge: "",
    patientName: "",
  });

  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const treatmentHistory = [
    { date: "2023-01-15", name: "Chemotherapy", patient: "John Doe" },
    { date: "2023-03-10", name: "Physiotherapy", patient: "Jane Smith" },
  ];

  useEffect(() => {
    if (initialData) {
      setTreatment(initialData);
    } else {
      setTreatment({
        name: "",
        type: "",
        description: "",
        cost: "",
        startDate: "",
        endDate: "",
        doctorInCharge: "",
        patientName: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTreatment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (onSave) {
      onSave(treatment);
    }
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>
          {initialData ? "Edit Treatment" : "Add Treatment"}
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
              { label: "Treatment Name", name: "name" },
              { label: "Type", name: "type" },
              { label: "Description", name: "description" },
              { label: "Cost", name: "cost", type: "number" },
              { label: "Start Date", name: "startDate", type: "date" },
              { label: "End Date", name: "endDate", type: "date" },
              { label: "Doctor In Charge", name: "doctorInCharge" },
              { label: "Patient Name", name: "patientName" },
            ].map(({ label, name, type = "text" }) => (
              <Grid item xs={12} sm={6} key={name}>
                <TextField
                  fullWidth
                  label={label}
                  name={name}
                  type={type}
                  value={treatment[name]}
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

      {/* Treatment History Modal */}
      <Dialog
        open={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          History for {treatment.name}
        </DialogTitle>
        <DialogContent dividers>
          {treatmentHistory.length > 0 ? (
            <List>
              {treatmentHistory.map((entry, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={entry.name}
                      secondary={`Date: ${entry.date} — Patient: ${entry.patient}`}
                    />
                  </ListItem>
                  {index < treatmentHistory.length - 1 && <Divider />}
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
