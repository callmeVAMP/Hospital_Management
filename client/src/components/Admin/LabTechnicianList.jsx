
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box, Typography, IconButton, Tooltip, TextField, Menu, MenuItem, Checkbox,
  Snackbar, Alert
} from "@mui/material";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { Edit, Delete, Refresh, Download, Add, ViewColumn, Search as SearchIcon } from "@mui/icons-material";
import LabTechnicianForm from "./LabTechnicianForm";
import DeleteDialog from "./DeleteDialog";

export default function LabTechniciansTable() {
  const [labTechs, setLabTechs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [editingTech, setEditingTech] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [snackbarInfo, setSnackBarInfo] = useState({ message: '', severity: 'success' });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    id: true, name: true, gender: true, email: true, mobile: true, department: true
  });

  const apiRef = useGridApiRef();
  const open = Boolean(anchorEl);

  // Fetch Lab Technicians
  useEffect(() => {
    const fetchLabTechs = async () => {
      try {
        const res = await axios.get("http://localhost:8000/admin/all_lab_technicians");
        const mapped = res.data.map(item => ({
          id: item.id,
          name: item.name,
          address: item.address,
          mobile: item.mobile,
          gender: item.gender,
          email: item.email,
          department: item.department
        }));
        setLabTechs(mapped);
      } catch (error) {
        console.error("Error fetching lab technicians:", error);
      }
    };
    fetchLabTechs();
  }, []);

  const addLabTech = async (formData) => {
    try {
      const backendData = {
        HID: formData.id,
        HName: formData.name,
        HAddr: formData.address || "-",
        HPhNo: formData.phone || "-",
        HGender: formData.gender,
        Email: formData.email || "-",
        LabRno: formData.department
      };
  
      const response = await axios.post(
        "http://localhost:8000/admin/add_lab_technician", 
        backendData
      );
  
      if (response.data.success) {
        setLabTechs(prev => [...prev, {
          id: backendData.HID,
          name: backendData.HName,
          gender: backendData.HGender,
          email: backendData.Email,
          mobile: backendData.HPhNo,
          address: backendData.HAddr,
          department: backendData.LabRno
        }]);
        setSnackBarInfo({ message: "Lab Technician added!", severity: "success" });
      }
    } catch (error) {
      setSnackBarInfo({ message: "Error adding lab technician", severity: "error" });
    }
    setSnackbarOpen(true);
  };

  // Update Lab Technician
  const updateLabTech = async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/admin/update_lab_technician/${data.id}`,
        {
          HName: data.name,
          HAddr: data.address,
          HPhNo: data.mobile,
          HGender: data.gender,
          Email: data.email,
          LabRno: data.department
        }
      );
      if (response.data.success) {
        setLabTechs(prev => prev.map(lt => lt.id === data.id ? {...data} : lt));
        setSnackBarInfo({ message: "Lab Technician updated!", severity: "success" });
      }
    } catch (error) {
      setSnackBarInfo({ message: "Error updating lab technician", severity: "error" });
    }
    setSnackbarOpen(true);
  };

  // Fixed delete function
  const deleteLabTech = async () => {
    if (!deleteTarget) return;
    
    try {
      const response = await axios.delete(
        `http://localhost:8000/admin/delete_lab_technician/${deleteTarget.id}`
      );
      
      if (response.data.success) {
        setLabTechs(prev => prev.filter(lt => lt.id !== deleteTarget.id));
        setSnackBarInfo({ message: "Deleted successfully!", severity: "success" });
      }
    } catch (error) {
      setSnackBarInfo({ message: "Error deleting lab technician", severity: "error" });
    }
    setSnackbarOpen(true);
    setDeleteTarget(null);
  };

  const handleSave = async (data) => {
    if (editingTech) {
      await updateLabTech(data);
    } else {
      await addLabTech(data);
    }
    setEditingTech(null);
    setOpenForm(false);
  };

  const filteredTechs = labTechs.filter((t) =>
    t.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "gender", headerName: "Gender", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "mobile", headerName: "Mobile", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    {
      field: "actions", headerName: "Actions", flex: 1, sortable: false,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <Tooltip title="Edit">
            <IconButton onClick={() => {
              setEditingTech(params.row);
              setOpenForm(true);
            }} sx={{ color: "#0288d1" }}>
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => setDeleteTarget(params.row)} sx={{ color: "#e53935" }}>
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ];

  const deleteFields = [
    { key: "name", label: "Name" },
    { key: "mobile", label: "Mobile" },
    { key: "email", label: "Email" },
    { key: "department", label: "Department" },
  ];

  return (
    <Box sx={{ height: 600, width: "100%", p: 2 }}>
      <Box sx={{
        backgroundColor: "#fff3e0", p: 2,
        borderTopLeftRadius: 12, borderTopRightRadius: 12,
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <Typography variant="h6">Lab Technicians</Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Box sx={{ backgroundColor: "white", px: 2, py: 0.5, borderRadius: 1, display: "flex", gap: 1 }}>
            <SearchIcon fontSize="small" />
            <TextField
              variant="standard" placeholder="Search"
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
          <Tooltip title="Add Lab Technician">
            <IconButton onClick={() => {
              setEditingTech(null);
              setOpenForm(true);
            }}>
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
        rows={filteredTechs}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
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

      <LabTechnicianForm
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setEditingTech(null);
        }}
        onSave={handleSave}
        initialData={editingTech}
      />
      
      <DeleteDialog
        open={!!deleteTarget}
        title="Delete Lab Technician"
        data={deleteTarget}
        fields={deleteFields}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={deleteLabTech}
      />

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
    </Box>
  );
}
