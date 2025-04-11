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
      <DialogTitle sx={{ fontSize: "2rem" }}>Are you sure?</DialogTitle>
      <DialogContent>
        <p><strong>Room ID:</strong> {room?.id}</p>
        <p><strong>Bed Capacity:</strong> {room?.row?.bedCapacity}</p>
        <p><strong>Room Category:</strong> {room?.row?.roomCategory}</p>
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
