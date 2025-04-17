import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, MenuItem, Grid, InputAdornment,
  Box
} from '@mui/material';
import {
  Person, LocalHospital, Phone, Email, CalendarToday, School
} from '@mui/icons-material';

const roomTypes = ['Single', 'Double', 'Suite'];
const roomCategories = ['Private', 'General ICU', 'Critical Care'];

const BookorEditRoomForm = ({ open, onClose, onSave, roomData }) => {
  console.log("inside the block",roomData);
  const [formData, setFormData] = useState({
    roomNumber: roomData? roomData?.roomNumber : '',
    roomType: roomData? roomData?.roomType : '',
    floor: roomData? roomData?.floor : '',
    bedCapacity: roomData? roomData?.bedCapacity :0,
    roomCategory: roomData? roomData?.roomCategory : '',
    roomFeatures: roomData? roomData?.roomFeatures : '',
    roomRate: roomData? roomData?.roomRate : 0,
    specialInstructions: roomData? roomData?.specialInstructions : ''
  });

  useEffect(()=>setFormData({...roomData}),[roomData]);

  const type=roomData? "edit":"add";
  console.log("data ",formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData,type);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Person /> Book Room
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth required label="Room Number" name="roomNumber"
                value={formData.roomNumber} onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                select fullWidth required label="Room Category" name="roomCategory"
                value={formData.roomCategory} onChange={handleChange}
                >
                {roomCategories.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
                </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select fullWidth required label="Room Type" name="roomType"
                value={formData.roomType} onChange={handleChange}
              >
                {roomTypes.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth required label="Floor" name="floor"
                value={formData.floor} onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth required label="Bed Capacity" name="bedCapacity" type="number"
                value={formData.bedCapacity} onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth required label="Room Rate" name="roomRate" type="number"
                value={formData.roomRate} onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 12 }}>
              <TextField
                fullWidth required label="Room Features" name="roomFeatures"
                value={formData.roomFeatures} onChange={handleChange}
              />
            </Grid>
            
          </Grid>

          <TextField
            fullWidth multiline minRows={2} label="Special Instructions" name="specialInstructions"
            value={formData.specialInstructions} onChange={handleChange}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="error">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookorEditRoomForm;
