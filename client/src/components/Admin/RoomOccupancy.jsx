import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Tooltip,
  Stack,
  Menu,
  MenuItem,
  Checkbox,
  Chip,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
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

const allotments = [
  {
    id: 1,
    roomNo: "101",
    patientName: "John Doe",
    roomType: "Delux",
    bedNo: 1,
    admissionDate: "02/25/2018",
    gender: "male",
    mobile: "12345678...",
    doctor: "Dr. Jane Smith",
    status: "Discharged",
    amount: 15000,
  },
  {
    id: 2,
    roomNo: "102",
    patientName: "Alice Johnson",
    roomType: "Standard",
    bedNo: 5,
    admissionDate: "03/01/2018",
    gender: "female",
    mobile: "23456789...",
    doctor: "Dr. Mark Taylor",
    status: "Reserved",
    amount: 8000,
  },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function AllotmentListTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const apiRef = useGridApiRef();

  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    roomNo: true,
    patientName: true,
    roomType: true,
    bedNo: true,
    admissionDate: true,
    gender: true,
    mobile: true,
    doctor: true,
    status: true,
    amount: true,
  });

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const filteredRows = allotments.filter((row) =>
    row.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderLabel = (value, color, textColor) => (
    <Chip label={value} size="small" sx={{ backgroundColor: color, color: textColor }} />
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Available": return ["#d1fae5", "#065f46"];
      case "Discharged": return ["#ffe4b5", "#92400e"];
      case "Reserved": return ["#ede9fe", "#5b21b6"];
      case "Maintenance": return ["#fee2e2", "#991b1b"];
      default: return ["#f3f4f6", "#374151"];
    }
  };

  const getGenderColor = (gender) => gender === "male" ? ["#d1fae5", "#065f46"] : ["#ede9fe", "#5b21b6"];

  const getRoomTypeColor = (type) => type === "Delux" ? ["#fef9c3", "#92400e"] : ["#dbeafe", "#1e3a8a"];

  const columns = [
    { field: "roomNo", headerName: "Room No", flex: 1 },
    { field: "patientName", headerName: "Patient Name", flex: 1.5 },
    {
      field: "roomType",
      headerName: "Room Type",
      flex: 1,
      renderCell: (params) => {
        const [bg, text] = getRoomTypeColor(params.row.roomType);
        return renderLabel(params.row.roomType, bg, text);
      },
    },
    { field: "bedNo", headerName: "Bed No", flex: 1 },
    { field: "admissionDate", headerName: "Admission Date", flex: 1 },
    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
      renderCell: (params) => {
        const [bg, text] = getGenderColor(params.row.gender);
        return renderLabel(params.row.gender, bg, text);
      },
    },
    { field: "mobile", headerName: "Mobile", flex: 1.5 },
    { field: "doctor", headerName: "Doctor Assigned", flex: 1.5 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        const [bg, text] = getStatusColor(params.row.status);
        return renderLabel(params.row.status, bg, text);
      },
    },
    { field: "amount", headerName: "Amount Charged", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      sortable: false,
      renderCell: () => (
        <Box display="flex" flexDirection="row" gap={0.5}>
          <Tooltip title="Edit">
            <IconButton size="small" sx={{ color: "#4f46e5" }}>
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" sx={{ color: "#f43f5e" }}>
              <Delete fontSize="small" />
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
          backgroundColor: "#dbe3f4",
          p: 2,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">Allotment List</Typography>
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
          <Tooltip title="Show/Hide Columns">
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
                  {columns.find((c) => c.field === field)?.headerName}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
          <Tooltip title="Refresh">
            <IconButton>
              <Refresh />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download XLSX">
            <IconButton onClick={() => apiRef.current.exportDataAsCsv()}>
              <Download sx={{ color: "#3b82f6" }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <DataGrid
        apiRef={apiRef}
        rows={filteredRows}
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
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f3f6f9",
            fontWeight: "bold",
          },
        }}
      />
    </Box>
  );
}