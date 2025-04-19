// // import { Outlet } from 'react-router-dom'
// // import React from 'react'

// // const DoctorPage = () => {
// //   return (
// //     <div>
// //         DoctorPage
// //         <Outlet />
// //     </div>
// //   )
// // }

// // export default DoctorPage

import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import React from 'react';
import { Box, Divider, List, ListItemButton, ListItemText, Paper, Typography } from '@mui/material';

const DoctorPage = () => {
  const navigate = useNavigate();  // Initialize the navigate function
  const location = useLocation();  // Get the current location/path

  // Updated handleNavigation to include all sections
  const handleNavigation = (section) => {
    switch (section) {
      case 'appointments':
        navigate('/doctor/appointments');
        break;
      case 'patients':
        navigate('/doctor/patient');
        break;
  
      default:
        break;
    }
  };

  // A function to check if the section is active based on the current location
  const isActive = (path) => location.pathname.includes(path);

  return (
    <div>
      DoctorPage
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
            Doctor Panel
          </Typography>
          <Divider />
          <List>
            <ListItemButton 
              onClick={() => handleNavigation('appointments')} 
              sx={{ 
                backgroundColor: isActive('/doctor/appointments') ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                '&:hover': {
                  backgroundColor: isActive('/doctor/appointments') ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.04)',
                }
              }}
            >
              <ListItemText primary="Appointments" />
            </ListItemButton>
            <ListItemButton 
              onClick={() => handleNavigation('patients')} 
              sx={{ 
                backgroundColor: isActive('/doctor/patient') ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                '&:hover': {
                  backgroundColor: isActive('/doctor/patient') ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.04)',
                }
              }}
            >
              <ListItemText primary="Patients" />
            </ListItemButton>
           
          </List>
        </Paper>

        {/* Content */}
        <Box sx={{ flexGrow: 1, p: 4 }}>
          <Typography variant="h5" gutterBottom>
            {/* The content can be rendered via the respective routes */}
            Doctor Panel Content
            <Outlet />
          </Typography>
          {/* The content will now be rendered based on routing */}
        </Box>
      </Box>
    </div>
  );
};

export default DoctorPage;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const DoctorPage = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Hardcoded HID for now
//   const HID = 1;  // Example Hospital ID

//   // Function to fetch appointments based on the HID
//   const fetchAppointments = async () => {
//     setLoading(true);
//     setError(null);  // Reset error state before making the request

//     try {
//       // API request with the HID as a parameter
//       const response = await axios.get(`http://localhost:3000/patient/all/did/:${HID}`);
//       setAppointments(response.data);  // Store the data in the state
//       setLoading(false);
//     } catch (err) {
//       setLoading(false);
//       setError('Error fetching appointments');
//       console.error('Error fetching appointments:', err);
//     }
//   };

//   // Fetch appointments when the component mounts
//   useEffect(() => {
//     fetchAppointments();
//   }, []);  // Empty dependency array to run only once when the component mounts

//   return (
//     <div>
//       <h2>Doctor's Appointments</h2>
//       {loading && <p>Loading appointments...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       <div>
//         {appointments.length > 0 ? (
//           <ul>
//             {appointments.map((appointment) => (
//               <li key={appointment.PID}>
//                 <p>
//                   Patient: {appointment.PName} - Address: {appointment.PAddr} - Phone: {appointment.PPhNo} - Gender: {appointment.PGender}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No appointments found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DoctorPage;






//updatd runnung
//import { Box, Divider, List, ListItemButton, ListItemText, Paper, Typography } from '@mui/material';


// import { Outlet, useNavigate, useLocation } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Box,
//   Divider,
//   List,
//   ListItemButton,
//   ListItemText,
//   Paper,
//   Typography,
// } from '@mui/material';

// const DoctorPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const HID = 1;

//   const fetchAppointments = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.get(`http://localhost:3000/patient/all/did/${HID}`);
//       console.log(response)
//       setAppointments(response.data);
//     } catch (err) {
//       setError('Error fetching appointments');
//       console.error('Error fetching appointments:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (location.pathname.includes('/doctor/appointments')) {
//       fetchAppointments();
//     }
//   }, [location.pathname]);

//   const handleNavigation = (section) => {
//     switch (section) {
//       case 'appointments':
//         navigate('/doctor/appointments');
//         break;
//       case 'patients':
//         navigate('/doctor/patient');
//         break;
//       default:
//         break;
//     }
//   };

//   const isActive = (path) => location.pathname.includes(path);

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
//           Doctor Panel
//         </Typography>
//         <Divider />
//         <List>
//           <ListItemButton
//             onClick={() => handleNavigation('appointments')}
//             sx={{
//               backgroundColor: isActive('/doctor/appointments') ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
//               '&:hover': {
//                 backgroundColor: isActive('/doctor/appointments') ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.04)',
//               },
//             }}
//           >
//             <ListItemText primary="Appointments" />
//           </ListItemButton>
//           <ListItemButton
//             onClick={() => handleNavigation('patients')}
//             sx={{
//               backgroundColor: isActive('/doctor/patient') ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
//               '&:hover': {
//                 backgroundColor: isActive('/doctor/patient') ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.04)',
//               },
//             }}
//           >
//             <ListItemText primary="Patients" />
//           </ListItemButton>
//         </List>
//       </Paper>

//       {/* Main Content */}
//       <Box sx={{ flexGrow: 1, p: 4 }}>
//         <Typography variant="h5" gutterBottom>
//           Doctor Panel Content
//         </Typography>

//         {/* Render appointments only if on the appointments route */}
//         {isActive('/doctor/appointments') && (
//           <>
//             <Typography variant="h6" gutterBottom>Doctor's Appointments</Typography>
//             {loading && <p>Loading appointments...</p>}
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             {appointments.length > 0 ? (
//               <ul>
//                 {appointments.map((appointment) => (
//                   <li key={appointment.PID}>
//                     <p>
//                       Patient: {appointment.PName} — Address: {appointment.PAddr} — Phone: {appointment.PPhNo} — Gender: {appointment.PGender}
//                     </p>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               !loading && <p>No appointments found.</p>
//             )}
//           </>
//         )}

//         {/* Outlet for other nested routes like /doctor/patient */}
//         {!isActive('/doctor/appointments') && <Outlet />}
//       </Box>
//     </Box>
//   );
// };

// export default DoctorPage;



