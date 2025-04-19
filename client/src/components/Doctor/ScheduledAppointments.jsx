
import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  Checkbox,
  ListItemText,
  TextareaAutosize,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  AccessTime,
  Email,
  Phone,
  LocationOn,
  MoreVert,
} from "@mui/icons-material";

const testOptions = ["Blood Test", "X-Ray", "MRI", "ECG", "Urine Test"];

const patients = [
  {
    id: 1,
    name: "John D...",
    date: "02/25/2018",
    time: "09:00",
    email: "john@example.com",
    mobile: "1234567890",
    gender: "female",
    status: "Upcoming",
    address: "123 Elm St",
    disease: "Fever",
    lastVisit: "09/01/2024",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Jane S...",
    date: "10/02/2024",
    time: "09:00",
    email: "jane@example.com",
    mobile: "0987654321",
    gender: "male",
    status: "Completed",
    address: "456 Oak St",
    disease: "Flu",
    lastVisit: "08/15/2024",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
];

const genderColor = {
  male: "success",
  female: "secondary",
};

const statusColor = {
  Upcoming: "info",
  Completed: "success",
  Canceled: "error",
};

export default function AppointmentsTable() {
  const [open, setOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedTests, setSelectedTests] = useState([]);
  const [drugs, setDrugs] = useState("");
  const [treatment, setTreatment] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenDialog = (row) => {
    setSelectedPatient(row);
    setSelectedTests([]);
    setDrugs("");
    setTreatment("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTestChange = (event) => {
    setSelectedTests(event.target.value);
  };

  const handleSave = () => {
    console.log("Patient:", selectedPatient.name);
    console.log("Tests:", selectedTests);
    console.log("Drugs:", drugs);
    console.log("Treatment:", treatment);
    setOpen(false);
  };

  const columns = [
    {
      field: "name",
      headerName: "Patient Name",
      flex: 1.5,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          {/* <Avatar src={params.row.avatar} /> */}
          <Typography noWrap>{params.value}</Typography>
        </Box>
      ),
    },
    { field: "date", headerName: "Appointment Date", flex: 1 },
    {
      field: "time",
      headerName: "Time",
      flex: 0.7,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={0.5}>
          <AccessTime fontSize="small" />
          {params.value}
        </Box>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Email fontSize="small" color="error" />
          <Typography noWrap>{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: "mobile",
      headerName: "Mobile",
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Phone fontSize="small" color="success" />
          <Typography noWrap>{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 0.8,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={genderColor[params.value] || "default"}
          variant="outlined"
          size="small"
        />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={statusColor[params.value] || "default"}
          size="small"
        />
      ),
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1.5,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <LocationOn fontSize="small" color="primary" />
          <Typography noWrap>{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: "disease",
      headerName: "Disease",
      flex: 1,
    },
    // {
    //   field: "lastVisit",
    //   headerName: "Last Visit Date",
    //   flex: 1,
    // },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title="Prescribe Details">
          <IconButton onClick={() => handleOpenDialog(params.row)}>
            <MoreVert />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: "100%", p: 2 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Appointments
      </Typography>
      {/* <TextField
        variant="outlined"
        placeholder="Search"
        size="small"
        sx={{ mb: 2, width: 300 }}
      /> */}
      <TextField
  variant="outlined"
  placeholder="Search by name"
  size="small"
  sx={{ mb: 2, width: 300 }}
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>
      <DataGrid
        // rows={patients}
        rows={filteredPatients}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
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

      {/* Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Prescription for {selectedPatient?.name}</DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle2" gutterBottom>
            <strong>Disease:</strong> {selectedPatient?.disease}
          </Typography>

          <FormControl fullWidth margin="normal">
            <InputLabel>Tests</InputLabel>
            <Select
              multiple
              value={selectedTests}
              onChange={handleTestChange}
              input={<OutlinedInput label="Tests" />}
              renderValue={(selected) => selected.join(", ")}
            >
              {testOptions.map((test) => (
                <MenuItem key={test} value={test}>
                  <Checkbox checked={selectedTests.indexOf(test) > -1} />
                  <ListItemText primary={test} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography sx={{ mt: 2 }}>Drugs Prescribed</Typography>
          <TextareaAutosize
            placeholder="Enter drugs prescribed"
            minRows={2}
            style={{ width: "100%", marginTop: 4 }}
            value={drugs}
            onChange={(e) => setDrugs(e.target.value)}
          />

          <Typography sx={{ mt: 2 }}>Treatment Advice</Typography>
          <TextareaAutosize
            placeholder="Enter treatment details"
            minRows={3}
            style={{ width: "100%", marginTop: 4 }}
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}