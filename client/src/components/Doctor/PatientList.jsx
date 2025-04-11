// import React, { useState } from 'react';
// import {
//   Box, Typography, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead,
//   TableRow, Paper, Button, Drawer, Dialog, DialogTitle, DialogContent, useMediaQuery
// } from '@mui/material';
// import { useTheme } from '@mui/material/styles';

// const patients = [
//   { id: 'P001', name: 'John Doe', gender: 'Male', number: '1234567890', address: '123 Elm St' },
//   { id: 'P002', name: 'Jane Smith', gender: 'Female', number: '9876543210', address: '456 Oak St' },
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

//   const theme = useTheme();
//   const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

//   const openDetails = (patient) => {
//     setSelectedPatient(patient);
//     setTab(0);
//     setDrawerOpen(true);
//   };

//   const openHistory = (patient) => {
//     setSelectedPatient(patient);
//     setHistoryOpen(true);
//   };

//   const renderTableRows = (patientData) =>
//     patientData.map((patient, i) => (
//       <TableRow key={i}>
//         <TableCell>{patient.id}</TableCell>
//         <TableCell>{patient.name}</TableCell>
//         <TableCell>{patient.gender}</TableCell>
//         <TableCell>{patient.number}</TableCell>
//         <TableCell>{patient.address}</TableCell>
//         <TableCell>
//           <Button variant="outlined" size="small" onClick={() => openDetails(patient)}>More Details</Button>
//         </TableCell>
//         <TableCell>
//           <Button variant="contained" size="small" onClick={() => openHistory(patient)}>📜 History</Button>
//         </TableCell>
//       </TableRow>
//     ));

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" gutterBottom>Patient List</Typography>

