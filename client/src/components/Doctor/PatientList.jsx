// //perfect one so far

// //import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   TextField,
//   IconButton,
//   Tooltip,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Drawer,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   Menu,
//   MenuItem,
//   Checkbox,
//   Tabs,
//   Tab,
//   FormControl,
//   InputLabel,
//   Select
// } from '@mui/material';
// import React, { useState, useEffect } from 'react';

// import {
//   Search as SearchIcon,
//   Download,
//   ViewColumn,
//   Refresh,
//   Email,
//   Phone,
//   ArrowForward,
//   History
// } from '@mui/icons-material';

// const patients = [
//   { id: 'P001', name: 'John Doe', gender: 'Male', number: '1234567890', address: '123 Elm St', priority: 'Normal' },
//   { id: 'P002', name: 'Jane Smith', gender: 'Female', number: '9876543210', address: '456 Oak St', priority: 'Emergency' },
//   // Add more patients as needed
// ];

// const appointments = {
//   P001: [
//     {
//       date: '2024-02-25',
//       drugs: 'Paracetamol',
//       tests: 'CBC, X-ray',
//       treatment: 'Rest, fluids',
//       reportId: 'report1.pdf'
//     }
//   ],
//   P002: [
//     {
//       date: '2024-03-10',
//       drugs: 'Amoxicillin',
//       tests: 'Throat Culture',
//       treatment: 'Antibiotics',
//       reportId: 'report2.pdf'
//     },
//     {
//       date: '2024-04-01',
//       drugs: 'Ibuprofen',
//       tests: 'MRI',
//       treatment: 'Pain management',
//       reportId: 'report3.pdf'
//     }
//   ]
// };

// const treatmentHistory = {
//   P001: [
//     { name: 'Fever Treatment', startDate: '2024-02-20', endDate: '2024-02-28', report: 'fever_report.pdf' }
//   ],
//   P002: [
//     { name: 'Infection Treatment', startDate: '2024-03-01', endDate: '2024-03-15', report: 'infection_report.pdf' },
//     { name: 'Pain Relief', startDate: '2024-03-20', endDate: '2024-04-05', report: 'pain_report.pdf' }
//   ]
// };

// export default function PatientDashboard() {
//   const [tab, setTab] = useState(0);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [selectedPatient, setSelectedPatient] = useState(null);
//   const [historyOpen, setHistoryOpen] = useState(false);
  
//   // Filters
//   const [searchQuery, setSearchQuery] = useState('');
//   const [genderFilter, setGenderFilter] = useState('');
//   const [priorityFilter, setPriorityFilter] = useState('');
  
//   // Pagination
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
  
//   // Column visibility
//   const [anchorEl, setAnchorEl] = useState(null);
//   const menuOpen = Boolean(anchorEl);
//   const [columnVisibilityModel, setColumnVisibilityModel] = useState({
//     PID: true,
//     PName: true,
//     PGender: true,
//     PPhNo: true,
//     PAddr: true,
//     priority: true,
//   });
//   const [patients, setPatients] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   useEffect(() => {
//     const fetchPatients = async () => {
//       try {
//         //setLoading(true);
//         const response = await fetch('http://localhost:3000/patient/all/'); // Replace with your actual API URL
//         console.log("got the data")
//         console.log(response)
//         if (!response.ok) throw new Error('Failed to fetch patient data');
//         const data = await response.json();
//         console.log(data);
//         setPatients(data);
//       } catch (err) {
//         console.error(err);
//         setError(err.message);}
//       // } finally {
//       //   setLoading(false);
//       // }
//     };
  
//     fetchPatients();
//   }, []);


//   const openDetails = (patient) => {
//     setSelectedPatient(patient);
//     setTab(0);
//     setDrawerOpen(true);
//   };

//   const openHistory = (patient) => {
//     setSelectedPatient(patient);
//     setHistoryOpen(true);
//   };

//   const handleClick = (event) => setAnchorEl(event.currentTarget);
//   const handleClose = () => setAnchorEl(null);
//   const handleRefreshTable = () => {
//     // Refresh functionality 
//     const fetchPatients = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/patient/all/');
//         const data = await response.json();
//         setPatients(data);
//       } catch (error) {
//         console.error('Error fetching patients:', error);
//       }
//     };

//     fetchPatients();
//   };


