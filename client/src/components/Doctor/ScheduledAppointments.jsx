
// // import React, { useState } from "react";
// // import {
// //   Box,
// //   Typography,
// //   Avatar,
// //   TextField,
// //   Chip,
// //   IconButton,
// //   Tooltip,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   Button,
// //   Select,
// //   MenuItem,
// //   InputLabel,
// //   FormControl,
// //   OutlinedInput,
// //   Checkbox,
// //   ListItemText,
// //   TextareaAutosize,
// // } from "@mui/material";
// // import { DataGrid } from "@mui/x-data-grid";
// // import {
// //   AccessTime,
// //   Email,
// //   Phone,
// //   LocationOn,
// //   MoreVert,
// // } from "@mui/icons-material";

// // const testOptions = ["Blood Test", "X-Ray", "MRI", "ECG", "Urine Test"];

// // const patients = [
// //   {
// //     id: 1,
// //     name: "John D...",
// //     date: "02/25/2018",
// //     time: "09:00",
// //     email: "john@example.com",
// //     mobile: "1234567890",
// //     gender: "female",
// //     status: "Upcoming",
// //     address: "123 Elm St",
// //     disease: "Fever",
// //     lastVisit: "09/01/2024",
// //     avatar: "https://randomuser.me/api/portraits/men/1.jpg",
// //   },
// //   {
// //     id: 2,
// //     name: "Jane S...",
// //     date: "10/02/2024",
// //     time: "09:00",
// //     email: "jane@example.com",
// //     mobile: "0987654321",
// //     gender: "male",
// //     status: "Completed",
// //     address: "456 Oak St",
// //     disease: "Flu",
// //     lastVisit: "08/15/2024",
// //     avatar: "https://randomuser.me/api/portraits/women/2.jpg",
// //   },
// // ];

// // const genderColor = {
// //   male: "success",
// //   female: "secondary",
// // };

// // const statusColor = {
// //   Upcoming: "info",
// //   Completed: "success",
// //   Canceled: "error",
// // };

// // export default function AppointmentsTable() {
// //   const [open, setOpen] = useState(false);
// //   const [selectedPatient, setSelectedPatient] = useState(null);
// //   const [selectedTests, setSelectedTests] = useState([]);
// //   const [drugs, setDrugs] = useState("");
// //   const [treatment, setTreatment] = useState("");
// //   const [searchQuery, setSearchQuery] = useState("");

// //   const filteredPatients = patients.filter((patient) =>
// //     patient.name.toLowerCase().includes(searchQuery.toLowerCase())
// //   );

// //   const handleOpenDialog = (row) => {
// //     setSelectedPatient(row);
// //     setSelectedTests([]);
// //     setDrugs("");
// //     setTreatment("");
// //     setOpen(true);
// //   };

// //   const handleClose = () => {
// //     setOpen(false);
// //   };

// //   const handleTestChange = (event) => {
// //     setSelectedTests(event.target.value);
// //   };

// //   const handleSave = () => {
// //     console.log("Patient:", selectedPatient.name);
// //     console.log("Tests:", selectedTests);
// //     console.log("Drugs:", drugs);
// //     console.log("Treatment:", treatment);
// //     setOpen(false);
// //   };

