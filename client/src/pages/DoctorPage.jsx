
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setSnackBarInfo } from '../Features/snackbarSlice';
import Cookies from "js-cookie";
import { setAuth } from '../Features/authSlice';

const DoctorPage = () => {
  
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
    else if(cookieAuth?.role!="doctor"){
      dispatch(setSnackBarInfo({message:`You are not authorised to access this! Redirecting to ${cookieAuth?.role}`,severity:'error',open:true}))
      console.log("not authorised");
      navigate(`/${cookieAuth?.role}`,{replace:true});
    }
    
  }, [navigate]);


  const location = useLocation();

  // Updated handleNavigation to include all sections
  const handleNavigation = (section) => {
    switch (section) {
      case 'appointments':
        navigate('/doctor/appointments');
        break;
      case 'patients':
        navigate('/doctor/patient');
        break;
      default:
        break;
    }
  };

  const isActive = (path) => location.pathname.includes(path);

  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');

  return (
    <div>
    DoctorPage
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
          Doctor Panel
        </Typography>
        <Divider />
        <List>
          <ListItemButton 
            onClick={() => handleNavigation('appointments')} 
            sx={{ 
              backgroundColor: isActive('/doctor/appointments') ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
              '&:hover': {
                backgroundColor: isActive('/doctor/appointments') ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.04)',
              }
            }}
          >
            <ListItemText primary="Appointments" />
          </ListItemButton>
          <ListItemButton 
            onClick={() => handleNavigation('patients')} 
            sx={{ 
              backgroundColor: isActive('/doctor/patient') ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
              '&:hover': {
                backgroundColor: isActive('/doctor/patient') ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.04)',
              }
            }}
          >
            <ListItemText primary="Patients" />
          </ListItemButton>
         
        </List>
      </Paper>

      {/* Content */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Typography variant="h5" gutterBottom>
          {/* The content can be rendered via the respective routes */}
          Doctor Panel Content
          <Outlet />
        </Typography>
        {/* The content will now be rendered based on routing */}
      </Box>
    </Box>
  </div>
  );
};

 export default DoctorPage;



