import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { setAuth } from "../Features/authSlice";

import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
} from "@mui/material";
//import "./Login.css";

function LoginPage() {
  const dispatch=useDispatch();
  const auth=useSelector((state)=>state.authKey);


  const [HID, setHID] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Authenticate if user exists

    //admin
    const adminRes={email:"admin@gmail.com",role:"admin"}

    //Doctor
    const doctorRes={email:"doctor@gmail.com",role:"doctor",did:2001}

    //LabTechnician
    const labRes={email:"labT@gmail.com",role:"labTechnician",ltid:2003,labRNo:3001}

    //Receptionist
    const recRes={email:"rec@gmail.com",role:"receptionist",rId:2016}

    const res=recRes;

    dispatch(setAuth({verified:false,...res}))

    console.log(auth);

    console.log("login",res);

    navigate("/verify-otp");

  };

  return (
    <Container maxWidth="sm">
      <Box className="container">
        <Typography variant="h4" className="heading">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Hospital ID"
            variant="outlined"
            fullWidth
            value={HID}
            onChange={(e) => setHID(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
          >
            Send OTP
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default LoginPage;