// //   const columns = [
// //     {
// //       field: "name",
// //       headerName: "Patient Name",
// //       flex: 1.5,
// //       renderCell: (params) => (
// //         <Box display="flex" alignItems="center" gap={1}>
// //           {/* <Avatar src={params.row.avatar} /> */}
// //           <Typography noWrap>{params.value}</Typography>
// //         </Box>
// //       ),
// //     },
// //     { field: "date", headerName: "Appointment Date", flex: 1 },
// //     {
// //       field: "time",
// //       headerName: "Time",
// //       flex: 0.7,
// //       renderCell: (params) => (
// //         <Box display="flex" alignItems="center" gap={0.5}>
// //           <AccessTime fontSize="small" />
// //           {params.value}
// //         </Box>
// //       ),
// //     },
// //     {
// //       field: "email",
// //       headerName: "Email",
// //       flex: 1.5,
// //       renderCell: (params) => (
// //         <Box display="flex" alignItems="center" gap={1}>
// //           <Email fontSize="small" color="error" />
// //           <Typography noWrap>{params.value}</Typography>
// //         </Box>
// //       ),
// //     },
// //     {
// //       field: "mobile",
// //       headerName: "Mobile",
// //       flex: 1,
// //       renderCell: (params) => (
// //         <Box display="flex" alignItems="center" gap={1}>
// //           <Phone fontSize="small" color="success" />
// //           <Typography noWrap>{params.value}</Typography>
// //         </Box>
// //       ),
// //     },
// //     {
// //       field: "gender",
// //       headerName: "Gender",
// //       flex: 0.8,
// //       renderCell: (params) => (
// //         <Chip
// //           label={params.value}
// //           color={genderColor[params.value] || "default"}
// //           variant="outlined"
// //           size="small"
// //         />
// //       ),
// //     },
// //     {
// //       field: "status",
// //       headerName: "Status",
// //       flex: 1,
// //       renderCell: (params) => (
// //         <Chip
// //           label={params.value}
// //           color={statusColor[params.value] || "default"}
// //           size="small"
// //         />
// //       ),
// //     },
// //     {
// //       field: "address",
// //       headerName: "Address",
// //       flex: 1.5,
// //       renderCell: (params) => (
// //         <Box display="flex" alignItems="center" gap={1}>
// //           <LocationOn fontSize="small" color="primary" />
// //           <Typography noWrap>{params.value}</Typography>
// //         </Box>
// //       ),
// //     },
// //     {
// //       field: "disease",
// //       headerName: "Disease",
// //       flex: 1,
// //     },
// //     // {
// //     //   field: "lastVisit",
// //     //   headerName: "Last Visit Date",
// //     //   flex: 1,
// //     // },
// //     {
// //       field: "actions",
// //       headerName: "Actions",
// //       flex: 0.5,
// //       sortable: false,
// //       renderCell: (params) => (
// //         <Tooltip title="Prescribe Details">
// //           <IconButton onClick={() => handleOpenDialog(params.row)}>
// //             <MoreVert />
// //           </IconButton>
// //         </Tooltip>
// //       ),
// //     },
// //   ];

// //   return (
// //     <Box sx={{ height: 600, width: "100%", p: 2 }}>
// //       <Typography variant="h6" sx={{ mb: 1 }}>
// //         Appointments
// //       </Typography>
// //       {/* <TextField
// //         variant="outlined"
// //         placeholder="Search"
// //         size="small"
// //         sx={{ mb: 2, width: 300 }}
// //       /> */}
// //       <TextField
// //   variant="outlined"
// //   placeholder="Search by name"
// //   size="small"
// //   sx={{ mb: 2, width: 300 }}
// //   value={searchQuery}
// //   onChange={(e) => setSearchQuery(e.target.value)}
// // />
// //       <DataGrid
// //         // rows={patients}
// //         rows={filteredPatients}
// //         columns={columns}
// //         pageSize={5}
// //         rowsPerPageOptions={[5, 10]}
// //         pagination
// //         disableSelectionOnClick
// //         sx={{
// //           backgroundColor: "white",
// //           borderRadius: 2,
// //           "& .MuiDataGrid-columnHeaders": {
// //             backgroundColor: "#f3f6f9",
// //             fontWeight: "bold",
// //           },
// //         }}
// //       />

// //       {/* Dialog */}
// //       <Dialog open={open} onClose={handleClose} fullWidth>
// //         <DialogTitle>Prescription for {selectedPatient?.name}</DialogTitle>
// //         <DialogContent dividers>
// //           <Typography variant="subtitle2" gutterBottom>
// //             <strong>Disease:</strong> {selectedPatient?.disease}
// //           </Typography>

