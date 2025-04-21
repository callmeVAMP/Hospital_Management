// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   IconButton,
//   Tooltip,
//   Stack,
//   Menu,
//   MenuItem,
//   Checkbox,
//   Chip,
// } from "@mui/material";
// import {
//   DataGrid,
//   GridToolbarContainer,
//   GridToolbarExport,
//   useGridApiRef,
// } from "@mui/x-data-grid";
// import {
//   Edit,
//   Delete,
//   Refresh,
//   Download,
//   Add,
//   ViewColumn,
//   Search as SearchIcon,
// } from "@mui/icons-material";
// import { DeleteOccupancyDialog } from "./DeleteOccupancyDialog";
// import AlertBar from "../Common/AlertBar";
// import BookOrEditRoomOccupancy from "./BookRoomOccupancy";
// import EditRoomOccupancy from "./EditRoomOccupancy";
// import BookRoomOccupancy from "./BookRoomOccupancy";
// import AddPatientDialog from "./AddPatientDialog";

// const allotments = [
//   {
//     id: 1,
//     roomNo: "101",
//     patientName: "John Doe",
//     roomType: "Deluxe",
//     bedNo: 1,
//     admissionDate: "2018-04-15",
//     gender: "male",
//     mobile: "1234567890",
//     doctorAssigned: "Dr. Jane Smith",
//     status: "Discharged",
//     amount: 15000,
//   },
//   {
//     id: 2,
//     roomNo: "102",
//     patientName: "Alice Johnson",
//     roomType: "Single",
//     bedNo: 2,
//     admissionDate: "2018-04-15",
//     gender: "female",
//     mobile: "2345678990",
//     doctorAssigned: "Dr. Mark Taylor",
//     status: "Reserved",
//     amount: 8000,
//   },
// ];

// const availableRoomData=[
//   {
//       "RNo": 103,
//       "BedID": 1,
//       "RType": "Triple",
//       "RCategory": "General Care"
//   },
//   {
//       "RNo": 103,
//       "BedID": 2,
//       "RType": "Triple",
//       "RCategory": "General Care"
//   },
//   {
//       "RNo": 103,
//       "BedID": 3,
//       "RType": "Triple",
//       "RCategory": "General Care"
//   },
//   {
//       "RNo": 202,
//       "BedID": 1,
//       "RType": "Suite",
//       "RCategory": "Surgical"
//   },
//   {
//       "RNo": 301,
//       "BedID": 3,
//       "RType": "Ward",
//       "RCategory": "ICU"
//   },
//   {
//       "RNo": 301,
//       "BedID": 4,
//       "RType": "Ward",
//       "RCategory": "ICU"
//   }
// ]

// export default function RoomOccupancy() {
//   const [openAddOccupancy, setAddOpenOccuoancy] = useState(false);
//   const [openAddPatient, setAddOpenPatient] = useState(false);
   
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [selectedOccupancy, setSelectedOccupancy] = useState(null);
//   const [editDialogOpen, setEditDilaogOpen]=useState(false);

//   const [snackBarInfo,setSnackBarInfo]=useState({'message':'','severity':''})
//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   const handleEditClick=(occupancyData)=>{
//       console.log("clicked edit ",occupancyData);
//       setSelectedOccupancy(occupancyData);
//       setEditDilaogOpen(true);
//   }

//   const handleDeleteClick = (occupancyData) => {
//       console.log("clicked delete",occupancyData);
//       setSelectedOccupancy(occupancyData);
//       setDeleteDialogOpen(true);
//   };

//   const handleDeleteConfirm = () => {
//       // perform delete using selectedRoom.id or something
//       console.log("Deleting Occupancy:", selectedOccupancy);
//       setDeleteDialogOpen(false);
//       setSnackbarOpen(true);
//       setSnackBarInfo({'message':'Deleted Successfully','severity':'error'})
      
//   };

      
//   const handleSave = (data, type) => {
//       console.log('Occupancy Data:', data);  
//       if(type=="add"){
//           setSnackbarOpen(true);
//           setSnackBarInfo({'message':'Added Occupancy Data Successfully','severity':'success'})
//       }   
//       else{
//           setSnackbarOpen(true);
//           setSnackBarInfo({'message':'Updated Occupancy Data Successfully','severity':'success'})
//       }

//       // if patient not registered
//       setAddOpenPatient(true);
//   };
//   const [searchQuery, setSearchQuery] = useState("");
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const apiRef = useGridApiRef();

