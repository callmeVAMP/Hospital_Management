import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Container,
  Snackbar,
  Alert,
  Tabs,
  Tab,
  Paper,
} from "@mui/material";

const roles = ["Admin", "Doctor", "Receptionist", "LabTech"];
const roleColors = {
  Admin: "#48CAE4",
  Doctor: "#5ced73",
  Receptionist: "#ED9121",
  LabTech: "#da8ee7",
};

function Login() {
  //const [HID, setHID] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState(0);

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const navigate = useNavigate();

  const handleSnackClose = () => {
    setSnack({ ...snack, open: false });
  };

  const showSnackbar = (message, severity = "info") => {
    setSnack({ open: true, message, severity });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/auth/send-otp", {
        //HID,
        Email,
        Password,
        Role: roles[selectedRole],
      });

      if (response.data === "OTP sent successfully") {
        showSnackbar("OTP sent to your email", "success");
        navigate("/verify-otp", {
          state: {  Email, Password, Role: roles[selectedRole] },
        });
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || "An unexpected error occurred.";
      showSnackbar(msg, "error");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h4" gutterBottom align="center">
          Login
        </Typography>

        {/* Role Tabs */}
        <Tabs
          value={selectedRole}
          onChange={(e, newValue) => setSelectedRole(newValue)}
          variant="fullWidth"
          sx={{
            mb: 3,
            borderRadius: 1,
            overflow: "hidden",
            "& .MuiTabs-indicator": {
              backgroundColor: roleColors[roles[selectedRole]],
              height: 4,
            },
          }}
        >
          {roles.map((role, index) => (
            <Tab
              key={role}
              label={role}
              sx={{
                color: selectedRole === index ? "#fff" : "#000",
                backgroundColor:
                  selectedRole === index ? roleColors[role] : "#f5f5f5",
                fontWeight: 600,
                transition: "0.3s",
              }}
            />
          ))}
        </Tabs>

        <form onSubmit={handleSubmit}>
          {/* <TextField
            label="Hospital ID"
            variant="outlined"
            fullWidth
            value={HID}
            onChange={(e) => setHID(e.target.value)}
            margin="normal"
            required
          /> */}
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
          <TextField
            label="Role"
            variant="outlined"
            fullWidth
            value={roles[selectedRole]}
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              backgroundColor: roleColors[roles[selectedRole]],
              fontWeight: "bold",
              ":hover": {
                backgroundColor: `${roleColors[roles[selectedRole]]}cc`,
              },
            }}
          >
            Send OTP
          </Button>
        </form>
      </Paper>

      <Snackbar
        open={snack.open}
        autoHideDuration={4000}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackClose}
          severity={snack.severity}
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Login;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   TextField,
//   Button,
//   Typography,
//   Box,
//   Container,
// } from "@mui/material";
// //import "./Login.css";

// function Login() {
//   const [HID, setHID] = useState("");
//   const [Email, setEmail] = useState("");
//   const [Password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:3000/auth/send-otp", {
//         HID,
//         Email,
//         Password,
//       });
      
//       console.log(response)

//       if (response.data === "OTP sent successfully") {
//         alert("OTP sent to your email.");
//         navigate("/verify-otp", {
//           state: { HID, Email, Password },
//         });
//       }
//     } catch (err) {
//       if (err.response && err.response.data && err.response.data.message) {
//         alert(err.response.data.message); // ← show user-friendly error
//       } else {
//         alert("An unexpected error occurred.");
//       }
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box className="container">
//         <Typography variant="h4" className="heading">
//           Login
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Hospital ID"
//             variant="outlined"
//             fullWidth
//             value={HID}
//             onChange={(e) => setHID(e.target.value)}
//             margin="normal"
//             required
//           />
//           <TextField
//             label="Email"
//             type="email"
//             variant="outlined"
//             fullWidth
//             value={Email}
//             onChange={(e) => setEmail(e.target.value)}
//             margin="normal"
//             required
//           />
//           <TextField
//             label="Password"
//             type="password"
//             variant="outlined"
//             fullWidth
//             value={Password}
//             onChange={(e) => setPassword(e.target.value)}
//             margin="normal"
//             required
//           />
//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             sx={{ mt: 2 }}
//           >
//             Send OTP
//           </Button>
//         </form>
//       </Box>
//     </Container>
//   );
// }

// export default Login;


// import React, { useState } from 'react';
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   FormControlLabel,
//   Checkbox,
//   InputAdornment,
//   IconButton,
//   ToggleButton,
//   ToggleButtonGroup,
//   Divider,
//   Snackbar,
//   Alert,
// } from '@mui/material';
// import {
//   Visibility,
//   VisibilityOff,
//   AccountCircle,
//   Lock,
//   Facebook,
//   Google,
//   LinkedIn,
//   Twitter,
// } from '@mui/icons-material';

// export default function LoginPage() {
//   const [role, setRole] = useState('admin');
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const [otp, setOtp] = useState('');
//   const [loginSuccess, setLoginSuccess] = useState(false);
//   const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });

