import React from 'react';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Divider,
} from '@mui/material';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

// Pages
import LandingPage from './pages/LandingPage';
import AdminPage from './pages/AdminPage';
import DoctorPage from './pages/DoctorPage';
import ReceptionistPage from './pages/ReceptionistPage';
import LabTechnicianPage from './pages/LabTechnicianPage.jsx';

// Admin Components
import PatientsList from './components/Admin/PatientsList';
import EmployeeList from './components/Admin/EmployeeList';
import LabAndTestInfo from './components/Admin/LabAndTestInfo';
import TreatmentInfo from './components/Admin/TreatmentList';
import OperationInfo from './components/Admin/OperationInfo';
import RoomOccupancy from './components/Admin/RoomOccupancy';
import RoomInfoTable from './components/Admin/RoomInfo';

// Receptionist Components
import RoomBookingForm from './components/Receptionist/RoomBedBooking';
import PatientRegistrationForm from './components/Receptionist/PatientRegistration';
import PatientEnquiry from './components/Receptionist/PatientEnquiry.jsx';
import AppointmentTable from './components/Receptionist/appointmentstable.jsx';
import AppointmentForm from './components/Receptionist/appointmentform.jsx';

import AlertBar from './components/Common/AlertBar.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackBarInfo } from './Features/snackbarSlice.js';

const LayoutComponent=()=>{
  const snackBarInfo=useSelector((state)=>state.snackBarKey)
  const dispatch=useDispatch();

  return <div>
    <Outlet />
    <AlertBar
        open={snackBarInfo?.open}
        onClose={() => dispatch(setSnackBarInfo({message:'',severity:'',open:false}))}
        message={snackBarInfo?.message}
        severity={snackBarInfo?.severity} // Can be 'success', 'error', 'warning', 'info'
        duration={2000}
    />
  </div>
}
// Doctor Components
import AppointmentsTable from './components/Doctor/ScheduledAppointments.jsx';
import PatientDashboard from './components/Doctor/PatientList';

// Lab Technician Components
import PreviousTestsTable from './components/LabTechnician/PreviousTests';
import ScheduledTestsTable from './components/LabTechnician/ScheduledTests';


import LoginPage from './pages/LoginPage';
import VerifyOtp from './pages/VerifyOtp'; 
import AuthComponent from './pages/Login';


const router = createBrowserRouter([
  {
    path: "/landing",
    element: <LandingPage />,
  },

  {
    path: "/",
    element: <LayoutComponent />,
    children:[
      
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/verify-otp",
        element: <VerifyOtp />,
      },  
      
      {
        path: "/admin",
        element: <AdminPage />,
        children:[{
          path: "patient",
          element: <PatientsList />
        },
        {
          path:"employees",
          element:<EmployeeList />
        },
        {
          path:"rooms",
          element: <RoomInfoTable />
        },
        {
          path:"occupancy",
          element: <RoomOccupancy />
        },
        {
          path:"labTest",
          element: <LabAndTestInfo />
        },
        {
          path:"treatment",
          element: <TreatmentInfo />
        },
        {
          path:"operations",
          element: <OperationInfo />
        },
    
    
      
      ]
      },
      {
        path: "/receptionist",
        element: <ReceptionistPage />,
        children:[{
          path: "check-occupancy",
          element: <PatientEnquiry />
        },
        {
          path: "book-room",
          element: <RoomBookingForm />
        }
    
      
      ]
      },
      {
        path:"/doctor",
        element: <DoctorPage />,
        children:[{
          path: "appointments",
          element: <AppointmentsTable />
        },
        {
          path:"patient",
          element:<PatientDashboard/>
        }
        ]
      },
      {
        path:"/labTechnician",
        element: <LabTechnicianPage/>,
        children:[{
          path: "previous",
          element: <PreviousTestsTable />
        },
        {
          path:"scheduled",
          element:<ScheduledTestsTable/>
        }
      ]
      },
    
      {
        path:"/receptionist",
        element: <ReceptionistPage/>,
        children:[{
          path: "PatientEnquiry",
          element: <PatientEnquiry />
        },
        {
          path:"AppointmentTable",
          element:<AppointmentTable/>
        },
        {
          path:"PatientRegistrationForm",
          element:<PatientRegistrationForm/>
        },
        {
          path:"AppointmentForm",
          element:<AppointmentForm/>
        },
        {
          path:"RoomBookingForm",
          element:<RoomBookingForm/>
        }
        ]
      }
    ]
  }






]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;



