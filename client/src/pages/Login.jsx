import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Snackbar,
  Alert,
  Tabs,
  Tab,
  Paper,
} from "@mui/material";

const roles = ["Admin", "Doctor", "Receptionist","LabTechnician"];
const roleColors = {
  Admin: "#48CAE4",         // Blue
  Doctor: "#5ced73",        // Green
  Receptionist: "#ED9121",  // Orange
  LabTech:"#da8ee7",
};

function AuthComponent() {
  const [HID, setHID] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [selectedRole, setSelectedRole] = useState(0);

  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleSnackClose = () => {
    setSnack({ ...snack, open: false });
  };

  const showSnackbar = (message, severity = "info") => {
    setSnack({ open: true, message, severity });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/auth/send-otp", {
        HID,
        Email,
        Password,
        Role: roles[selectedRole].toLowerCase(),
      });

      if (response.data === "OTP sent successfully") {
        showSnackbar("OTP sent to your email", "success");
        setOtpSent(true);
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || "An unexpected error occurred.";
      showSnackbar(msg, "error");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/auth/verify-otp", {
        HID,
        Password,
        otp,
        Role: roles[selectedRole].toLowerCase(),
      });

      if (response.data === "OTP verified. Login successful!") {
        showSnackbar("Login successful!", "success");
        // redirect if needed
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
          {otpSent ? "Verify OTP" : "Login"}
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
                  selectedRole === index
                    ? roleColors[role]
                    : "#f5f5f5",
                fontWeight: 600,
                transition: "0.3s",
              }}
            />
          ))}
        </Tabs>

        <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}>
          {!otpSent && (
            <>
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
            </>
          )}

          {otpSent && (
            <TextField
              label="Enter OTP"
              variant="outlined"
              fullWidth
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              margin="normal"
              required
            />
          )}

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
            {otpSent ? "Verify OTP" : "Send OTP"}
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

export default AuthComponent;



// import React, { useState } from "react";
// import axios from "axios";
// import {
//   TextField,
//   Button,
//   Typography,
//   Box,
//   Container,
//   Snackbar,
//   Alert,
// } from "@mui/material";

// function AuthComponent() {
//   const [HID, setHID] = useState("");
//   const [Email, setEmail] = useState("");
//   const [Password, setPassword] = useState("");
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);

//   const [snack, setSnack] = useState({
//     open: false,
//     message: "",
//     severity: "info", // "success", "error", "warning"
//   });

//   const handleSnackClose = () => {
//     setSnack({ ...snack, open: false });
//   };

//   const showSnackbar = (message, severity = "info") => {
//     setSnack({ open: true, message, severity });
//   };

//   const handleSendOtp = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:3000/auth/send-otp", {
//         HID,
//         Email,
//         Password,
//       });

//       if (response.data === "OTP sent successfully") {
//         showSnackbar("OTP sent to your email", "success");
//         setOtpSent(true);
//       }
//     } catch (err) {
//       const msg =
//         err.response?.data?.message || "An unexpected error occurred.";
//       showSnackbar(msg, "error");
//     }
//   };

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:3000/auth/verify-otp", {
//         HID,
//         Password,
//         otp,
//       });

//       if (response.data === "OTP verified. Login successful!") {
//         showSnackbar("Login successful!", "success");
//         // redirect if needed
//       }
//     } catch (err) {
//       const msg =
//         err.response?.data?.message || "An unexpected error occurred.";
//       showSnackbar(msg, "error");
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box className="container">
//         <Typography variant="h4" className="heading" gutterBottom>
//           {otpSent ? "Verify OTP" : "Login"}
//         </Typography>

//         <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}>
//           {!otpSent && (
//             <>
//               <TextField
//                 label="Hospital ID"
//                 variant="outlined"
//                 fullWidth
//                 value={HID}
//                 onChange={(e) => setHID(e.target.value)}
//                 margin="normal"
//                 required
//               />
//               <TextField
//                 label="Email"
//                 type="email"
//                 variant="outlined"
//                 fullWidth
//                 value={Email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 margin="normal"
//                 required
//               />
//               <TextField
//                 label="Password"
//                 type="password"
//                 variant="outlined"
//                 fullWidth
//                 value={Password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 margin="normal"
//                 required
//               />
//             </>
//           )}

//           {otpSent && (
//             <TextField
//               label="Enter OTP"
//               variant="outlined"
//               fullWidth
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               margin="normal"
//               required
//             />
//           )}

//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             sx={{ mt: 2 }}
//           >
//             {otpSent ? "Verify OTP" : "Send OTP"}
//           </Button>
//         </form>
//       </Box>

//       <Snackbar
//         open={snack.open}
//         autoHideDuration={4000}
//         onClose={handleSnackClose}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert
//           onClose={handleSnackClose}
//           severity={snack.severity}
//           sx={{ width: "100%" }}
//         >
//           {snack.message}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// }

// export default AuthComponent;


