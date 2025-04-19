// import React, { useState } from 'react';
// import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, AppBar, Typography, CssBaseline } from '@mui/material';
// //import PatientEnquiry from '../components/PatientEnquiry';
// import RoomBookingForm from '../components/Receptionist/RoomBedBooking'
// import PatientEnquiry from '../components/Receptionist/PatientEnquiry'
// //import Book from '../components/Receptionist/appointmentform'
// import PatientRegistrationForm from '../components/Receptionist/PatientRegistration';
// import AppointmentTable from '../components/Receptionist/appointmentstable';
// import BookAppointment from '../components/Receptionist/BookAppointment'
// // export const ReceptionistView = () => {
// //   return (
// //     <div>ReceptionistView</div>
// //   )
// // }



// const drawerWidth = 240;

// // export const ReceptionistView = () => {
// //   const [activeTab, setActiveTab] = useState('enquiry');

// //   const renderComponent = () => {
// //     switch (activeTab) {
// //       case 'enquiry':
// //         return <PatientEnquiry />;
// //       case 'appointment':
// //         return <AppointmentForm />;
// //       case 'room':
// //         return <RoomBookingForm />;
// //       default:
// //         return null;
// //     }
// //   };

// //   return (
// //     <Box sx={{ display: 'flex' }}>
// //       <CssBaseline />

// //       {/* App Bar */}
// //       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
// //         <Toolbar>
// //           <Typography variant="h6" noWrap component="div">
// //             Receptionist Panel
// //           </Typography>
// //         </Toolbar>
// //       </AppBar>

// //       {/* Sidebar Drawer */}
// //       <Drawer
// //         variant="permanent"
// //         sx={{
// //           width: drawerWidth,
// //           flexShrink: 0,
// //           [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
// //         }}
// //       >
// //         <Toolbar />
// //         <Box sx={{ overflow: 'auto' }}>
// //           <List>
// //             <ListItem disablePadding>
// //               <ListItemButton onClick={() => setActiveTab('enquiry')}>
// //                 <ListItemText primary="Patient Enquiry" />
// //               </ListItemButton>
// //             </ListItem>
// //             <ListItem disablePadding>
// //               <ListItemButton onClick={() => setActiveTab('appointment')}>
// //                 <ListItemText primary="Add Appointment" />
// //               </ListItemButton>
// //             </ListItem>
// //             <ListItem disablePadding>
// //               <ListItemButton onClick={() => setActiveTab('room')}>
// //                 <ListItemText primary="Book Room" />
// //               </ListItemButton>
// //             </ListItem>
// //           </List>
// //         </Box>
// //       </Drawer>

// //       {/* Main Content */}
// //       <Box
// //         component="main"
// //         sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
// //       >
// //         <Toolbar />
// //         {renderComponent()}
// //       </Box>
// //     </Box>
// //   );
// // };



// export const ReceptionistView = () => {
//     const [activeTab, setActiveTab] = useState('enquiry');
  
//     const renderComponent = () => {
//       switch (activeTab) {
//         case 'enquiry':
//           return <PatientEnquiry />;
//         case 'appointment':
//           return <BookAppointment />;
//         case 'room':
//           return <RoomBookingForm />;
//         case 'register':
//           return <PatientRegistrationForm />;
//         case 'appointment_table':
//             return <AppointmentTable />;
//         default:
//           return null;
//       }
//     };
  
//     return (
//       <Box sx={{ display: 'flex' }}>
//         <CssBaseline />
  
//         {/* AppBar */}
//         <AppBar
//           position="fixed"
//           sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
//         >
//           <Toolbar>
//             <Typography variant="h6" noWrap component="div">
//               Receptionist View
//             </Typography>
//           </Toolbar>
//         </AppBar>
  
//         {/* Sidebar Drawer */}
//         <Drawer
//           variant="permanent"
//           sx={{
//             width: drawerWidth,
            
