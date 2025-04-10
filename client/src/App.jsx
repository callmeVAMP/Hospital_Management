import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import DoctorsTable from './components/DoctorList';




function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='mt-4 text-2xl'>
      {/* hELLO */}
      {/* <BasicBasic /> */}
      {/* <AppointmentForm /> */}
      {/* <AppointmentsTable /> */}
      <DoctorsTable />
      {/* <DoctorForm open={true} /> */}
      
      
    </div>
  )
}

export default App
