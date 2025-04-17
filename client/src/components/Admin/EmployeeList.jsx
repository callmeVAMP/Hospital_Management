// import React, { useState } from 'react';
// //import './App.css';
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';
// // import DoctorsTable from './components/Misc/DoctorList';
// // import AppointmentTable from './components/appointment';
// // import PatientsTable from './components/rough/r1';
// import DoctorsTable from './DoctorList';
// import PatientsTable from './PatientsList';
// import { DataGrid } from '@mui/x-data-grid';
// import NursesTable from './NurseList';
// import LabTechniciansTable from './LabTechnicianList';

// import {
//   Box,
//   Typography,
//   List,
//   ListItemButton,
//   ListItemText,
//   Paper,
//   Divider,
//   Tabs,
//   Tab,
// } from '@mui/material';

// function App() {
//   const [selectedSection, setSelectedSection] = useState('employees');
//   const [selectedEmployeeTab, setSelectedEmployeeTab] = useState('doctor');

//   const handleEmployeeTabChange = (event, newValue) => {
//     setSelectedEmployeeTab(newValue);
//   };

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
//             selected={selectedSection === 'employees'}
//             onClick={() => setSelectedSection('employees')}
//           >
//             <ListItemText primary="Hospital Staff" />
// </ListItemButton>

//         </List>
//       </Paper>

//       {/* Content */}
//       <Box sx={{ flexGrow: 1, p: 4 }}>
//         {selectedSection === 'employees' && (
//           <>
//             <Typography variant="h5" gutterBottom>
//               Hospital Staff
//             </Typography>
//             <Tabs
//               value={selectedEmployeeTab}
//               onChange={handleEmployeeTabChange}
//               sx={{ mb: 2 }}
//               textColor="primary"
//               indicatorColor="primary"
//             >
//               <Tab value="doctor" label="Doctor" />
//               <Tab value="nurse" label="Nurse" />
//               <Tab value="lab" label="Lab Technician" />
//             </Tabs>

//             {selectedEmployeeTab === 'doctor' && <DoctorsTable />}
//             {selectedEmployeeTab === 'nurse' && <NursesTable />}
//             {selectedEmployeeTab === 'lab' && <LabTechniciansTable />}
//           </>
//         )}
//       </Box>
//     </Box>
//   );
// }

// export default App;


import React, { useState } from 'react';
import { Tabs, Tab, Typography, Box } from '@mui/material';
import DoctorsTable from './DoctorList';
import NursesTable from './NurseList';
import LabTechniciansTable from './LabTechnicianList';

function EmployeeList() {
  const [tab, setTab] = useState('doctor');

  return (
    <Box>
      <Tabs
        value={tab}
        onChange={(e, newValue) => setTab(newValue)}
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 2 }}
      >
        <Tab value="doctor" label="DOCTOR" />
        <Tab value="nurse" label="NURSE" />
        <Tab value="lab" label="LAB TECHNICIAN" />
      </Tabs>
      {tab === 'doctor' && <DoctorsTable />}
      {tab === 'nurse' && <NursesTable />}
      {tab === 'lab' && <LabTechniciansTable />}
    </Box>
  );
}

export default EmployeeList;
