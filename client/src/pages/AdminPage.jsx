import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import React from 'react';
import { Box, Divider, List, ListItemButton, ListItemText, Paper, Typography } from '@mui/material';

const AdminPage = () => {
  const navigate = useNavigate();  // Initialize the navigate function
  const location = useLocation();  // Get the current location/path

  // Updated handleNavigation to include all sections
  const handleNavigation = (section) => {
    switch (section) {
      case 'employees':
        navigate('/admin/employees');
        break;
      case 'patients':
        navigate('/admin/patient');
        break;
      case 'rooms':
        navigate('/admin/rooms');
        break;
      case 'occupancy':
        navigate('/admin/occupancy');
        break;
      case 'labTest':
        navigate('/admin/labTest');
        break;
      case 'treatment':
        navigate('/admin/treatment');
        break;
      case 'operations':
        navigate('/admin/operations');
        break;
      default:
        break;
    }
  };

  // A function to check if the section is active based on the current location
  const isActive = (path) => location.pathname.includes(path);

  return (
    <div>
      AdminPage
      <Box sx={{ display: 'flex', height: '100vh' }}>
        {/* Sidebar */}
        <Paper
          elevation={3}
          sx={{
            width: 200,
            height: '100%',
            bgcolor: 'background.paper',
            pt: 2,
          }}
        >
          <Typography variant="h6" align="center" gutterBottom>
            Admin Panel
          </Typography>
          <Divider />
          <List>
            <ListItemButton 
              onClick={() => handleNavigation('employees')} 
              sx={{ 
                backgroundColor: isActive('/admin/employees') ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                '&:hover': {
                  backgroundColor: isActive('/admin/employees') ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.04)',
                }
              }}
            >
              <ListItemText primary="Employees" />
            </ListItemButton>
            <ListItemButton 
              onClick={() => handleNavigation('patients')} 
              sx={{ 
                backgroundColor: isActive('/admin/patient') ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                '&:hover': {
                  backgroundColor: isActive('/admin/patient') ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.04)',
                }
              }}
            >
              <ListItemText primary="Patients" />
            </ListItemButton>
            <ListItemButton 
              onClick={() => handleNavigation('rooms')} 
              sx={{ 
                backgroundColor: isActive('/admin/rooms') ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                '&:hover': {
                  backgroundColor: isActive('/admin/rooms') ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.04)',
                }
              }}
            >
              <ListItemText primary="Rooms" />
            </ListItemButton>
            <ListItemButton 
              onClick={() => handleNavigation('occupancy')} 
              sx={{ 
                backgroundColor: isActive('/admin/occupancy') ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                '&:hover': {
                  backgroundColor: isActive('/admin/occupancy') ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.04)',
                }
              }}
            >
              <ListItemText primary="Occupancy" />
            </ListItemButton>
            <ListItemButton 
              onClick={() => handleNavigation('labTest')} 
              sx={{ 
                backgroundColor: isActive('/admin/labTest') ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                '&:hover': {
                  backgroundColor: isActive('/admin/labTest') ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.04)',
                }
              }}
            >
              <ListItemText primary="Lab Tests" />
            </ListItemButton>
            <ListItemButton 
              onClick={() => handleNavigation('treatment')} 
              sx={{ 
                backgroundColor: isActive('/admin/treatment') ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                '&:hover': {
                  backgroundColor: isActive('/admin/treatment') ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.04)',
                }
              }}
            >
              <ListItemText primary="Treatment" />
            </ListItemButton>
            <ListItemButton 
              onClick={() => handleNavigation('operations')} 
              sx={{ 
                backgroundColor: isActive('/admin/operations') ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                '&:hover': {
                  backgroundColor: isActive('/admin/operations') ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.04)',
                }
              }}
            >
              <ListItemText primary="Operations" />
            </ListItemButton>
          </List>
        </Paper>

        {/* Content */}
        <Box sx={{ flexGrow: 1, p: 4 }}>
          <Typography variant="h5" gutterBottom>
            {/* The content can be rendered via the respective routes */}
            Admin Panel Content
            <Outlet />
          </Typography>
          {/* The content will now be rendered based on routing */}
        </Box>
      </Box>
    </div>
  );
};

export default AdminPage;
