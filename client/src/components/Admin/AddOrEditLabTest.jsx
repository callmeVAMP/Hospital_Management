import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, MenuItem, Grid, Box, Chip, Select, InputLabel, FormControl
} from '@mui/material';
import { Science } from '@mui/icons-material';

const testOptions = [
  'Blood Test',
  'Liver Function Test',
  'Culture Test',
  'Sensitivity Test',
  'Urine Test',
  'X-Ray',
];

const AddOrEditLabAndTestForm = ({ open, onClose, onSave, labTestData }) => {
  console.log("in ",labTestData);
  const [formData, setFormData] = useState({
    labRoomNo: labTestData?.labRoomNo? labTestData?.labRoomNo : '',
    labName: labTestData?.labName? labTestData?.labName : '',
    testsPerformed:  Array.isArray(labTestData?.testsPerformed) ? labTestData?.testsPerformed : [],
    floor: labTestData?.floor? labTestData?.floor : '',
  });
  
 
  useEffect(() => {
    if (labTestData) {
      setFormData({
        labRoomNo: labTestData.labRoomNo || '',
        labName: labTestData.labName || '',
        testsPerformed: Array.isArray(labTestData.testsPerformed) ? labTestData.testsPerformed : [],
        floor: labTestData.floor || ''
      });
    } else {
      setFormData({
        labRoomNo: '',
        labName: '',
        testsPerformed: [],
        floor: ''
      });
    }
  }, [labTestData]);
  
  console.log("form: ",formData);

  const type = labTestData ? "edit" : "add";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTestsChange = (event) => {
    setFormData(prev => ({
      ...prev,
      testsPerformed: event.target.value
    }));
  };

  const handleSubmit = () => {
    onSave(formData, type);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Science sx={{ mr: 1 }} /> {type === 'edit' ? 'Edit Lab Info' : 'Add Lab Info'}
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6}}>
              <TextField
                fullWidth required label="Lab Room No" name="labRoomNo"
                value={formData.labRoomNo} onChange={handleChange}
              />
            </Grid>
            
            
            <Grid size={{ xs: 6}}>
              <TextField
                fullWidth required label="Floor" name="floor"
                value={formData.floor} onChange={handleChange}
              />
            </Grid>
          
          </Grid>

        <Grid container spacing={2}>
            <Grid size={{ xs: 12}}>
                <TextField
                    fullWidth required label="Lab Name" name="labName"
                    value={formData.labName} onChange={handleChange}
                />
            </Grid>
        </Grid>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 12 }}>
              <FormControl fullWidth required>
                <InputLabel>Tests Performed</InputLabel>
                <Select
                  multiple
                  value={formData?.testsPerformed}
                  onChange={handleTestsChange}
                  name="testsPerformed"
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {testOptions.map((test) => (
                    <MenuItem key={test} value={test}>
                      {test}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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

export default AddOrEditLabAndTestForm;
