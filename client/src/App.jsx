import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Button } from '@mui/material';
import BasicTable from './components/Table';
import DataTable from './components/Table2';
import DenseTable from './components/Table3';
import BasicBasic from './components/Basic';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='mt-4 text-2xl'>
      {/* hELLO */}
      <Button variant='contained'>Hello</Button>
      {/* <BasicTable /> */}
      <DataTable />
      {/* <DenseTable /> */}
      {/* <BasicBasic /> */}
    </div>
  )
}

export default App
