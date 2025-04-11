import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import DoctorsTable from './components/DoctorList';
import RoomBookingForm from './components/Receptionist/RoomBedBooking';
import PatientRegistrationForm from './components/Receptionist/PatientRegistration';
import { DataGrid } from '@mui/x-data-grid';
import DataGridExample  from './components/t';
import SxProp from './components/test';
import AppointmentsTable from './components/d_appointment_nikki';
import AppointmentForm from './components/Receptionist/BookAppointment';
import PatientEnquiry from './components/Receptionist/PatientEnquiry';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='mt-4 text-2xl'>
      {/* hELLO */}
      {/* <Button variant='contained'>Hello</Button>
      <DataGridExample /> */}
      {/* <SxProp/> */}
      {/* <AppointmentsTable/> */}
      <AppointmentForm/>
      {/* <DataTable /> */}
      {/* <DenseTable /> */}
      {/* <BasicBasic /> */}
      {/* <AppointmentForm /> */}
      {/* <AppointmentsTable /> */}
      {/* <DoctorsTable /> */}
      {/* <DoctorForm open={true} /> */}
      
      <PatientRegistrationForm />
      <RoomBookingForm />
      <PatientEnquiry />
    </div>
  )
}

export default App