//   const [columnVisibilityModel, setColumnVisibilityModel] = useState({
//     roomNo: true,
//     patientName: true,
//     roomType: true,
//     bedNo: true,
//     admissionDate: true,
//     gender: true,
//     mobile: true,
//     doctorAssigned: true,
//     status: true,
//     amount: true,
//   });

//   const handleClick = (event) => setAnchorEl(event.currentTarget);
//   const handleClose = () => setAnchorEl(null);

//   const filteredRows = allotments.filter((row) =>
//     row.patientName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const renderLabel = (value, color, textColor) => (
//     <Chip label={value} size="small" sx={{ backgroundColor: color, color: textColor }} />
//   );

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Available": return ["#d1fae5", "#065f46"];
//       case "Discharged": return ["#ffe4b5", "#92400e"];
//       case "Reserved": return ["#ede9fe", "#5b21b6"];
//       case "Maintenance": return ["#fee2e2", "#991b1b"];
//       default: return ["#f3f4f6", "#374151"];
//     }
//   };

//   const getGenderColor = (gender) => gender === "male" ? ["#d0ebff", "#1971c2"] : ["#ffe0f0", "#c2255c"];

//   const getRoomTypeColor = (type) => type === "Delux" ? ["#fef9c3", "#92400e"] : ["#dbeafe", "#1e3a8a"];

//   const columns = [
//     { field: "roomNo", headerName: "Room No", flex: 1 },
//     { field: "patientName", headerName: "Patient Name", flex: 1.5 },
//     {
//       field: "roomType",
//       headerName: "Room Type",
//       flex: 1,
//       renderCell: (params) => {
//         const [bg, text] = getRoomTypeColor(params.row.roomType);
//         return renderLabel(params.row.roomType, bg, text);
//       },
//     },
//     { field: "bedNo", headerName: "Bed No", flex: 1 },
//     { field: "admissionDate", headerName: "Admission Date", flex: 1 },
//     {
//       field: "gender",
//       headerName: "Gender",
//       flex: 1,
//       renderCell: (params) => {
//         const [bg, text] = getGenderColor(params.row.gender);
//         return renderLabel(params.row.gender, bg, text);
//       },
//     },
//     { field: "mobile", headerName: "Mobile", flex: 1.5 },
//     { field: "doctorAssigned", headerName: "Doctor Assigned", flex: 1.5 },
//     {
//       field: "status",
//       headerName: "Status",
//       flex: 1,
//       renderCell: (params) => {
//         const [bg, text] = getStatusColor(params.row.status);
//         return renderLabel(params.row.status, bg, text);
//       },
//     },
//     { field: "amount", headerName: "Amount Charged", flex: 1 },
//     {
//       field: "actions",
//       headerName: "Actions",
//       flex: 0.5,
//       sortable: false,
//       renderCell: (params) => (
//         <Box display="flex" flexDirection="row" gap={0.5}>
//           <Tooltip title="Edit">
//             <IconButton size="small" sx={{ color: "#4f46e5" }} onClick={()=>handleEditClick(params.row)}>
//               <Edit fontSize="small" />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Delete">
//             <IconButton size="small" sx={{ color: "#f43f5e" }} onClick={()=>handleDeleteClick(params.row)}>
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
//           backgroundColor: "#dbe3f4",
//           p: 2,
//           borderTopLeftRadius: 12,
//           borderTopRightRadius: 12,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <Typography variant="h6">Allotment List</Typography>
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
//               placeholder="Search"
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
//           </Tooltip>
//            <Tooltip title="Add New Room">
//               <IconButton onClick={()=>setAddOpenOccuoancy(true)}>
//                 <Add sx={{ color: "green" }} />
//               </IconButton>
              
//             </Tooltip>
//           <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
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
//                 <Typography>
//                   {columns.find((c) => c.field === field)?.headerName}
//                 </Typography>
//               </MenuItem>
//             ))}
//           </Menu>
//           <Tooltip title="Refresh">
//             <IconButton>
//               <Refresh />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Download XLSX">
//             <IconButton onClick={() => apiRef.current.exportDataAsCsv()}>
//               <Download sx={{ color: "#3b82f6" }} />
//             </IconButton>
//           </Tooltip>
//         </Box>
//       </Box>
//       <DataGrid
//         apiRef={apiRef}
//         rows={filteredRows}
//         columns={columns}
//         pageSize={10}
//         rowsPerPageOptions={[10, 15]}
//         pagination
//         disableSelectionOnClick
//         columnVisibilityModel={columnVisibilityModel}
//         onColumnVisibilityModelChange={(newModel) =>
//           setColumnVisibilityModel(newModel)
//         }
//         sx={{
//           backgroundColor: "white",
//           borderRadius: 2,
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: "#f3f6f9",
//             fontWeight: "bold",
//           },
//         }}
//       />

