// DoctorHistory.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

const dummyHistory = {
  '123': [
    { date: '2024-03-01', operation: 'Heart Surgery' },
    { date: '2024-03-15', operation: 'Cardiac Check-up' }
  ],
  '456': [
    { date: '2024-04-10', operation: 'Neuro Consultation' }
  ]
};

const DoctorHistory = () => {
  const { id } = useParams();
  const history = dummyHistory[id] || [];

  return (
    <Paper sx={{ p: 4, m: 4 }}>
      <Typography variant="h5" gutterBottom>
        Doctor Operation History
      </Typography>
      <Typography variant="subtitle1">Doctor ID: {id}</Typography>
      <List>
        {history.length > 0 ? history.map((entry, index) => (
          <ListItem key={index}>
            <ListItemText primary={entry.operation} secondary={entry.date} />
          </ListItem>
        )) : (
          <ListItem>
            <ListItemText primary="No operations found." />
          </ListItem>
        )}
      </List>
    </Paper>
  );
};

export default DoctorHistory;
