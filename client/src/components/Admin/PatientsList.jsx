import React, { useState } from "react";
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
import PatientForm from "./PatientForm";
import DeleteDialog from "./DeleteDialog";

const initialPatients = [
  {
    id: "1",
    name: "John Doe",
    gender: "male",
    phone: "9876543210",
    email: "john@example.com",
    address: "123 Main St",
  },
  {
    id: "2",
    name: "Jane Smith",
    gender: "female",
    phone: "1234567890",
    email: "jane@example.com",
    address: "456 Maple Ave",
  },
];

export default function PatientsList() {
  const [patients, setPatients] = useState(initialPatients);
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    id: true,
    name: true,
    gender: true,
    phone: true,
    email: true,
    address: true,
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [updateSnackbarOpen, setUpdateSnackbarOpen] = useState(false);

  const apiRef = useGridApiRef();
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSave = (data) => {
    setPatients((prev) => {
      const exists = prev.find((p) => p.id === data.id);
      if (exists) {
        setUpdateSnackbarOpen(true); // <-- Trigger update snackbar
        return prev.map((p) => (p.id === data.id ? data : p));
      }
      return [...prev, data];
    });
    setEditingPatient(null);
  };

  const renderLabel = (value, color, textColor) => (
    <Chip label={value} size="small" sx={{ backgroundColor: color, color: textColor }} />
  );

  const getGenderColor = (gender) =>
    gender === "male" ? ["#d1fae5", "#065f46"] : ["#ede9fe", "#5b21b6"];

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = () => {
    setPatients((prev) => prev.filter((p) => p.id !== patientToDelete?.id));
    setDeleteDialogOpen(false);
    setSnackbarOpen(true);
  };

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
      flex: 0.5,
      sortable: false,
      renderCell: (params) => (
        <Box display="flex" gap={0.5}>
          <Tooltip title="Edit">
            <IconButton
              size="small"
              onClick={() => {
                setEditingPatient(params.row);
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
                setPatientToDelete(params.row);
                setDeleteDialogOpen(true);
              }}
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
    { field: "id", headerName: "ID", flex: 1 },
    { key: "name", label: "Name", flex: 1 },
    {
      key: "gender",
      label: "Gender",
      flex: 1,
    },
    { key: "phone", label: "Phone", flex: 1 },
    { key: "email", label: "Email", flex: 1 },
    { key: "address", label: "Address", flex: 1 },
  ];

  return (
    <Box sx={{ height: 600, width: "100%", p: 2 }}>
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
        <Typography variant="h6">Patients</Typography>
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
          <Tooltip title="Add New Patient">
            <IconButton
              onClick={() => {
                setEditingPatient(null);
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
        rows={filteredPatients}
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

      <PatientForm
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setEditingPatient(null);
        }}
        onSave={handleSave}
        initialData={editingPatient}
      />

      <DeleteDialog
        open={deleteDialogOpen}
        data={patientToDelete}
        fields={deleteFields}
        onCancel={() => {
          setDeleteDialogOpen(false);
          setPatientToDelete(null);
        }}
        onConfirm={handleDelete}
        title="Are you sure you want to delete this patient?"
      />

      {/* Delete Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Delete successful!
        </Alert>
      </Snackbar>

      {/* Update Snackbar */}
      <Snackbar
        open={updateSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setUpdateSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setUpdateSnackbarOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Update successful!
        </Alert>
      </Snackbar>
    </Box>
  );
}
