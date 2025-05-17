import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  TextField,
  Menu,
  MenuItem,
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
  History as HistoryIcon,
} from "@mui/icons-material";
import NurseForm from "./NurseForm";
import DeleteDialog from "./DeleteDialog";
import NurseHistoryDialog from "./NurseHistory";
import axios from "axios";

export default function NurseList() {
  const [nurses, setNurses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [editingNurse, setEditingNurse] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [viewingNurse, setViewingNurse] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarInfo, setSnackBarInfo] = useState({ message: '', severity: 'success' });

  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    id: true,
    name: true,
    gender: true,
    phone: true,
    address: true,
    email: true
  });

  const apiRef = useGridApiRef();
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // --- Fetch nurses from backend ---
  useEffect(() => {
    axios.get("http://localhost:8000/admin/all_nurses")
      .then(res => {
        setNurses(res.data.map(n => ({
          id: n.NurseID,
          name: n.NurseName,
          address: n.Address,
          phone: n.PhoneNo,
          gender: n.Gender,
          email: n.Email || "",
        })));
        console.log(res.data)
        
      })
      .catch(err => {
        setSnackBarInfo({ message: 'Failed to fetch nurses', severity: 'error' });
        setSnackbarOpen(true);
      });
  }, []);

  // --- Add or Update Nurse ---
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
      if (editingNurse) {
        // Update existing nurse
        await axios.put(`http://localhost:8000/admin/update_nurse/${data.id}`, backendData);
        setNurses(prev => prev.map(n => n.id === data.id ? { ...data } : n));
        setSnackBarInfo({ message: 'Updated Nurse Information Successfully', severity: 'success' });
      } else {
        // Add new nurse
        const response = await axios.post("http://localhost:8000/admin/add_nurse", backendData);
        if (response.data.success) {
          const newNurse = {
            id: backendData.HID,
            name: backendData.HName,
            gender: backendData.HGender,
            phone: backendData.HPhNo,
            email: backendData.Email,
            address: backendData.HAddr,
          };
          setNurses(prev => [...prev, newNurse]);
          setSnackBarInfo({ message: 'Added Nurse Information Successfully', severity: 'success' });
        } else {
          throw new Error("Backend reported failure");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setSnackBarInfo({ message: `Failed: ${error.response?.data || error.message}`, severity: 'error' });
    }
    setSnackbarOpen(true);
    setEditingNurse(null);
    setOpenForm(false);
  };

  // --- Delete Nurse ---
  const handleDelete = async () => {
    if (deleteTarget) {
      try {
        await axios.delete(`http://localhost:8000/admin/delete_nurse/${deleteTarget.id}`);
        setNurses(prev => prev.filter(n => n.id !== deleteTarget.id));
        setSnackBarInfo({ message: 'Deleted Nurse Successfully', severity: 'success' });
        setShowSnackbar(true);
      } catch (err) {
        setSnackBarInfo({ message: 'Failed to delete nurse', severity: 'error' });
        setSnackbarOpen(true);
      }
      setDeleteTarget(null);
    }
  };

  const handleViewHistory = (nurse) => setViewingNurse(nurse);

  const filteredNurses = nurses.filter((n) =>
    n.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderLabel = (value, color, textColor) => (
    <Chip label={value} size="small" sx={{ backgroundColor: color, color: textColor }} />
  );

  const getGenderColor = (gender) => gender === "Male" ? ["#d0ebff", "#1971c2"] : ["#ffe0f0", "#c2255c"];

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "gender", headerName: "Gender", flex: 1, 
      renderCell: (params) => {
        const [bg, text] = getGenderColor(params.row.gender);
        return renderLabel(params.row.gender, bg, text);
      },
    },
    { field: "phone", headerName: "Phone Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "address", headerName: "Address", flex: 2 },
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
                setEditingNurse(params.row);
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
          <Tooltip title="View History">
            <IconButton
              size="small"
              onClick={() => handleViewHistory(params.row)}
              sx={{ color: "#6d4c41" }}
            >
              <HistoryIcon fontSize="small" />
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
          backgroundColor: "#fff3e0",
          p: 2,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">Nurses</Typography>
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
          <Tooltip title="Add New Nurse">
            <IconButton
              onClick={() => {
                setEditingNurse(null);
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
        rows={filteredNurses}
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

      <NurseForm
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setEditingNurse(null);
        }}
        onSave={handleSave}
        initialData={editingNurse}
      />

      <DeleteDialog
        open={!!deleteTarget}
        title="Are you sure you want to delete?"
        data={deleteTarget}
        fields={[
          { key: "name", label: "Name" },
          { key: "phone", label: "Phone Number" },
          { key: "address", label: "Address" },
        ]}
        onClose={() => setDeleteTarget(null)}
        onDelete={handleDelete}
      />

      <NurseHistoryDialog
        open={!!viewingNurse}
        onClose={() => setViewingNurse(null)}
        nurse={viewingNurse}
      />

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
