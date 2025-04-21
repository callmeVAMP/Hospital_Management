
// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Avatar,
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
// } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import {
//   AccessTime,
//   Email,
//   Phone,
//   LocationOn,
//   MoreVert,
// } from "@mui/icons-material";

// const testOptions = ["Blood Test", "X-Ray", "MRI", "ECG", "Urine Test"];

// const patients = [
//   {
//     id: 1,
//     name: "John D...",
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
//     name: "Jane S...",
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

//   const columns = [
//     {
//       field: "name",
//       headerName: "Patient Name",
//       flex: 1.5,
//       renderCell: (params) => (
//         <Box display="flex" alignItems="center" gap={1}>
//           {/* <Avatar src={params.row.avatar} /> */}
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
//     // {
//     //   field: "lastVisit",
//     //   headerName: "Last Visit Date",
//     //   flex: 1,
//     // },
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
//       <Typography variant="h6" sx={{ mb: 1 }}>
//         Appointments
//       </Typography>
//       {/* <TextField
//         variant="outlined"
//         placeholder="Search"
//         size="small"
//         sx={{ mb: 2, width: 300 }}
//       /> */}
//       <TextField
//   variant="outlined"
//   placeholder="Search by name"
//   size="small"
//   sx={{ mb: 2, width: 300 }}
//   value={searchQuery}
//   onChange={(e) => setSearchQuery(e.target.value)}
// />
//       <DataGrid
//         // rows={patients}
//         rows={filteredPatients}
//         columns={columns}
//         pageSize={5}
//         rowsPerPageOptions={[5, 10]}
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

//       {/* Dialog */}
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
//             style={{ width: "100%", marginTop: 4 }}
//             value={drugs}
//             onChange={(e) => setDrugs(e.target.value)}
//           />

//           <Typography sx={{ mt: 2 }}>Treatment Advice</Typography>
//           <TextareaAutosize
//             placeholder="Enter treatment details"
//             minRows={3}
//             style={{ width: "100%", marginTop: 4 }}
//             value={treatment}
//             onChange={(e) => setTreatment(e.target.value)}
//           />
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button variant="contained" onClick={handleSave}>
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  Checkbox,
  ListItemText,
  TextareaAutosize,
  Menu,
} from "@mui/material";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import {
  AccessTime,
  Email,
  Phone,
  LocationOn,
  MoreVert,
  Refresh,
  Download,
  Add,
  ViewColumn,
  Search as SearchIcon,
} from "@mui/icons-material";

const testOptions = ["Blood Test", "X-Ray", "MRI", "ECG", "Urine Test"];

const patients = [
  {
    id: 1,
    name: "John Doe",
    date: "02/25/2018",
    time: "09:00",
    email: "john@example.com",
    mobile: "1234567890",
    gender: "female",
    status: "Upcoming",
    address: "123 Elm St",
    disease: "Fever",
    lastVisit: "09/01/2024",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    date: "10/02/2024",
    time: "09:00",
    email: "jane@example.com",
    mobile: "0987654321",
    gender: "male",
    status: "Completed",
    address: "456 Oak St",
    disease: "Flu",
    lastVisit: "08/15/2024",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Robert Johnson",
    date: "10/05/2024",
    time: "11:30",
    email: "robert@example.com",
    mobile: "5678901234",
    gender: "male",
    status: "Upcoming",
    address: "789 Pine St",
    disease: "Headache",
    lastVisit: "07/22/2024",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Emily Wilson",
    date: "09/28/2024",
    time: "14:00",
    email: "emily@example.com",
    mobile: "3456789012",
    gender: "female",
    status: "Canceled",
    address: "321 Maple Ave",
    disease: "Back Pain",
    lastVisit: "08/30/2024",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
  },
];

const genderColor = {
  male: "success",
  female: "secondary",
};

const statusColor = {
  Upcoming: "info",
  Completed: "success",
  Canceled: "error",
};

export default function AppointmentsTable() {
  const [open, setOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedTests, setSelectedTests] = useState([]);
  const [drugs, setDrugs] = useState("");
  const [treatment, setTreatment] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Column visibility state
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    name: true,
    date: true,
    time: true,
    email: true,
    mobile: true,
    gender: true,
    status: true,
    address: true,
    disease: true,
  });
  
  // Menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const apiRef = useGridApiRef();

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenDialog = (row) => {
    setSelectedPatient(row);
    setSelectedTests([]);
    setDrugs("");
    setTreatment("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTestChange = (event) => {
    setSelectedTests(event.target.value);
  };

  const handleSave = () => {
    console.log("Patient:", selectedPatient.name);
    console.log("Tests:", selectedTests);
    console.log("Drugs:", drugs);
    console.log("Treatment:", treatment);
    setOpen(false);
  };
  
  const handleRefreshTable = () => {
    // In a real application, this would fetch fresh data
    console.log("Refreshing table data");
  };

  const columns = [
    {
      field: "name",
      headerName: "Patient Name",
      flex: 1.5,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Typography noWrap>{params.value}</Typography>
        </Box>
      ),
    },
    { field: "date", headerName: "Appointment Date", flex: 1 },
    {
      field: "time",
      headerName: "Time",
      flex: 0.7,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={0.5}>
          <AccessTime fontSize="small" />
          {params.value}
        </Box>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Email fontSize="small" color="error" />
          <Typography noWrap>{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: "mobile",
      headerName: "Mobile",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Phone fontSize="small" color="success" />
          <Typography noWrap>{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 0.8,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={genderColor[params.value] || "default"}
          variant="outlined"
          size="small"
        />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={statusColor[params.value] || "default"}
          size="small"
        />
      ),
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1.5,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <LocationOn fontSize="small" color="primary" />
          <Typography noWrap>{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: "disease",
      headerName: "Disease",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title="Prescribe Details">
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
            {Object.keys(columnVisibilityModel).map((field) => (
              <MenuItem key={field}>
                <Checkbox
                  checked={columnVisibilityModel[field]}
                  onChange={() =>
                    setColumnVisibilityModel((prev) => ({
                      ...prev,
                      [field]: !prev[field],
                    }))
                  }
                />
                <Typography>{columns.find((c) => c.field === field)?.headerName}</Typography>
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
          <Tooltip title="Refresh">
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
      <DataGrid
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
        apiRef={apiRef}
        rows={filteredPatients}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 15]}
        pagination
        disableSelectionOnClick
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f3f6f9",
            fontWeight: "bold",
          },
        }}
      />

      {/* Prescription Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Prescription for {selectedPatient?.name}</DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle2" gutterBottom>
            <strong>Disease:</strong> {selectedPatient?.disease}
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