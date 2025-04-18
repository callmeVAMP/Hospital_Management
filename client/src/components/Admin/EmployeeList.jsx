import React, { useState } from 'react';
import { Tabs, Tab, Typography, Box } from '@mui/material';
import DoctorsTable from './DoctorList';
import NursesTable from './NurseList';
import LabTechniciansTable from './LabTechnicianList';
import ReceptionistTable from './ReceptionistList';

function EmployeeList() {
  const [tab, setTab] = useState('doctor');

  return (
    <Box>
      <Tabs
        value={tab}
        onChange={(e, newValue) => setTab(newValue)}
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 2 }}
      >
        <Tab value="doctor" label="DOCTOR" />
        <Tab value="nurse" label="NURSE" />
        <Tab value="lab" label="LAB TECHNICIAN" />
        <Tab value="receptionist" label="RECEPTIONIST" />
      </Tabs>
      {tab === 'doctor' && <DoctorsTable />}
      {tab === 'nurse' && <NursesTable />}
      {tab === 'lab' && <LabTechniciansTable />}
      {tab === 'receptionist' && <ReceptionistTable />}
    </Box>
  );
}

export default EmployeeList;