//   const handleDownload = () => {
//     const headers = ['Patient ID', 'Name', 'Gender', 'Phone Number', 'Address', 'Priority'];
//     const csvRows = [
//       headers.join(','),
//       ...filteredPatients.map(p =>
//         [p.PID, p.PName, p.PGender, p.PPhNo, p.PAddr, p.priority || 'Normal'].join(',')
//       )
//     ];
//     const csvContent = `data:text/csv;charset=utf-8,${csvRows.join('\n')}`;
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement('a');
//     link.setAttribute('href', encodedUri);
//     link.setAttribute('download', 'patient_data.csv');
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const filteredPatients = (patients || []).filter((p) =>
//     ((p?.PName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
//       (p?.PID || '').toString().includes(searchQuery) ||
//       (p?.PPhNo || '').includes(searchQuery)) &&
//     (genderFilter ? p?.PGender === genderFilter : true) &&
//     (priorityFilter ? p?.priority === priorityFilter : true)
//   );
  

//   const paginatedPatients = filteredPatients.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

//   const columns = [
//     { field: 'PID', headerName: 'PatientID' },
//     { field: 'PName', headerName: 'Patient Name' },
//     { field: 'PGender', headerName: 'Gender' },
//     { field: 'PPhNo', headerName: 'Patient Number' },
//     { field: 'PAddr', headerName: 'Patient Address' },
//     { field: 'priority', headerName: 'Priority' },
//   ];

//   return (
//     <Box sx={{ height: 600, width: "100%", p: 2 }}>
//       {/* Header with controls */}
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
//         <Typography variant="h6">Patients</Typography>
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
//               placeholder="Search"
//               InputProps={{ disableUnderline: true }}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               size="small"
//             />
//           </Box>
          
//           {/* Filters */}
//           <FormControl sx={{ minWidth: 120, backgroundColor: "white", borderRadius: 1 }}>
//             <Select
//               value={genderFilter}
//               onChange={(e) => setGenderFilter(e.target.value)}
//               displayEmpty
//               size="small"
//               variant="outlined"
//               sx={{ height: 36 }}
//             >
//               <MenuItem value="">All Genders</MenuItem>
//               <MenuItem value="Male">Male</MenuItem>
//               <MenuItem value="Female">Female</MenuItem>
//             </Select>
//           </FormControl>
          
//           <FormControl sx={{ minWidth: 120, backgroundColor: "white", borderRadius: 1 }}>
//             <Select
//               value={priorityFilter}
//               onChange={(e) => setPriorityFilter(e.target.value)}
//               displayEmpty
//               size="small"
//               variant="outlined"
//               sx={{ height: 36 }}
//             >
//               <MenuItem value="">All Priorities</MenuItem>
//               <MenuItem value="Normal">Normal</MenuItem>
//               <MenuItem value="Emergency">Emergency</MenuItem>
//             </Select>
//           </FormControl>
          
//           {/* Column Visibility */}
//           <Tooltip title="Show/Hide Columns">
//             <IconButton onClick={handleClick}>
//               <ViewColumn />
//             </IconButton>
//           </Tooltip>
//           <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleClose}>
//             {columns.map((column) => (
//               <MenuItem key={column.field}>
//                 <Checkbox
//                   checked={columnVisibilityModel[column.field] !== false}
//                   onChange={() =>
//                     setColumnVisibilityModel((prev) => ({
//                       ...prev,
//                       [column.field]: !prev[column.field],
//                     }))
//                   }
//                 />
//                 <Typography>{column.headerName}</Typography>
//               </MenuItem>
//             ))}
//           </Menu>
          
//           {/* Action Buttons */}
//           <Tooltip title="Refresh">
//             <IconButton onClick={handleRefreshTable}>
//               <Refresh />
//             </IconButton>
//           </Tooltip>
          
//           <Tooltip title="Download CSV">
//             <IconButton onClick={handleDownload}>
//               <Download sx={{ color: "#3b82f6" }} />
//             </IconButton>
//           </Tooltip>
//         </Box>
//       </Box>

//       {/* Tabs */}
//       <Box sx={{ backgroundColor: "white", px: 2, pt: 1 }}>
//         <Tabs value={tab} onChange={(e, val) => setTab(val)} sx={{ mb: 1 }}>
//           <Tab label="All Appointments" />
//           <Tab label="My Appointments" />
//         </Tabs>
//       </Box>

//       {/* Patient Table */}
//       <TableContainer component={Paper} sx={{ borderRadius: 0, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
//         <Table>
//           <TableHead sx={{ backgroundColor: "#f3f6f9" }}>
//             <TableRow>
//               {columns.map((column) => (
//                 columnVisibilityModel[column.field] !== false && (
//                   <TableCell key={column.field} sx={{ fontWeight: "bold" }}>
//                     {column.headerName}
//                   </TableCell>
//                 )
//               ))}
//               <TableCell sx={{ fontWeight: "bold" }}>More Details</TableCell>
//               <TableCell sx={{ fontWeight: "bold" }}>History</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedPatients.map((patient, i) => (
//               <TableRow key={i}>
//                 {columnVisibilityModel.id !== false && <TableCell>{patient.id}</TableCell>}
//                 {columnVisibilityModel.name !== false && <TableCell>{patient.name}</TableCell>}
//                 {columnVisibilityModel.gender !== false && <TableCell>{patient.gender}</TableCell>}
//                 {columnVisibilityModel.number !== false && (
//                   <TableCell>
//                     <Box display="flex" alignItems="center" gap={1}>
//                       <Phone fontSize="small" color="success" />
//                       <Typography noWrap>{patient.number}</Typography>
//                     </Box>
//                   </TableCell>
//                 )}
//                 {columnVisibilityModel.address !== false && <TableCell>{patient.address}</TableCell>}
//                 {columnVisibilityModel.priority !== false && (
//                   <TableCell>
//                     <Box 
//                       sx={{ 
//                         px: 1, 
//                         py: 0.5, 
//                         backgroundColor: patient.priority === 'Emergency' ? '#fee2e2' : '#e0f2fe',
//                         color: patient.priority === 'Emergency' ? '#ef4444' : '#0284c7',
//                         borderRadius: 1,
//                         display: 'inline-block'
//                       }}
//                     >
//                       {patient.priority}
//                     </Box>
//                   </TableCell>
//                 )}
//                 {/* More Details Column */}
//                 <TableCell>
//                   <Button 
//                     variant="outlined" 
//                     size="small" 
//                     onClick={() => openDetails(patient)}
//                     sx={{
//                       borderRadius: 1.5,
//                       textTransform: 'none',
//                       color: '#4f46e5',
//                       borderColor: '#4f46e5',
//                       '&:hover': {
//                         borderColor: '#4338ca',
//                         backgroundColor: 'rgba(79, 70, 229, 0.04)'
//                       }
//                     }}
//                   >
//                     More Details
//                   </Button>
//                 </TableCell>
//                 {/* History Column */}
//                 <TableCell>
//                   <Button 
//                     variant="contained" 
//                     size="small" 
//                     onClick={() => openHistory(patient)}
//                     sx={{
//                       borderRadius: 1.5,
//                       textTransform: 'none',
//                       backgroundColor: '#0284c7',
//                       '&:hover': {
//                         backgroundColor: '#0369a1'
//                       }
//                     }}
//                   >
//                     📜 History
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//         {/* Simple pagination */}
//         <Box display="flex" justifyContent="flex-end" p={2}>
//           <Typography sx={{ mr: 2 }}>
//             Showing {page * rowsPerPage + 1}-{Math.min((page + 1) * rowsPerPage, filteredPatients.length)} of {filteredPatients.length}
//           </Typography>
//           <IconButton 
//             disabled={page === 0} 
//             onClick={() => setPage(p => p - 1)}
//           >
//             &lt;
//           </IconButton>
//           <IconButton 
//             disabled={(page + 1) * rowsPerPage >= filteredPatients.length} 
//             onClick={() => setPage(p => p + 1)}
//           >
//             &gt;
//           </IconButton>
//         </Box>
//       </TableContainer>

//       {/* Drawer for More Details */}
//       <Drawer
//         anchor="right"
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         PaperProps={{
//           sx: {
//             width: { xs: "100%", sm: "80%", md: "600px" },
//             mx: "auto",
//             p: 3,
//           }
//         }}
//       >
//         {selectedPatient && (
//           <>
//             <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <Typography variant="h6">
//                 Patient Details - {selectedPatient.name} ({selectedPatient.id})
//               </Typography>
//               <Button variant="outlined" size="small" onClick={() => setDrawerOpen(false)}>
//                 Close
//               </Button>
//             </Box>

//             <Box sx={{ backgroundColor: "#f3f6f9", p: 2, borderRadius: 2, mb: 3 }}>
//               <Typography variant="body1"><strong>Name:</strong> {selectedPatient.name}</Typography>
//               <Typography variant="body1"><strong>Gender:</strong> {selectedPatient.gender}</Typography>
//               <Typography variant="body1">
//                 <strong>Contact:</strong> <Phone fontSize="small" color="success" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
//                 {selectedPatient.number}
//               </Typography>
//               <Typography variant="body1"><strong>Address:</strong> {selectedPatient.address}</Typography>
//               <Typography variant="body1">
//                 <strong>Priority:</strong> 
//                 <Box 
//                   component="span" 
//                   sx={{ 
//                     ml: 1,
//                     px: 1, 
//                     py: 0.2, 
//                     backgroundColor: selectedPatient.priority === 'Emergency' ? '#fee2e2' : '#e0f2fe',
//                     color: selectedPatient.priority === 'Emergency' ? '#ef4444' : '#0284c7',
//                     borderRadius: 1
//                   }}
//                 >
//                   {selectedPatient.priority}
//                 </Box>
//               </Typography>
//             </Box>

//             <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
//               Appointment History
//             </Typography>

//             <TableContainer component={Paper} sx={{ borderRadius: 2, mb: 3 }}>
//               <Table size="small">
//                 <TableHead sx={{ backgroundColor: "#f3f6f9" }}>
//                   <TableRow>
//                     <TableCell>S.No</TableCell>
//                     <TableCell>Appointment Date</TableCell>
//                     <TableCell>Drugs</TableCell>
//                     <TableCell>Tests</TableCell>
//                     <TableCell>Treatment</TableCell>
//                     <TableCell>Report</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {(appointments[selectedPatient.id] || []).map((appt, i) => (
//                     <TableRow key={i}>
//                       <TableCell>{i + 1}</TableCell>
//                       <TableCell>{appt.date}</TableCell>
//                       <TableCell>{appt.drugs}</TableCell>
//                       <TableCell>{appt.tests}</TableCell>
//                       <TableCell>{appt.treatment}</TableCell>
//                       <TableCell>
//                         <Button
//                           variant="outlined"
//                           size="small"
//                           // href={`/reports/${appt.reportId}`}
//                           href={'https://i.pinimg.com/1200x/bf/dc/71/bfdc7116b48a8c36783e1fa66a477437.jpg'}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           sx={{ textTransform: 'none', borderRadius: 1.5 }}
//                         >
//                           View
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                   {(appointments[selectedPatient.id] || []).length === 0 && (
//                     <TableRow>
//                       <TableCell colSpan={6} align="center">No appointment records found</TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </>
//         )}
//       </Drawer>

//       {/* Dialog for History */}
//       <Dialog
//         open={historyOpen}
//         onClose={() => setHistoryOpen(false)}
//         fullWidth
//         maxWidth="md"
//         PaperProps={{ sx: { mx: "auto", p: 2, borderRadius: 2 } }}
//       >
//         <DialogTitle sx={{ px: 2, py: 1.5, backgroundColor: "#f3f6f9", display: 'flex', justifyContent: 'space-between' }}>
//           <Typography variant="h6">Treatment History - {selectedPatient?.name}</Typography>
//           <Button variant="text" size="small" onClick={() => setHistoryOpen(false)}>
//             Close
//           </Button>
//         </DialogTitle>
//         <DialogContent sx={{ mt: 2 }}>
//           <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2 }}>
//             <Table size="small">
//               <TableHead sx={{ backgroundColor: "#f3f6f9" }}>
//                 <TableRow>
//                   <TableCell>Treatment Name</TableCell>
//                   <TableCell>Start Date</TableCell>
//                   <TableCell>End Date</TableCell>
//                   <TableCell>Report</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {(treatmentHistory[selectedPatient?.id] || []).map((treat, i) => (
//                   <TableRow key={i}>
//                     <TableCell>{treat.name}</TableCell>
//                     <TableCell>{treat.startDate}</TableCell>
//                     <TableCell>{treat.endDate}</TableCell>
//                     <TableCell>
//                       <Button
//                         variant="outlined"
//                         size="small"
//                         href={`/reports/${treat.report}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         sx={{ textTransform: 'none', borderRadius: 1.5 }}
//                       >
//                         View
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//                 {(treatmentHistory[selectedPatient?.id] || []).length === 0 && (
//                   <TableRow>
//                     <TableCell colSpan={4} align="center">No treatment history found</TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </DialogContent>
//       </Dialog>
//     </Box>
//   );
// }


import React, { useState, useEffect } from 'react';
import {
 Box,
 Typography,
 TextField,
 IconButton,
 Tooltip,
 Table,
 TableBody,
 TableCell,
 TableContainer,
 TableHead,
 TableRow,
 Paper,
 Button,
 Drawer,
 Dialog,
 DialogTitle,
 DialogContent,
 Menu,
 MenuItem,
 Checkbox,
 Tabs,
 Tab,
 FormControl,
 InputLabel,
 Select
} from '@mui/material';
// import React, { useState, useEffect } from 'react';

import {
 Search as SearchIcon,
 Download,
 ViewColumn,
 Refresh,
 Email,
 Phone,
 ArrowForward,
 History
} from '@mui/icons-material';

// Sample appointment data (this would come from your backend)
const appointments = {
 1001: [
 {
 date: '2024-02-25',
 drugs: 'Paracetamol',
 tests: 'CBC, X-ray',
 treatment: 'Rest, fluids',
 reportId: 'report1.pdf'
 }
 ],
 1006: [
 {
 date: '2024-03-10',
 drugs: 'Amoxicillin',
 tests: 'Throat Culture',
 treatment: 'Antibiotics',
 reportId: 'report2.pdf'
 },
 {
 date: '2024-04-01',
 drugs: 'Ibuprofen',
 tests: 'MRI',
 treatment: 'Pain management',
 reportId: 'report3.pdf'
 }
 ]
};

// Sample treatment history data (this would come from your backend)
const treatmentHistory = {
 1001: [
 { name: 'Fever Treatment', startDate: '2024-02-20', endDate: '2024-02-28', report: 'fever_report.pdf' }
 ],
 1006: [
 { name: 'Infection Treatment', startDate: '2024-03-01', endDate: '2024-03-15', report: 'infection_report.pdf' },
 { name: 'Pain Relief', startDate: '2024-03-20', endDate: '2024-04-05', report: 'pain_report.pdf' }
 ]
};

export default function PatientDashboard() {
 const [patients, setPatients] = useState([]); 
 const [searchQuery, setSearchQuery] = useState('');
 const [genderFilter, setGenderFilter] = useState('');
 const [priorityFilter, setPriorityFilter] = useState('');

 const [tab, setTab] = useState(0);
 const [drawerOpen, setDrawerOpen] = useState(false);
 const [selectedPatient, setSelectedPatient] = useState(null);
 const [historyOpen, setHistoryOpen] = useState(false);


 useEffect(() => {
 const fetchPatients = async () => {
 try {
 // Use different endpoints based on the active tab
 const url = tab === 0
 ? 'http://localhost:8000/patient/all'
 : 'http://localhost:8000/patient/all/did/2001';
 
 console.log(`Fetching data from ${url} for tab ${tab}`);
 
 const response = await fetch(url);
 if (!response.ok) throw new Error(`Failed to fetch data for tab ${tab}`);
 
 const data = await response.json();
 console.log(`Received ${data.length} patients for tab ${tab}:`, data);
 
 setPatients(data);
 setPage(0); // Reset pagination when switching tabs
 } catch (error) {
 console.error(`Error fetching patients for tab ${tab}:`, error);
 }
 };
 
 fetchPatients();
 }, [tab]); // This dependency ensures the effect runs when tab changes

 

 // Updated to match the backend field names
 const filteredPatients = (patients || []).filter((p) =>
 ((p?.PName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
 (p?.PID || '').toString().includes(searchQuery) ||
 (p?.PPhNo || '').includes(searchQuery)) &&
 (genderFilter ? p?.PGender === genderFilter : true) &&
 (priorityFilter ? p?.priority === priorityFilter : true)
 );
 
 // Pagination
 const [page, setPage] = useState(0);
 const [rowsPerPage, setRowsPerPage] = useState(10);
 
 // Column visibility
 const [anchorEl, setAnchorEl] = useState(null);
 const menuOpen = Boolean(anchorEl);
 const [columnVisibilityModel, setColumnVisibilityModel] = useState({
 PID: true,
 PName: true,
 PGender: true,
 PPhNo: true,
 PAddr: true,
 priority: true,
 });
 // const [patients, setPatients] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 

 const openDetails = (patient) => {
 setSelectedPatient(patient);
 setTab(0);
 setDrawerOpen(true);
 };

 const openHistory = (patient) => {
 setSelectedPatient(patient);
 setHistoryOpen(true);
 };

 const handleClick = (event) => setAnchorEl(event.currentTarget);
 const handleClose = () => setAnchorEl(null);

 

 const handleRefreshTable = () => {
 const fetchPatients = async () => {
 try {
 const url = tab === 0
 ? 'http://localhost:8000/patient/all'
 : 'http://localhost:8000/patient/all/did/2011';
 
 console.log(`Refreshing data from ${url} for tab ${tab}`);
 
 const response = await fetch(url);
 if (!response.ok) throw new Error('Failed to fetch patient data');
 
 const data = await response.json();
 setPatients(data);
 setPage(0); // Reset to first page when refreshing
 } catch (error) {
 console.error('Error refreshing patients:', error);
 }
 };
 
 fetchPatients();
 };
 


 const handleDownload = () => {
 const headers = ['Patient ID', 'Name', 'Gender', 'Phone Number', 'Address', 'Priority'];
 const csvRows = [
 headers.join(','),
 ...filteredPatients.map(p =>
 [p.PID, p.PName, p.PGender, p.PPhNo, p.PAddr, p.priority || 'Normal'].join(',')
 )
 ];
 const csvContent = `data:text/csv;charset=utf-8,${csvRows.join('\n')}`;
 const encodedUri = encodeURI(csvContent);
 const link = document.createElement('a');
 link.setAttribute('href', encodedUri);
 link.setAttribute('download', 'patient_data.csv');
 document.body.appendChild(link);
 link.click();
 document.body.removeChild(link);
 };

 const paginatedPatients = filteredPatients.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

 // Updated column headers to match backend field names
 const columns = [
 { field: 'PID', headerName: 'Patient ID' },
 { field: 'PName', headerName: 'Patient Name' },
 { field: 'PGender', headerName: 'Gender' },
 { field: 'PPhNo', headerName: 'Phone Number' },
 { field: 'PAddr', headerName: 'Address' },
 { field: 'priority', headerName: 'Priority' },
 ];

 return (
 <Box sx={{ height: 600, width: "100%", p: 2 }}>
 {/* Header with controls */}
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
 <Typography variant="h6">Patients</Typography>
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
 placeholder="Search"
 InputProps={{ disableUnderline: true }}
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 size="small"
 />
 </Box>
 
 {/* Filters */}
 <FormControl sx={{ minWidth: 120, backgroundColor: "white", borderRadius: 1 }}>
 <Select
 value={genderFilter}
 onChange={(e) => setGenderFilter(e.target.value)}
 displayEmpty
 size="small"
 variant="outlined"
 sx={{ height: 36 }}
 >
 <MenuItem value="">All Genders</MenuItem>
 <MenuItem value="Male">Male</MenuItem>
 <MenuItem value="Female">Female</MenuItem>
 </Select>
 </FormControl>
 
 <FormControl sx={{ minWidth: 120, backgroundColor: "white", borderRadius: 1 }}>
 <Select
 value={priorityFilter}
 onChange={(e) => setPriorityFilter(e.target.value)}
 displayEmpty
 size="small"
 variant="outlined"
 sx={{ height: 36 }}
 >
 <MenuItem value="">All Priorities</MenuItem>
 <MenuItem value="Normal">Normal</MenuItem>
 <MenuItem value="Emergency">Emergency</MenuItem>
 </Select>
 </FormControl>
 
 {/* Column Visibility */}
 <Tooltip title="Show/Hide Columns">
 <IconButton onClick={handleClick}>
 <ViewColumn />
 </IconButton>
 </Tooltip>
 <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleClose}>
 {columns.map((column) => (
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
 
 {/* Action Buttons */}
 <Tooltip title="Refresh">
 <IconButton onClick={handleRefreshTable}>
 <Refresh />
 </IconButton>
 </Tooltip>
 
 <Tooltip title="Download CSV">
 <IconButton onClick={handleDownload}>
 <Download sx={{ color: "#3b82f6" }} />
 </IconButton>
 </Tooltip>
 </Box>
 </Box>

 {/* Tabs */}
 <Box sx={{ backgroundColor: "white", px: 2, pt: 1 }}>
 <Tabs value={tab} onChange={(e, val) => setTab(val)} sx={{ mb: 1 }}>
 <Tab label="All Appointments" />
 <Tab label="My Appointments" />
 </Tabs>
 </Box>



 {/* Patient Table */}
 <TableContainer component={Paper} sx={{ borderRadius: 0, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
 <Table>
 <TableHead sx={{ backgroundColor: "#f3f6f9" }}>
 <TableRow>
 {columns.map((column) => (
 columnVisibilityModel[column.field] !== false && (
 <TableCell key={column.field} sx={{ fontWeight: "bold" }}>
 {column.headerName}
 </TableCell>
 )
 ))}
 <TableCell sx={{ fontWeight: "bold" }}>More Details</TableCell>
 <TableCell sx={{ fontWeight: "bold" }}>History</TableCell>
 </TableRow>
 </TableHead>
 <TableBody>
 {paginatedPatients.map((patient, i) => (
 <TableRow key={i}>
 {columnVisibilityModel.PID !== false && <TableCell>{patient.PID}</TableCell>}
 {columnVisibilityModel.PName !== false && <TableCell>{patient.PName}</TableCell>}
 {columnVisibilityModel.PGender !== false && <TableCell>{patient.PGender}</TableCell>}
 {columnVisibilityModel.PPhNo !== false && (
 <TableCell>
 <Box display="flex" alignItems="center" gap={1}>
 <Phone fontSize="small" color="success" />
 <Typography noWrap>{patient.PPhNo}</Typography>
 </Box>
 </TableCell>
 )}
 {columnVisibilityModel.PAddr !== false && <TableCell>{patient.PAddr}</TableCell>}
 {columnVisibilityModel.priority !== false && (
 <TableCell>
 <Box 
 sx={{ 
 px: 1, 
 py: 0.5, 
 backgroundColor: (patient.priority === 'Emergency') ? '#fee2e2' : '#e0f2fe',
 color: (patient.priority === 'Emergency') ? '#ef4444' : '#0284c7',
 borderRadius: 1,
 display: 'inline-block'
 }}
 >
 {patient.priority || 'Normal'}
 </Box>
 </TableCell>
 )}
 {/* More Details Column */}
 <TableCell>
 <Button 
 variant="outlined" 
 size="small" 
 onClick={() => openDetails(patient)}
 sx={{
 borderRadius: 1.5,
 textTransform: 'none',
 color: '#4f46e5',
 borderColor: '#4f46e5',
 '&:hover': {
 borderColor: '#4338ca',
 backgroundColor: 'rgba(79, 70, 229, 0.04)'
 }
 }}
 >
 More Details
 </Button>
 </TableCell>
 {/* History Column */}
 <TableCell>
 <Button 
 variant="contained" 
 size="small" 
 onClick={() => openHistory(patient)}
 sx={{
 borderRadius: 1.5,
 textTransform: 'none',
 backgroundColor: '#0284c7',
 '&:hover': {
 backgroundColor: '#0369a1'
 }
 }}
 >
 📜 History
 </Button>
 </TableCell>
 </TableRow>
 ))}
 </TableBody>
 </Table>
 {/* Simple pagination */}
 <Box display="flex" justifyContent="flex-end" p={2}>
 <Typography sx={{ mr: 2 }}>
 Showing {page * rowsPerPage + 1}-{Math.min((page + 1) * rowsPerPage, filteredPatients.length)} of {filteredPatients.length}
 </Typography>
 <IconButton 
 disabled={page === 0} 
 onClick={() => setPage(p => p - 1)}
 >
 &lt;
 </IconButton>
 <IconButton 
 disabled={(page + 1) * rowsPerPage >= filteredPatients.length} 
 onClick={() => setPage(p => p + 1)}
 >
 &gt;
 </IconButton>
 </Box>
 </TableContainer>

 {/* Drawer for More Details */}
 <Drawer
 anchor="right"
 open={drawerOpen}
 onClose={() => setDrawerOpen(false)}
 PaperProps={{
 sx: {
 width: { xs: "100%", sm: "80%", md: "600px" },
 mx: "auto",
 p: 3,
 }
 }}
 >
 {selectedPatient && (
 <>
 <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
 <Typography variant="h6">
 Patient Details - {selectedPatient.PName} ({selectedPatient.PID})
 </Typography>
 <Button variant="outlined" size="small" onClick={() => setDrawerOpen(false)}>
 Close
 </Button>
 </Box>

 <Box sx={{ backgroundColor: "#f3f6f9", p: 2, borderRadius: 2, mb: 3 }}>
 <Typography variant="body1"><strong>Name:</strong> {selectedPatient.PName}</Typography>
 <Typography variant="body1"><strong>Gender:</strong> {selectedPatient.PGender}</Typography>
 <Typography variant="body1">
 <strong>Contact:</strong> <Phone fontSize="small" color="success" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
 {selectedPatient.PPhNo}
 </Typography>
 <Typography variant="body1"><strong>Address:</strong> {selectedPatient.PAddr}</Typography>
 <Typography variant="body1">
 <strong>Priority:</strong> 
 <Box 
 component="span" 
 sx={{ 
 ml: 1,
 px: 1, 
 py: 0.2, 
 backgroundColor: selectedPatient.priority === 'Emergency' ? '#fee2e2' : '#e0f2fe',
 color: selectedPatient.priority === 'Emergency' ? '#ef4444' : '#0284c7',
 borderRadius: 1
 }}
 >
 {selectedPatient.priority || 'Normal'}
 </Box>
 </Typography>
 </Box>

 <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
 Appointment History
 </Typography>

 <TableContainer component={Paper} sx={{ borderRadius: 2, mb: 3 }}>
 <Table size="small">
 <TableHead sx={{ backgroundColor: "#f3f6f9" }}>
 <TableRow>
 <TableCell>S.No</TableCell>
 <TableCell>Appointment Date</TableCell>
 <TableCell>Drugs</TableCell>
 <TableCell>Tests</TableCell>
 <TableCell>Treatment</TableCell>
 <TableCell>Report</TableCell>
 </TableRow>
 </TableHead>
 <TableBody>
 {(appointments[selectedPatient.PID] || []).map((appt, i) => (
 <TableRow key={i}>
 <TableCell>{i + 1}</TableCell>
 <TableCell>{appt.date}</TableCell>
 <TableCell>{appt.drugs}</TableCell>
 <TableCell>{appt.tests}</TableCell>
 <TableCell>{appt.treatment}</TableCell>
 <TableCell>
 <Button
 variant="outlined"
 size="small"
 href={'https://i.pinimg.com/1200x/bf/dc/71/bfdc7116b48a8c36783e1fa66a477437.jpg'}
 target="_blank"
 rel="noopener noreferrer"
 sx={{ textTransform: 'none', borderRadius: 1.5 }}
 >
 View
 </Button>
 </TableCell>
 </TableRow>
 ))}
 {(appointments[selectedPatient.PID] || []).length === 0 && (
 <TableRow>
 <TableCell colSpan={6} align="center">No appointment records found</TableCell>
 </TableRow>
 )}
 </TableBody>
 </Table>
 </TableContainer>
 </>
 )}
 </Drawer>

 {/* Dialog for History */}
 <Dialog
 open={historyOpen}
 onClose={() => setHistoryOpen(false)}
 fullWidth
 maxWidth="md"
 PaperProps={{ sx: { mx: "auto", p: 2, borderRadius: 2 } }}
 >
 <DialogTitle sx={{ px: 2, py: 1.5, backgroundColor: "#f3f6f9", display: 'flex', justifyContent: 'space-between' }}>
 <Typography variant="h6">Treatment History - {selectedPatient?.PName}</Typography>
 <Button variant="text" size="small" onClick={() => setHistoryOpen(false)}>
 Close
 </Button>
 </DialogTitle>
 <DialogContent sx={{ mt: 2 }}>
 <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2 }}>
 <Table size="small">
 <TableHead sx={{ backgroundColor: "#f3f6f9" }}>
 <TableRow>
 <TableCell>Treatment Name</TableCell>
 <TableCell>Start Date</TableCell>
 <TableCell>End Date</TableCell>
 <TableCell>Report</TableCell>
 </TableRow>
 </TableHead>
 <TableBody>
 {(treatmentHistory[selectedPatient?.PID] || []).map((treat, i) => (
 <TableRow key={i}>
 <TableCell>{treat.name}</TableCell>
 <TableCell>{treat.startDate}</TableCell>
 <TableCell>{treat.endDate}</TableCell>
 <TableCell>
 <Button
 variant="outlined"
 size="small"
 href={`/reports/${treat.report}`}
 target="_blank"
 rel="noopener noreferrer"
 sx={{ textTransform: 'none', borderRadius: 1.5 }}
 >
 View
 </Button>
 </TableCell>
 </TableRow>
 ))}
 {(treatmentHistory[selectedPatient?.PID] || []).length === 0 && (
 <TableRow>
 <TableCell colSpan={4} align="center">No treatment history found</TableCell>
 </TableRow>
 )}
 </TableBody>
 </Table>
 </TableContainer>
 </DialogContent>
 </Dialog>
 </Box>
 );
}