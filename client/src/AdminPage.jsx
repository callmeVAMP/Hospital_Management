import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Divider
} from '@mui/material';

const AdminPage = () => {
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Patients', path: 'patient' },
    { text: 'Hospital Staff', path: 'employees' },
    { text: 'Rooms', path: 'rooms' },
    { text: 'Occupancy', path: 'occupancy' },
    { text: 'Lab & Test Info', path: 'labTest' },
    { text: 'Treatments', path: 'treatment' },
    { text: 'Operations', path: 'operations' }
  ];

  return (
    <Box display="flex">
      <Box width="240px" bgcolor="#f7f7f7" p={2} height="100vh">
        <Typography variant="h6" gutterBottom>
          Admin Dashboard
        </Typography>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <ListItemButton key={index} onClick={() => navigate(item.path)}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Box flex={1} p={3}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminPage;
