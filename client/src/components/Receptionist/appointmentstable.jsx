import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  Edit,
  Delete,
  Phone,
  ViewColumn,
  Add,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";

export default function AppointmentTable() {
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [openFormDialog, setOpenFormDialog] = useState(false);

  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    PName: true,
    PPhNo: true,
    PGender: true,
    HName: true,
    Problem: true,
    actions: true,
  });

  

  useEffect(() => {
    axios
      .get("http://localhost:3000/appointment/all_appointment")
      .then((response) => {
        const dataWithIds = response.data.map((item, index) => ({
          id: index + 1,
          ...item,
        }));
        setAppointments(dataWithIds);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }, []);

  const filteredAppointments = appointments.filter((p) =>
    p.PName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [patientForm, setPatientForm] = useState({
    PName: "",
    PPhNo: "",
    PGender: "",
    HName: "",
    Problem: "",
  });
  
  const handleAddClick = () => {
    setSelectedPatient(null);
    setPatientForm({
      PName: "",
      PPhNo: "",
      PGender: "",
      HName: "",
      Problem: "",
    });
    setOpenFormDialog(true);
  };
  
  const handleEditClick = (patient) => {
    setSelectedPatient(patient);
    setPatientForm({
      PName: patient.PName,
      PPhNo: patient.PPhNo,
      PGender: patient.PGender,
      HName: patient.HName,
      Problem: patient.Problem,
    });
    setOpenFormDialog(true);
  };
  

  
  const handleSave = async (patientData) => {
    try {
      if (selectedPatient) {
        // Edit existing appointment
        const response = await axios.put(`http://localhost:3000/appointment/update_appointment/${selectedPatient.AppID}`, patientData);
        setAppointments(prev =>
          prev.map((p) =>
            p.AppID === selectedPatient.AppID ? { ...p, ...patientData } : p
          )
        );
      } else {
        // Add new appointment
        const response = await axios.post("http://localhost:3000/appointments", patientData);
        setAppointments(prev => [...prev, response.data]);
      }
  
      setOpenFormDialog(false);
      setSelectedPatient(null);
    } catch (error) {
      console.error("Error saving appointment:", error);
    }
  };
  
  const handleDeleteClick = async (id) => {
    console.log(id);
    try {
      await axios.delete(`http://localhost:3000/appointment/delete_appointment/${id}`);
      setAppointments(prev => prev.filter((p) => p.AppID !== id));
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };
  
  
  const handleCancel = () => {
    setOpenFormDialog(false);
    setSelectedPatient(null);
  };

  const columns = [
    { field: "PName", headerName: "Patient Name", flex: 1.5 },
    {
      field: "PPhNo",
      headerName: "Contact",
      flex: 1.2,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Phone fontSize="small" color="success" />
          <Typography noWrap>{params.row.PPhNo}</Typography>
        </Box>
      ),
    },
    { field: "PGender", headerName: "Gender", flex: 1 },
    { field: "HName", headerName: "Assigned Doctor", flex: 1.5 },
    { field: "Problem", headerName: "Problem Description", flex: 2 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.8,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <IconButton onClick={() => handleEditClick(params.row)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDeleteClick(params.row.AppID)}>
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: "100%", p: 2 }}>
      {/* Header */}
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
        <Typography variant="h6">Appointments</Typography>

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
          <Tooltip title="Add New">
            <IconButton onClick={handleAddClick}>
              <Add />
            </IconButton>
          </Tooltip>
          <Tooltip title="Show/Hide Columns">
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
        </Box>
      </Box>

      {/* DataGrid */}
      <DataGrid
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) =>
          setColumnVisibilityModel(newModel)
        }
        rows={filteredAppointments}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        getRowId={(row) => row.id}
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f3f6f9",
            fontWeight: "bold",
          },
        }}
      />

      {/* Dialog for Add/Edit */}
      <Dialog open={openFormDialog} onClose={handleCancel} fullWidth>
        <DialogTitle>{selectedPatient ? "Edit" : "Add"} Appointment</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Patient Name"
            fullWidth
            value={selectedPatient?.PName || ""}
            onChange={(e) =>
              setSelectedPatient((prev) => ({ ...prev, PName: e.target.value }))
            }
          />
          <TextField
            margin="dense"
            label="Phone Number"
            fullWidth
            value={selectedPatient?.PPhNo || ""}
            onChange={(e) =>
              setSelectedPatient((prev) => ({ ...prev, PPhNo: e.target.value }))
            }
          />
          <TextField
            margin="dense"
            label="Gender"
            fullWidth
            value={selectedPatient?.PGender || ""}
            onChange={(e) =>
              setSelectedPatient((prev) => ({ ...prev, PGender: e.target.value }))
            }
          />
          <TextField
            margin="dense"
            label="Assigned Doctor"
            fullWidth
            value={selectedPatient?.HName || ""}
            onChange={(e) =>
              setSelectedPatient((prev) => ({ ...prev, HName: e.target.value }))
            }
          />
          <TextField
            margin="dense"
            label="Problem"
            fullWidth
            value={selectedPatient?.Problem || ""}
            onChange={(e) =>
              setSelectedPatient((prev) => ({ ...prev, Problem: e.target.value }))
            }
          />
        </DialogContent>
        <DialogActions>
  <Button onClick={handleCancel}>Cancel</Button>
  <Button onClick={() => handleSave(patientForm)}>Save</Button>
</DialogActions>

      </Dialog>
    </Box>
  );
}