//       {/* Book Room */}
//       <BookRoomOccupancy open={openAddOccupancy} onClose={() => setAddOpenOccuoancy(false)} onSave={handleSave} roomsData={availableRoomData}/>

//       {/* Patient Register if not present */}
//       <AddPatientDialog
//         open={openAddPatient}
//         onClose={() => setAddOpenPatient(false)}
//         onSave={(data) => {
//           console.log("New patient:", data);
//           setSnackbarOpen(true);
//           setSnackBarInfo({'message':'Added New Patient Successfully','severity':'success'})
//         }}
//       />


//         {/* Edit Occupancy */}
//       <EditRoomOccupancy open={editDialogOpen} onClose={() => setEditDilaogOpen(false)} onSave={handleSave} occupancyData={selectedOccupancy} />

//       {/* Delete Dialog */}
//       <DeleteOccupancyDialog
//           open={deleteDialogOpen}
//           occupancy={selectedOccupancy}
//           onCancel={() => setDeleteDialogOpen(false)}
//           onConfirm={handleDeleteConfirm}
//       />

//        {/* Snackbar code */}
//       <AlertBar
//           open={snackbarOpen}
//           onClose={() => setSnackbarOpen(false)}
//           message={snackBarInfo?.message}
//           severity={snackBarInfo?.severity} // Can be 'success', 'error', 'warning', 'info'
//           duration={3000}
//       />
//     </Box>
//   );
// }


import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Checkbox,
  Chip,
  FormControl,
  Select,
  Drawer,
  Button,
} from "@mui/material";
import {
  DataGrid,
  useGridApiRef,
} from "@mui/x-data-grid";
import {
  Edit,
  Delete,
  Refresh,
  Download,
  Add,
  ViewColumn,
  Search as SearchIcon,
} from "@mui/icons-material";
import { DeleteOccupancyDialog } from "./DeleteOccupancyDialog";
import AlertBar from "../Common/AlertBar";
import BookRoomOccupancy from "./BookRoomOccupancy";
import EditRoomOccupancy from "./EditRoomOccupancy";
import AddPatientDialog from "./AddPatientDialog";
import axios from "axios";

//prev



