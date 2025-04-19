// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   IconButton,
//   Tooltip,
//   Menu,
//   MenuItem,
//   Checkbox,
// } from "@mui/material";
// import {
//   Edit,
//   Delete,
//   Refresh,
//   Add,
//   ViewColumn,
//   Search as SearchIcon,
//   Phone,
// } from "@mui/icons-material";
// import {
//   DataGrid,
//   GridToolbarContainer,
//   GridToolbarExport,
//   useGridApiRef,
// } from "@mui/x-data-grid";
// //import PatientForm from "../AddPatient"; // Optional form component

// const patients = [
//   {
//     id: 1,
//     roomNo: "101A",
//     bedId: "B1",
//     name: "Aditi Sharma",
//     mobile: "9876543210",
//     treatment: "IV Antibiotics",
//   },
//   {
//     id: 2,
//     roomNo: "102B",
//     bedId: "B2",
//     name: "Ramesh Kumar",
//     mobile: "9988776655",
//     treatment: "Physiotherapy",
//   },
// ];

// function CustomToolbar() {
//   return (
//     <GridToolbarContainer>
//       <GridToolbarExport />
//     </GridToolbarContainer>
//   );
// }

// export default function PatientEnquiry() {
//   const [openAddPatient, setOpenAddPatient] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const apiRef = useGridApiRef();

//   const [columnVisibilityModel, setColumnVisibilityModel] = useState({
//     roomNo: true,
//     bedId: true,
//     name: true,
//     mobile: true,
//     treatment: true,
//   });

//   const handleClick = (event) => setAnchorEl(event.currentTarget);
//   const handleClose = () => setAnchorEl(null);
//   const handleSave = (data) => console.log("New patient data:", data);

//   const filteredPatients = patients.filter((p) =>
//     p.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const columns = [
//     { field: "roomNo", headerName: "Room No", flex: 1 },
//     { field: "bedId", headerName: "Bed ID", flex: 1 },
//     { field: "name", headerName: "Patient Name", flex: 1.5 },
//     {
//       field: "mobile",
//       headerName: "Mobile",
//       flex: 1.5,
//       renderCell: (params) => (
//         <Box display="flex" alignItems="center" gap={1}>
//           <Phone fontSize="small" color="success" />
//           <Typography noWrap>{params.row.mobile}</Typography>
//         </Box>
//       ),
//     },
//     { field: "treatment", headerName: "Treatment", flex: 2 },
//     {
//       field: "actions",
//       headerName: "Actions",
//       flex: 0.6,
//       sortable: false,
//       renderCell: () => (
//         <Box display="flex" flexDirection="row" gap={0.5}>
//           <Tooltip title="Edit">
//             <IconButton size="small" sx={{ color: "#4f46e5" }}>
//               <Edit fontSize="small" />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Delete">
//             <IconButton size="small" sx={{ color: "#f43f5e" }}>
//               <Delete fontSize="small" />
//             </IconButton>
//           </Tooltip>
//         </Box>
//       ),
//     },
//   ];

//   return (
//     <Box sx={{ height: 600, width: "100%", p: 2 }}>
//       <Box
//         sx={{
//           backgroundColor: "#e0f7fa",
//           p: 2,
//           borderTopLeftRadius: 12,
//           borderTopRightRadius: 12,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <Typography variant="h6">Patient Enquiries</Typography>
//         <Box display="flex" alignItems="center" gap={2}>
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
//               placeholder="Search by Name"
//               InputProps={{ disableUnderline: true }}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               size="small"
//             />
//           </Box>
//           <Tooltip title="Show/Hide Columns">
//             <IconButton onClick={handleClick}>
//               <ViewColumn />
//             </IconButton>
//             <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
//               {Object.keys(columnVisibilityModel).map((field) => (
//                 <MenuItem key={field}>
//                   <Checkbox
//                     checked={columnVisibilityModel[field]}
//                     onChange={() =>
//                       setColumnVisibilityModel((prev) => ({
//                         ...prev,
//                         [field]: !prev[field],
//                       }))
//                     }
//                   />
//                   <Typography>
//                     {columns.find((c) => c.field === field)?.headerName}
//                   </Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Tooltip>
//           <Tooltip title="Add New Patient">
//             <IconButton onClick={() => setOpenAddPatient(true)}>
//               <Add sx={{ color: "green" }} />
//             </IconButton>
//             {/* <PatientForm
//               open={openAddPatient}
//               onClose={() => setOpenAddPatient(false)}
//               onSave={handleSave}
//             /> */}
//           </Tooltip>
//           <Tooltip title="Refresh">
//             <IconButton>
//               <Refresh />
//             </IconButton>
//           </Tooltip>
//         </Box>
//       </Box>

//       <DataGrid
//         rows={filteredPatients}
//         columns={columns}
//         components={{ Toolbar: CustomToolbar }}
//         apiRef={apiRef}
//         columnVisibilityModel={columnVisibilityModel}
//         onColumnVisibilityModelChange={setColumnVisibilityModel}
//         sx={{
//           border: "none",
//           fontFamily: "inherit",
//           borderBottomLeftRadius: 12,
//           borderBottomRightRadius: 12,
//         }}
//       />
//     </Box>
//   );
// }



