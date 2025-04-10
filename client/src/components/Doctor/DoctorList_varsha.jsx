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
} from "@mui/material";
import { DataGrid,GridToolbar, GridToolbarContainer, GridToolbarExport, useGridApiRef } from "@mui/x-data-grid";
import {
  Email,
  Phone,
  Edit,
  Delete,
  Refresh,
  Download,
  Add,
  ViewColumn,
  Search as SearchIcon,
} from "@mui/icons-material";
import DoctorForm from "./AddDoctor";

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah ...",
    specialization: "Dental",
    availability: "Tuesday to Saturday",
    mobile: "9876543...",
    email: "sarah.s...",
    degree: "BHMS",
    experience: 8,
    fee: 300,
    rating: 4.8,
    clinic: "Smile Dental...",
  },
  {
    id: 2,
    name: "Dr. Rajesh ...",
    specialization: "Cholera",
    availability: "Monday to Tuesday",
    mobile: "1122334...",
    email: "rajesh@...",
    degree: "MBBS, MD",
    experience: 10,
    fee: 400,
    rating: 4.6,
    clinic: "Health Care ...",
  },
  // More doctor entries here...
];

function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

export default function DoctorsTable() {
  const [openAddDoctor, setOpenDoctor] = useState(false);

  const handleSave = (data) => {
    console.log('Doctor Data:', data);
  };


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const [searchQuery, setSearchQuery] = useState("");
  const apiRef = useGridApiRef();
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    name: true,
    specialization: true,
    availability: true,
    mobile: true,
    email: true,
    experience: true,
    fee: true,
    rating: true,
    clinic: true,
  });

  const handleRefreshTable=()=>{

  }


  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { field: "name", headerName: "Name", flex: 1.5 },
    { field: "specialization", headerName: "Specialization", flex: 1 },
    { field: "availability", headerName: "Availability", flex: 1.5 },
    { field: "mobile", headerName: "Contact", flex: 1.5,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Phone fontSize="small" color="success" />
          <Typography noWrap>{params.row.mobile}</Typography>
        </Box>  

      ),
     },
    { field: "email", headerName: "Email", flex: 1.5,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Email fontSize="small" color="error" />
          <Typography noWrap>{params.row.email}</Typography>
        </Box>

      ),
     },
    { field: "experience", headerName: "Experience (Years)", flex: 1 },
    { field: "fee", headerName: "Consultation Fee", flex: 1 },
    { field: "rating", headerName: "Rating", flex: 1 },
    { field: "clinic", headerName: "Clinic Location", flex: 1.5 },
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
          <Tooltip title="Show/Hide Columns">
            <Tooltip>
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
                  <Typography>{columns.find((c) => c.field === field)?.headerName}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Tooltip>
          <Tooltip title="Add New Doctor">
            <IconButton onClick={()=>setOpenDoctor(true)}>
              <Add sx={{ color: "green" }} />
            </IconButton>
            <DoctorForm open={openAddDoctor} onClose={() => setOpenDoctor(false)} onSave={handleSave} />
          </Tooltip>
          <Tooltip title="Refresh">
            <IconButton onClick={()=>handleRefreshTable()}>
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
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) =>
        setColumnVisibilityModel(newModel)}
        apiRef={apiRef}
        rows={filteredDoctors}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 15]}
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
    </Box>
  );
}

