import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  TextField,
  Checkbox,
  Snackbar,
  Alert,
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
import ReceptionistForm from "./ReceptionistForm";
import DeleteDialog from "./DeleteDialog";
import axios from "axios";

export default function ReceptionistsList() {
  const [receptionists, setReceptionists] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [editingReceptionist, setEditingReceptionist] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarInfo, setSnackbarInfo] = useState({ message: "", severity: "success" });
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    id: true,
    name: true,
    gender: true,
    phone: true,
    email: true,
    address: true,
  });

  const apiRef = useGridApiRef();
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // --- Fetch receptionists from backend ---
  useEffect(() => {
    axios.get("http://localhost:8000/admin/all_receptionists")
      .then(res => {
        setReceptionists(res.data.map(r => ({
          id: r.ReceptionistID,
          name: r.Name,
          address: r.Address,
          phone: r.PhoneNo,
          gender: r.Gender,
          email: r.Email || "",
        })));
      })
      .catch(() => {
        setSnackbarInfo({ message: "Failed to fetch receptionists", severity: "error" });
        setSnackbarOpen(true);
      });
  }, []);

  // --- Add or Update Receptionist ---
  const handleSave = async (data) => {
    const backendData = {
      HID: data.id,
      HName: data.name,
      HAddr: data.address || "-",
      HPhNo: data.phone || "-",
      HGender: data.gender,
      Email: data.email || "-",
    };

    try {
      if (editingReceptionist) {
        // Update existing receptionist
        await axios.put(`http://localhost:8000/admin/update_receptionist/${data.id}`, backendData);
        setReceptionists(prev => prev.map(r => r.id === data.id ? { ...data } : r));
        setSnackbarInfo({ message: "Receptionist updated successfully", severity: "success" });
      } else {
        // Add new receptionist
        const response = await axios.post("http://localhost:8000/admin/add_receptionist", backendData);
        if (response.data.success) {
          const newRecep = {
            id: backendData.HID,
            name: backendData.HName,
            gender: backendData.HGender,
            phone: backendData.HPhNo,
            email: backendData.Email,
            address: backendData.HAddr,
          };
          setReceptionists(prev => [...prev, newRecep]);
          setSnackbarInfo({ message: "Receptionist added successfully", severity: "success" });
        } else {
          throw new Error("Backend reported failure");
        }
      }
    } catch (error) {
      setSnackbarInfo({ message: `Failed: ${error.response?.data || error.message}`, severity: "error" });
    }
    setSnackbarOpen(true);
    setEditingReceptionist(null);
    setOpenForm(false);
  };

  // --- Delete Receptionist ---
  const handleDelete = async () => {
    if (deleteTarget) {
      try {
        await axios.delete(`http://localhost:8000/admin/delete_receptionist/${deleteTarget.id}`);
        setReceptionists(prev => prev.filter(r => r.id !== deleteTarget.id));
        setSnackbarInfo({ message: "Receptionist deleted successfully", severity: "success" });
      } catch (err) {
        setSnackbarInfo({ message: "Failed to delete receptionist", severity: "error" });
      }
      setSnackbarOpen(true);
      setDeleteTarget(null);
    }
  };

  const renderLabel = (value, color, textColor) => (
    <Chip label={value} size="small" sx={{ backgroundColor: color, color: textColor }} />
  );
  const getGenderColor = (gender) =>
    gender === "male" ? ["#d0ebff", "#1971c2"] : ["#ffe0f0", "#c2255c"];

  const filteredReceptionists = receptionists.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
      renderCell: (params) => {
        const [bg, text] = getGenderColor(params.row.gender);
        return renderLabel(params.row.gender, bg, text);
      },
    },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box display="flex" gap={0.5}>
          <Tooltip title="Edit">
            <IconButton
              size="small"
              onClick={() => {
                setEditingReceptionist(params.row);
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
              onClick={() => setDeleteTarget(params.row)}
              sx={{ color: "#e53935" }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const deleteFields = [
    { key: "name", label: "Name" },
    { key: "phone", label: "Phone" },
    { key: "email", label: "Email" },
    { key: "address", label: "Address" },
  ];

  return (
    <Box sx={{ height: 600, width: "100%", p: 2 }}>
      {/* Header Bar */}
      <Box
        sx={{
          backgroundColor: "#f0f4ff",
          p: 2,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">Receptionists</Typography>
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
          <Tooltip title="Add New Receptionist">
            <IconButton
              onClick={() => {
                setEditingReceptionist(null);
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

      {/* Table */}
      <DataGrid
        apiRef={apiRef}
        rows={filteredReceptionists}
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

      {/* Forms and Dialogs */}
      <ReceptionistForm
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setEditingReceptionist(null);
        }}
        onSuccess={handleSave}
        initialData={editingReceptionist}
      />

      <DeleteDialog
        open={!!deleteTarget}
        title="Are you sure you want to delete?"
        data={deleteTarget}
        fields={deleteFields}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarInfo.severity}
          variant="filled"
        >
          {snackbarInfo.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

