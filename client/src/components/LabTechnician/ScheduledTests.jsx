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
  Button,
} from "@mui/material";
import {
  DataGrid,
  GridToolbarExport,
  GridToolbarContainer,
  useGridApiRef,
} from "@mui/x-data-grid";
import {
  UploadFile as UploadFileIcon,
  ViewColumn,
  Refresh,
  Download,
  Search as SearchIcon,
} from "@mui/icons-material";

const testSchedule = [
  {
    id: 1,
    patientName: "John Doe",
    testName: "Blood Test",
    date: "2025-04-11",
    time: "10:30 AM",
  },
  {
    id: 2,
    patientName: "Jane Smith",
    testName: "X-Ray",
    date: "2025-04-11",
    time: "11:00 AM",
  },
  // Add more scheduled tests...
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function ScheduledTestsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const apiRef = useGridApiRef();
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    patientName: true,
    testName: true,
    date: true,
    time: true,
    upload: true,
  });

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleRefreshTable = () => {
    // Refresh logic here
  };

  const handleFileUpload = (file, rowId) => {
    console.log("Uploading report for row ID:", rowId);
    console.log("Selected file:", file);
    // You can add actual upload logic here
  };

  const filteredTests = testSchedule.filter((test) =>
    test.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { field: "id", headerName: "S.No", width: 80 },
    { field: "patientName", headerName: "Patient Name", flex: 1.5 },
    { field: "testName", headerName: "Test Name", flex: 1.5 },
    { field: "date", headerName: "Scheduled Date", flex: 1 },
    { field: "time", headerName: "Scheduled Time", flex: 1 },
    {
      field: "upload",
      headerName: "Upload Report",
      flex: 1.5,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          component="label"
          startIcon={<UploadFileIcon />}
          size="small"
        >
          Upload
          <input
            type="file"
            hidden
            onChange={(e) =>
              handleFileUpload(e.target.files[0], params.row.id)
            }
          />
        </Button>
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
        <Typography variant="h6">Scheduled Tests</Typography>
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
              placeholder="Search by patient name"
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
                    {
                      columns.find((c) => c.field === field)?.headerName ||
                      field
                    }
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Tooltip>
          <Tooltip title="Refresh">
            <IconButton onClick={handleRefreshTable}>
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
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(model) =>
          setColumnVisibilityModel(model)
        }
        apiRef={apiRef}
        rows={filteredTests}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
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
