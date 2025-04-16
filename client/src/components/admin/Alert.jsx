import React from "react";
import { Snackbar, Alert } from "@mui/material";

const AlertBar = ({ open, onClose, message, severity = "success", duration = 3000 }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        icon={false}
        onClose={onClose}
        severity={severity}
        sx={{ width: "100%", backgroundColor: severity === "success" ? "#4caf50" : "#f44336", color: "#fff" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertBar;