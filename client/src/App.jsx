import React, { useState } from 'react';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// import DoctorsTable from './components/Misc/DoctorList';
// import AppointmentTable from './components/appointment';
// import PatientsTable from './components/rough/r1';
import PatientDashboard from './components/Doctor/PatientList';
import AppointmentTable from './components/Receptionist/appointmentstable';import RoomBookingForm from './components/Receptionist/RoomBedBooking';
import PatientRegistrationForm from './components/Receptionist/PatientRegistration';
import { DataGrid } from '@mui/x-data-grid';
// import DataGridExample  from './components/Misc/t';
// import SxProp from './components/Misc/test';
// import AppointmentsTable from './components/Misc/d_appointment_nikki';
// import AppointmentForm from './components/Receptionist/BookAppointment';
import PatientEnquiry from './components/Receptionist/PatientEnquiry';
import ScheduledTestsTable from './components/LabTechnician/ScheduledTests';
import PreviousTestsTable from './components/LabTechnician/PreviousTests';
import AllotmentListTable from './components/Admin/RoomOccupancy';
import RoomInfoTable from './components/Admin/RoomInfo';
import BookRoomForm from './components/Admin/BookOrEditRoom';
import { DeleteRoomDialog } from './components/Admin/DeleteRoomDialog';
import LabInfoTable from './components/Admin/LabAndTestInfo';

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