//   const handleRoleChange = (_, newRole) => {
//     if (newRole) setRole(newRole);
//   };

//   const handleInitialLogin = () => {
//     // Simulate correct credentials
//     if (email === 'clinivaAdmin' && password === 'p') {
//       setOtpSent(true);
//       setAlert({ open: true, message: 'OTP sent to your email!', severity: 'success' });
//     } else {
//       setAlert({ open: true, message: 'Invalid email or password', severity: 'error' });
//     }
//   };

//   const handleOtpVerify = () => {
//     if (otp === '123456') {
//       setLoginSuccess(true);
//       setAlert({ open: true, message: 'Login successful!', severity: 'success' });
//     } else {
//       setAlert({ open: true, message: 'Invalid OTP', severity: 'error' });
//     }
//   };

//   return (
//     <Box sx={{ display: 'flex', height: '100vh' }}>
//       {/* Left Section - Illustration */}
//       <Box
//         sx={{
//           flex: 1,
//           backgroundColor: '#f5f9ff',
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           justifyContent: 'center',
//           px: 4,
//         }}
//       >
//         <img src="/cliniva-logo.png" alt="Cliniva Logo" width={60} />
//         <Typography variant="h4" fontWeight="bold" mt={2} mb={4}>
//           CLINIVA
//         </Typography>
//         <img
//           src="/cliniva-illustration.png"
//           alt="Heart Illustration"
//           style={{ maxWidth: '80%', height: 'auto' }}
//         />
//       </Box>

//       {/* Right Section - Login */}
//       <Box
//         sx={{
//           flex: 1,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           px: 4,
//         }}
//       >
//         <Box sx={{ width: '100%', maxWidth: 400 }}>
//           <Typography variant="h6" gutterBottom>
//             Welcome to Cliniva
//           </Typography>

//           {/* Role Toggle */}
//           <ToggleButtonGroup
//             value={role}
//             exclusive
//             onChange={handleRoleChange}
//             fullWidth
//             sx={{ mb: 3 }}
//           >
//             <ToggleButton value="admin" sx={{ bgcolor: role === 'admin' ? 'green' : '' }}>
//               Admin
//             </ToggleButton>
//             <ToggleButton value="doctor" sx={{ bgcolor: role === 'doctor' ? 'orange' : '' }}>
//               Doctor
//             </ToggleButton>
//             <ToggleButton value="receptionist" sx={{ bgcolor: role === 'receptionist' ? 'blue' : '' }}>
//               Receptionist
//             </ToggleButton>
//             <ToggleButton value="Lab Tech" sx={{ bgcolor: role === 'Lab Tech' ? 'blue' : '' }}>
//               Lab Tech
//             </ToggleButton>
//           </ToggleButtonGroup>

//           {/* Login Form */}
//           <TextField
//             label="Email"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <AccountCircle />
//                 </InputAdornment>
//               ),
//             }}
//           />

//           <TextField
//             label="Password"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             type={showPassword ? 'text' : 'password'}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Lock />
//                 </InputAdornment>
//               ),
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />

//           <Box
//             sx={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               mb: 2,
//             }}
//           >
//             <FormControlLabel control={<Checkbox />} label="Remember me" />
//             <Button size="small" sx={{ textTransform: 'none' }}>
//               Forgot Password?
//             </Button>
//           </Box>

//           {!otpSent ? (
//             <Button variant="contained" fullWidth sx={{ mb: 2 }} onClick={handleInitialLogin}>
//               Login
//             </Button>
//           ) : (
//             <>
//               <TextField
//                 label="Enter OTP"
//                 variant="outlined"
//                 fullWidth
//                 margin="normal"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//               />
//               <Button variant="contained" fullWidth sx={{ mb: 2 }} onClick={handleOtpVerify}>
//                 Verify OTP
//               </Button>
//             </>
//           )}

//           {/* OR divider */}
//           <Divider sx={{ my: 2 }}>OR</Divider>

//           {/* Social Media Login */}
//           <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
//             <IconButton>
//               <Google />
//             </IconButton>
//             <IconButton>
//               <Facebook />
//             </IconButton>
//             <IconButton>
//               <Twitter />
//             </IconButton>
//             <IconButton>
//               <LinkedIn />
//             </IconButton>
//           </Box>
//         </Box>
//       </Box>

//       {/* Snackbar Alert */}
//       <Snackbar
//         open={alert.open}
//         autoHideDuration={3000}
//         onClose={() => setAlert({ ...alert, open: false })}
//       >
//         <Alert severity={alert.severity} sx={{ width: '100%' }}>
//           {alert.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }







// // import React, { useState } from 'react';
// // import {
// //   Box,
// //   Button,
// //   TextField,
// //   Typography,
// //   FormControlLabel,
// //   Checkbox,
// //   InputAdornment,
// //   IconButton,
// //   ToggleButton,
// //   ToggleButtonGroup,
// //   Divider,
// // } from '@mui/material';
// // import {
// //   Visibility,
// //   VisibilityOff,
// //   AccountCircle,
// //   Lock,
// //   Facebook,
// //   Google,
// //   LinkedIn,
// //   Twitter,
// // } from '@mui/icons-material';