// //           <FormControl fullWidth margin="normal">
// //             <InputLabel>Tests</InputLabel>
// //             <Select
// //               multiple
// //               value={selectedTests}
// //               onChange={handleTestChange}
// //               input={<OutlinedInput label="Tests" />}
// //               renderValue={(selected) => selected.join(", ")}
// //             >
// //               {testOptions.map((test) => (
// //                 <MenuItem key={test} value={test}>
// //                   <Checkbox checked={selectedTests.indexOf(test) > -1} />
// //                   <ListItemText primary={test} />
// //                 </MenuItem>
// //               ))}
// //             </Select>
// //           </FormControl>

// //           <Typography sx={{ mt: 2 }}>Drugs Prescribed</Typography>
// //           <TextareaAutosize
// //             placeholder="Enter drugs prescribed"
// //             minRows={2}
// //             style={{ width: "100%", marginTop: 4 }}
// //             value={drugs}
// //             onChange={(e) => setDrugs(e.target.value)}
// //           />

// //           <Typography sx={{ mt: 2 }}>Treatment Advice</Typography>
// //           <TextareaAutosize
// //             placeholder="Enter treatment details"
// //             minRows={3}
// //             style={{ width: "100%", marginTop: 4 }}
// //             value={treatment}
// //             onChange={(e) => setTreatment(e.target.value)}
// //           />
// //         </DialogContent>

// //         <DialogActions>
// //           <Button onClick={handleClose}>Cancel</Button>
// //           <Button variant="contained" onClick={handleSave}>
// //             Save
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //     </Box>
// //   );
// // }

// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Chip,
//   IconButton,
//   Tooltip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   OutlinedInput,
//   Checkbox,
//   ListItemText,
//   TextareaAutosize,
//   Menu,
// } from "@mui/material";
// import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
// import {
//   AccessTime,
//   Email,
//   Phone,
//   LocationOn,
//   MoreVert,
//   Refresh,
//   Download,
//   Add,
//   ViewColumn,
//   Search as SearchIcon,
// } from "@mui/icons-material";

// const testOptions = ["Blood Test", "X-Ray", "MRI", "ECG", "Urine Test"];

// const patients = [
//   {
//     id: 1,
//     name: "John Doe",
//     date: "02/25/2018",
//     time: "09:00",
//     email: "john@example.com",
//     mobile: "1234567890",
//     gender: "female",
//     status: "Upcoming",
//     address: "123 Elm St",
//     disease: "Fever",
//     lastVisit: "09/01/2024",
//     avatar: "https://randomuser.me/api/portraits/men/1.jpg",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     date: "10/02/2024",
//     time: "09:00",
//     email: "jane@example.com",
//     mobile: "0987654321",
//     gender: "male",
//     status: "Completed",
//     address: "456 Oak St",
//     disease: "Flu",
//     lastVisit: "08/15/2024",
//     avatar: "https://randomuser.me/api/portraits/women/2.jpg",
//   },
//   {
//     id: 3,
//     name: "Robert Johnson",
//     date: "10/05/2024",
//     time: "11:30",
//     email: "robert@example.com",
//     mobile: "5678901234",
//     gender: "male",
//     status: "Upcoming",
//     address: "789 Pine St",
//     disease: "Headache",
//     lastVisit: "07/22/2024",
//     avatar: "https://randomuser.me/api/portraits/men/3.jpg",
//   },
//   {
//     id: 4,
//     name: "Emily Wilson",
//     date: "09/28/2024",
//     time: "14:00",
//     email: "emily@example.com",
//     mobile: "3456789012",
//     gender: "female",
//     status: "Canceled",
//     address: "321 Maple Ave",
//     disease: "Back Pain",
//     lastVisit: "08/30/2024",
//     avatar: "https://randomuser.me/api/portraits/women/4.jpg",
//   },
// ];

// const genderColor = {
//   male: "success",
//   female: "secondary",
// };

// const statusColor = {
//   Upcoming: "info",
//   Completed: "success",
//   Canceled: "error",
// };

// export default function AppointmentsTable() {
//   const [open, setOpen] = useState(false);
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [selectedTests, setSelectedTests] = useState([]);
//   const [drugs, setDrugs] = useState("");
//   const [treatment, setTreatment] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
  
