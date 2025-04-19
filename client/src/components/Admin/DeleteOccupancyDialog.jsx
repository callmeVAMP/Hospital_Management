import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

export const DeleteOccupancyDialog = ({ open, occupancy, onCancel, onConfirm }) => {
  console.log(occupancy);
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      PaperProps={{
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
        <p><strong>Room No:</strong> {occupancy?.roomNo}</p>
        <p><strong>Patient Name:</strong> {occupancy?.patientName}</p>
        <p><strong>Room Type:</strong> {occupancy?.roomType}</p>
        <p><strong>Bed No:</strong> {occupancy?.bedNo}</p>
        <p><strong>Admission Date:</strong> {occupancy?.admissionDate}</p>
        <p><strong>Amount Charged:</strong> {occupancy?.amount}</p>
        <p><strong>Status:</strong> {occupancy?.status}</p>
        
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
