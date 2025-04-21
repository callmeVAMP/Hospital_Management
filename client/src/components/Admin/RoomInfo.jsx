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
// // import DoctorForm from "../AddDoctor";
// import BookorEditRoomForm from "./AddOrEditRoom";
// import { DeleteRoomDialog } from "./DeleteRoomDialog";
// import AlertBar from "../Common/AlertBar";

// const rooms = [
//   {
//     id: 1,
//     roomNumber: "101",
//     department: "ICU",
//     roomType: "Single",
//     floor: 1,
//     bedCapacity: 1,
//     occupiedBeds: 1,
//     roomFeatures: "Ventilator",
//     roomRate: 1500,
//     roomCategory: "Critical Care",
//   },
//   {
//     id: 2,
//     roomNumber: "102",
//     department: "ICU",
//     roomType: "Double",
//     floor: 1,
//     bedCapacity: 2,
//     occupiedBeds: 1,
//     roomFeatures: "Oxygen Support",
//     roomRate: 1400,
//     roomCategory: "General ICU",
//   },
//   // More rooms here...
// ];

// function getStatusLabel(row) {
//   const available = row.bedCapacity - row.occupiedBeds;
//   if (available === 0) {
//     return { label: "Occupied", color: "#fdecea", text: "#b71c1c" };
//   } 
//   else if(available==row?.bedCapacity) {
//     return { label: "Available", color: "#e8f5e9", text: "#1b5e20" };
//   }
//   else{
//    return { label: "Partially Availabale", color: "#f2f57e", text: "#e47c09" };
//   }
// }

// function getCategoryLabel(category) {
//   const colorMap = {
//     "Critical Care": { color: "#fff8e1", text: "#ff8f00" },
//     "General ICU": { color: "#f3e5f5", text: "#6a1b9a" },
//     "Private": { color: "#e3f2fd", text: "#1565c0" },
//     "General": { color: "#fbe9e7", text: "#bf360c" },
//     "Emergency": { color: "#e1f5fe", text: "#0277bd" },
//     "Surgical": { color: "#f1f8e9", text: "#33691e" },
//     "Cardiology": { color: "#ede7f6", text: "#4527a0" },
//     "Consultation": { color: "#fff3e0", text: "#ef6c00" },
//   };
//   return colorMap[category] || { color: "#eceff1", text: "#263238" };
// }

// export default function RoomInfoTable() {
//   const [openAddRoom, setOpenRoom] = useState(false);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [editDialogOpen, setEditDilaogOpen]=useState(false);

//   const [snackBarInfo,setSnackBarInfo]=useState({'message':'','severity':''})
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
  
//   const handleEditClick=(roomData)=>{
//     setSelectedRoom(roomData);
//     console.log("out ",roomData);
//     setEditDilaogOpen(true);
//   }

//   const handleDeleteClick = (roomData) => {
//     console.log(roomData);
//     setSelectedRoom(roomData);
//     setDeleteDialogOpen(true);
//   };

//   const handleDeleteConfirm = () => {
//     // perform delete using selectedRoom.id or something
//     console.log("Deleting Room:", selectedRoom);
//     setDeleteDialogOpen(false);
//     setSnackbarOpen(true);
//     setSnackBarInfo({'message':'Deleted Successfully','severity':'error'})
    
//   };

    
//   const handleSave = (data, type) => {
//     console.log('Room Data:', data);  
//     if(type=="add"){
//         setSnackbarOpen(true);
//         setSnackBarInfo({'message':'Added Room Successfully','severity':'success'})
//     }   
//     else{
//         setSnackbarOpen(true);
//         setSnackBarInfo({'message':'Updated Room Information Successfully','severity':'success'})
//     }
//   };
  

//   const [searchQuery, setSearchQuery] = useState("");
//   const [columnVisibilityModel, setColumnVisibilityModel] = useState({
//     roomNumber: true,
//     department: true,
//     roomType: true,
//     floor: true,
//     bedCapacity: true,
//     occupiedBeds: true,
//     roomFeatures: true,
//     roomRate: true,
//     roomCategory: true,
//     status: true,
//   });
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const apiRef = useGridApiRef();

