import React, { useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../Features/authSlice";
//import "./VerifyOtp.css"; // Assuming you have this for styling

function VerifyOtpPage() {
  const dispatch=useDispatch();
  const auth=useSelector((state)=>state.authKey);



  const location = useLocation();
  const navigate = useNavigate();

  const { HID, Password } = location.state || {};
  const [otp, setOtp] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    //OTP Verification Handled
    const otpver={verified:true,message:"OTP Verified Successfully!!"}

    const otpNotVer={verified:false,message:"Invalid or Expired OTP"}
    // const authToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiJ9.HD0fMVuYOH2YR461idWbSJ6aBUbvo1njROagrwYnEzQ"

    const res=otpver;
    console.log(res);

    if(res?.verified){
        var expiryTime = new Date(new Date().getTime() + 15 * 60 * 1000);
        Cookies.remove("auth");
        const authData = {...auth, verified: true};
        Cookies.set("auth", JSON.stringify(authData), { expires: expiryTime });
        Cookies.set("authToken", res?.authToken, { expires: expiryTime });

        // Also update redux
        dispatch(setAuth(authData));
    }
    else{
        //Error Message
    }


  };

  return (
    <Container maxWidth="sm">
      <Box className="container">
        <Typography variant="h4" className="heading">
          Verify OTP
        </Typography>
        <form onSubmit={handleVerify}>
          <TextField
            label="Enter OTP"
            variant="outlined"
            fullWidth
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
          >
            Verify OTP
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default VerifyOtpPage;