//       {/* Top Tabs */}
//       <Tabs value={tab} onChange={(e, val) => setTab(val)} sx={{ mb: 2 }}>
//         <Tab label="All Appointments" />
//         <Tab label="My Appointments" />
//       </Tabs>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>PatientID</TableCell>
//               <TableCell>Patient Name</TableCell>
//               <TableCell>Gender</TableCell>
//               <TableCell>Patient Number</TableCell>
//               <TableCell>Patient Address</TableCell>
//               <TableCell>More Details</TableCell>
//               <TableCell>History</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {renderTableRows(patients)}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Details Drawer */}
//       <Drawer
//         anchor="right"
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         PaperProps={{
//           sx: {
//             width: { xs: '100%', sm: '80%', md: '600px' },
//             mx: 'auto',
//             p: 3
//           }
//         }}
//       >
//         {selectedPatient && (
//           <>
//             <Typography variant="h6" gutterBottom>
//               Patient Details - {selectedPatient.name} ({selectedPatient.id})
//             </Typography>

//             <Tabs value={tab} onChange={(e, val) => setTab(val)} sx={{ mb: 2 }}>
//               <Tab label="All Appointments" />
//               <Tab label="My Appointments" />
//             </Tabs>

//             <TableContainer component={Paper}>
//               <Table size="small">
//                 <TableHead>
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
//                           href={`/reports/${appt.reportId}`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           📄 View
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </>
//         )}
//       </Drawer>

//       {/* History Dialog */}
//       <Dialog
//         open={historyOpen}
//         onClose={() => setHistoryOpen(false)}
//         fullWidth
//         maxWidth="md"
//         PaperProps={{
//           sx: {
//             mx: 'auto',
//             p: 2
//           }
//         }}
//         fullScreen={fullScreen}
//       >
//         <DialogTitle>
//           Treatment History - {selectedPatient?.name}
//         </DialogTitle>
//         <DialogContent>
//           <TableContainer component={Paper} sx={{ mt: 2 }}>
//             <Table size="small">
//               <TableHead>
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
//                       >
//                         📄 View
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </DialogContent>
//       </Dialog>
//     </Box>
//   );
// }

//claude
// import React, { useState, useEffect } from 'react';
// import {
//   Box, Typography, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead,
//   TableRow, Paper, Button, Drawer, Dialog, DialogTitle, DialogContent, useMediaQuery,
//   TextField, InputAdornment, MenuItem, FormControl, InputLabel, Select, IconButton,
//   Tooltip, Grid
// } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
// import SearchIcon from '@mui/icons-material/Search';
// import DownloadIcon from '@mui/icons-material/Download';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import ClearIcon from '@mui/icons-material/Clear';

// // Sample data
// const patients = [
//   { id: 'P001', name: 'John Doe', gender: 'Male', number: '1234567890', address: '123 Elm St' },
//   { id: 'P002', name: 'Jane Smith', gender: 'Female', number: '9876543210', address: '456 Oak St' },
//   { id: 'P003', name: 'Michael Johnson', gender: 'Male', number: '5551234567', address: '789 Pine Ave' },
//   { id: 'P004', name: 'Sarah Williams', gender: 'Female', number: '7778889999', address: '321 Maple Blvd' },
//   { id: 'P005', name: 'David Brown', gender: 'Male', number: '4445556666', address: '654 Cedar Lane' },
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
  
//   // New state for search and filters
//   const [searchTerm, setSearchTerm] = useState('');
//   const [genderFilter, setGenderFilter] = useState('');
//   const [filteredPatients, setFilteredPatients] = useState(patients);
//   const [showFilters, setShowFilters] = useState(false);

//   const theme = useTheme();
//   const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

//   // Apply filters when search term or gender filter changes
//   useEffect(() => {
//     const filtered = patients.filter(patient => {
//       const matchesSearch = 
//         patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         patient.number.includes(searchTerm) ||
//         patient.address.toLowerCase().includes(searchTerm.toLowerCase());
      
//       const matchesGender = genderFilter === '' || patient.gender === genderFilter;
      
//       return matchesSearch && matchesGender;
//     });
    
//     setFilteredPatients(filtered);
//   }, [searchTerm, genderFilter]);

//   const openDetails = (patient) => {
//     setSelectedPatient(patient);
//     setTab(0);
//     setDrawerOpen(true);
//   };

//   const openHistory = (patient) => {
//     setSelectedPatient(patient);
//     setHistoryOpen(true);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleGenderFilterChange = (event) => {
//     setGenderFilter(event.target.value);
//   };

//   const clearFilters = () => {
//     setSearchTerm('');
//     setGenderFilter('');
//   };

//   // Function to download CSV
//   const downloadCSV = () => {
//     // Create CSV headers
//     const headers = ['PatientID', 'Patient Name', 'Gender', 'Patient Number', 'Patient Address'];
    
//     // Map the data to CSV rows
//     const data = filteredPatients.map(patient => 
//       [patient.id, patient.name, patient.gender, patient.number, patient.address].join(',')
//     );
    
//     // Combine headers and data
//     const csvContent = [headers.join(','), ...data].join('\n');
    
//     // Create blob and download
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.setAttribute('href', url);
//     link.setAttribute('download', 'patients_list.csv');
//     link.style.visibility = 'hidden';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const renderTableRows = (patientData) =>
//     patientData.map((patient, i) => (
//       <TableRow key={i}>
//         <TableCell>{patient.id}</TableCell>
//         <TableCell>{patient.name}</TableCell>
//         <TableCell>{patient.gender}</TableCell>
//         <TableCell>{patient.number}</TableCell>
//         <TableCell>{patient.address}</TableCell>
//         <TableCell>
//           <Button variant="outlined" size="small" onClick={() => openDetails(patient)}>More Details</Button>
//         </TableCell>
//         <TableCell>
//           <Button variant="contained" size="small" onClick={() => openHistory(patient)}>📜 History</Button>
//         </TableCell>
//       </TableRow>
//     ));

//   return (
//     <Box sx={{ p: 3 }}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//         <Typography variant="h4">Patient List</Typography>
        
//         <Box sx={{ display: 'flex', gap: 2 }}>
//           <Tooltip title="Toggle Filters">
//             <IconButton onClick={() => setShowFilters(!showFilters)}>
//               <FilterListIcon />
//             </IconButton>
//           </Tooltip>
          
//           <Tooltip title="Download CSV">
//             <IconButton onClick={downloadCSV} color="primary">
//               <DownloadIcon />
//             </IconButton>
//           </Tooltip>
//         </Box>
//       </Box>

//       {/* Search and filters section */}
//       {showFilters && (
//         <Paper sx={{ p: 2, mb: 2 }}>
//           <Grid container spacing={2} alignItems="center">
//             <Grid item xs={12} md={5}>
//               <TextField
//                 fullWidth
//                 label="Search Patients"
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <SearchIcon />
//                     </InputAdornment>
//                   ),
//                   endAdornment: searchTerm && (
//                     <InputAdornment position="end">
//                       <IconButton onClick={() => setSearchTerm('')} size="small">
//                         <ClearIcon fontSize="small" />
//                       </IconButton>
//                     </InputAdornment>
//                   )
//                 }}
//                 placeholder="Search by name, ID, number, or address"
//                 size="small"
//               />
//             </Grid>
            
//             <Grid item xs={12} md={5}>
//               <FormControl fullWidth size="small">
//                 <InputLabel>Filter by Gender</InputLabel>
//                 <Select
//                   value={genderFilter}
//                   onChange={handleGenderFilterChange}
//                   label="Filter by Gender"
//                 >
//                   <MenuItem value="">All Genders</MenuItem>
//                   <MenuItem value="Male">Male</MenuItem>
//                   <MenuItem value="Female">Female</MenuItem>
//                   <MenuItem value="Other">Other</MenuItem>
//                 </Select>
//               </FormControl>
//             </Grid>
            
//             <Grid item xs={12} md={2}>
//               <Button 
//                 variant="outlined" 
//                 onClick={clearFilters} 
//                 startIcon={<ClearIcon />}
//                 fullWidth
//               >
//                 Clear
//               </Button>
//             </Grid>
//           </Grid>
//         </Paper>
//       )}

//       {/* Top Tabs */}
//       <Tabs value={tab} onChange={(e, val) => setTab(val)} sx={{ mb: 2 }}>
//         <Tab label="All Appointments" />
//         <Tab label="My Appointments" />
//       </Tabs>

//       {/* Results summary */}
//       <Box sx={{ mb: 2 }}>
//         <Typography color="text.secondary">
//           Showing {filteredPatients.length} patients
//           {searchTerm && ` matching "${searchTerm}"`}
//           {genderFilter && ` with gender: ${genderFilter}`}
//         </Typography>
//       </Box>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>PatientID</TableCell>
//               <TableCell>Patient Name</TableCell>
//               <TableCell>Gender</TableCell>
//               <TableCell>Patient Number</TableCell>
//               <TableCell>Patient Address</TableCell>
//               <TableCell>More Details</TableCell>
//               <TableCell>History</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredPatients.length > 0 ? (
//               renderTableRows(filteredPatients)
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={7} align="center">
//                   No patients match the current filters
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Details Drawer */}
//       <Drawer
//         anchor="right"
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         PaperProps={{
//           sx: {
//             width: { xs: '100%', sm: '80%', md: '600px' },
//             mx: 'auto',
//             p: 3
//           }
//         }}
//       >
//         {selectedPatient && (
//           <>
//             <Typography variant="h6" gutterBottom>
//               Patient Details - {selectedPatient.name} ({selectedPatient.id})
//             </Typography>

//             <Tabs value={tab} onChange={(e, val) => setTab(val)} sx={{ mb: 2 }}>
//               <Tab label="All Appointments" />
//               <Tab label="My Appointments" />
//             </Tabs>

//             <TableContainer component={Paper}>
//               <Table size="small">
//                 <TableHead>
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
//                           href={`/reports/${appt.reportId}`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           📄 View
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                   {(!appointments[selectedPatient.id] || appointments[selectedPatient.id].length === 0) && (
//                     <TableRow>
//                       <TableCell colSpan={6} align="center">No appointments found</TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </>
//         )}
//       </Drawer>

//       {/* History Dialog */}
//       <Dialog
//         open={historyOpen}
//         onClose={() => setHistoryOpen(false)}
//         fullWidth
//         maxWidth="md"
//         PaperProps={{
//           sx: {
//             mx: 'auto',
//             p: 2
//           }
//         }}
//         fullScreen={fullScreen}
//       >
//         <DialogTitle>
//           Treatment History - {selectedPatient?.name}
//         </DialogTitle>
//         <DialogContent>
//           <TableContainer component={Paper} sx={{ mt: 2 }}>
//             <Table size="small">
//               <TableHead>
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
//                       >
//                         📄 View
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//                 {(!treatmentHistory[selectedPatient?.id] || treatmentHistory[selectedPatient?.id].length === 0) && (
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

//goodone
// import React, { useState } from 'react';
// import {
//   Box, Typography, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead,
//   TableRow, Paper, Button, Drawer, Dialog, DialogTitle, DialogContent, useMediaQuery,
//   TextField, FormControl, InputLabel, Select, MenuItem, TablePagination, IconButton
// } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
// import DownloadIcon from '@mui/icons-material/Download';

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
//   const theme = useTheme();
//   const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

//   // Filters
//   const [searchQuery, setSearchQuery] = useState('');
//   const [genderFilter, setGenderFilter] = useState('');
//   const [priorityFilter, setPriorityFilter] = useState('');

//   // Pagination
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const openDetails = (patient) => {
//     setSelectedPatient(patient);
//     setTab(0);
//     setDrawerOpen(true);
//   };

//   const openHistory = (patient) => {
//     setSelectedPatient(patient);
//     setHistoryOpen(true);
//   };

//   const filteredPatients = patients.filter((p) =>
//     (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       p.number.includes(searchQuery)) &&
//     (genderFilter ? p.gender === genderFilter : true) &&
//     (priorityFilter ? p.priority === priorityFilter : true)
//   );

//   const paginatedPatients = filteredPatients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   const handleDownload = () => {
//     const headers = ['Patient ID', 'Name', 'Gender', 'Number', 'Address'];
//     const csvRows = [
//       headers.join(','),
//       ...filteredPatients.map(p =>
//         [p.id, p.name, p.gender, p.number, p.address].join(',')
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

//   return (
//     <Box sx={{ p: 3 }}>
//       <Box display="flex" justifyContent="space-between" alignItems="center">
//         <Typography variant="h4">Patient List</Typography>
//         <IconButton onClick={handleDownload}>
//           <DownloadIcon />
//         </IconButton>
//       </Box>

//       {/* Filters */}
//       <Box display="flex" gap={2} flexWrap="wrap" my={2}>
//         <TextField
//           label="Search"
//           variant="outlined"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <FormControl sx={{ minWidth: 150 }}>
//           <InputLabel>Gender</InputLabel>
//           <Select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)} label="Gender">
//             <MenuItem value="">All</MenuItem>
//             <MenuItem value="Male">Male</MenuItem>
//             <MenuItem value="Female">Female</MenuItem>
//           </Select>
//         </FormControl>
//         <FormControl sx={{ minWidth: 150 }}>
//           <InputLabel>Priority</InputLabel>
//           <Select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} label="Priority">
//             <MenuItem value="">All</MenuItem>
//             <MenuItem value="Normal">Normal</MenuItem>
//             <MenuItem value="Emergency">Emergency</MenuItem>
//           </Select>
//         </FormControl>
//       </Box>

//       {/* Tabs */}
//       <Tabs value={tab} onChange={(e, val) => setTab(val)} sx={{ mb: 1 }}>
//         <Tab label="All Appointments" />
//         <Tab label="My Appointments" />
//       </Tabs>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>PatientID</TableCell>
//               <TableCell>Patient Name</TableCell>
//               <TableCell>Gender</TableCell>
//               <TableCell>Patient Number</TableCell>
//               <TableCell>Patient Address</TableCell>
//               <TableCell>More Details</TableCell>
//               <TableCell>History</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedPatients.map((patient, i) => (
//               <TableRow key={i}>
//                 <TableCell>{patient.id}</TableCell>
//                 <TableCell>{patient.name}</TableCell>
//                 <TableCell>{patient.gender}</TableCell>
//                 <TableCell>{patient.number}</TableCell>
//                 <TableCell>{patient.address}</TableCell>
//                 <TableCell>
//                   <Button variant="outlined" size="small" onClick={() => openDetails(patient)}>More Details</Button>
//                 </TableCell>
//                 <TableCell>
//                   <Button variant="contained" size="small" onClick={() => openHistory(patient)}>📜 History</Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Pagination Controls */}
//       <TablePagination
//         component="div"
//         count={filteredPatients.length}
//         page={page}
//         onPageChange={(e, newPage) => setPage(newPage)}
//         rowsPerPage={rowsPerPage}
//         onRowsPerPageChange={(e) => {
//           setRowsPerPage(parseInt(e.target.value, 10));
//           setPage(0);
//         }}
//         rowsPerPageOptions={[5, 10, 15]}
//       />

//       {/* Drawer for More Details */}
//       <Drawer
//         anchor="right"
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         PaperProps={{
//           sx: {
//             width: { xs: '100%', sm: '80%', md: '600px' },
//             mx: 'auto',
//             p: 3
//           }
//         }}
//       >
//         {selectedPatient && (
//           <>
//             <Typography variant="h6" gutterBottom>
//               Patient Details - {selectedPatient.name} ({selectedPatient.id})
//             </Typography>

//             <Tabs value={tab} onChange={(e, val) => setTab(val)} sx={{ mb: 2 }}>
//               <Tab label="All Appointments" />
//               <Tab label="My Appointments" />
//             </Tabs>

//             <TableContainer component={Paper}>
//               <Table size="small">
//                 <TableHead>
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
//                           href={`/reports/${appt.reportId}`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           📄 View
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
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
//         PaperProps={{ sx: { mx: 'auto', p: 2 } }}
//         fullScreen={fullScreen}
//       >
//         <DialogTitle>
//           Treatment History - {selectedPatient?.name}
//         </DialogTitle>
//         <DialogContent>
//           <TableContainer component={Paper} sx={{ mt: 2 }}>
//             <Table size="small">
//               <TableHead>
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
//                       >
//                         📄 View
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </DialogContent>
//       </Dialog>
//     </Box>
//   );
// }

// import React, { useState } from 'react';
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
//     id: true,
//     name: true,
//     gender: true,
//     number: true,
//     address: true,
//     priority: true,
//   });

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
//     // Refresh functionality placeholder
//     console.log('Refreshing table');
//   };

//   const handleDownload = () => {
//     const headers = ['Patient ID', 'Name', 'Gender', 'Number', 'Address', 'Priority'];
//     const csvRows = [
//       headers.join(','),
//       ...filteredPatients.map(p =>
//         [p.id, p.name, p.gender, p.number, p.address, p.priority].join(',')
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

//   const filteredPatients = patients.filter((p) =>
//     (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       p.number.includes(searchQuery)) &&
//     (genderFilter ? p.gender === genderFilter : true) &&
//     (priorityFilter ? p.priority === priorityFilter : true)
//   );

//   const paginatedPatients = filteredPatients.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

//   const columns = [
//     { field: 'id', headerName: 'PatientID' },
//     { field: 'name', headerName: 'Patient Name' },
//     { field: 'gender', headerName: 'Gender' },
//     { field: 'number', headerName: 'Patient Number' },
//     { field: 'address', headerName: 'Patient Address' },
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
//               <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
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
//                 <TableCell>
//                   <Box display="flex" gap={1}>
//                     <Tooltip title="View Details">
//                       <IconButton size="small" sx={{ color: "#4f46e5" }} onClick={() => openDetails(patient)}>
//                         <ArrowForward fontSize="small" />
//                       </IconButton>
//                     </Tooltip>
//                     <Tooltip title="View History">
//                       <IconButton size="small" sx={{ color: "#0284c7" }} onClick={() => openHistory(patient)}>
//                         <History fontSize="small" />
//                       </IconButton>
//                     </Tooltip>
//                   </Box>
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
//                           href={`/reports/${appt.reportId}`}
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

//perfect one so far
import React, { useState } from 'react';
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

const patients = [
  { id: 'P001', name: 'John Doe', gender: 'Male', number: '1234567890', address: '123 Elm St', priority: 'Normal' },
  { id: 'P002', name: 'Jane Smith', gender: 'Female', number: '9876543210', address: '456 Oak St', priority: 'Emergency' },
  // Add more patients as needed
];

const appointments = {
  P001: [
    {
      date: '2024-02-25',
      drugs: 'Paracetamol',
      tests: 'CBC, X-ray',
      treatment: 'Rest, fluids',
      reportId: 'report1.pdf'
    }
  ],
  P002: [
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

const treatmentHistory = {
  P001: [
    { name: 'Fever Treatment', startDate: '2024-02-20', endDate: '2024-02-28', report: 'fever_report.pdf' }
  ],
  P002: [
    { name: 'Infection Treatment', startDate: '2024-03-01', endDate: '2024-03-15', report: 'infection_report.pdf' },
    { name: 'Pain Relief', startDate: '2024-03-20', endDate: '2024-04-05', report: 'pain_report.pdf' }
  ]
};

export default function PatientDashboard() {
  const [tab, setTab] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  
  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Column visibility
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    id: true,
    name: true,
    gender: true,
    number: true,
    address: true,
    priority: true,
  });

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
    // Refresh functionality placeholder
    console.log('Refreshing table');
  };

  const handleDownload = () => {
    const headers = ['Patient ID', 'Name', 'Gender', 'Number', 'Address', 'Priority'];
    const csvRows = [
      headers.join(','),
      ...filteredPatients.map(p =>
        [p.id, p.name, p.gender, p.number, p.address, p.priority].join(',')
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

  const filteredPatients = patients.filter((p) =>
    (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.number.includes(searchQuery)) &&
    (genderFilter ? p.gender === genderFilter : true) &&
    (priorityFilter ? p.priority === priorityFilter : true)
  );

  const paginatedPatients = filteredPatients.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  const columns = [
    { field: 'id', headerName: 'PatientID' },
    { field: 'name', headerName: 'Patient Name' },
    { field: 'gender', headerName: 'Gender' },
    { field: 'number', headerName: 'Patient Number' },
    { field: 'address', headerName: 'Patient Address' },
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
                {columnVisibilityModel.id !== false && <TableCell>{patient.id}</TableCell>}
                {columnVisibilityModel.name !== false && <TableCell>{patient.name}</TableCell>}
                {columnVisibilityModel.gender !== false && <TableCell>{patient.gender}</TableCell>}
                {columnVisibilityModel.number !== false && (
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Phone fontSize="small" color="success" />
                      <Typography noWrap>{patient.number}</Typography>
                    </Box>
                  </TableCell>
                )}
                {columnVisibilityModel.address !== false && <TableCell>{patient.address}</TableCell>}
                {columnVisibilityModel.priority !== false && (
                  <TableCell>
                    <Box 
                      sx={{ 
                        px: 1, 
                        py: 0.5, 
                        backgroundColor: patient.priority === 'Emergency' ? '#fee2e2' : '#e0f2fe',
                        color: patient.priority === 'Emergency' ? '#ef4444' : '#0284c7',
                        borderRadius: 1,
                        display: 'inline-block'
                      }}
                    >
                      {patient.priority}
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
                Patient Details - {selectedPatient.name} ({selectedPatient.id})
              </Typography>
              <Button variant="outlined" size="small" onClick={() => setDrawerOpen(false)}>
                Close
              </Button>
            </Box>

            <Box sx={{ backgroundColor: "#f3f6f9", p: 2, borderRadius: 2, mb: 3 }}>
              <Typography variant="body1"><strong>Name:</strong> {selectedPatient.name}</Typography>
              <Typography variant="body1"><strong>Gender:</strong> {selectedPatient.gender}</Typography>
              <Typography variant="body1">
                <strong>Contact:</strong> <Phone fontSize="small" color="success" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                {selectedPatient.number}
              </Typography>
              <Typography variant="body1"><strong>Address:</strong> {selectedPatient.address}</Typography>
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
                  {selectedPatient.priority}
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
                  {(appointments[selectedPatient.id] || []).map((appt, i) => (
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
                          // href={`/reports/${appt.reportId}`}
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
                  {(appointments[selectedPatient.id] || []).length === 0 && (
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
          <Typography variant="h6">Treatment History - {selectedPatient?.name}</Typography>
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
                {(treatmentHistory[selectedPatient?.id] || []).map((treat, i) => (
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
                {(treatmentHistory[selectedPatient?.id] || []).length === 0 && (
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