//   const filteredRooms = rooms.filter((room) =>
//     room.roomNumber.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const columns = [
//     { field: "roomNumber", headerName: "Room Number", flex: 1 },
//     { field: "roomType", headerName: "Room Type", flex: 1 },
//     { field: "floor", headerName: "Floor", flex: 0.5 },
//     { field: "bedCapacity", headerName: "Bed Capacity", flex: 1 },
//     { field: "occupiedBeds", headerName: "Occupied Beds", flex: 1 },
//     {
//       field: "status",
//       headerName: "Room Status",
//       flex: 1.5,
//       renderCell: (params) => {
//         const row = params?.row;
//         if (!row) return null;
//         const { color, text, label } = getStatusLabel(row);
//         return (
//           <Box width="100%">
//             <Chip
//               label={label}
//               sx={{
//                 backgroundColor: color,
//                 color: text,
//                 fontWeight: "bold",
//                 justifyContent: "flex-start",
//               }}
//               fullWidth
//             />
//           </Box>
//         );
//       },
//     },
//     { field: "roomFeatures", headerName: "Room Features", flex: 1.5 },
//     { field: "roomRate", headerName: "Room Rate", flex: 1 },
//     {
//       field: "roomCategory",
//       headerName: "Room Category",
//       flex: 1.5,
//       renderCell: (params) => {
//         const { color, text } = getCategoryLabel(params.row.roomCategory);
//         return (
//           <Box width="100%">
//             <Chip
//               label={params.row.roomCategory}
//               sx={{
//                 backgroundColor: color,
//                 color: text,
//                 fontWeight: "bold",
//                 justifyContent: "flex-start",
//               }}
//               fullWidth
//             />
//           </Box>
//         );
//       },
//     },
//     {
//         field: "actions",
//         headerName: "Actions",
//         flex: 0.5,
//         sortable: false,
//         renderCell: (params) => (
//         <Box display="flex" flexDirection="row" gap={0.5}>
//             <Tooltip title="Edit">
//             <IconButton size="small" sx={{ color: "#4f46e5" }} onClick={()=>handleEditClick(params)}>
//                 <Edit fontSize="small" />
//             </IconButton>
//             </Tooltip>
//             <Tooltip title="Delete">
//             <IconButton size="small" sx={{ color: "#f43f5e" }} onClick={()=>handleDeleteClick(params)}>
//                 <Delete fontSize="small" />
//             </IconButton>
//             </Tooltip>
//         </Box>
//         ),
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
//         <Typography variant="h6">Room Info</Typography>
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
//             <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
//               <ViewColumn />
//             </IconButton>
//             <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
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
//                   <Typography>{columns.find((c) => c.field === field)?.headerName}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Tooltip>
//           <Tooltip title="Add New Room">
//             <IconButton onClick={()=>setOpenRoom(true)}>
//               <Add sx={{ color: "green" }} />
//             </IconButton>
            
//           </Tooltip>
//           <Tooltip title="Refresh">
//             <IconButton onClick={()=>handleRefreshTable()}>
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
//         columnVisibilityModel={columnVisibilityModel}
//         onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
//         apiRef={apiRef}
//         rows={filteredRooms}
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

//       {/* Book Room */}
//       <BookorEditRoomForm open={openAddRoom} onClose={() => setOpenRoom(false)} onSave={handleSave} />

//        {/* Edit Room */}
//        <BookorEditRoomForm open={editDialogOpen} onClose={() => setEditDilaogOpen(false)} onSave={handleSave} roomData={selectedRoom?.row} />

//       {/* Delete Dialog */}
//       <DeleteRoomDialog
//         open={deleteDialogOpen}
//         room={selectedRoom}
//         onCancel={() => setDeleteDialogOpen(false)}
//         onConfirm={handleDeleteConfirm}
//       />

//       {/* Snackbar code */}
//       <AlertBar
//         open={snackbarOpen}
//         onClose={() => setSnackbarOpen(false)}
//         message={snackBarInfo?.message}
//         severity={snackBarInfo?.severity} // Can be 'success', 'error', 'warning', 'info'
//         duration={3000}
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
import BookorEditRoomForm from "./AddOrEditRoom";
import { DeleteRoomDialog } from "./DeleteRoomDialog";
import AlertBar from "../Common/AlertBar";
import axios from "axios";

