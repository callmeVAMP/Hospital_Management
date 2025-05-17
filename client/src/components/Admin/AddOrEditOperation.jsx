import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Grid, Box, Chip, Select, InputLabel, FormControl, OutlinedInput, MenuItem, Typography, IconButton
} from '@mui/material';
import { UploadFile } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setSnackBarInfo } from '../../Features/snackbarSlice';
import axios from 'axios';

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

const AddOrEditOperation = ({ open, onClose, onSave, operationData, professionalsList=[] }) => {
  const dispatch=useDispatch()

  console.log(professionalsList)

  // console.log("op data ",operationData)
  const [formData, setFormData] = useState({
    operationId: operationData?.operationId || null,
    startDate: operationData?.startDate || '',
    startTime: operationData?.startTime || '',
    endDate: operationData?.endDate || '',
    endTime: operationData?.endTime || '',
    patientName: operationData?.patientName || '',
    patientPhone: operationData?.patientPhone || '',
    opType: operationData?.opType || '',
    professionals: Array.isArray(operationData?.professionals) ? operationData.professionals : [],
    reportUrl: null
  });

  // const [professionalsList,setProfessionalsList]=useState([]);

  // const fetchProfessionals=async()=>{
  //   try {
  //     const res=await axios.get(`http://localhost:8000/admin/all_employees`)
  //     console.log("hprof",res);
  //     setProfessionalsList(res?.data);

  //   } catch (error) {
  //     console.log(error)
  //     dispatch(setSnackBarInfo({message:`Error loading HealthCare Professionals Data`,severity:'error',open:true}))
      
  //   }
  // }
  

  // const [report,setReport]=useState(null);

  useEffect(() => {
    if (operationData) {
      setFormData({
        treatmentID: operationData?.treatmentID ,
        startDate: operationData?.startDate || '',
        startTime: operationData?.startTime || '',
        endDate: operationData?.endDate || '',
        endTime: operationData?.endTime || '',
        patientName: operationData?.patientName || '',
        patientPhone: operationData?.patientPhone || '',
        opType: operationData?.opType || '',
        professionals: Array.isArray(operationData?.professionals) ? operationData.professionals : [],
        professionalsHID: Array.isArray(operationData?.professionalsHID) ? operationData.professionalsHID : [],
        reportUrl: operationData?.reportUrl,
        reportFile: null,
        appID:operationData?.appID? operationData?.appID : null
      });
    }
    // fetchProfessionals()
  }, [operationData]);

  // console.log("formData",formData);

  const handleFileUpload = async(file, rowId) => {
    // setReportFile(file)
    console.log("rep file ",reportFile, reportFile?.name)
    console.log("Uploading report for row ID:", rowId);
    console.log("Selected file:", file);
    const renamedFile = new File([file], `${rowId}-report.pdf`, { type: file.type });

    const formData = new FormData();
    formData.append("file", renamedFile);          // The key must match multer's 'upload.single("file")'
    formData.append("TestID", rowId); 

    try {
      const res=await axios.post(`http://localhost:8000/report/upload_operation_report`,formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        console.log(res)
        if(res?.data?.success) {
            dispatch(setSnackBarInfo({message:`Uploaded Report Successfully! Updating Tests here`,severity:'success',open:true}))
            fetchReportPendingTests()
        }
        } catch (error) {
            dispatch(setSnackBarInfo({message:`Some Error Occured`,severity:'error',open:true}))
        console.log(error)
        }
    // You can add actual upload logic here
  };


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

  const filteredOptions = professionalsList.filter((hprof) =>
    hprof?.HName?.toLowerCase().includes(search.toLowerCase())
  );
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfessionalsChange = (event) => {
    
    const selectedNames = event.target.value;

    const selectedHIDs = professionalsList
      .filter((prof) => selectedNames.includes(prof.HName))
      .map((prof) => prof.HID);
  
    setFormData((prev) => ({
      ...prev,
      professionals: selectedNames,
      professionalsHID: selectedHIDs,
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      reportFile: e.target.files[0]
    }));
    console.log(e.target.files[0])
  };

  const handleSubmit = () => {
    if (onSave) {
      onSave(formData,type);
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
            {type=="edit" && <Grid size={{ xs: 2}}>
              <TextField
                type='number'
                fullWidth
                label="Operation ID"
                name="treatmentID"
                value={formData.treatmentID}
                disabled={type=="add"?false:true}
                onChange={handleChange}
              />
            </Grid>}

            <Grid size={{ xs: 2}}>
              <TextField
                type='number'
                fullWidth
                label="Appointment ID"
                name="appID"
                value={formData.appID}
                disabled={type=="add"?false:true}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 4}}>
              <TextField
                fullWidth
                label="Patient Name"
                name="patientName"
                value={formData.patientName}
                disabled={type=="add"?false:true}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,  // 👈 forces label to float correctly
                }}
              />
            </Grid>
            <Grid size={{ xs: 4}}>
              <TextField
                fullWidth
                label="Patient Phone"
                name="patientPhone"
                value={formData.patientPhone}
                disabled={type=="add"?false:true}
                onChange={handleChange}
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

                {filteredOptions.map((prof) => (
                  <MenuItem key={prof.HID} value={prof.HName}>
                    {prof.HName}
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
        <Button onClick={handleSubmit} variant="contained" color="primary"
        disabled={
          // !formData.appID ||
          !formData.patientName ||
          !formData.patientPhone ||
          !formData.startDate ||
          !formData.startTime ||
          !formData.endDate ||
          !formData.endTime ||
          !formData.opType 
          
        }
        
        
        >Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddOrEditOperation;