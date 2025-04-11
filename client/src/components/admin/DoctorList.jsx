// import React, { useState } from 'react';
// import {
//   Box, Button, Typography, IconButton, Tooltip
// } from '@mui/material';
// import {
//   DataGrid
// } from '@mui/x-data-grid';
// import { Add, Edit, Delete } from '@mui/icons-material';
// import DoctorForm from './DoctorForm';

// const initialDoctors = [
//   {
//     id: 1,
//     name: 'Dr. Alice Smith',
//     department: 'Cardiology',
//     specialization: 'Heart Surgeon',
//     degree: 'MD',
//     mobile: '1234567890',
//     email: 'alice@example.com',
//     joiningDate: '2021-05-10',
//     experience: 10,
//     consultationFee: 200,
//     rating: 4.8,
//     availability: 'Morning',
//     clinicLocation: 'Building A, Room 101'
//   },
//   {
//     id: 2,
//     name: 'Dr. John Doe',
//     department: 'Neurology',
//     specialization: 'Neurosurgeon',
//     degree: 'MBBS, MS',
//     mobile: '9876543210',
//     email: 'john@example.com',
//     joiningDate: '2020-03-15',
//     experience: 8,
//     consultationFee: 250,
//     rating: 4.6,
//     availability: 'Evening',
//     clinicLocation: 'Building B, Room 203'
//   }
// ];

// const DoctorList = () => {
//   const [doctors, setDoctors] = useState(initialDoctors);
//   const [formOpen, setFormOpen] = useState(false);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);

//   const handleAddDoctor = () => {
//     setSelectedDoctor(null); // Add mode
//     setFormOpen(true);
//   };

//   const handleEditDoctor = (doctor) => {
//     setSelectedDoctor(doctor); // Edit mode
//     setFormOpen(true);
//   };

//   const handleSaveDoctor = (doctorData) => {
//     setDoctors(prev => {
//       if (doctorData.id) {
//         // Edit mode
//         return prev.map(doc => doc.id === doctorData.id ? doctorData : doc);
//       } else {
//         // Add mode
//         const newDoctor = {
//           ...doctorData,
//           id: prev.length ? Math.max(...prev.map(doc => doc.id)) + 1 : 1
//         };
//         return [...prev, newDoctor];
//       }
//     });
//   };

//   const handleDeleteDoctor = (id) => {
//     setDoctors(prev => prev.filter(doc => doc.id !== id));
//   };

//   const columns = [
//     { field: 'name', headerName: 'Name', flex: 1 },
//     { field: 'department', headerName: 'Department', flex: 1 },
//     { field: 'specialization', headerName: 'Specialization', flex: 1 },
//     { field: 'mobile', headerName: 'Mobile', flex: 1 },
//     { field: 'email', headerName: 'Email', flex: 1 },
//     { field: 'consultationFee', headerName: 'Fee', flex: 0.5, type: 'number' },
//     { field: 'rating', headerName: 'Rating', flex: 0.5, type: 'number' },
//     {
//       field: 'actions',
//       headerName: 'Actions',
//       flex: 0.7,
//       sortable: false,
//       renderCell: (params) => (
//         <>
//           <Tooltip title="Edit">
//             <IconButton color="primary" onClick={() => handleEditDoctor(params.row)}>
//               <Edit />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Delete">
//             <IconButton color="error" onClick={() => handleDeleteDoctor(params.row.id)}>
//               <Delete />
//             </IconButton>
//           </Tooltip>
//         </>
//       )
//     }
//   ];

//   return (
//     <Box sx={{ p: 3 }}>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography variant="h5">Doctor List</Typography>
//         <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleAddDoctor}>
//           Add Doctor
//         </Button>
//       </Box>

//       <DataGrid
//         rows={doctors}
//         columns={columns}
//         autoHeight
//         disableRowSelectionOnClick
//         pageSizeOptions={[5, 10]}
//       />

//       <DoctorForm
//         open={formOpen}
//         onClose={() => setFormOpen(false)}
//         onSave={handleSaveDoctor}
//         initialData={selectedDoctor}
//       />
//     </Box>
//   );
// };

// export default DoctorList;

import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Stack,
  Menu,
  MenuItem,
  TextField,
  Checkbox,
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
import DoctorForm from "./AddDoctor";

const initialDoctors = [
  {
    id: "1",
    name: "Dr. Alice",
    department: "Cardiology",
    specialization: "Heart Specialist",
    degree: "MD",
    mobile: "9876543210",
    email: "alice@example.com",
    joiningDate: "2022-01-10",
    experience: 10,
    consultationFee: 1000,
    rating: 4.5,
    availability: "Morning",
    clinicLocation: "Clinic A",
  },
];

export default function DoctorsTable() {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    name: true,
    department: true,
    specialization: true,
    degree: true,
    mobile: true,
    email: true,
    experience: true,
    consultationFee: true,
    rating: true,
    availability: true,
    clinicLocation: true,
  });

  const apiRef = useGridApiRef();
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSave = (data) => {
    setDoctors((prev) => {
      const exists = prev.find((d) => d.id === data.id);
      if (exists) {
        return prev.map((d) => (d.id === data.id ? data : d));
      }
      return [...prev, { ...data, id: Date.now().toString() }];
    });
    setEditingDoctor(null);
  };

  const filteredDoctors = doctors.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id) => {
    setDoctors((prev) => prev.filter((d) => d.id !== id));
  };

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "specialization", headerName: "Specialization", flex: 1 },
    { field: "degree", headerName: "Degree", flex: 1 },
    { field: "mobile", headerName: "Mobile", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "experience", headerName: "Experience", flex: 0.7 },
    { field: "consultationFee", headerName: "Fee", flex: 0.7 },
    { field: "rating", headerName: "Rating", flex: 0.7 },
    { field: "availability", headerName: "Availability", flex: 1 },
    { field: "clinicLocation", headerName: "Clinic", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.6,
      sortable: false,
      renderCell: (params) => (
        <Box display="flex" gap={0.5}>
          <Tooltip title="Edit">
            <IconButton
              size="small"
              onClick={() => {
                setEditingDoctor(params.row);
                setOpenForm(true);
              }}
              sx={{ color: "#0288d1" }}
            >
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              onClick={() => handleDelete(params.row.id)}
              sx={{ color: "#e53935" }}
            >
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
          backgroundColor: "#e8f5e9",
          p: 2,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">Doctors</Typography>
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
              placeholder="Search"
              InputProps={{ disableUnderline: true }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
            />
          </Box>
          <Tooltip title="Toggle Columns">
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
                  {columns.find((col) => col.field === field)?.headerName}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
          <Tooltip title="Add New Doctor">
            <IconButton
              onClick={() => {
                setEditingDoctor(null);
                setOpenForm(true);
              }}
            >
              <Add sx={{ color: "green" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Refresh">
            <IconButton onClick={() => console.log("Refreshed")}>
              <Refresh />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download CSV">
            <IconButton onClick={() => apiRef.current.exportDataAsCsv()}>
              <Download sx={{ color: "#3b82f6" }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <DataGrid
        apiRef={apiRef}
        rows={filteredDoctors}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 15]}
        pagination
        disableSelectionOnClick
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) =>
          setColumnVisibilityModel(newModel)
        }
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          mt: 1,
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f3f6f9",
            fontWeight: "bold",
          },
        }}
      />

      <DoctorForm
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setEditingDoctor(null);
        }}
        onSave={handleSave}
        initialData={editingDoctor}
      />
    </Box>
  );
}
