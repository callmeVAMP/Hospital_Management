import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// import DoctorsTable from './components/DoctorList';
// import AppointmentTable from './components/appointment';
// import PatientsTable from './components/rough/r1';
import PatientDashboard from './components/Doctor/PatientList';
import AppointmentTable from './components/Receptionist/appointmentstable';

import { DataGrid } from '@mui/x-data-grid';
// import DataGridExample  from './components/t';
// import SxProp from './components/test';
// import AppointmentsTable from './components/d_appointment_nikki';
// import AppointmentForm from './components/appointment_form_nikki';
import ScheduledTestsTable from './components/LabTechnician/ScheduledTests';
import PreviousTestsTable from './components/LabTechnician/PreviousTests';
import AllotmentListTable from './components/Admin/RoomOccupancy';
import RoomInfoTable from './components/Admin/RoomInfo';
import BookRoomForm from './components/Admin/BookOrEditRoom';
import { DeleteRoomDialog } from './components/Admin/DeleteRoomDialog';
import LabInfoTable from './components/Admin/LabAndTestInfo';
import LandingPage from './pages/LandingPage';
import AdminPage from './pages/AdminPage';
import PatientsList from './components/Admin/PatientsList';
import EmployeeList from './components/Admin/EmployeeList';
import RoomOccupancy from './components/Admin/RoomOccupancy';
import LabAndTestInfo from './components/Admin/LabAndTestInfo';
import OperationInfo from './components/Admin/OperationInfo';
import {createBrowserRouter, RouterProvider, Outlet, useLocation, Navigate} from 'react-router-dom'
import TreatmentInfo from './components/Admin/TreatmentInfo';


const ROLES={
  'USER':2001,
  'ADMIN':5000
}

const LayoutComponent=()=>{
  return (
    <div className=''>
      <Outlet />
    </div>
  )
}

const router=createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },

  {
    path: "/admin",
    element: <AdminPage />,
    children:[{
      path: "/admin/patient",
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
  }





])


function App() {


  return (
    <RouterProvider router={router} />
  )
}

export default App
