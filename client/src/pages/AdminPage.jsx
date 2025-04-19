import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Box, Divider, List, ListItemButton, ListItemText, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie";
import { setAuth } from '../Features/authSlice';
import AlertBar from '../components/Common/AlertBar';
import { setSnackBarInfo } from '../Features/snackbarSlice';
import axios from 'axios'

const AdminPage = () => {
  const auth=useSelector((state)=>state.authKey);
  const snackBarInfo=useSelector((state)=>state.snackBarKey)
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const fetchToken=async(authToken)=>{
    if(!authToken) navigate('/login',{replace:true})
    console.log("fetchtoken and decode")
    try {
      const res=await axios.post('http://localhost:8000/auth/decode-token',{authToken:authToken});
      console.log("decoded token ",res);
      const authState=res?.data;

      if(!authState || !authState?.verified ){
        console.log("not verified");
        navigate("/login",{replace:true});
      }
      else if(authState?.role!="admin"){
        dispatch(setSnackBarInfo({message:`You are not authorised to access this! Redirecting to ${cookieAuth?.role}`,severity:'error',open:true}))
        console.log("not authorised");
        navigate(`/${authState?.role}`,{replace:true});
      }
      console.log("out")
      dispatch(setAuth(authState));

    } catch (error) {
      console.log(error) 
    }
  }



  useEffect(() => {
    let cookieAuth = Cookies.get("auth");
    let authToken = Cookies.get("authToken");

    // if (cookieAuth) {
    //   cookieAuth = JSON.parse(cookieAuth);
    //   dispatch(setAuth(cookieAuth));
    // }
    // console.log(cookieAuth);
    console.log(authToken);


    //Axios call to http://localhost:8000/auth/decode-token to get decoded AuthToken and then dispatch in authState
    fetchToken(authToken);

    // const authState={"email":"admin@gmail.com","role":"admin"}

    
    
    // if(!cookieAuth || !cookieAuth?.verified ){
    //   console.log("not verified");
    //   navigate("/login",{replace:true});
    // }
    // else if(cookieAuth?.role!="admin"){
    //   dispatch(setSnackBarInfo({message:`You are not authorised to access this! Redirecting to ${cookieAuth?.role}`,severity:'error',open:true}))
    //   console.log("not authorised");
    //   navigate(`/${cookieAuth?.role}`,{replace:true});
    // }
    // console.log("out")

    // if(!authState || !authState?.verified ){
    //   console.log("not verified");
    //   navigate("/login",{replace:true});
    // }
    // else if(authState?.role!="admin"){
    //   dispatch(setSnackBarInfo({message:`You are not authorised to access this! Redirecting to ${cookieAuth?.role}`,severity:'error',open:true}))
    //   console.log("not authorised");
    //   navigate(`/${authState?.role}`,{replace:true});
    // }
    // console.log("out")
    
  }, [navigate]);



 

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
                  backgroundColor: isActive(`/admin/employees`)
                    ? 'rgba(0, 0, 0, 0.1)'
                    : 'rgba(0, 0, 0, 0.04)',
                },
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