// Utility to get status label and color
function getStatusLabel(row) {
  const available = row.bedCapacity - row.occupiedBeds;
  if (available === 0) {
    return { label: "Occupied", color: "#fdecea", text: "#b71c1c" };
  } else if (available === row?.bedCapacity) {
    return { label: "Available", color: "#e8f5e9", text: "#1b5e20" };
  } else {
    return { label: "Partially Available", color: "#f2f57e", text: "#e47c09" };
  }
}

// Utility to get category label and color
function getCategoryLabel(category) {
  const colorMap = {
    "Critical Care": { color: "#fff8e1", text: "#ff8f00" },
    "General ICU": { color: "#f3e5f5", text: "#6a1b9a" },
    "Private": { color: "#e3f2fd", text: "#1565c0" },
    "General": { color: "#fbe9e7", text: "#bf360c" },
    "Emergency": { color: "#e1f5fe", text: "#0277bd" },
    "Surgical": { color: "#f1f8e9", text: "#33691e" },
    "Cardiology": { color: "#ede7f6", text: "#4527a0" },
    "Consultation": { color: "#fff3e0", text: "#ef6c00" },
  };
  return colorMap[category] || { color: "#eceff1", text: "#263238" };
}

export default function RoomInfoTable() {
  // State for rooms data
  const [rooms, setRooms] = useState([]);
  // Dialog open/close states
  const [openAddRoom, setOpenRoom] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Snackbar state
  const [snackBarInfo, setSnackBarInfo] = useState({ message: '', severity: '' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Search and column visibility
  const [searchQuery, setSearchQuery] = useState("");
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    roomNumber: true,
    department: true,
    roomType: true,
    bedCapacity: true,
    occupiedBeds: true,
    roomRate: true,
    roomCategory: true,
    status: true,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const apiRef = useGridApiRef();

  // Fetch all rooms from backend on mount
  useEffect(() => {
    fetchRooms();
  }, []);

  // GET: Fetch rooms from backend
  // const fetchRooms = async () => {
  //   try {
  //     // TODO: Replace with your actual GET API endpoint for rooms
  //     const response = await axios.get("http://localhost:8000/admin/beds/view");
  //     setRooms(response.data);
  //   } catch (error) {
  //     setSnackBarInfo({ message: "Failed to fetch rooms", severity: "error" });
  //     setSnackbarOpen(true);
  //   }
  // };

  // const fetchRooms = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8000/admin/beds/view");
  //     // Map backend fields to frontend fields
  //     const mappedRooms = response.data.map((room, idx) => ({
  //       const occupiedBeds = room.Capacity - room.AvailableCapacity;
  //     console.log(`Room ${room.RNo} occupied beds:`, occupiedBeds);
  //     return{
  //       id: idx + 1, // DataGrid needs a unique 'id'
  //       roomNumber: room.RNo, // backend RNo -> frontend roomNumber
  //       roomType: room.RType,
  //       bedCapacity: room.Capacity,
  //       // occupiedBeds: (room.Capacity || 0) - (room.AvailableCapacity || 0),
  //       occupiedBeds:room.Capacity-room.AvailableCapacity,
        
  //       roomRate: room.RoomRate,
  //       roomCategory: room.RCategory || "", // If exists
  //     };
  //     }));
      
  const fetchRooms = async () => {
    try {
      const response = await axios.get("http://localhost:8000/admin/beds/view");
      // Map backend fields to frontend fields
      const mappedRooms = response.data.map((room, idx) => {
        const avl = room.AvailableCapacity; 
        console.log(`Room ${room.RNo} avl beds:`, avl);
        
        return { // Return the object here
          id: idx + 1,
          roomNumber: room.RNo,
          roomType: room.RType,
          bedCapacity: room.Capacity,
          occupiedBeds: room.Capacity-avl, // Use the calculated variable
          roomRate: room.RoomRate,
          roomCategory: room.RCategory || ""
        };
      });
      
      setRooms(mappedRooms);
    } catch (error) {
      setSnackBarInfo({ message: "Failed to fetch rooms", severity: "error" });
      setSnackbarOpen(true);
    }
  };
  
  //     setRooms(mappedRooms);
  //   } catch (error) {
  //     setSnackBarInfo({ message: "Failed to fetch rooms", severity: "error" });
  //     setSnackbarOpen(true);
  //   }
  // };
  // console.log(bedCapacity);
  

  // Refresh table data
  const handleRefreshTable = () => {
    fetchRooms();
    setSnackBarInfo({ message: "Table refreshed", severity: "info" });
    setSnackbarOpen(true);
  };

  // Open edit dialog with selected room
  const handleEditClick = (params) => {
    setSelectedRoom(params.row);
    setEditDialogOpen(true);
  };

  // Open delete dialog with selected room
  const handleDeleteClick = (params) => {
    setSelectedRoom(params.row);
    setDeleteDialogOpen(true);
  };

  // DELETE: Delete room via API
  // const handleDeleteConfirm = async () => {
  //   try {
  //     // TODO: Replace with your actual DELETE API endpoint for a room
  //     await axios.delete(`http://localhost:8000/api/rooms/${selectedRoom.id}`);
  //     setSnackBarInfo({ message: 'Room Deleted', severity: 'success' });
  //     fetchRooms(); // Refresh data after deletion
  //   } catch (error) {
  //     setSnackBarInfo({ message: 'Deletion Failed', severity: 'error' });
  //   }
  //   setSnackbarOpen(true);
  //   setDeleteDialogOpen(false);
  // };

  //prev-del---------
  // const handleDeleteConfirm = async () => {
  //   try {
  //     // Call your actual backend delete API with the room number
  //     await axios.post('http://localhost:8000/admin/beds/delete', {
  //       RNo: selectedRoom.roomNumber, // roomNumber maps to RNo in backend
  //       PID:selectedRoom.PID,
  //       RNo: selectedRoom.roomNo
  //     });
  //     setSnackBarInfo({ message: 'Room Deleted', severity: 'success' });
  //     fetchRooms(); // Refresh data after deletion
  //   } catch (error) {
  //     setSnackBarInfo({ message: 'Deletion Failed', severity: 'error' });
  //   }
  //   setSnackbarOpen(true);
  //   setDeleteDialogOpen(false);
  // };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete('http://localhost:8000/admin/beds/delete', {
        data: {
          // PID: selectedRoom.PID,       // Ensure these fields exist in your row data
          // BedID: selectedRoom.bedID,   // e.g., from DataGrid's `params.row`
          RNo: selectedRoom.roomNumber
        }
      });
      setSnackBarInfo({ message: 'Deleted Successfully', severity: 'success' });
      fetchRooms(); // Refresh data after deletion
    } catch (error) {
      setSnackBarInfo({ 
        message: error.response?.data?.message || 'Deletion failed', 
        severity: 'error' 
      });
    }
    setSnackbarOpen(true);
    setDeleteDialogOpen(false);
  };
  
  

  // await axios.delete('http://localhost:8000/admin/beds/delete', {
  //   data: {
  //     PID: selectedRow.PID,
  //     BedID: selectedRow.bedID,
  //     RNo: selectedRow.roomNo
  //   }
  // });
  

  // POST/PUT: Add or Edit room via API
  // const handleSave = async (data, type) => {
  //   try {
  //     if (type === "add") {
  //       // TODO: Replace with your actual POST API endpoint for adding a room
  //       await axios.post("http://localhost:8000/admin/beds/insert", {data:{
  //         RNo: data.roomNumber,
  //         Capacity: data.bedCapacity,
  //         RType: data.roomType,
  //         RCategory: data.roomCategory,
  //         RoomRate: data.roomRate
  //       }});
  //       setSnackBarInfo({ message: "Added Room Successfully", severity: "success" });
  //     } else {
  //       // TODO: Replace with your actual PUT API endpoint for editing a room
  //       await axios.put(`http://localhost:8000/admin/beds/edit/${data.roomNumber}`, {
          
  //           // RNo: data.roomNumber,
  //           Capacity: bedCapacity,
  //           RType: roomType,
  //           RCategory: roomCategory,
  //           RoomRate: roomRate
        
  //     });
  //       setSnackBarInfo({ message: "Updated Room Information Successfully", severity: "success" });
  //     }
  //     fetchRooms(); // Refresh data after add/edit
  //   } catch (error) {
  //     setSnackBarInfo({ message: "Operation failed", severity: "error" });
  //   }
  //   setSnackbarOpen(true);
  // };

  const handleSave = async (data, type) => {
    try {
      if (type === "add") {
        // Add a new room
        await axios.post("http://localhost:8000/admin/beds/insert", {
          RNo: data.roomNumber,
          Capacity: data.bedCapacity,
          RType: data.roomType,
          RCategory: data.roomCategory,
          RoomRate: data.roomRate
        });
        setSnackBarInfo({ message: "Added Room Successfully", severity: "success" });
      } else {
        // Edit an existing room
        await axios.put(`http://localhost:8000/admin/beds/edit/${data.roomNumber}`, {
          Capacity: data.bedCapacity,
          RType: data.roomType,
          RCategory: data.roomCategory,
          RoomRate: data.roomRate
        });
        setSnackBarInfo({ message: "Updated Room Information Successfully", severity: "success" });
      }
      fetchRooms(); // Refresh data after add/edit
    } catch (error) {
      setSnackBarInfo({ 
        message: error.response?.data?.message || "Operation failed", 
        severity: "error" 
      });
    }
    setSnackbarOpen(true);
  };

  // Filter rooms based on search query
  // const filteredRooms = rooms.filter((room) =>
  //   room.roomNumber.toLowerCase().includes(searchQuery.toLowerCase())
  // );
  const filteredRooms = rooms.filter((room) =>
    (room.roomNumber || "").toString().toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  // DataGrid column definitions
  const columns = [
    { field: "roomNumber", headerName: "Room Number", flex: 1 },
    { field: "roomType", headerName: "Room Type", flex: 1 },
    { field: "bedCapacity", headerName: "Bed Capacity", flex: 1 },
    { field: "occupiedBeds", headerName: "Occupied Beds", flex: 1 },
    {
      field: "status",
      headerName: "Room Status",
      flex: 1.5,
      renderCell: (params) => {
        const row = params?.row;
        if (!row) return null;
        const { color, text, label } = getStatusLabel(row);
        return (
          <Box width="100%">
            <Chip
              label={label}
              sx={{
                backgroundColor: color,
                color: text,
                fontWeight: "bold",
                justifyContent: "flex-start",
              }}
              fullWidth
            />
          </Box>
        );
      },
    },
    { field: "roomRate", headerName: "Room Rate", flex: 1 },
    {
      field: "roomCategory",
      headerName: "Room Category",
      flex: 1.5,
      renderCell: (params) => {
        const { color, text } = getCategoryLabel(params.row.roomCategory);
        return (
          <Box width="100%">
            <Chip
              label={params.row.roomCategory}
              sx={{
                backgroundColor: color,
                color: text,
                fontWeight: "bold",
                justifyContent: "flex-start",
              }}
              fullWidth
            />
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => (
        <Box display="flex" flexDirection="row" gap={0.5}>
          <Tooltip title="Edit">
            <IconButton size="small" sx={{ color: "#4f46e5" }} onClick={() => handleEditClick(params)}>
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" sx={{ color: "#f43f5e" }} onClick={() => handleDeleteClick(params)}>
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
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
        <Typography variant="h6">Room Info</Typography>
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
          {/* Column Visibility */}
          <Tooltip title="Show/Hide Columns">
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <ViewColumn />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
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
          </Tooltip>
          {/* Add Room Button */}
          <Tooltip title="Add New Room">
            <IconButton onClick={() => setOpenRoom(true)}>
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
      {/* Data Table */}
      <DataGrid
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
        apiRef={apiRef}
        rows={filteredRooms}
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

      {/* Add Room Dialog */}
      <BookorEditRoomForm
        open={openAddRoom}
        onClose={() => setOpenRoom(false)}
        onSave={handleSave}
      />

      {/* Edit Room Dialog */}
      <BookorEditRoomForm
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onSave={handleSave}
        roomData={selectedRoom}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteRoomDialog
        open={deleteDialogOpen}
        room={selectedRoom}
        onCancel={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
      />

      {/* Snackbar for notifications */}
      <AlertBar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message={snackBarInfo?.message}
        severity={snackBarInfo?.severity}
        duration={3000}
      />
    </Box>
  );
}