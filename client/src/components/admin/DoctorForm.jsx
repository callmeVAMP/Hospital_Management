// import React, { useState, useEffect } from 'react';
// import {
//   Dialog, DialogTitle, DialogContent, DialogActions,
//   TextField, Button, MenuItem, Grid, IconButton, InputAdornment,
//   Box
// } from '@mui/material';
// import {
//   Person, LocalHospital, Phone, Email, CalendarToday, School
// } from '@mui/icons-material';

// const departments = ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics'];
// const availabilityOptions = ['Morning', 'Afternoon', 'Evening'];

// const DoctorForm = ({ open, onClose, onSave, initialData }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     department: '',
//     specialization: '',
//     degree: '',
//     mobile: '',
//     email: '',
//     joiningDate: new Date().toISOString().split('T')[0],
//     experience: 0,
//     consultationFee: 0,
//     rating: 0,
//     availability: '',
//     clinicLocation: ''
//   });

//   // Populate form when editing
//   useEffect(() => {
//     if (initialData) {
//       setFormData({
//         ...initialData,
//         joiningDate: initialData.joiningDate || new Date().toISOString().split('T')[0],
//       });
//     } else {
//       setFormData({
//         name: '',
//         department: '',
//         specialization: '',
//         degree: '',
//         mobile: '',
//         email: '',
//         joiningDate: new Date().toISOString().split('T')[0],
//         experience: 0,
//         consultationFee: 0,
//         rating: 0,
//         availability: '',
//         clinicLocation: ''
//       });
//     }
//   }, [initialData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = () => {
//     // Include ID if editing
//     const dataToSave = initialData?.id
//       ? { ...formData, id: initialData.id }
//       : formData;

//     onSave(dataToSave);
//     onClose();
//   };

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
//       <DialogTitle>
//         <Person /> {initialData ? 'Edit Doctor' : 'New Doctor'}
//       </DialogTitle>

//       <DialogContent dividers>
//         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth required label="Name" name="name"
//                 value={formData.name} onChange={handleChange}
//                 InputProps={{
//                   startAdornment: <InputAdornment position="start"><Person /></InputAdornment>
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} md={12}>
//               <TextField
//                 select fullWidth required label="Department" name="department"
//                 value={formData.department} onChange={handleChange}
//               >
//                 {departments.map(dep => (
//                   <MenuItem key={dep} value={dep}>{dep}</MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//           </Grid>

//           <Grid container spacing={2}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth required label="Specialization" name="specialization"
//                 value={formData.specialization} onChange={handleChange}
//                 InputProps={{
//                   startAdornment: <InputAdornment position="start"><LocalHospital /></InputAdornment>
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth required label="Degree" name="degree"
//                 value={formData.degree} onChange={handleChange}
//                 InputProps={{
//                   startAdornment: <InputAdornment position="start"><School /></InputAdornment>
//                 }}
//               />
//             </Grid>
//           </Grid>

//           <Grid container spacing={2}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth required label="Mobile" name="mobile" type="tel"
//                 value={formData.mobile} onChange={handleChange}
//                 InputProps={{
//                   startAdornment: <InputAdornment position="start"><Phone /></InputAdornment>
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth required label="Email" name="email" type="email"
//                 value={formData.email} onChange={handleChange}
//                 InputProps={{
//                   startAdornment: <InputAdornment position="start"><Email /></InputAdornment>
//                 }}
//               />
//             </Grid>
//           </Grid>

//           <Grid container spacing={2}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth label="Joining Date" name="joiningDate" type="date"
//                 value={formData.joiningDate} onChange={handleChange}
//                 InputLabelProps={{ shrink: true }}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth label="Experience (Years)" name="experience" type="number"
//                 value={formData.experience} onChange={handleChange}
//               />
//             </Grid>
//           </Grid>

//           <Grid container spacing={2}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth required label="Consultation Fee" name="consultationFee" type="number"
//                 value={formData.consultationFee} onChange={handleChange}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 select fullWidth required label="Availability" name="availability"
//                 value={formData.availability} onChange={handleChange}
//               >
//                 {availabilityOptions.map(time => (
//                   <MenuItem key={time} value={time}>{time}</MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//           </Grid>

//           <Grid container spacing={2}>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth label="Rating" name="rating" type="number"
//                 value={formData.rating} onChange={handleChange}
//                 inputProps={{ min: 0, max: 5, step: 0.1 }}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth required label="Clinic Location" name="clinicLocation"
//                 value={formData.clinicLocation} onChange={handleChange}
//               />
//             </Grid>
//           </Grid>
//         </Box>
//       </DialogContent>

//       <DialogActions>
//         <Button onClick={onClose} color="error">Cancel</Button>
//         <Button onClick={handleSubmit} variant="contained" color="primary">Save</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default DoctorForm;


import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Grid, TextField, Button, MenuItem, InputAdornment
} from '@mui/material';
import {
  Person, School, LocalHospital, Phone, Email
} from '@mui/icons-material';

const departments = ['Cardiology', 'Dermatology', 'Neurology', 'Orthopedics'];
const availabilityOptions = ['Morning', 'Afternoon', 'Evening'];

const DoctorForm = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    degree: '',
    specialization: '',
    department: '',
    mobile: '',
    email: '',
    joiningDate: '',
    experience: '',
    consultationFee: '',
    availability: '',
    rating: '',
    clinicLocation: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Add New Doctor</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item size={6}>
            <TextField
              fullWidth required label="Name" name="name"
              value={formData.name} onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item size={6}>
            <TextField
              fullWidth required label="Degree" name="degree"
              value={formData.degree} onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <School />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              fullWidth required label="Specialization" name="specialization"
              value={formData.specialization} onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalHospital />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              select fullWidth required label="Department" name="department"
              value={formData.department} onChange={handleChange}
            >
              {departments.map(dep => (
                <MenuItem key={dep} value={dep}>{dep}</MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth required label="Mobile" name="mobile" type="tel"
              value={formData.mobile} onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              fullWidth required label="Email" name="email" type="email"
              value={formData.email} onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth label="Joining Date" name="joiningDate" type="date"
              value={formData.joiningDate} onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth label="Experience (Years)" name="experience" type="number"
              value={formData.experience} onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth required label="Consultation Fee" name="consultationFee" type="number"
              value={formData.consultationFee} onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select fullWidth required label="Availability" name="availability"
              value={formData.availability} onChange={handleChange}
            >
              {availabilityOptions.map(time => (
                <MenuItem key={time} value={time}>{time}</MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth label="Rating" name="rating" type="number"
              inputProps={{ min: 0, max: 5, step: 0.1 }}
              value={formData.rating} onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth required label="Clinic Location" name="clinicLocation"
              value={formData.clinicLocation} onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="error">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DoctorForm;
