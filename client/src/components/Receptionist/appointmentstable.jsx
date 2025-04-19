
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  Menu,
  MenuItem,
  Checkbox
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  Add,
  Edit,
  Delete,
  Phone,
  Search as SearchIcon,
  ViewColumn
} from "@mui/icons-material";
import AppointmentForm from "./appointmentform"; // your updated form

const initialPatients = [
  {
    id: 1,
    patientName: "John Doe",
    phone: "9876543210",
    gender: "Male",
    doctor: "Dr. Smith",
    problem: "Fever and body pain",
    priority: "Normal",
  },
  {
    id: 2,
    patientName: "Aarav Sharma",
    phone: "9123456789",
    gender: "Male",
    doctor: "Dr. Johnson",
    problem: "Cough and cold",
    priority: "Emergency",
  },
];

export default function AppointmentTable() {
  const [patients, setPatients] = useState(initialPatients);
  const [searchQuery, setSearchQuery] = useState("");
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    patientName: true,
    phone: true,
    gender: true,
    doctor: true,
    problem: true,
    priority: true,
    actions: true
  });

  const handleAddClick = () => {
    setSelectedPatient(null);
    setOpenFormDialog(true);
  };

  const handleEditClick = (patient) => {
    setSelectedPatient(patient);
    setOpenFormDialog(true);
  };

  const handleDeleteClick = (patientId) => {
    setPatients(patients.filter(p => p.id !== patientId));
  };

  const handleSave = (patientData) => {
    if (selectedPatient) {
      // Edit existing patient
      setPatients(prevPatients => 
        prevPatients.map(p => p.id === selectedPatient.id ? { ...p, ...patientData } : p)
      );
    } else {
      // Add new patient
      const newId = patients.length > 0 ? Math.max(...patients.map(p => p.id)) + 1 : 1;
      setPatients(prevPatients => [...prevPatients, { id: newId, ...patientData }]);
    }
    
    setOpenFormDialog(false);
  };

  const handleCancel = () => {
    setOpenFormDialog(false);
    setSelectedPatient(null);
  };

  const filteredPatients = patients.filter((p) =>
    p.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { field: "patientName", headerName: "Patient Name", flex: 1.5 },
    {
      field: "phone",
      headerName: "Contact",
      flex: 1.2,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Phone fontSize="small" color="success" />
          <Typography noWrap>{params.row.phone}</Typography>
        </Box>
      ),
    },
    { field: "gender", headerName: "Gender", flex: 0.8 },
    { field: "doctor", headerName: "Assigned Doctor", flex: 1.2 },
    { field: "problem", headerName: "Problem Description", flex: 2 },
    { field: "priority", headerName: "Priority", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.8,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <IconButton onClick={() => handleEditClick(params.row)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDeleteClick(params.row.id)}>
            <Delete />
          </IconButton>
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
        <Typography variant="h6">Patients</Typography>

        <Box display="flex" alignItems="center" gap={2}>
          
          <TextField
            variant="standard"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            sx={{ backgroundColor: "white", px: 1, borderRadius: 1 }}
            InputProps={{ startAdornment: <SearchIcon fontSize="small" /> }}
          />
          

          <Tooltip title="Add New Patient">
            <IconButton onClick={handleAddClick}>
              <Add sx={{ color: "green" }} />
            </IconButton>
          </Tooltip>
          
          
          <Tooltip title="Show/Hide Columns">
          <Tooltip>
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
                <Typography>{columns.find((c) => c.field === field)?.headerName}</Typography>
              </MenuItem>
            ))}
          </Menu>
          </Tooltip>
        </Box>
      </Box>

      <DataGrid
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) =>
          setColumnVisibilityModel(newModel)
        }
        rows={filteredPatients}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
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

      {/* Dialog for Adding/Editing Patient */}
      <Dialog 
        open={openFormDialog} 
        onClose={handleCancel} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          {selectedPatient ? "Edit Patient" : "Add New Patient"}
        </DialogTitle>
        <DialogContent dividers>
          {openFormDialog && (
            <AppointmentForm
              initialData={selectedPatient || {}}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}