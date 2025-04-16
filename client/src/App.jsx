import React, { useState } from 'react';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// import DoctorsTable from './components/Misc/DoctorList';
// import AppointmentTable from './components/appointment';
// import PatientsTable from './components/rough/r1';
// import DoctorsTable from './components/admin/DoctorList';
import PatientsTable from './components/Admin/PatientsList';
import PatientDashboard from './components/Doctor/PatientList';
// import AppointmentTable from './components/Receptionist/appointmentstable';import RoomBookingForm from './components/Receptionist/RoomBedBooking';
import PatientRegistrationForm from './components/Receptionist/PatientRegistration';
import { DataGrid } from '@mui/x-data-grid';
// import DataGridExample  from './components/Misc/t';
// import SxProp from './components/Misc/test';
// import AppointmentsTable from './components/Misc/d_appointment_nikki';
// import AppointmentForm from './components/Receptionist/BookAppointment';
import PatientEnquiry from './components/Receptionist/PatientEnquiry';
import ScheduledTestsTable from './components/LabTechnician/ScheduledTests';
import PreviousTestsTable from './components/LabTechnician/PreviousTests';
import AppointmentForm from './components/Receptionist/BookAppointment';
import AllotmentListTable from './components/Admin/RoomOccupancy';
import RoomInfoTable from './components/Admin/RoomInfo';
import BookRoomForm from './components/Admin/BookOrEditRoom';
import { DeleteRoomDialog } from './components/Admin/DeleteRoomDialog';
import LabInfoTable from './components/Admin/LabAndTestInfo';
// import {PatientsLis}
import PatientsList from './components/Admin/PatientsList';
// import DoctorsTable from './components/Doctor/DoctorList_varsha';
// import AppointmentsTable from './components/Misc/d_appointment_nikki';
import AppointmentsTable from './components/Doctor/scheduledApp_varsha';
import AppointmentTable from './components/Receptionist/appointmentstable';


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
import DoctorPage from './pages/DoctorPage';
import LabTechnicianPage from './pages/LabTechnician';
import EmployeeList from './components/Admin/EmployeeList';
import LabAndTestInfo from './components/Admin/LabAndTestInfo';
import TreatmentInfo from './components/Admin/TreatmentInfo';
import OperationInfo from './components/Admin/OperationInfo';
import RoomOccupancy from './components/Admin/RoomOccupancy';


const router=createBrowserRouter([
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
  }





])


//import  LandingPage  from './pages/LandingPage.jsx'
import { ReceptionistView } from './pages/ReceptionistView';

function App() {


  return (
    <RouterProvider router={router} />
    // </DoctorsTable>
  )
}
// function App() {
//   const [view, setView] = useState('labTechnician');

//   return (
//     <>
//       {view === 'labTechnician' && <PatientEnquiry />}
//       {/* {view === 'patient' && <PatientsTable />} */}
//       {/* {view === 'appointment' && <AppointmentTable />} */}
//       {/* Add other components as needed */}
//     </>
//   );
// }


export default App;