//perfect code
export default function RoomOccupancy() {
  const [allotments, setAllotments] = useState([]);
  const [availableRoomData, setAvailableRoomData] = useState([]);
  const [openAddOccupancy, setAddOpenOccupancy] = useState(false);
  const [openAddPatient, setAddOpenPatient] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedOccupancy, setSelectedOccupancy] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [snackBarInfo, setSnackBarInfo] = useState({ message: '', severity: '' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const apiRef = useGridApiRef();

  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    roomNo: true,
    patientName: true,
    bedNo: true,
    admissionDate: true,
    gender: true,
    mobile: true,
    doctorAssigned: true,
    status: true,
    amount: true,
  });

  // Drawer for More Details
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    fetchOccupancyData();
    fetchAvailableRooms();
  }, []);

  const fetchOccupancyData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/admin/occupancy/view');
      setAllotments(response.data.map((item, index) => ({
        ...item,
        id: index + 1, // DataGrid needs a unique id
      })));
    } catch (error) {
      setSnackBarInfo({ message: 'Failed to fetch occupancy data', severity: 'error' });
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableRooms = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admin/beds/view');
      setAvailableRoomData(response.data);
    } catch (error) {
      // Optionally show error
    }
  };

  const handleEditClick = (occupancyData) => {
    setSelectedOccupancy(occupancyData);
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (occupancyData) => {
    setSelectedOccupancy(occupancyData);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.post('http://localhost:8000/admin/occupancy/delete', {
        RNo: selectedOccupancy.roomNo,
        BedID: selectedOccupancy.bedNo,
        StDateTime: selectedOccupancy.admissionDate
      });
      setSnackBarInfo({ message: 'Deleted Successfully', severity: 'success' });
      setSnackbarOpen(true);
      fetchOccupancyData();
    } catch (error) {
      setSnackBarInfo({ message: 'Failed to delete: ' + error.response?.data?.message || 'Unknown error', severity: 'error' });
      setSnackbarOpen(true);
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const handleSave = async (data, type) => {
    try {
      if (type === "edit") {
        await axios.post('http://localhost:8000/admin/occupancy/edit', {
          RNo: data.roomNo,
          BedID: data.bedNo,
          StDateTime: data.admissionDate,
          PName: data.patientName,
          PPhNo: data.mobile,
          PGender: data.gender,
          DoctorAssigned: data.doctorAssigned,
          status: data.status.toLowerCase(),
        });
        setSnackBarInfo({ message: 'Updated Occupancy Data Successfully', severity: 'success' });
      } else if (type === "add") {
        const response = await axios.post('http://localhost:8000/admin/occupancy/insert', data);
        if (response.data.patientNotRegistered) {
          setAddOpenPatient(true);
          return;
        }
        setSnackBarInfo({ message: 'Added Occupancy Data Successfully', severity: 'success' });
      }
      setSnackbarOpen(true);
      fetchOccupancyData();
      fetchAvailableRooms();
      setEditDialogOpen(false);
      setAddOpenOccupancy(false);
    } catch (error) {
      if (error.response && error.response.data.message === "Patient not registered") {
        setAddOpenPatient(true);
      } else {
        setSnackBarInfo({ 
          message: `Failed to ${type === "add" ? "add" : "update"}: ${error.response?.data?.message || 'Unknown error'}`, 
          severity: 'error' 
        });
        setSnackbarOpen(true);
      }
    }
  };

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleRefresh = () => {
    fetchOccupancyData();
    fetchAvailableRooms();
  };

  // Multi-field search and filtering
  const filteredRows = allotments.filter((row) =>
    (
      row.patientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(row.roomNo).includes(searchQuery) ||
      row.mobile?.includes(searchQuery) ||
      (row.doctorAssigned || "").toLowerCase().includes(searchQuery.toLowerCase())
    ) &&
    (genderFilter ? row.gender === genderFilter : true) &&
    (statusFilter ? row.status === statusFilter : true)
  );

  const renderLabel = (value, color, textColor) => (
    <Chip label={value} size="small" sx={{ backgroundColor: color, color: textColor }} />
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Admit": return ["#ede9fe", "#5b21b6"];
      case "Discharged": return ["#ffe4b5", "#92400e"];
      default: return ["#f3f4f6", "#374151"];
    }
  };

  const getGenderColor = (gender) => gender === "male" ? ["#d0ebff", "#1971c2"] : ["#ffe0f0", "#c2255c"];

  const columns = [
    { field: "roomNo", headerName: "Room No", flex: 1 },
    { field: "patientName", headerName: "Patient Name", flex: 1.5 },
    { field: "bedNo", headerName: "Bed No", flex: 1 },
    { field: "admissionDate", headerName: "Admission Date", flex: 1 },
    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
      renderCell: (params) => {
        const [bg, text] = getGenderColor(params.row.gender);
        return renderLabel(params.row.gender, bg, text);
      },
    },
    { field: "mobile", headerName: "Mobile", flex: 1.5 },
    { field: "doctorAssigned", headerName: "Doctor Assigned", flex: 1.5 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        const [bg, text] = getStatusColor(params.row.status);
        return renderLabel(params.row.status, bg, text);
      },
    },
    { field: "amount", headerName: "Amount Charged", flex: 1 },
    {
      field: "details",
      headerName: "More Details",
      flex: 0.7,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            setSelectedRow(params.row);
            setDetailsOpen(true);
          }}
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
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.7,
      sortable: false,
      renderCell: (params) => (
        <Box display="flex" flexDirection="row" gap={0.5}>
          <Tooltip title="Edit">
            <IconButton size="small" sx={{ color: "#4f46e5" }} onClick={() => handleEditClick(params.row)}>
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" sx={{ color: "#f43f5e" }} onClick={() => handleDeleteClick(params.row)}>
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: "100%", p: 2 }}>
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
        <Typography variant="h6">Allotment List</Typography>
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
          {/* Gender Filter */}
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
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
          {/* Status Filter */}
          <FormControl sx={{ minWidth: 120, backgroundColor: "white", borderRadius: 1 }}>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              displayEmpty
              size="small"
              variant="outlined"
              sx={{ height: 36 }}
            >
              <MenuItem value="">All Statuses</MenuItem>
              <MenuItem value="Admit">Admit</MenuItem>
              <MenuItem value="Discharged">Discharged</MenuItem>
            </Select>
          </FormControl>
          {/* Column Visibility */}
          <Tooltip title="Show/Hide Columns">
            <IconButton onClick={handleClick}>
              <ViewColumn />
            </IconButton>
          </Tooltip>
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
          {/* Add Button */}
          <Tooltip title="Add New Room">
            <IconButton onClick={() => setAddOpenOccupancy(true)}>
              <Add sx={{ color: "green" }} />
            </IconButton>
          </Tooltip>
          {/* Refresh Button */}
          <Tooltip title="Refresh">
            <IconButton onClick={handleRefresh}>
              <Refresh />
            </IconButton>
          </Tooltip>
          {/* Download Button */}
          <Tooltip title="Download CSV">
            <IconButton onClick={() => apiRef.current.exportDataAsCsv()}>
              <Download sx={{ color: "#3b82f6" }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <DataGrid
        apiRef={apiRef}
        rows={filteredRows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 15]}
        pagination
        disableSelectionOnClick
        loading={loading}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) =>
          setColumnVisibilityModel(newModel)
        }
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f3f6f9",
            fontWeight: "bold",
          },
        }}
      />

      {/* Book Room */}
      <BookRoomOccupancy 
        open={openAddOccupancy} 
        onClose={() => setAddOpenOccupancy(false)} 
        onSave={(data) => handleSave(data, "add")} 
        roomsData={availableRoomData}
      />

      {/* Patient Register if not present */}
      {/* <AddPatientDialog
        open={openAddPatient}
        onClose={() => setAddOpenPatient(false)}
        onSave={async (data) => {
          try {
            await axios.post('http://localhost:8000/patient/add', data);
            setSnackBarInfo({ message: 'Added New Patient Successfully', severity: 'success' });
            setSnackbarOpen(true);
            if (selectedOccupancy) {
              handleSave(selectedOccupancy, selectedOccupancy.id ? "edit" : "add");
            }
          } catch (error) {
            setSnackBarInfo({ message: 'Failed to add patient: ' + error.response?.data?.message || 'Unknown error', severity: 'error' });
            setSnackbarOpen(true);
          }
        }}
      /> */}

      {/* Edit Occupancy */}
      <EditRoomOccupancy 
        open={editDialogOpen} 
        onClose={() => setEditDialogOpen(false)} 
        onSave={(data) => handleSave(data, "edit")} 
        occupancyData={selectedOccupancy} 
      />

      {/* Delete Dialog */}
      <DeleteOccupancyDialog
        open={deleteDialogOpen}
        occupancy={selectedOccupancy}
        onCancel={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
      />

      {/* Snackbar */}
      <AlertBar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message={snackBarInfo?.message}
        severity={snackBarInfo?.severity}
        duration={3000}
      />

      {/* Drawer for More Details */}
      <Drawer
        anchor="right"
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: "80%", md: "600px" },
            mx: "auto",
            p: 3,
          }
        }}
      >
        {selectedRow && (
          <>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">
                Room Details - {selectedRow.roomNo}
              </Typography>
              <Button variant="outlined" size="small" onClick={() => setDetailsOpen(false)}>
                Close
              </Button>
            </Box>
            <Box sx={{ backgroundColor: "#f3f6f9", p: 2, borderRadius: 2, mb: 3 }}>
              <Typography variant="body1"><strong>Patient:</strong> {selectedRow.patientName}</Typography>
              <Typography variant="body1"><strong>Gender:</strong> {selectedRow.gender}</Typography>
              <Typography variant="body1"><strong>Doctor:</strong> {selectedRow.doctorAssigned}</Typography>
              <Typography variant="body1"><strong>Mobile:</strong> {selectedRow.mobile}</Typography>
              <Typography variant="body1"><strong>Room No:</strong> {selectedRow.roomNo}</Typography>
              <Typography variant="body1"><strong>Bed No:</strong> {selectedRow.bedNo}</Typography>
              <Typography variant="body1"><strong>Status:</strong> {selectedRow.status}</Typography>
              <Typography variant="body1"><strong>Amount:</strong> ₹{selectedRow.amount}</Typography>
              <Typography variant="body1"><strong>Admission Date:</strong> {selectedRow.admissionDate}</Typography>
            </Box>
          </>
        )}
      </Drawer>
    </Box>
  );
}