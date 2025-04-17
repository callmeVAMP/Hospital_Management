// import React, { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   MenuItem,
//   Grid,
// } from "@mui/material";

// const genders = ["Male", "Female", "Other"];

// export default function AddLabTechnician({ open, onClose, onSave, initialData }) {
//   const [formData, setFormData] = useState({
//     id: "",
//     name: "",
//     address: "",
//     phone: "",
//     gender: "",
//     labId: "",
//   });

//   useEffect(() => {
//     if (initialData) {
//       setFormData(initialData);
//     } else {
//       setFormData({
//         id: Date.now().toString(),
//         name: "",
//         address: "",
//         phone: "",
//         gender: "",
//         labId: "",
//       });
//     }
//   }, [initialData]);

//   const handleChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleSubmit = () => {
//     onSave(formData);
//     onClose();
//   };

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
//       <DialogTitle>{initialData ? "Edit Lab Technician" : "Add Lab Technician"}</DialogTitle>
//       <DialogContent>
//         <Grid container spacing={2} mt={1}>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Name"
//               value={formData.name}
//               onChange={(e) => handleChange("name", e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Address"
//               value={formData.address}
//               onChange={(e) => handleChange("address", e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Phone"
//               value={formData.phone}
//               onChange={(e) => handleChange("phone", e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <TextField
//               select
//               fullWidth
//               label="Gender"
//               value={formData.gender}
//               onChange={(e) => handleChange("gender", e.target.value)}
//             >
//               {genders.map((g) => (
//                 <MenuItem key={g} value={g}>
//                   {g}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </Grid>
//           <Grid item xs={6}>
//             <TextField
//               fullWidth
//               label="Lab ID"
//               value={formData.labId}
//               onChange={(e) => handleChange("labId", e.target.value)}
//             />
//           </Grid>
//         </Grid>
//       </DialogContent>
//       <DialogActions sx={{ pr: 3, pb: 2 }}>
//         <Button onClick={onClose}>Cancel</Button>
//         <Button variant="contained" onClick={handleSubmit}>
//           {initialData ? "Update" : "Add"}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }


import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Snackbar,
  Alert
} from '@mui/material';

const LabTechnicianForm = ({ open, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
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
    else setFormData({ name: '', phone: '', gender: '', address: '', labId: '' });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const successMsg = initialData
      ? 'Lab Technician Information Updated Successfully'
      : 'New Lab Technician Added Successfully';

    onSave(formData);  // Call parent handler
    setSnackbarMsg(successMsg);
    setSnackbarOpen(true);
    onClose();         // Close the dialog
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{initialData ? 'Edit Lab Technician' : 'Add Lab Technician'}</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" label="Name" name="name" value={formData.name} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Gender" name="gender" value={formData.gender} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Address" name="address" value={formData.address} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Lab ID" name="labId" value={formData.labId} onChange={handleChange} />
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

