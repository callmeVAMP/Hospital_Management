import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
  Box,
} from "@mui/material";

const mockHistory = {
  "1": [
    {
      procedure: "Blood Transfusion",
      date: "2023-01-15",
      patient: "Jane Doe",
    },
    {
      procedure: "Pre-Op Assistance",
      date: "2023-03-20",
      patient: "Alice Johnson",
    },
  ],
  "2": [
    {
      procedure: "Post-Surgery Monitoring",
      date: "2023-02-25",
      patient: "Michael Green",
    },
  ],
};

export default function NurseHistoryDialog({ open, onClose, nurse }) {
  const history = nurse ? mockHistory[nurse.id] || [] : [];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Operation History for Nurse {nurse?.name || ""}
      </DialogTitle>
      <DialogContent dividers>
        {history.length === 0 ? (
          <Typography>No records found.</Typography>
        ) : (
          history.map((entry, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography fontWeight="bold">{entry.procedure}</Typography>
              <Typography variant="body2">
                Date: {entry.date} — Patient: {entry.patient}
              </Typography>
              {index < history.length - 1 && <Divider sx={{ mt: 1 }} />}
            </Box>
          ))
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          CLOSE
        </Button>
      </DialogActions>
    </Dialog>
  );
}
