
import React, { useState, useEffect } from "react";
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
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from "@mui/material";
import {
  Edit,
  Delete,
  Refresh,
  Add,
  ViewColumn,
  Search as SearchIcon,
  Phone,
} from "@mui/icons-material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  useGridApiRef,
} from "@mui/x-data-grid";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function PatientEnquiry() {
  const [patients, setPatients] = useState([]);
  const [tab, setTab] = useState("Current");
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const apiRef = useGridApiRef();

  const [dischargeDialogOpen, setDischargeDialogOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  useEffect(() => {
    const endpoint =
      tab === "Current"
        ? "http://localhost:8000/occupancy/current"
        : "http://localhost:8000/occupancy/discharged";

    axios
      .get(endpoint)
      .then((res) => {
        const transformed = res.data.map((p, idx) => ({
          id: idx + 1,
          RNo: p.RNo,
          BedID: p.BedID,
          PName: p.PName,
          PPhNo: p.PPhNo,
          TreatmentDesc: p.TreatmentDesc,
          StDateTime: p.StDateTime.split("T")[0],
          EndDateTime: p.EndDateTime ? p.EndDateTime.split("T")[0] : "",
          status: p.EndDateTime ? "Discharged" : "Current",
        }));
        setPatients(transformed);
      })
      .catch((err) => {
        console.error("Error fetching patients:", err);
      });
  }, [tab]);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleDischargeClick = (id) => {
    setSelectedPatientId(id);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDischarge = () => {
    const patientToDischarge = patients.find(p => p.id === selectedPatientId);
    if (!patientToDischarge) return;
  
    const { RNo, PName, PPhNo } = patientToDischarge;
      const formattedDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  axios
    .post(`http://localhost:8000/occupancy/discharge_patient/`, {
      PName,
      PPhNo,
      EndDateTime: formattedDate
    })
      .then(() => {
        // Remove patient from current list after successful API call
        setPatients((prev) => prev.filter((p) => p.id !== selectedPatientId));
        setConfirmDialogOpen(false);
        setSelectedPatientId(null);
      })
      .catch((err) => {
        console.error("Error discharging patient:", err);
        setConfirmDialogOpen(false);
        setSelectedPatientId(null);
      });
  };
  
  const handleCancelDischarge = () => {
    setConfirmDialogOpen(false);
    setSelectedPatientId(null);
  };

  const filteredPatients = patients.filter((p) =>
    p.PName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { field: "RNo", headerName: "Room No", flex: 1 },
    { field: "BedID", headerName: "Bed ID", flex: 1 },
    { field: "PName", headerName: "Patient Name", flex: 1.5 },
    {
      field: "PPhNo",
      headerName: "Mobile",
      flex: 1.5,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Phone fontSize="small" color="success" />
          <Typography noWrap>{params.row.PPhNo}</Typography>
        </Box>
      ),
    },
    { field: "TreatmentDesc", headerName: "Treatment", flex: 2 },
    { field: "StDateTime", headerName: "Start Date", flex: 1.2 },
    {
      field: "EndDateTime",
      headerName: "End Date",
      flex: 1.2,
      renderCell: (params) =>
        params.row.status === "Discharged" ? params.row.EndDateTime : "",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          color={params.row.status === "Current" ? "error" : "success"}
          onClick={() =>
            params.row.status === "Current" && handleDischargeClick(params.row.id)
          }
          disabled={params.row.status === "Discharged"}
        >
          {params.row.status === "Current" ? "Discharge" : "Discharged"}
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ height: 650, width: "100%", p: 2 }}>
      <Box
        sx={{
          backgroundColor: "#e0f7fa",
          p: 2,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Patient Enquiries</Typography>
          <TextField
            size="small"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1 }} />,
            }}
          />
        </Box>
      </Box>

      <Tabs
        value={tab}
        onChange={(e, newValue) => setTab(newValue)}
        sx={{ mb: 2 }}
      >
        <Tab label="Current" value="Current" />
        <Tab label="Discharged" value="Discharged" />
      </Tabs>

      <DataGrid
        rows={filteredPatients}
        columns={columns}
        apiRef={apiRef}
        getRowId={(row) => row.id}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
        components={{ Toolbar: CustomToolbar }}
        checkboxSelection
        disableRowSelectionOnClick
      />

      <Dialog open={confirmDialogOpen} onClose={handleCancelDischarge}>
        <DialogTitle>Confirm Discharge</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to discharge this patient?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDischarge}>Cancel</Button>
          <Button onClick={handleConfirmDischarge} color="error">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