import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   IconButton,
//   Tooltip,
//   Menu,
//   MenuItem,
//   Checkbox,
//   Tabs,
//   Tab,
//   Button,
// } from "@mui/material";

import {
  Box,
  Typography,
  TextField,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Checkbox,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from "@mui/material";

import {
  Edit,
  Delete,
  Refresh,
  Add,
  ViewColumn,
  Search as SearchIcon,
  Phone,
} from "@mui/icons-material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  useGridApiRef,
} from "@mui/x-data-grid";

const initialPatients = [
  {
    id: 1,
    roomNo: "101A",
    bedId: "B1",
    name: "Aditi Sharma",
    mobile: "9876543210",
    treatment: "IV Antibiotics",
    status: "Current",
    startDate: "2025-04-01",
    endDate: "",
  },
  {
    id: 2,
    roomNo: "102B",
    bedId: "B2",
    name: "Ramesh Kumar",
    mobile: "9988776655",
    treatment: "Physiotherapy",
    status: "Discharged",
    startDate: "2025-03-20",
    endDate: "2025-03-28",
  },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function PatientEnquiry() {
  const [patients, setPatients] = useState(initialPatients);
  const [tab, setTab] = useState("Current");
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const apiRef = useGridApiRef();

  const [dischargeDialogOpen, setDischargeDialogOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);


  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    roomNo: true,
    bedId: true,
    name: true,
    mobile: true,
    treatment: true,
  });
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  //const [selectedPatientId, setSelectedPatientId] = useState(null);


  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);


  const handleDischargeClick = (id) => {
    setSelectedPatientId(id);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDischarge = () => {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === selectedPatientId
          ? {
              ...p,
              status: "Discharged",
              endDate: new Date().toISOString().split("T")[0],
            }
          : p
      )
    );

    
    setConfirmDialogOpen(false);
    setSelectedPatientId(null);
  };

  const handleCancelDischarge = () => {
    setConfirmDialogOpen(false);
    setSelectedPatientId(null);
  };

  
  const handleStatusToggle = (id) => {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "Current" ? "Discharged" : "Current" }
          : p
      )
    );
  };

  const filteredPatients = patients.filter(
    (p) =>
      p.status === tab &&
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { field: "roomNo", headerName: "Room No", flex: 1 },
    { field: "bedId", headerName: "Bed ID", flex: 1 },
    { field: "name", headerName: "Patient Name", flex: 1.5 },
    {
      field: "mobile",
      headerName: "Mobile",
      flex: 1.5,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Phone fontSize="small" color="success" />
          <Typography noWrap>{params.row.mobile}</Typography>
        </Box>
      ),
    },
    { field: "treatment", headerName: "Treatment", flex: 2 },
    
    {
    field: "startDate",
    headerName: "Start Date",
    flex: 1.2,
  },
  {
    field: "endDate",
    headerName: "End Date",
    flex: 1.2,
    renderCell: (params) =>
      params.row.status === "Discharged" ? params.row.endDate : "",
  },
    
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          color={params.row.status === "Current" ? "error" : "success"}
          onClick={() =>
            params.row.status === "Current" && handleDischargeClick(params.row.id)
          }          disabled={params.row.status === "Discharged"} // disable for discharged
        >
          {params.row.status === "Current" ? "Discharge" : "Discharged"}
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ height: 650, width: "100%", p: 2 }}>
      <Box
        sx={{
          backgroundColor: "#e0f7fa",
          p: 2,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Patient Enquiries</Typography>
          <Box display="flex" alignItems="center" gap={2}>
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
                placeholder="Search by Name"
                InputProps={{ disableUnderline: true }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="small"
              />
            </Box>
            <Tooltip title="Show/Hide Columns">
              <IconButton onClick={handleClick}>
                <ViewColumn />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
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
                    <Typography>
                      {columns.find((c) => c.field === field)?.headerName}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Tooltip>
            <Tooltip title="Add New Patient">
              <IconButton>
                <Add sx={{ color: "green" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Refresh">
              <IconButton>
                <Refresh />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Tabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          sx={{ mt: 2 }}
        >
          <Tab value="Current" label="Current" sx={{ width: '50%' }}  />
          <Tab value="Discharged" label="Discharged" sx={{ width: '50%' }}  />
        </Tabs>
      </Box>

      <DataGrid
        rows={filteredPatients}
        columns={columns}
        components={{ Toolbar: CustomToolbar }}
        apiRef={apiRef}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={setColumnVisibilityModel}
        sx={{
          border: "none",
          fontFamily: "inherit",
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
        }}
      />
       {/* Discharge Confirmation Dialog */}
       <Dialog
        open={confirmDialogOpen}
        onClose={handleCancelDischarge}
      >
        <DialogTitle>Confirm Discharge</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to discharge this patient?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDischarge}>No</Button>
          <Button onClick={handleConfirmDischarge} color="error" variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
