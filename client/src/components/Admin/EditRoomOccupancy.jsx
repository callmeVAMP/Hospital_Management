import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, MenuItem, Grid, Box
} from '@mui/material';
import {
  Person, Phone, CalendarToday, LocalHospital
} from '@mui/icons-material';

const statusOptions = ['Reserved', 'Discharged'];
const genderOptions = ['Male', 'Female', 'Other'];
const doctorsList = ['Dr. Sharma', 'Dr. Mehta', 'Dr. Khan', 'Dr. Patel','Dr. Jane Smith','Dr. Mark Taylor']; // Example doctor names


const EditRoomOccupancy = ({ open, onClose, onSave, occupancyData }) => {
    console.log("in",occupancyData);
  const [formData, setFormData] = useState({
    roomNo: '',
    patientName: '',
    roomType: '',
    bedNo: '',
    admissionDate: '',
    gender: '',
    mobile: '',
    doctorAssigned: '',
    status: '',
  });

  useEffect(() => {
    if (occupancyData) {
      setFormData({ ...occupancyData });
    }
  }, [occupancyData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData, 'edit');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Person /> Edit Room Occupancy
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Grid container spacing={2}>
            <Grid size={{xs:4}}>
              <TextField
                fullWidth label="Room Number" name="roomNo"
                value={formData.roomNo} disabled
              />
            </Grid>
            <Grid size={{xs:4}}>
              <TextField
                fullWidth label="Room Type" name="roomType"
                value={formData.roomType} disabled
              />
            </Grid>
          

          
            <Grid size={{xs:4}}>
              <TextField
                fullWidth label="Bed Number" name="bedNo"
                value={formData.bedNo} disabled
              />
            </Grid>
        </Grid>

        <Grid container spacing={2}>
            <Grid size={{xs:4}}>
              <TextField
                fullWidth required label="Patient Name" name="patientName"
                value={formData.patientName} onChange={handleChange}
              />
            </Grid>
          
            <Grid size={{xs:4}}>
              <TextField
                select fullWidth required label="Gender" name="gender"
                value={formData.gender} onChange={handleChange}
              >
                {genderOptions.map((g) => (
                  <MenuItem key={g} value={g}>{g}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{xs:4}}>
              <TextField
                fullWidth required label="Mobile" name="mobile"
                value={formData.mobile} onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid size={{xs:4}}>
              <TextField
                type="date" fullWidth required
                label="Admission Date"
                name="admissionDate"
                value={formData.admissionDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{xs:4}}>
                <TextField
                select fullWidth required label="Doctor Assigned" name="doctorAssigned"
                value={formData.doctorAssigned} onChange={handleChange}
                >
                {doctorsList.map((doc) => (
                  <MenuItem key={doc} value={doc}>{doc}</MenuItem>
                ))}
                </TextField>
            </Grid>
         
            <Grid size={{xs:4}}>
              <TextField
                select fullWidth required label="Status" name="status"
                value={formData.status} onChange={handleChange}
              >
                {statusOptions.map(status => (
                  <MenuItem key={status} value={status}>{status}</MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="error">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditRoomOccupancy;
