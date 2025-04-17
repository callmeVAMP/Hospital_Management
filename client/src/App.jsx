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
import PatientsTable from './components/Admin/PatientsList';
import PatientDashboard from './components/Doctor/PatientList';
import AppointmentTable from './components/Receptionist/appointmentstable';
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
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import AdminPage from './pages/AdminPage';
import EmployeeList from './components/Admin/EmployeeList';
import LabAndTestInfo from './components/Admin/LabAndTestInfo';
import TreatmentInfo from './components/Admin/TreatmentList';
import OperationInfo from './components/Admin/OperationInfo';
import RoomOccupancy from './components/Admin/RoomOccupancy';
import ReceptionistPage from './pages/ReceptionistPage';
import LabTechnicianPage from './pages/LabTechnician';


const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
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
  }





])


function App() {
  return <RouterProvider router={router} />;
}

export default App;
