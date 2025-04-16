import React, { useState } from 'react';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// import DoctorsTable from './components/Misc/DoctorList';
// import AppointmentTable from './components/appointment';
// import PatientsTable from './components/rough/r1';
import DoctorsTable from './components/admin/DoctorList';
import PatientsTable from './components/admin/PatientsList';
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

import NursesTable from './components/admin/NurseList';
import LabTechniciansTable from './components/admin/LabTechnicianList';
import TreatmentList from './components/admin/TreatmentList';


// import {
//   Box,
//   Typography,
//   List,
//   ListItemButton,
//   ListItemText,
//   Paper,
//   Divider,
// } from '@mui/material';

// function App() {
//   const [selectedSection, setSelectedSection] = useState('doctors');

//   return (
//     <Box sx={{ display: 'flex', height: '100vh' }}>
//       {/* Sidebar */}
//       <Paper
//         elevation={3}
//         sx={{
//           width: 200,
//           height: '100%',
//           bgcolor: 'background.paper',
//           pt: 2,
//         }}
//       >
//         <Typography variant="h6" align="center" gutterBottom>
//           Admin Panel
//         </Typography>
//         <Divider />
//         <List>
//           <ListItemButton
//             selected={selectedSection === 'doctors'}
//             onClick={() => setSelectedSection('doctors')}
//           >
//             <ListItemText primary="Doctors" />
//           </ListItemButton>
//           <ListItemButton
//             selected={selectedSection === 'patients'}
//             onClick={() => setSelectedSection('patients')}
//           >
//             <ListItemText primary="Patients" />
//           </ListItemButton>
//         </List>
//       </Paper>

//       {/* Content */}
//       <Box sx={{ flexGrow: 1, p: 4 }}>
//         {selectedSection === 'doctors' && (
//           <>
//             <Typography variant="h5" gutterBottom>
//               Doctors List
//             </Typography>
//             <DoctorsTable />
//           </>
//         )}
//         {selectedSection === 'patients' && (
//           <>
//             <Typography variant="h5" gutterBottom>
//               Patients List
//             </Typography>
//             <PatientsTable />
//           </>
//         )}
//       </Box>
//     </Box>
//   );
// }

// export default App;


import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Divider,
  Tabs,
  Tab,
} from '@mui/material';

function App() {
  const [selectedSection, setSelectedSection] = useState('employees');
  const [selectedEmployeeTab, setSelectedEmployeeTab] = useState('doctor');

  const handleEmployeeTabChange = (event, newValue) => {
    setSelectedEmployeeTab(newValue);
  };

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
            selected={selectedSection === 'employees'}
            onClick={() => setSelectedSection('employees')}
          >
            <ListItemText primary="Hospital Staff" />
          </ListItemButton>
          <ListItemButton
            selected={selectedSection === 'patients'}
            onClick={() => setSelectedSection('patients')}
          >
            <ListItemText primary="Patients" />
          </ListItemButton>
          <ListItemButton
            selected={selectedSection === 'treatments'}
            onClick={() => setSelectedSection('treatments')}
          >
          <ListItemText primary="Treatments" />
</ListItemButton>

        </List>
      </Paper>

      {/* Content */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        {selectedSection === 'employees' && (
          <>
            <Typography variant="h5" gutterBottom>
              Employees
            </Typography>
            <Tabs
              value={selectedEmployeeTab}
              onChange={handleEmployeeTabChange}
              sx={{ mb: 2 }}
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab value="doctor" label="Doctor" />
              <Tab value="nurse" label="Nurse" />
              <Tab value="lab" label="Lab Technician" />
            </Tabs>

            {selectedEmployeeTab === 'doctor' && <DoctorsTable />}
            {selectedEmployeeTab === 'nurse' && <NursesTable />}
            {selectedEmployeeTab === 'lab' && <LabTechniciansTable />}
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
        {selectedSection === 'treatments' && (
          <>
            <Typography variant="h5" gutterBottom>
              Treatments
            </Typography>
            <TreatmentList />
          </>
        )}

      </Box>
    </Box>
  );
}

export default App;