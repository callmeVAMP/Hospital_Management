// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   TextField,
//   Button,
//   Typography,
//   Box,
//   Container,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { setSnackBarInfo } from "../Features/snackbarSlice";
// import { setAuth } from "../Features/authSlice";
// import Cookies from "js-cookie";
// //import "./VerifyOtp.css"; // Assuming you have this for styling

// function VerifyOtp() {
//   const dispatch=useDispatch();
//   const auth=useSelector((state)=>state.authKey);

//   const location = useLocation();
//   const navigate = useNavigate();

//   const { Email, Password,Role } = location.state || {};
//   console.log(Email, Password, Role);
//   const [otp, setOtp] = useState("");

//   const handleVerify = async (e) => {
    
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:8000/auth/verify-otp", {
//         Email,
//         Password,
//         Role,
//         otp,
//       });
//       console.log("response");
//       console.log(response);
      
//       if(response?.data?.verified){
//           console.log("success ",response)
//           var expiryTime = new Date(new Date().getTime() + 15 * 60 * 1000);
//           // Cookies.remove("auth");
//           // const authData = {...response.data};
//           // Cookies.set("auth", JSON.stringify(authData), { expires: expiryTime });
//           Cookies.set("authToken", response?.data?.authToken, { expires: expiryTime });
  
//           // Also update redux
//           // dispatch(setAuth(authData));
//           dispatch(setSnackBarInfo({message:`OTP Verified Successfully`,severity:'success',open:true}))
//           navigate(`/${Role.toLowerCase()}`);
//       }
//       else{
//           dispatch(setSnackBarInfo({message:`OTP not verified`,severity:'error',open:true}))
//       }
//      } 
//     catch (err) {
//       if (err.response && err.response.data && err.response.data.message) {
//         // alert(err.response.data.message); // ← show user-friendly error
//         dispatch(setSnackBarInfo({message:`${err.response.data.message}`,severity:'error',open:true}))
//       } else {
//         // alert("An unexpected error occurred.");
//         dispatch(setSnackBarInfo({message:`Unexpected Error Occured`,severity:'error',open:true}))
        
//       }
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box className="container">
//         <Typography variant="h4" className="heading">
//           Verify OTP
//         </Typography>
//         <form onSubmit={handleVerify}>
//           <TextField
//             label="Enter OTP"
//             variant="outlined"
//             fullWidth
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             margin="normal"
//             required
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             sx={{ mt: 2 }}
//           >
//             Verify OTP
//           </Button>
//         </form>
//       </Box>
//     </Container>
//   );
// }

// export default VerifyOtp;






import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setSnackBarInfo } from "../Features/snackbarSlice";
import { setAuth } from "../Features/authSlice";
import Cookies from "js-cookie";

function VerifyOtp() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authKey);

  const location = useLocation();
  const navigate = useNavigate();

  const { Email, Password, Role } = location.state || {};
  console.log(Email, Password, Role);
  const [otp, setOtp] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/auth/verify-otp", {
        Email,
        Password,
        Role,
        otp,
      });
      console.log("response");
      console.log(response);

      if (response?.data?.verified) {
        console.log("success ", response);
        var expiryTime = new Date(new Date().getTime() + 15 * 60 * 1000);
        Cookies.set("authToken", response?.data?.authToken, { expires: expiryTime });

        dispatch(setSnackBarInfo({ message: `OTP Verified Successfully`, severity: 'success', open: true }));
        navigate(`/${Role.toLowerCase()}`);
      } else {
        dispatch(setSnackBarInfo({ message: `OTP not verified`, severity: 'error', open: true }));
      }
    } catch (err) {
      if (err.response?.data?.message) {
        dispatch(setSnackBarInfo({ message: `${err.response.data.message}`, severity: 'error', open: true }));
      } else {
        dispatch(setSnackBarInfo({ message: `Unexpected Error Occurred`, severity: 'error', open: true }));
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box>
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              textAlign: "center",
              fontWeight: 600,
              color: "primary.main",
            }}
          >
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
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2, py: 1.2 }}
            >
              Verify OTP
            </Button>
          </form>
        </Box>
      </Paper>
    </Container>
  );
}

export default VerifyOtp;