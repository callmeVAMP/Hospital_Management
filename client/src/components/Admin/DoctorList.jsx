import React, { useState } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
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
  History,
} from "@mui/icons-material";
import DoctorForm from "./DoctorForm";
import DeleteDialog from "./DeleteDialog"; // adjust path if needed

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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
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

  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const doctorHistory = [
    { date: "2023-02-12", procedure: "Angioplasty", patient: "John Doe" },
    { date: "2023-04-05", procedure: "Bypass Surgery", patient: "Mary Smith" },
  ];

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

  const confirmDeleteDoctor = () => {
    setDoctors((prev) => prev.filter((d) => d.id !== doctorToDelete?.id));
    setDeleteDialogOpen(false);
    setDoctorToDelete(null);
    setShowSnackbar(true);
  };

  const fieldsToDisplay = [
    { key: "name", label: "Name" },
    { key: "department", label: "Department" },
    { key: "specialization", label: "Specialization" },
    { key: "mobile", label: "Mobile" },
    { key: "email", label: "Email" },
  ];

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "specialization", headerName: "Specialization", flex: 1 },
    { field: "degree", headerName: "Degree", flex: 1 },
    { field: "mobile", headerName: "Mobile", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "consultationFee", headerName: "Fee", flex: 0.7 },
    { field: "availability", headerName: "Availability", flex: 1 },
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

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity="error"
          variant="filled"
        >
          Delete successful!
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
