import React, { useState } from 'react';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import DoctorPage from './pages/DoctorPage.jsx'
// import DoctorsTable from './components/Misc/DoctorList';
// import AppointmentTable from './components/appointment';
// import PatientsTable from './components/rough/r1';
//import DoctorsTable from './components/admin/DoctorList';
import PatientsTable from './components/Admin/PatientsList';
import PatientDashboard from './components/Doctor/PatientList';
import AppointmentsTable from './components/Doctor/ScheduledAppointments.jsx';
import RoomBookingForm from './components/Receptionist/RoomBedBooking';
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
import BookRoomForm from './components/Admin/AddOrEditRoom';
import { DeleteRoomDialog } from './components/Admin/DeleteRoomDialog';
import LabInfoTable from './components/Admin/LabAndTestInfo';
// import {PatientsLis}
import PatientsList from './components/Admin/PatientsList';

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

import LandingPage from './pages/LandingPage';
import AdminPage from './pages/AdminPage';
import EmployeeList from './components/Admin/EmployeeList';
import LabAndTestInfo from './components/Admin/LabAndTestInfo';
import TreatmentInfo from './components/Admin/TreatmentList';
import OperationInfo from './components/Admin/OperationInfo';
import RoomOccupancy from './components/Admin/RoomOccupancy';
import ReceptionistPage from './pages/ReceptionistPage';
import LabTechnicianPage from './pages/LabTechnician';
import AppointmentTable from './components/Receptionist/appointmentstable.jsx';
import AppointmentForm from './components/Receptionist/appointmentform.jsx';
import LoginPage from './pages/LoginPage.jsx';
import VerifyOTPPage from './pages/VerifyOTPPage.jsx';
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
        duration={3000}
    />
  </div>
}

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
        element: <VerifyOTPPage />,
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
        path: "/lab-technician",
        element: <LabTechnicianPage />,
        children:[{
          path: "tests",
          element: <PreviousTestsTable />
        },
        
    
      
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






])


function App() {
  return <RouterProvider router={router} />;
}

export default App;
