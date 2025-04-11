import React, { useState } from 'react';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import DoctorsTable from './components/admin/DoctorList';
import PatientsTable from './components/admin/PatientsList';

import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Divider,
} from '@mui/material';

function App() {
  const [selectedSection, setSelectedSection] = useState('doctors');

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Paper
        elevation={3}
        sx={{
          width: 200,
          height: '100%',
          bgcolor: 'background.paper',
          pt: 2,
        }}
      >
        <Typography variant="h6" align="center" gutterBottom>
          Admin Panel
        </Typography>
        <Divider />
        <List>
          <ListItemButton
            selected={selectedSection === 'doctors'}
            onClick={() => setSelectedSection('doctors')}
          >
            <ListItemText primary="Doctors" />
          </ListItemButton>
          <ListItemButton
            selected={selectedSection === 'patients'}
            onClick={() => setSelectedSection('patients')}
          >
            <ListItemText primary="Patients" />
          </ListItemButton>
        </List>
      </Paper>

      {/* Content */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        {selectedSection === 'doctors' && (
          <>
            <Typography variant="h5" gutterBottom>
              Doctors List
            </Typography>
            <DoctorsTable />
          </>
        )}
        {selectedSection === 'patients' && (
          <>
            <Typography variant="h5" gutterBottom>
              Patients List
            </Typography>
            <PatientsTable />
          </>
        )}
      </Box>
    </Box>
  );
}

export default App;
