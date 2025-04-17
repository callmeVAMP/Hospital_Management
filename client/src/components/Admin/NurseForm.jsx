// import React, { useState, useEffect } from 'react';
// import {
//   Dialog, DialogTitle, DialogContent, DialogActions,
//   TextField, Button, MenuItem, Grid, InputAdornment, Box
// } from '@mui/material';
// import {
//   Person, Home, Phone, Wc
// } from '@mui/icons-material';

// const genderOptions = ['Male', 'Female', 'Other'];

// const AddNurse = ({ open, onClose, onSave, initialData }) => {
//   const [formData, setFormData] = useState({
//     id: '',
//     name: '',
//     address: '',
//     phone: '',
//     gender: ''
//   });

//   useEffect(() => {
//     if (initialData) {
//       setFormData(initialData);
//     } else {
//       setFormData({
//         id: '',
//         name: '',
//         address: '',
//         phone: '',
//         gender: ''
//       });
//     }
//   }, [initialData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = () => {
//     const dataToSave = {
//       ...formData,
//       id: formData.id || Date.now().toString(),
//     };
//     onSave(dataToSave);
//     onClose();
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle>
//         <Person sx={{ mr: 1 }} />
//         {initialData ? "Edit Nurse" : "Add New Nurse"}
//       </DialogTitle>
//       <DialogContent dividers>
//         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth required label="Name" name="name"
//                 value={formData.name} onChange={handleChange}
//                 InputProps={{
//                   startAdornment: <InputAdornment position="start"><Person /></InputAdornment>
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth label="Address" name="address"
//                 value={formData.address} onChange={handleChange}
//                 InputProps={{
//                   startAdornment: <InputAdornment position="start"><Home /></InputAdornment>
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth label="Phone" name="phone"
//                 value={formData.phone} onChange={handleChange}
//                 InputProps={{
//                   startAdornment: <InputAdornment position="start"><Phone /></InputAdornment>
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 select fullWidth required label="Gender" name="gender"
//                 value={formData.gender} onChange={handleChange}
//               >
//                 {genderOptions.map((g) => (
//                   <MenuItem key={g} value={g}>{g}</MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//           </Grid>
//         </Box>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="error">Cancel</Button>
//         <Button onClick={handleSubmit} variant="contained" color="primary">
//           {initialData ? "Update" : "Save"}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default AddNurse;


import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

const NurseForm = ({ open, onClose, initialData, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    email: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: "",
        department: "",
        email: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const method = initialData ? "PUT" : "POST";
    const url = initialData
      ? `/api/nurses/${initialData.nurse_id}`
      : "/api/nurses";

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error saving nurse:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? "Edit Nurse" : "Add Nurse"}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          name="name"
          fullWidth
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Department"
          name="department"
          fullWidth
          value={formData.department}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Email"
          name="email"
          fullWidth
          value={formData.email}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {initialData ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NurseForm;
