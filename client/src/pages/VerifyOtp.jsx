import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
} from "@mui/material";
//import "./VerifyOtp.css"; // Assuming you have this for styling

function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  const { Email, Password,Role } = location.state || {};
  const [otp, setOtp] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/auth/verify-otp", {
        Email,
        Password,
        Role,
        otp,
      });
      console.log("responseeee");
      console.log(response);
      if (response.data.message === "OTP verified. Login successful!") {
        alert("Login successful!");
        navigate("/dashboard"); // Redirect to the desired route
      }
     } //catch (error) {
    //   console.error("OTP verification error:", error);
    //   if (error.response && error.response.status === 401) {
    //     alert("Invalid or expired OTP");
    //   } else {
    //     alert("Server error. Please try again later.");
    //   }
    // }
    catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message); // ← show user-friendly error
      } else {
        alert("An unexpected error occurred.");
      }
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

export default VerifyOtp;
