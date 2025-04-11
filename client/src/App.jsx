import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
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
  const [count, setCount] = useState(0)

  return (
    <div className='mt-4 text-2xl'>
      {/* hELLO */}
      {/* <Button variant='contained'>Hello</Button>
      <DataGridExample /> */}
      {/* <SxProp/> */}
      {/* <AppointmentsTable/> */}
      {/* <AppointmentForm/> */}
      {/* <DataTable /> */}
      {/* <DenseTable /> */}
      {/* <BasicBasic /> */}
      {/* <AppointmentForm /> */}
      <LabInfoTable />
      <AppointmentTable />
      {/* <PatientDashboard/> */}
      {/* <PatientsTable/> */}
      {/* {/* {/* <DoctorsTable /> */}  */}
      {/* <DoctorForm open={true} /> */}
      
      <PatientRegistrationForm />
      <RoomBookingForm />
      <PatientEnquiry />
    </div>
  )
}

export default App