//             flexShrink: 0,
//             [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
//           }}
//         >
//           <Toolbar />
//           <Box sx={{ overflow: 'auto' }}>
//             <List>
//               <ListItem disablePadding>
//                 <ListItemButton
//                   selected={activeTab === 'enquiry'}
//                   onClick={() => setActiveTab('enquiry')}
//                   sx={{
//                     '&.Mui-selected': {
//                       backgroundColor: '#1976d2',
//                       color: 'white',
//                       '&:hover': {
//                         backgroundColor: '#1565c0',
//                       },
//                     },
//                   }}
//                 >
//                   <ListItemText primary="Patient Enquiry" />
//                 </ListItemButton>
//               </ListItem>
//               <ListItem disablePadding>
//                 <ListItemButton
//                   selected={activeTab === 'register'}
//                   onClick={() => setActiveTab('register')}
//                   sx={{
//                     '&.Mui-selected': {
//                       backgroundColor: '#1976d2',
//                       color: 'white',
//                       '&:hover': {
//                         backgroundColor: '#1565c0',
//                       },
//                     },
//                   }}
//                 >
//                   <ListItemText primary="Patient Registration" />
//                 </ListItemButton>
//               </ListItem>
//               <ListItem disablePadding>
//                 <ListItemButton
//                   selected={activeTab === 'appointment'}
//                   onClick={() => setActiveTab('appointment')}
//                   sx={{
//                     '&.Mui-selected': {
//                       backgroundColor: '#1976d2',
//                       color: 'white',
//                       '&:hover': {
//                         backgroundColor: '#1565c0',
//                       },
//                     },
//                   }}
//                 >
//                   <ListItemText primary="Add Appointment" />
//                 </ListItemButton>
//               </ListItem>
                

//               <ListItem disablePadding>
//                 <ListItemButton
//                   selected={activeTab === 'appointment_table'}
//                   onClick={() => setActiveTab('appointment_table')}
//                   sx={{
//                     '&.Mui-selected': {
//                       backgroundColor: '#1976d2',
//                       color: 'white',
//                       '&:hover': {
//                         backgroundColor: '#1565c0',
//                       },
//                     },
//                   }}
//                 >
//                   <ListItemText primary="Appointment table" />
//                 </ListItemButton>
//               </ListItem>


//               <ListItem disablePadding>
//                 <ListItemButton
//                   selected={activeTab === 'room'}
//                   onClick={() => setActiveTab('room')}
//                   sx={{
//                     '&.Mui-selected': {
//                       backgroundColor: '#1976d2',
//                       color: 'white',
//                       '&:hover': {
//                         backgroundColor: '#1565c0',
//                       },
//                     },
//                   }}
//                 >
//                   <ListItemText primary="Book Room" />
//                 </ListItemButton>
//               </ListItem>
//             </List>
//           </Box>
//         </Drawer>
  
//         {/* Main Content */}
//         <Box
//           component="main"
//           sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
//         >
//           <Toolbar />
//           {renderComponent()}
//         </Box>
//       </Box>
//     );
//   };


import React, { useState, useEffect } from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar, AppBar, Typography, CssBaseline } from '@mui/material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
//import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

export const ReceptionistView = () => {
  const [activeTab, setActiveTab] = useState('');
  const navigate = useNavigate();  // Initialize the navigate function
  const location = useLocation();  // Get the current location/path

  useEffect(() => {
    // Update the active tab based on the current location
    const currentPath = location.pathname;
    if (currentPath.includes('Patient_Enquiry')) {
      setActiveTab('enquiry');
    } else if (currentPath.includes('BookAppointment')) {
      setActiveTab('appointment');
    } else if (currentPath.includes('RoomBookingForm')) {
      setActiveTab('room');
    } else if (currentPath.includes('PatientRegistrationForm')) {
      setActiveTab('register');
    } else if (currentPath.includes('appointment_table')) {
      setActiveTab('appointment_table');
    }
  }, [location]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Receptionist View
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {[
              { key: 'enquiry', label: 'Patient Enquiry', route: '/receptionist/PatientEnquiry' },
              { key: 'register', label: 'Patient Registration', route: '/receptionist/PatientRegistrationForm' },
              { key: 'appointment', label: 'Add Appointment', route: '/receptionist/AppointmentForm' },
              { key: 'appointment_table', label: 'Appointment Table', route: '/receptionist/AppointmentTable' },
              { key: 'room', label: 'Book Room', route: '/receptionist/RoomBookingForm' }
            ].map((item) => (
              <ListItem key={item.key} disablePadding>
                <ListItemButton
                  selected={activeTab === item.key}
                  onClick={() => {setActiveTab(item.key);        // ✅ Set the active tab
                    navigate(item.route);}}  // Direct navigation
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: '#1976d2',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#1565c0',
                      },
                    },
                    '&:hover': {
                      backgroundColor: '#1976d2',
                      color: 'white',
                    },
                  }}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};
