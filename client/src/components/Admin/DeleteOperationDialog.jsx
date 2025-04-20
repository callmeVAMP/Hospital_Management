import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

export const DeleteOperationDialog = ({ open, opData, onCancel, onConfirm }) => {
  // console.log("in",opData);
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      slotProps={{
        sx: {
          borderRadius: 3,
          padding: 2,
          minWidth: 300,
        //   textAlign: "center",
        },
      }}
    >
      <DialogTitle sx={{ fontSize: "2rem" }}>Are you sure you want to delete?</DialogTitle>
      <DialogContent>
        <p><strong>Patient Name:</strong> {opData?.patientName}</p>
        <p><strong>Start Date Time:</strong> {opData?.startDate} {opData?.startTime}</p>
        <p><strong>End Date Time:</strong> {opData?.endDate} {opData?.endTime}</p>
        <p><strong>Operation Type:</strong> {opData?.opType}</p>
        <p><strong>HealthCare Professionals Involved:</strong> {opData?.professionals.join(', ')}</p>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", gap: 2, pb: 2 }}>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          sx={{ borderRadius: "999px", px: 3 }}
        >
          Delete
        </Button>
        <Button
          onClick={onCancel}
          variant="contained"
          color="primary"
          sx={{ borderRadius: "999px", px: 3 }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