// // export default function LoginPage() {
// //   const [role, setRole] = useState('admin');
// //   const [showPassword, setShowPassword] = useState(false);

// //   const handleRoleChange = (_, newRole) => {
// //     if (newRole) setRole(newRole);
// //   };

// //   return (
// //     <Box sx={{ display: 'flex', height: '100vh' }}>
// //       {/* Left Section - Illustration */}
// //       <Box
// //         sx={{
// //           flex: 1,
// //           backgroundColor: '#f5f9ff',
// //           display: 'flex',
// //           flexDirection: 'column',
// //           alignItems: 'center',
// //           justifyContent: 'center',
// //           px: 4,
// //         }}
// //       >
// //         <img src="/cliniva-logo.png" alt="Cliniva Logo" width={60} />
// //         <Typography variant="h4" fontWeight="bold" mt={2} mb={4}>
// //           CLINIVA
// //         </Typography>
// //         <img
// //           src="/cliniva-illustration.png"
// //           alt="Heart Illustration"
// //           style={{ maxWidth: '80%', height: 'auto' }}
// //         />
// //       </Box>

// //       {/* Right Section - Login */}
// //       <Box
// //         sx={{
// //           flex: 1,
// //           display: 'flex',
// //           alignItems: 'center',
// //           justifyContent: 'center',
// //           px: 4,
// //         }}
// //       >
// //         <Box sx={{ width: '100%', maxWidth: 400 }}>
// //           <Typography variant="h6" gutterBottom>
// //             Welcome to Cliniva
// //           </Typography>
// //           {/* <Typography variant="body2" sx={{ mb: 2 }}>
// //             Need an account?{' '}
// //             <Button size="small" sx={{ textTransform: 'none' }}>
// //               Sign Up
// //             </Button>
// //           </Typography> */}

// //           {/* Role Toggle */}
// //           <ToggleButtonGroup
// //             value={role}
// //             exclusive
// //             onChange={handleRoleChange}
// //             fullWidth
// //             sx={{ mb: 3 }}
// //           >
// //             <ToggleButton value="admin" sx={{ bgcolor: role === 'admin' ? 'green' : '' }}>
// //               Admin
// //             </ToggleButton>
// //             <ToggleButton value="doctor" sx={{ bgcolor: role === 'doctor' ? 'orange' : '' }}>
// //               Doctor
// //             </ToggleButton>
// //             <ToggleButton value="receptionist" sx={{ bgcolor: role === 'receptionist' ? 'blue' : '' }}>
// //               Receptionist
// //             </ToggleButton>
// //             <ToggleButton value="Lab Tech" sx={{ bgcolor: role === 'Lab Tech' ? 'blue' : '' }}>
// //             Lab Tech
// //             </ToggleButton>
// //           </ToggleButtonGroup>

// //           {/* Login Form */}
// //           <TextField
// //             label="Email"
// //             variant="outlined"
// //             fullWidth
// //             margin="normal"
// //             defaultValue="clinivaAdmin"
// //             InputProps={{
// //               startAdornment: (
// //                 <InputAdornment position="start">
// //                   <AccountCircle />
// //                 </InputAdornment>
// //               ),
// //             }}
// //           />

// //           <TextField
// //             label="Password"
// //             variant="outlined"
// //             fullWidth
// //             margin="normal"
// //             type={showPassword ? 'text' : 'password'}
// //             InputProps={{
// //               startAdornment: (
// //                 <InputAdornment position="start">
// //                   <Lock />
// //                 </InputAdornment>
// //               ),
// //               endAdornment: (
// //                 <InputAdornment position="end">
// //                   <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
// //                     {showPassword ? <VisibilityOff /> : <Visibility />}
// //                   </IconButton>
// //                 </InputAdornment>
// //               ),
// //             }}
// //           />

// //           <Box
// //             sx={{
// //               display: 'flex',
// //               justifyContent: 'space-between',
// //               alignItems: 'center',
// //               mb: 2,
// //             }}
// //           >
// //             <FormControlLabel control={<Checkbox />} label="Remember me" />
// //             <Button size="small" sx={{ textTransform: 'none' }}>
// //               Forgot Password?
// //             </Button>
// //           </Box>

// //           <Button variant="contained" fullWidth sx={{ mb: 2 }}>
// //             Login
// //           </Button>

// //           {/* OR divider */}
// //           <Divider sx={{ my: 2 }}>OR</Divider>

// //           {/* Social Media Login */}
// //           <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
// //             <IconButton>
// //               <Google />
// //             </IconButton>
// //             <IconButton>
// //               <Facebook />
// //             </IconButton>
// //             <IconButton>
// //               <Twitter />
// //             </IconButton>
// //             <IconButton>
// //               <LinkedIn />
// //             </IconButton>
// //           </Box>
// //         </Box>
// //       </Box>
// //     </Box>
// //   );
// // }
