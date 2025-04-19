import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Grid, Box, Chip, Select, InputLabel, FormControl, OutlinedInput, MenuItem, Typography, IconButton
} from '@mui/material';
import { UploadFile } from '@mui/icons-material';

const operationTypes = [
  'Cardiac Surgery',
  'Orthopedic Surgery',
  'Neurosurgery',
  'General Surgery',
  'Plastic Surgery'
];

const professionalsList = [
  'Dr. Smith',
  'Dr. Johnson',
  'Nurse Clara',
  'Dr. Brown',
  'Dr. Taylor'
];

const AddOrEditOperation = ({ open, onClose, onSave, operationData }) => {
  console.log("op data ",operationData)
  const [formData, setFormData] = useState({
    operationId: operationData?.operationId || '',
    startDate: operationData?.startDate || '',
    startTime: operationData?.startTime || '',
    endDate: operationData?.endDate || '',
    endTime: operationData?.endTime || '',
    patientName: operationData?.patientName || '',
    patientPhone: operationData?.patientPhone || '',
    opType: operationData?.opType || '',
    professionals: Array.isArray(operationData?.professionals) ? operationData.professionals : [],
    report: null
  });

  useEffect(() => {
    if (operationData) {
      setFormData({
        operationId: operationData?.operationId || '',
        startDate: operationData?.startDate || '',
        startTime: operationData?.startTime || '',
        endDate: operationData?.endDate || '',
        endTime: operationData?.endTime || '',
        patientName: operationData?.patientName || '',
        patientPhone: operationData?.patientPhone || '',
        opType: operationData?.opType || '',
        professionals: Array.isArray(operationData?.professionals) ? operationData.professionals : [],
        report: null
      });
    }
  }, [operationData]);

  console.log("formData",formData);

  const type = operationData ? "edit" : "add";

  const [search, setSearch] = useState('');

  function convertTo24Hour(time12h) {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
  
    if (modifier === 'PM' && hours !== '12') {
      hours = String(parseInt(hours) + 12);
    }
    if (modifier === 'AM' && hours === '12') {
      hours = '00';
    }
  
    return `${hours.padStart(2, '0')}:${minutes}`;
  }

  const filteredOptions = professionalsList.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfessionalsChange = (event) => {
    setFormData(prev => ({
      ...prev,
      professionals: event.target.value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      report: e.target.files[0]
    }));
  };

  const handleSubmit = () => {
    if (!formData.operationId || !formData.patientName || !formData.professionals) {
      alert("Please fill required fields: Operation ID, Patient's Name, Health Professionals' Name");
      return;
    }
    if (onSave) {
      onSave(form);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography>{operationData ? 'Edit Operation Info' : 'Add Operation Info'}</Typography>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 4}}>
              <TextField
                fullWidth
                label="Operation ID"
                name="operationId"
                value={formData.operationId}
                disabled={type=="add"?false:true}
              />
            </Grid>
            <Grid size={{ xs: 4}}>
              <TextField
                fullWidth
                label="Patient Name"
                name="patientName"
                value={formData.patientName}
                disabled={type=="add"?false:true}
              />
            </Grid>
            <Grid size={{ xs: 4}}>
              <TextField
                fullWidth
                label="Patient Phone"
                name="patientPhone"
                value={formData.patientPhone}
                disabled={type=="add"?false:true}
              />
            </Grid>
        </Grid>
        <Grid container spacing={2}>
            <Grid size={{ xs: 3}}>
              <TextField
                fullWidth
                type="date"
                label="Start Date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 3}}>
              <TextField
                fullWidth
                type="time"
                label="Start Time"
                name="startTime"
                value={convertTo24Hour(formData.startTime)}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 3}}>
              <TextField
                fullWidth
                type="date"
                label="End Date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 3}}>
              <TextField
                fullWidth
                type="time"
                label="End Time"
                name="endTime"
                value={convertTo24Hour(formData.endTime)}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
        </Grid>
        <Grid container spacing={2}>
            <Grid size={{ xs: 4}}>
            <TextField
                fullWidth
                label="Operation Type"
                name="opType"
                value={formData.opType}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 4}}>
            <FormControl fullWidth>
                <InputLabel>Healthcare Professionals Involved</InputLabel>
                <Select
                multiple
                value={formData.professionals}
                onChange={handleProfessionalsChange}
                input={<OutlinedInput label="Healthcare Professionals Involved" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                        <Chip key={value} label={value} />
                    ))}
                    </Box>
                )}
                MenuProps={{
                    PaperProps: {
                    style: { maxHeight: 300 },
                    },
                }}
                >
                <MenuItem>
                    <TextField
                    fullWidth
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    size="small"
                    variant="standard"
                    />
                </MenuItem>
                {filteredOptions.map((name) => (
                    <MenuItem key={name} value={name}>
                    {name}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            </Grid>

            <Grid size={{ xs: 4}}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<UploadFile />}
              >
                Upload Report
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
              {formData.report && <Typography variant="body2" mt={1}>{formData.report.name}</Typography>}
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="error">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddOrEditOperation;