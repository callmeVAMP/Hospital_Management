import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Snackbar,
  Alert,
  MenuItem,
} from '@mui/material';

const LabTechnicianForm = ({ open, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    phone: '',
    gender: '',
    address: '',
    labId: ''
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');

  useEffect(() => {
    if (initialData) setFormData(initialData);
    else setFormData({ id: '', name: '', phone: '', gender: '', address: '', labId: '' });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.id || !formData.name || !formData.labId) {
      alert("Please fill required fields: Lab Technician's ID, Name, and Lab ID");
      return;
    }

    const successMsg = initialData
      ? 'Lab Technician Information Updated Successfully'
      : 'New Lab Technician Added Successfully';

    onSave(formData);
    setSnackbarMsg(successMsg);
    setSnackbarOpen(true);
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{initialData ? 'Edit Lab Technician' : 'Add Lab Technician'}</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" label="ID *" name="id" value={formData.id} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Name *" name="name" value={formData.name} onChange={handleChange} />
          
          <TextField
            fullWidth
            margin="dense"
            select
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>

          <TextField fullWidth margin="dense" label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Address" name="address" value={formData.address} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Lab ID *" name="labId" value={formData.labId} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {initialData ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LabTechnicianForm;
