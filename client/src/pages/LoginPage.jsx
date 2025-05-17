// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from 'react-redux'
// import { setAuth } from "../Features/authSlice";

// import axios from "axios";

// import {
//   TextField,
//   Button,
//   Typography,
//   Container,
//   Snackbar,
//   Alert,
//   Tabs,
//   Tab,
//   Paper,
// } from "@mui/material";

// const roles = ["Admin", "Doctor", "Receptionist", "LabTechnician"];
// const roleColors = {
//   Admin: "#48CAE4",
//   Doctor: "#5ced73",
//   Receptionist: "#ED9121",
//   LabTech: "#da8ee7",
// };

// function Login() {
//   //const [HID, setHID] = useState("");
//   const [Email, setEmail] = useState("");
//   const [Password, setPassword] = useState("");
//   const [selectedRole, setSelectedRole] = useState(0);

//   const [snack, setSnack] = useState({
//     open: false,
//     message: "",
//     severity: "info",
//   });

//   const navigate = useNavigate();

//   const handleSnackClose = () => {
//     setSnack({ ...snack, open: false });
//   };

//   const showSnackbar = (message, severity = "info") => {
//     setSnack({ open: true, message, severity });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:8000/auth/send-otp", {
//         //HID,
//         Email,
//         Password,
//         Role: roles[selectedRole].toLowerCase(),
//       });

//       if (response.data === "OTP sent successfully") {
//         showSnackbar("OTP sent to your email", "success");
//         navigate("/verify-otp", {
//           state: {  Email, Password, Role: roles[selectedRole].toLowerCase() },
//         });
//       }
//     } catch (err) {
//       const msg =
//         err.response?.data?.message || "An unexpected error occurred.";
//       showSnackbar(msg, "error");
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
//         <Typography variant="h4" gutterBottom align="center">
//           Login
//         </Typography>

//         {/* Role Tabs */}
//         <Tabs
//           value={selectedRole}
//           onChange={(e, newValue) => setSelectedRole(newValue)}
//           variant="fullWidth"
//           sx={{
//             mb: 3,
//             borderRadius: 1,
//             overflow: "hidden",
//             "& .MuiTabs-indicator": {
//               backgroundColor: roleColors[roles[selectedRole]],
//               height: 4,
//             },
//           }}
//         >
//           {roles.map((role, index) => (
//             <Tab
//               key={role}
//               label={role}
//               sx={{
//                 color: selectedRole === index ? "#fff" : "#000",
//                 backgroundColor:
//                   selectedRole === index ? roleColors[role] : "#f5f5f5",
//                 fontWeight: 600,
//                 transition: "0.3s",
//               }}
//             />
//           ))}
//         </Tabs>

//         <form onSubmit={handleSubmit}>
//           {/* <TextField
//             label="Hospital ID"
//             variant="outlined"
//             fullWidth
//             value={HID}
//             onChange={(e) => setHID(e.target.value)}
//             margin="normal"
//             required
//           /> */}
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
//           <TextField
//             label="Role"
//             variant="outlined"
//             fullWidth
//             value={roles[selectedRole]}
//             margin="normal"
//             InputProps={{
//               readOnly: true,
//             }}
//           />

//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             sx={{
//               mt: 3,
//               backgroundColor: roleColors[roles[selectedRole]],
//               fontWeight: "bold",
//               ":hover": {
//                 backgroundColor: `${roleColors[roles[selectedRole]]}cc`,
//               },
//             }}
//           >
//             Send OTP
//           </Button>
//         </form>
//       </Paper>

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

// export default Login;



// login page.jsx


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
  Box,
} from "@mui/material";

const roles = ["Admin", "Doctor", "Receptionist", "LabTechnician"];
const roleColors = {
  Admin: "#48CAE4",
  Doctor: "#5ced73",
  Receptionist: "#ED9121",
  LabTechnician: "#da8ee7",
};

function Login() {
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
      const response = await axios.post("http://localhost:8000/auth/send-otp", {
        Email,
        Password,
        Role: roles[selectedRole].toLowerCase(),
      });

      if (response.data === "OTP sent successfully") {
        showSnackbar("OTP sent to your email", "success");
        navigate("/verify-otp", {
          state: { Email, Password, Role: roles[selectedRole].toLowerCase() },
        });
      }
    } catch (err) {
      const msg = err.response?.data?.message || "An unexpected error occurred.";
      showSnackbar(msg, "error");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        background: "linear-gradient(to right, #f0f4f8, #ffffff)",
      }}
    >
      {/* Left Side Image */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          background: "#e3f2fd",
        }}
      >
        <img
          src="https://plus.unsplash.com/premium_photo-1733317206347-e6eeea03bf41?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Login Visual"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      {/* Right Side Login Card */}
      <Container
        maxWidth="sm"
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 6,
        }}
      >
        <Paper
          elevation={5}
          sx={{
            width: "100%",
            borderRadius: 4,
            p: 4,
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
            backgroundColor: "#ffffff",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: roleColors[roles[selectedRole]],
            }}
          >
            Welcome Back
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            sx={{ color: "text.secondary", mb: 3 }}
          >
            Login to continue
          </Typography>

          <Tabs
            value={selectedRole}
            onChange={(e, newValue) => setSelectedRole(newValue)}
            variant="fullWidth"
            sx={{
              mb: 3,
              borderRadius: 2,
              backgroundColor: "#f5f5f5",
              "& .MuiTabs-indicator": {
                backgroundColor: roleColors[roles[selectedRole]],
                height: 4,
                borderRadius: 2,
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
                    selectedRole === index ? roleColors[role] : "transparent",
                  fontWeight: 600,
                  transition: "all 0.3s",
                  borderRadius: 1,
                }}
              />
            ))}
          </Tabs>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              label="Selected Role"
              variant="outlined"
              fullWidth
              value={roles[selectedRole]}
              margin="normal"
              InputProps={{ readOnly: true }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                py: 1.3,
                fontWeight: 600,
                backgroundColor: roleColors[roles[selectedRole]],
                fontSize: "1rem",
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: `${roleColors[roles[selectedRole]]}cc`,
                },
              }}
            >
              Send OTP
            </Button>
          </form>
        </Paper>
      </Container>

      {/* Snackbar */}
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
    </Box>
  );
}

export default Login;