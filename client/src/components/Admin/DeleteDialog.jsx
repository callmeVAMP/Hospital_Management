import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const DeleteDialog = ({
  open,
  title = "Are you sure?",
  data = {},
  fields = [],
  onCancel,
  onConfirm,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      fullWidth
      maxWidth="sm" // You can increase this to "md" if needed
    >
      <DialogTitle sx={{ fontSize: "1.7rem", textAlign: "center" }}>
        {title}
      </DialogTitle>
      <DialogContent sx={{ px: 4, py: 2 }}>
        {fields.map((field) => (
          <Typography key={field.key} sx={{ fontSize: "1.1rem", my: 1 }}>
            <strong>{field.label}:</strong> {data?.[field.key] ?? "N/A"}
          </Typography>
        ))}
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", gap: 2, pb: 3 }}>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          size="large"
        >
          Delete
        </Button>
        <Button
          onClick={onCancel}
          variant="contained"
          color="primary"
          size="large"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
