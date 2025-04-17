import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import React from 'react';
import { Box, Divider, List, ListItemButton, ListItemText, Paper, Typography } from '@mui/material';

const LabTechnicianPage = () => {
  const navigate = useNavigate();  // Initialize the navigate function
  const location = useLocation();  // Get the current location/path

  // Updated handleNavigation to include all sections
  const handleNavigation = (section) => {
    switch (section) {
      case 'previous':
        navigate('/labTechnician/previous');
        break;
      case 'scheduled':
        navigate('/labTechnician/scheduled');
        break;
  
      default:
        break;
    }
  };

  // A function to check if the section is active based on the current location
  const isActive = (path) => location.pathname.includes(path);

  return (
    <div>
      LabTechnicianPage
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
            LabTechnician Panel
          </Typography>
          <Divider />
          <List>
            <ListItemButton 
              onClick={() => handleNavigation('previous')} 
              sx={{ 
                backgroundColor: isActive('/labTechnician/previous') ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                '&:hover': {
                  backgroundColor: isActive('/labTechnician/previous') ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.04)',
                }
              }}
            >
              <ListItemText primary="Previous" />
            </ListItemButton>
            <ListItemButton 
              onClick={() => handleNavigation('scheduled')} 
              sx={{ 
                backgroundColor: isActive('/labTechnician/scheduled') ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                '&:hover': {
                  backgroundColor: isActive('/labTechnician/scheduled') ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.04)',
                }
              }}
            >
              <ListItemText primary="Scheduled" />
            </ListItemButton>
           
          </List>
        </Paper>

        {/* Content */}
        <Box sx={{ flexGrow: 1, p: 4 }}>
          <Typography variant="h5" gutterBottom>
            {/* The content can be rendered via the respective routes */}
            LabTechnician Panel Content
            <Outlet />
          </Typography>
          {/* The content will now be rendered based on routing */}
        </Box>
      </Box>
    </div>
  );
};

export default LabTechnicianPage;
