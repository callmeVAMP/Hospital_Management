import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box, Typography, IconButton, Tooltip, TextField, Menu, MenuItem, Checkbox,
  Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions,
  Button, List, ListItem, ListItemText, Divider, Chip
} from "@mui/material";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import {
  Edit, Delete, Refresh, Download, Add, ViewColumn, Search as SearchIcon, History
} from "@mui/icons-material";
import DoctorForm from "./DoctorForm";
import DeleteDialog from "./DeleteDialog";
import { useNavigate } from "react-router-dom";

export default function DoctorsTable() {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarInfo, setSnackBarInfo] = useState({ message: '', severity: 'success' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    id: true, name: true, gender: true, department: true, specialization: true,
    degree: true, mobile: true, email: true, experience: true, joiningDate: true,
    consultationFee: true, availability: true, clinicLocation: true,
  });

  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const doctorHistory = [
    { date: "2023-02-12", procedure: "Angioplasty", patient: "John Doe" },
    { date: "2023-04-05", procedure: "Bypass Surgery", patient: "Mary Smith" },
  ];

  const apiRef = useGridApiRef();
  const open = Boolean(anchorEl);
  const navigate=useNavigate()

  // Fetch doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      console.log("fetching");
      try {
        console.log("fetching_2")
        const response = await axios.get("http://localhost:8000/admin/doctor_profiles");
        console.log("res ",response)
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, [navigate]);

  const addDoctor = async (formData) => {
    try {
      // Transform frontend field names to backend expected names
      const backendData = {
        HID: formData.id,
        HName: formData.name,
        HAddr: formData.address || "-",
        HPhNo: formData.mobile || "-",
        HGender: formData.gender,
        Specialisation: formData.specialization,
        CabinNo: formData.clinicLocation || "-"
      };
      
      console.log("Sending to backend:", backendData);
      
      const response = await axios.post("http://localhost:8000/admin/add_doctor", backendData);
      
      if (response.data.success) {
        // Add to local state with frontend field names
        const newDoctor = {
          id: backendData.HID,
          name: backendData.HName,
          gender: backendData.HGender,
          department: formData.department || "-",
          specialization: backendData.Specialisation,
          degree: formData.degree || "-",
          mobile: backendData.HPhNo,
          email: formData.email || "-",
          joiningDate: formData.joiningDate || "-",
          experience: "-",
          address: backendData.HAddr,
          consultationFee: formData.consultationFee || "-",
          availability: formData.availability || "-",
          clinicLocation: backendData.CabinNo
        };
        
        setDoctors(prev => [...prev, newDoctor]);
        setSnackBarInfo({ message: 'Doctor added successfully!', severity: 'success' });
      } else {
        throw new Error("Backend reported failure");
      }
    } catch (error) {
      console.error("Add doctor error:", error);
      setSnackBarInfo({ message: `Failed: ${error.response?.data || error.message}`, severity: 'error' });
    }
    setSnackbarOpen(true);
  };
  
  const updateDoctor = async (doctorData) => {
    try {
      // Transform to match backend field expectations
      const backendData = {
        HName: doctorData.name,
        HAddr: doctorData.address || "-",
        HPhNo: doctorData.mobile || "-",
        HGender: doctorData.gender,
        Specialisation: doctorData.specialization,
        CabinNo: doctorData.clinicLocation || "-"
      };
      
      const response = await axios.put(`http://localhost:8000/admin/update_doctor/${doctorData.id}`, backendData);
      
      if (response.data.success) {
        setDoctors(prev => prev.map(doc => doc.id === doctorData.id ? doctorData : doc));
        setSnackBarInfo({ message: 'Doctor updated successfully!', severity: 'success' });
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      console.error("Update doctor error:", error.response?.data || error.message);
      setSnackBarInfo({ message: 'Failed to update doctor', severity: 'error' });
    }
    setSnackbarOpen(true);
  };
  
  const deleteDoctor = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/admin/delete_doctor/${id}`);
      
      if (response.data.success) {
        setDoctors(prev => prev.filter(d => d.id !== id));
        setSnackBarInfo({ message: 'Doctor deleted successfully!', severity: 'success' });
      } else {
        throw new Error("Delete failed");
      }
    } catch (error) {
      console.error("Delete doctor error:", error.response?.data || error.message);
      setSnackBarInfo({ message: 'Failed to delete doctor', severity: 'error' });
    }
    setSnackbarOpen(true);
  };

  const handleSave = async (data) => {
    console.log("Form data received:", data);
    
    if (data.id && editingDoctor) {
      await updateDoctor(data);
    } else {
      await addDoctor(data);
    }
    setEditingDoctor(null);
    setOpenForm(false);
  };

  const confirmDeleteDoctor = async () => {
    await deleteDoctor(doctorToDelete?.id);
    setDeleteDialogOpen(false);
    setDoctorToDelete(null);
  };

  const filteredDoctors = doctors.filter((d) =>
    d.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getGenderColor = gender => gender === "Male" ? ["#d0ebff", "#1971c2"] : ["#ffe0f0", "#c2255c"];
  const renderLabel = (value, color, textColor) => (
    <Chip label={value} size="small" sx={{ backgroundColor: color, color: textColor }} />
  );

  const fieldsToDisplay = [
    { key: "name", label: "Name" },
    { key: "department", label: "Department" },
    { key: "specialization", label: "Specialization" },
    { key: "mobile", label: "Mobile" },
    { key: "email", label: "Email" },
  ];

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "gender", headerName: "Gender", flex: 1,
      renderCell: (params) => {
        const [bg, text] = getGenderColor(params.row.gender);
        return renderLabel(params.row.gender, bg, text);
      },
    },
    // { field: "department", headerName: "Department", flex: 1 },
    { field: "specialization", headerName: "Specialization", flex: 1 },
    // { field: "degree", headerName: "Degree", flex: 1 },
    { field: "mobile", headerName: "Mobile", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    // { field: "joiningDate", headerName: "Joining Date", flex: 1 },
    // { field: "consultationFee", headerName: "Fee", flex: 0.7 },
    // { field: "availability", headerName: "Availability", flex: 1 },
    { field: "clinicLocation", headerName: "Clinic", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.9,
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
              onClick={() => {
                setDoctorToDelete(params.row);
                setDeleteDialogOpen(true);
              }}
              sx={{ color: "#e53935" }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="View History">
            <IconButton
              size="small"
              onClick={() => {
                setSelectedDoctor(params.row);
                setHistoryModalOpen(true);
              }}
              sx={{ color: "#6a1b9a" }}
            >
              <History fontSize="small" />
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
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <ViewColumn />
            </IconButton>
          </Tooltip>
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
            <IconButton onClick={() => window.location.reload()}>
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

      <DeleteDialog
        open={deleteDialogOpen}
        title="Are you sure you want to delete this doctor?"
        data={doctorToDelete}
        fields={fieldsToDisplay}
        onCancel={() => {
          setDeleteDialogOpen(false);
          setDoctorToDelete(null);
        }}
        onConfirm={confirmDeleteDoctor}
      />

      {/* Snackbar for ADD / UPDATE / DELETE */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarInfo.severity} variant="filled">
          {snackbarInfo.message}
        </Alert>
      </Snackbar>

      {/* Doctor History Modal */}
      <Dialog open={historyModalOpen} onClose={() => setHistoryModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Operation History for {selectedDoctor?.name}
        </DialogTitle>
        <DialogContent dividers>
          <List>
            {doctorHistory.map((entry, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText
                    primary={entry.procedure}
                    secondary={`Date: ${entry.date} — Patient: ${entry.patient}`}
                  />
                </ListItem>
                {index < doctorHistory.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHistoryModalOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
