import React, { useState } from 'react';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import DoctorsTable from './components/DoctorList';
import PatientsTable from './components/admin/PatientsList';

import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
} from '@mui/material';

function App() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ width: '100%', p: 4 }}>
      <Paper elevation={3}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Doctors" />
          <Tab label="Patients" />
        </Tabs>
      </Paper>

      <Box mt={4}>
        {tabIndex === 0 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Doctors List
            </Typography>
            <DoctorsTable />
          </Box>
        )}
        {tabIndex === 1 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Patients List
            </Typography>
            <PatientsTable />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default App;
