import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

export const DeleteLabDialog = ({ open, labTest, onCancel, onConfirm }) => {
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
        <p><strong>Lab Room No:</strong> {labTest?.labRoomNo}</p>
        <p><strong>Lab Name:</strong> {labTest?.labName}</p>
        <p><strong>Tests performed:</strong> {labTest?.row?.testsPerformed?.join(', ')}</p>
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
