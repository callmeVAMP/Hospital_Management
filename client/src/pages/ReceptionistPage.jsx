import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Box, Divider, List, ListItemButton, ListItemText, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie";
import { setAuth } from '../Features/authSlice';
import AlertBar from '../components/Common/AlertBar';
import { setSnackBarInfo } from '../Features/snackbarSlice';

const ReceptionistPage = () => {
  const auth=useSelector((state)=>state.authKey);
  const snackBarInfo=useSelector((state)=>state.snackBarKey)
  const dispatch=useDispatch();
  const navigate=useNavigate();



  useEffect(() => {
    let cookieAuth = Cookies.get("auth");

    if (cookieAuth) {
      cookieAuth = JSON.parse(cookieAuth);
      dispatch(setAuth(cookieAuth));
    }
    console.log(cookieAuth);
    
    
    if(!cookieAuth || !cookieAuth?.verified ){
      console.log("not verified");
      navigate("/login",{replace:true});
    }
    else if(cookieAuth?.role!="receptionist"){
      dispatch(setSnackBarInfo({message:`You are not authorised to access this! Redirecting to ${cookieAuth?.role}`,severity:'error',open:true}))
      console.log("not authorised");
      navigate(`/${cookieAuth?.role}`,{replace:true});
    }
    
  }, [navigate]);


  const location = useLocation();

  // Handle navigation for receptionist sections
  const handleNavigation = (section) => {
    switch (section) {
      case 'enquiry':
        navigate('/receptionist/PatientEnquiry');
        break;
      case 'register':
        navigate('/receptionist/PatientRegistrationForm');
        break;
      case 'appointment':
        navigate('/receptionist/AppointmentForm');
        break;
      case 'appointment_table':
        navigate('/receptionist/AppointmentTable');
        break;
      case 'room':
        navigate('/receptionist/RoomBookingForm');
        break;
      default:
        break;
    }
  };

  // Check if a section is currently active
  const isActive = (path) => location.pathname.includes(path);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Paper
        elevation={3}
        sx={{
          width: 240,
          height: '100%',
          bgcolor: 'background.paper',
          pt: 2,
        }}
      >
        <Typography variant="h6" align="center" gutterBottom>
          Receptionist Panel
        </Typography>
        <Divider />
        <List>
          <ListItemButton
            onClick={() => handleNavigation('enquiry')}
            sx={{
              backgroundColor: isActive('PatientEnquiry') ? 'rgba(25, 118, 210, 0.2)' : 'transparent',
              '&:hover': {
                backgroundColor: isActive('PatientEnquiry') ? 'rgba(25, 118, 210, 0.3)' : 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ListItemText primary="Patient Enquiry" />
          </ListItemButton>
          <ListItemButton
            onClick={() => handleNavigation('register')}
            sx={{
              backgroundColor: isActive('PatientRegistrationForm') ? 'rgba(25, 118, 210, 0.2)' : 'transparent',
              '&:hover': {
                backgroundColor: isActive('PatientRegistrationForm') ? 'rgba(25, 118, 210, 0.3)' : 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ListItemText primary="Patient Registration" />
          </ListItemButton>
          <ListItemButton
            onClick={() => handleNavigation('appointment')}
            sx={{
              backgroundColor: isActive('AppointmentForm') ? 'rgba(25, 118, 210, 0.2)' : 'transparent',
              '&:hover': {
                backgroundColor: isActive('AppointmentForm') ? 'rgba(25, 118, 210, 0.3)' : 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ListItemText primary="Add Appointment" />
          </ListItemButton>
          <ListItemButton
            onClick={() => handleNavigation('appointment_table')}
            sx={{
              backgroundColor: isActive('AppointmentTable') ? 'rgba(25, 118, 210, 0.2)' : 'transparent',
              '&:hover': {
                backgroundColor: isActive('AppointmentTable') ? 'rgba(25, 118, 210, 0.3)' : 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ListItemText primary="Appointment Table" />
          </ListItemButton>
          <ListItemButton
            onClick={() => handleNavigation('room')}
            sx={{
              backgroundColor: isActive('RoomBookingForm') ? 'rgba(25, 118, 210, 0.2)' : 'transparent',
              '&:hover': {
                backgroundColor: isActive('RoomBookingForm') ? 'rgba(25, 118, 210, 0.3)' : 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <ListItemText primary="Book Room" />
          </ListItemButton>
        </List>
      </Paper>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Receptionist Panel Content
        </Typography>
        <Outlet />
      </Box>

      
    </Box>
  );
};

export default ReceptionistPage;
