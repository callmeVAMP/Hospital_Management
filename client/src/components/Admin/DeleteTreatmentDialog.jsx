import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

export const DeleteTreatmentDialog = ({ open, trData, onCancel, onConfirm }) => {
  console.log("in",trData);
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
        <p><strong>Patient Name:</strong> {trData?.patientName}</p>
        <p><strong>Start Date Time:</strong> {trData?.startDate} {trData?.startTime}</p>
        <p><strong>End Date Time:</strong> {trData?.endDate} {trData?.endTime}</p>
        <p><strong>Treatment Description:</strong> {trData?.name}</p>
        
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", gap: 2, pb: 2 }}>
        <Button
          onClick={()=>onConfirm(trData?.treatmentID)}
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