//   // Column visibility state
//   const [columnVisibilityModel, setColumnVisibilityModel] = useState({
//     name: true,
//     date: true,
//     time: true,
//     email: true,
//     mobile: true,
//     gender: true,
//     status: true,
//     address: true,
//     disease: true,
//   });
  
//   // Menu state
//   const [anchorEl, setAnchorEl] = useState(null);
//   const menuOpen = Boolean(anchorEl);
//   const apiRef = useGridApiRef();

//   const filteredPatients = patients.filter((patient) =>
//     patient.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleOpenDialog = (row) => {
//     setSelectedPatient(row);
//     setSelectedTests([]);
//     setDrugs("");
//     setTreatment("");
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleTestChange = (event) => {
//     setSelectedTests(event.target.value);
//   };

//   const handleSave = () => {
//     console.log("Patient:", selectedPatient.name);
//     console.log("Tests:", selectedTests);
//     console.log("Drugs:", drugs);
//     console.log("Treatment:", treatment);
//     setOpen(false);
//   };
  
//   const handleRefreshTable = () => {
//     // In a real application, this would fetch fresh data
//     console.log("Refreshing table data");
//   };

//   const columns = [
//     {
//       field: "name",
//       headerName: "Patient Name",
//       flex: 1.5,
//       renderCell: (params) => (
//         <Box display="flex" alignItems="center" gap={1}>
//           <Typography noWrap>{params.value}</Typography>
//         </Box>
//       ),
//     },
//     { field: "date", headerName: "Appointment Date", flex: 1 },
//     {
//       field: "time",
//       headerName: "Time",
//       flex: 0.7,
//       renderCell: (params) => (
//         <Box display="flex" alignItems="center" gap={0.5}>
//           <AccessTime fontSize="small" />
//           {params.value}
//         </Box>
//       ),
//     },
//     {
//       field: "email",
//       headerName: "Email",
//       flex: 1.5,
//       renderCell: (params) => (
//         <Box display="flex" alignItems="center" gap={1}>
//           <Email fontSize="small" color="error" />
//           <Typography noWrap>{params.value}</Typography>
//         </Box>
//       ),
//     },
//     {
//       field: "mobile",
//       headerName: "Mobile",
//       flex: 1,
//       renderCell: (params) => (
//         <Box display="flex" alignItems="center" gap={1}>
//           <Phone fontSize="small" color="success" />
//           <Typography noWrap>{params.value}</Typography>
//         </Box>
//       ),
//     },
//     {
//       field: "gender",
//       headerName: "Gender",
//       flex: 0.8,
//       renderCell: (params) => (
//         <Chip
//           label={params.value}
//           color={genderColor[params.value] || "default"}
//           variant="outlined"
//           size="small"
//         />
//       ),
//     },
//     {
//       field: "status",
//       headerName: "Status",
//       flex: 1,
//       renderCell: (params) => (
//         <Chip
//           label={params.value}
//           color={statusColor[params.value] || "default"}
//           size="small"
//         />
//       ),
//     },
//     {
//       field: "address",
//       headerName: "Address",
//       flex: 1.5,
//       renderCell: (params) => (
//         <Box display="flex" alignItems="center" gap={1}>
//           <LocationOn fontSize="small" color="primary" />
//           <Typography noWrap>{params.value}</Typography>
//         </Box>
//       ),
//     },
//     {
//       field: "disease",
//       headerName: "Disease",
//       flex: 1,
//     },
//     {
//       field: "actions",
//       headerName: "Actions",
//       flex: 0.5,
//       sortable: false,
//       renderCell: (params) => (
//         <Tooltip title="Prescribe Details">
//           <IconButton onClick={() => handleOpenDialog(params.row)}>
//             <MoreVert />
//           </IconButton>
//         </Tooltip>
//       ),
//     },
//   ];

//   return (
//     <Box sx={{ height: 600, width: "100%", p: 2 }}>
//       {/* Header Bar */}
//       <Box
//         sx={{
//           backgroundColor: "#dbe3f4",
//           p: 2,
//           borderTopLeftRadius: 12,
//           borderTopRightRadius: 12,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <Typography variant="h6">Appointments</Typography>
//         <Box display="flex" alignItems="center" gap={2}>
//           {/* Search Box */}
//           <Box
//             sx={{
//               backgroundColor: "white",
//               px: 2,
//               py: 0.5,
//               borderRadius: 1,
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//             }}
//           >
//             <SearchIcon fontSize="small" />
//             <TextField
//               variant="standard"
//               placeholder="Search by name"
//               InputProps={{ disableUnderline: true }}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               size="small"
//             />
//           </Box>
//           {/* Column Visibility */}
//           <Tooltip title="Show/Hide Columns">
//             <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
//               <ViewColumn />
//             </IconButton>
//           </Tooltip>
//           <Menu anchorEl={anchorEl} open={menuOpen} onClose={() => setAnchorEl(null)}>
//             {Object.keys(columnVisibilityModel).map((field) => (
//               <MenuItem key={field}>
//                 <Checkbox
//                   checked={columnVisibilityModel[field]}
//                   onChange={() =>
//                     setColumnVisibilityModel((prev) => ({
//                       ...prev,
//                       [field]: !prev[field],
//                     }))
//                   }
//                 />
//                 <Typography>{columns.find((c) => c.field === field)?.headerName}</Typography>
//               </MenuItem>
//             ))}
//           </Menu>
//           {/* Add Button (placeholder) */}
//           <Tooltip title="Add New Appointment">
//             <IconButton>
//               <Add sx={{ color: "green" }} />
//             </IconButton>
//           </Tooltip>
//           {/* Refresh Button */}
//           <Tooltip title="Refresh">
//             <IconButton onClick={handleRefreshTable}>
//               <Refresh />
//             </IconButton>
//           </Tooltip>
//           {/* Download Button */}
//           <Tooltip title="Download XLSX">
//             <IconButton onClick={() => apiRef.current.exportDataAsCsv()}>
//               <Download sx={{ color: "#3b82f6" }} />
//             </IconButton>
//           </Tooltip>
//         </Box>
//       </Box>
      
//       {/* Data Grid */}
//       <DataGrid
//         columnVisibilityModel={columnVisibilityModel}
//         onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
//         apiRef={apiRef}
//         rows={filteredPatients}
//         columns={columns}
//         pageSize={10}
//         rowsPerPageOptions={[10, 15]}
//         pagination
//         disableSelectionOnClick
//         sx={{
//           backgroundColor: "white",
//           borderRadius: 2,
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: "#f3f6f9",
//             fontWeight: "bold",
//           },
//         }}
//       />

//       {/* Prescription Dialog */}
//       <Dialog open={open} onClose={handleClose} fullWidth>
//         <DialogTitle>Prescription for {selectedPatient?.name}</DialogTitle>
//         <DialogContent dividers>
//           <Typography variant="subtitle2" gutterBottom>
//             <strong>Disease:</strong> {selectedPatient?.disease}
//           </Typography>

//           <FormControl fullWidth margin="normal">
//             <InputLabel>Tests</InputLabel>
//             <Select
//               multiple
//               value={selectedTests}
//               onChange={handleTestChange}
//               input={<OutlinedInput label="Tests" />}
//               renderValue={(selected) => selected.join(", ")}
//             >
//               {testOptions.map((test) => (
//                 <MenuItem key={test} value={test}>
//                   <Checkbox checked={selectedTests.indexOf(test) > -1} />
//                   <ListItemText primary={test} />
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <Typography sx={{ mt: 2 }}>Drugs Prescribed</Typography>
//           <TextareaAutosize
//             placeholder="Enter drugs prescribed"
//             minRows={2}
//             style={{ width: "100%", marginTop: 4, padding: 8, borderColor: '#ccc', borderRadius: 4 }}
//             value={drugs}
//             onChange={(e) => setDrugs(e.target.value)}
//           />

//           <Typography sx={{ mt: 2 }}>Treatment Advice</Typography>
//           <TextareaAutosize
//             placeholder="Enter treatment details"
//             minRows={3}
//             style={{ width: "100%", marginTop: 4, padding: 8, borderColor: '#ccc', borderRadius: 4 }}
//             value={treatment}
//             onChange={(e) => setTreatment(e.target.value)}
//           />
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={handleClose} color="error">Cancel</Button>
//           <Button variant="contained" onClick={handleSave} color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }

import dayjs from 'dayjs'
import React, { useState, useEffect } from "react";
import {
  Box, Typography, TextField, Chip, IconButton, Tooltip, Dialog, DialogTitle,
  DialogContent, DialogActions, Button, Select, MenuItem, InputLabel,
  FormControl, OutlinedInput, Checkbox, ListItemText, TextareaAutosize,
  Menu, CircularProgress, Alert
} from "@mui/material";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import {
  AccessTime, Phone, LocationOn, MoreVert, Refresh, Download, Add, ViewColumn, Search as SearchIcon
} from "@mui/icons-material";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import { setSnackBarInfo } from '../../Features/snackbarSlice';
import { useDispatch } from 'react-redux';

// const testOptions = ["Blood Test", "X-Ray", "MRI", "ECG", "Urine Test"];

// Map numeric priority to label and color
const priorityLabel = { 1: "High", 2: "Medium", 3: "Low" };
const priorityColor = { 1: "error", 2: "warning", 3: "success" };

// Status mapping based on date
// const getStatus = (dateString) => {
//   const appointmentDate = new Date(dateString);
//   const today = new Date();
//   // Remove time for comparison
//   appointmentDate.setHours(0,0,0,0);
//   today.setHours(0,0,0,0);
//   if (appointmentDate < today) return "Completed";
//   if (appointmentDate > today) return "Upcoming";
//   return "Today";
// };

const getStatus = (dateString, treatment, drugs) => {
  // Check if both treatment and drugs are missing
  if (!treatment && !drugs) return "Upcoming";
  
  // Original date-based logic
  const appointmentDate = new Date(dateString);
  const today = new Date();
  
  // Remove time components for accurate comparison
  appointmentDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  if (appointmentDate < today) return "Completed";
  if (appointmentDate > today) return "Upcoming";
  return "Today";
};

const statusColor = {
  Upcoming: "info",
  Completed: "success",
  Canceled: "error",
  Today: "warning",
};

export default function AppointmentsTable() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [open, setOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedTests, setSelectedTests] = useState([]);
  const [drugs, setDrugs] = useState("");
  const [treatment, setTreatment] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [testOptions, setTestOptions] = useState([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    name: true, date: true, time: true, priority: true, problem: true, mobile: true, address: true, status: true,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const apiRef = useGridApiRef();

  useEffect(() => {
    async function fetchTests() {
      try {
        const res = await fetch("http://localhost:8000/appointment/tests/all");
        const data = await res.json();
        // data: [{ TestName: "Blood Test" }, ...]
        setTestOptions(data.map(t => t.TestName));
      } catch (err) {
        console.error("Failed to fetch test options", err);
      }
    }
    fetchTests();
  }, [navigate]);

  const formatDateTime = (date, time) => {
    const [timePart, modifier] = time.split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);
  
    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
  
    const hh = String(hours).padStart(2, '0');
    const mm = String(minutes).padStart(2, '0');
  
    return `${date} ${hh}:${mm}:00`;
  };

  // Fetch appointments
  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8000/appointment/all');
      console.log(response);
      // const formattedData = response.data.map((app, index) => {
      //   const dateObj = new Date(app.DTime);
      //   return {
      //     id: index + 1,
      //     name: app.PName,
      //     date: app.DTime,
      //     time: app.DTime,
      //     priority: app.Priority,
      //     problem: app.Problem,
      //     mobile: app.PPhNo,
      //     address: app.PAddr,
      //     status: getStatus(app.DTime),
      //   };
      // });
      const formattedData = response.data.map((app, index) => ({
        id: index + 1,
        name: app.PName,
        rawDateTime: app.DTime, // keep the raw ISO string
        startDate: dayjs(app.DTime).format("YYYY-MM-DD"),
        startTime: dayjs(app.DTime).format("hh:mm A"),
        priority: app.Priority,
        problem: app.Problem,
        mobile: app.PPhNo,
        address: app.PAddr,
        // status: getStatus(app.DTime),
        status: getStatus(app.DTime, app.TreatmentSuggested, app.Drugs),
      }));
      console.log('formatted ---------')
      console.log(`Formatted data ${formattedData}`);

      
      setAppointments(formattedData);
    } catch (err) {
      setError('Failed to load appointments. Please try again later.');
      console.log(err)
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => { fetchAppointments(); }, [navigate]);

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenDialog = (row) => {
    setSelectedPatient(row);
    setSelectedTests([]);
    setDrugs("");
    setTreatment("");
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const handleTestChange = (event) => setSelectedTests(event.target.value);
  // const handleSave = () => {
  //   // Implement your save logic here
  //   setOpen(false);
  // };
  const handleSave = async () => {
    if (!selectedPatient || selectedTests.length === 0) {
      alert("Please select at least one test.");
      return;
    }
  
    try {
      // For each selected test, send a POST request
      await Promise.all(
        selectedTests.map(async (testName) => {
          const payload = {
            TestName: testName,
            PName: selectedPatient.name,
            PPhNo: selectedPatient.mobile,
            DTime: selectedPatient.rawDateTime,
            // Optionally include drugs and treatment if needed
            Drugs: drugs,
            Treatment: treatment,
          };
          await axios.post("http://localhost:8000/patient/add-test", payload);
        })
      );
      // alert("Test(s) added successfully!");
      setOpen(false);
      dispatch(setSnackBarInfo({message:`Test Added Successfully`,severity:'success',open:true}))
           
    } catch (error) {
      alert("Failed to add test(s).");
      console.error(error);
    }
  };
  
  const handleRefreshTable = () => fetchAppointments();

  const columns = [
    {
      field: "name",
      headerName: "Patient Name",
      flex: 1.5,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Typography noWrap>{params.value || "—"}</Typography>
        </Box>
      ),
    },
    {
      field: "startDate",
      headerName: "Date",
      flex: 1,
      // valueFormatter: (params) => {
      //   if (!params || !params.value) return "—";
      //   const dateObj = new Date(params.value);
      //   if (isNaN(dateObj)) return "—";
      //   return dateObj.toLocaleDateString();
      // },
    },
    {
      field: "startTime",
      headerName: "Time",
      flex: 0.7,
      // valueFormatter: (params) => {
      //   if (!params || !params.value) return "—";
      //   const dateObj = new Date(params.value);
      //   if (isNaN(dateObj)) return "—";
      //   return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      // },
      // renderCell: (params) => (
      //   <Box display="flex" alignItems="center" gap={0.5}>
      //     <AccessTime fontSize="small" />
      //     <Typography>{params.formattedValue || "—"}</Typography>
      //   </Box>
      // ),
    },
    
    
    {

      field: "priority",
      headerName: "Priority",
      flex: 0.8,
      renderCell: (params) => {
        const label = priorityLabel[params.value] || params.value || "—";
        const color = priorityColor[params.value] || "default";
        return <Chip label={label} color={color} size="small" />;
      },
    },
    {
      field: "problem",
      headerName: "Problem/Disease",
      flex: 1.2,
      renderCell: (params) => (
        <Typography>{params.value || "—"}</Typography>
      ),
    },
    {
      field: "mobile",
      headerName: "Contact",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Phone fontSize="small" color="success" />
          <Typography noWrap>{params.value || "—"}</Typography>
        </Box>
      ),
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1.5,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <LocationOn fontSize="small" color="primary" />
          <Typography noWrap>{params.value || "—"}</Typography>
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.8,
      renderCell: (params) => {
        const color = statusColor[params.value] || "default";
        return <Chip label={params.value || "—"} color={color} size="small" />;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title="View/Edit Details">
          <IconButton onClick={() => handleOpenDialog(params.row)}>
            <MoreVert />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: "100%", p: 2 }}>
      {/* Header Bar */}
      <Box
        sx={{
          backgroundColor: "#dbe3f4",
          p: 2,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">Appointments</Typography>
        <Box display="flex" alignItems="center" gap={2}>
          {/* Search Box */}
          <Box
            sx={{
              backgroundColor: "white",
              px: 2,
              py: 0.5,
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <SearchIcon fontSize="small" />
            <TextField
              variant="standard"
              placeholder="Search by name"
              InputProps={{ disableUnderline: true }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
            />
          </Box>
          {/* Column Visibility */}
          <Tooltip title="Show/Hide Columns">
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <ViewColumn />
            </IconButton>
          </Tooltip>
          <Menu anchorEl={anchorEl} open={menuOpen} onClose={() => setAnchorEl(null)}>
            {columns.slice(0, -1).map((column) => (
              <MenuItem key={column.field}>
                <Checkbox
                  checked={columnVisibilityModel[column.field] !== false}
                  onChange={() =>
                    setColumnVisibilityModel((prev) => ({
                      ...prev,
                      [column.field]: !prev[column.field],
                    }))
                  }
                />
                <Typography>{column.headerName}</Typography>
              </MenuItem>
            ))}
          </Menu>
          {/* Add Button (placeholder) */}
          <Tooltip title="Add New Appointment">
            <IconButton>
              <Add sx={{ color: "green" }} />
            </IconButton>
          </Tooltip>
          {/* Refresh Button */}
          <Tooltip title="Refresh Data">
            <IconButton onClick={handleRefreshTable}>
              <Refresh />
            </IconButton>
          </Tooltip>
          {/* Download Button */}
          <Tooltip title="Download XLSX">
            <IconButton onClick={() => apiRef.current.exportDataAsCsv()}>
              <Download sx={{ color: "#3b82f6" }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Data Grid */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="500px">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="500px">
          <Alert severity="error">{error}</Alert>
        </Box>
      ) : (
        <DataGrid
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
          apiRef={apiRef}
          rows={filteredAppointments}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
            sorting: {
              sortModel: [{ field: 'date', sort: 'desc' }],
            },
          }}
          pageSizeOptions={[10, 15, 25]}
          pagination
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f3f6f9",
              fontWeight: "bold",
            },
          }}
        />
      )}

      {/* Prescription Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Details for {selectedPatient?.name || "Patient"}</DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle2" gutterBottom>
            <strong>Problem:</strong> {selectedPatient?.problem || "Not specified"}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            <strong>Contact:</strong> {selectedPatient?.mobile || "Not available"}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            <strong>Address:</strong> {selectedPatient?.address || "Not available"}
          </Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel>Tests</InputLabel>
            <Select
              multiple
              value={selectedTests}
              onChange={handleTestChange}
              input={<OutlinedInput label="Tests" />}
              renderValue={(selected) => selected.join(", ")}
            >
              {testOptions.map((test) => (
                <MenuItem key={test} value={test}>
                  <Checkbox checked={selectedTests.indexOf(test) > -1} />
                  <ListItemText primary={test} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography sx={{ mt: 2 }}>Drugs Prescribed</Typography>
          <TextareaAutosize
            placeholder="Enter drugs prescribed"
            minRows={2}
            style={{ width: "100%", marginTop: 4, padding: 8, borderColor: '#ccc', borderRadius: 4 }}
            value={drugs}
            onChange={(e) => setDrugs(e.target.value)}
          />
          <Typography sx={{ mt: 2 }}>Treatment Advice</Typography>
          <TextareaAutosize
            placeholder="Enter treatment details"
            minRows={3}
            style={{ width: "100%", marginTop: 4, padding: 8, borderColor: '#ccc', borderRadius: 4 }}
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">Cancel</Button>
          <Button variant="contained" onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}