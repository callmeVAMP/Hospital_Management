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
  Button,
} from "@mui/material";
import {
  DataGrid,
  useGridApiRef,
} from "@mui/x-data-grid";
import {
  Visibility,
  Refresh,
  Download,
  Add,
  ViewColumn,
  Search as SearchIcon,
  Edit,
  Delete,
} from "@mui/icons-material";
import AlertBar from "../Common/AlertBar";
import AddOrEditOperation from "./AddOrEditOperation";
import {DeleteOperationDialog} from "./DeleteOperationDialog";

const operations = [
  {
    id: 1,
    treatmentID: "OP1234",
    startDate: "2024-04-15",
    startTime: "09:00 AM",
    endDate: "2024-04-15",
    endTime: "11:00 AM",
    patientName: "John Doe",
    patientPhone: "123-456-7890",
    professionals: ["Dr. Smith", "Dr. Allen"],
    reportUrl: "https://example.com/report1.pdf",
    opType: 'Spenal Surgery'
  },
  {
    id: 2,
    treatmentID: "OP5678",
    startDate: "2024-04-16",
    startTime: "01:00 PM",
    endDate: "2024-04-16",
    endTime: "03:00 PM",
    patientName: "Jane Smith",
    patientPhone: "987-654-3210",
    professionals: ["Dr. Lee", "Dr. Johnson"],
    reportUrl: "https://example.com/report2.pdf",
    opType: 'Spenal Surgery'
  },
];


function getRandomColor(name) {
  const colors = [
    "#e3f2fd", "#fce4ec", "#fff3e0", "#f3e5f5",
    "#f1f8e9", "#e0f7fa", "#f9fbe7", "#ede7f6",
    "#e8f5e9", "#e0f2f1", "#fbe9e7"
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash % colors.length);
  return colors[index];
}

function darkenColor(hex, amount = 0.6) {
  let col = hex.replace("#", "");
  if (col.length === 3) {
    col = col.split("").map((c) => c + c).join("");
  }
  const num = parseInt(col, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.floor(r * amount);
  g = Math.floor(g * amount);
  b = Math.floor(b * amount);
  return `rgb(${r}, ${g}, ${b})`;
}

export default function OperationInfo() {
  const [openAddOperation, setAddOpenOperation] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [editDialogOpen, setEditDilaogOpen]=useState(false);

  const [snackBarInfo,setSnackBarInfo]=useState({'message':'','severity':''})
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  const handleEditClick=(opData)=>{
    setSelectedOperation(opData);
    console.log("out ",opData);
    setEditDilaogOpen(true);
  }

  const handleDeleteClick = (opData) => {
    console.log(opData);
    setSelectedOperation(opData);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    // perform delete using selectedRoom.id or something
    console.log("Deleting Room:", selectedOperation);
    setDeleteDialogOpen(false);
    setSnackbarOpen(true);
    setSnackBarInfo({'message':'Deleted Successfully','severity':'error'})
    
  };

    
  const handleSave = (data, type) => {
    console.log('Operation Data:', data);  
    if(type=="add"){
        setSnackbarOpen(true);
        setSnackBarInfo({'message':'Added Operation Information Successfully','severity':'success'})
    }   
    else{
        setSnackbarOpen(true);
        setSnackBarInfo({'message':'Updated Operation Information Successfully','severity':'success'})
    }
  };
  
  const [searchQuery, setSearchQuery] = useState("");
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    treatmentID: true,
    startDate: true,
    startTime: true,
    endDate: true,
    endTime: true,
    patientName: true,
    patientPhone: true,
    professionals: true,
    report: true,
    actions: true,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const apiRef = useGridApiRef();

  const filteredOperations = operations.filter((op) =>
    op.treatmentID.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { field: "treatmentID", headerName: "Operation ID", flex: 1 },
    { field: "patientName", headerName: "Patient Name", flex: 1 },
    { field: "patientPhone", headerName: "Patient Phone", flex: 1 },
    { field: "startDate", headerName: "Start Date", flex: 1 },
    { field: "startTime", headerName: "Start Time", flex: 1 },
    { field: "endDate", headerName: "End Date", flex: 1 },
    { field: "endTime", headerName: "End Time", flex: 1 },
    { field: "opType", headerName: "Operation Type", flex: 1 },
    {
      field: "professionals",
      headerName: "Healthcare Professionals Involved",
      flex: 2,
      renderCell: (params) => (
        <Box display="flex" flexWrap="wrap" gap={0.5}>
          {params.row.professionals.map((name, index) => {
            const bg = getRandomColor(name);
            const text = darkenColor(bg);
            return (
              <Chip
                key={index}
                label={name}
                sx={{ backgroundColor: bg, color: text, fontWeight: 600 }}
              />
            );
          })}
        </Box>
      ),
    },
    {
      field: "report",
      headerName: "View Report",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => window.open(params.row.reportUrl, "_blank")}
        >
          View Report
        </Button>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton size="small" color="primary"  onClick={()=>handleEditClick(params?.row)}>
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" color="error" onClick={()=>handleDeleteClick(params?.row)}>
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
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
        <Typography variant="h6">Operation Info</Typography>
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
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <ViewColumn />
            </IconButton>
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
                  <Typography>{columns.find((c) => c.field === field)?.headerName}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Tooltip>
          <Tooltip title="Add New Operation Data">
            <IconButton onClick={()=>setAddOpenOperation(true)}>
              <Add sx={{ color: "green" }} />
            </IconButton>
            
          </Tooltip>
          <Tooltip title="Refresh">
            <IconButton onClick={() => window.location.reload()}>
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
        onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
        apiRef={apiRef}
        rows={filteredOperations}
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

      {/* Edit Operation */}
      <AddOrEditOperation open={editDialogOpen} onClose={() => setEditDilaogOpen(false)} onSave={handleSave} operationData={selectedOperation} />
      
      {/* Add Test */}
      <AddOrEditOperation open={openAddOperation} onClose={() => setAddOpenOperation(false)} onSave={handleSave}/>
        

      {/* Delete Dialog */}
        <DeleteOperationDialog
            open={deleteDialogOpen}
            opData={selectedOperation}
            onCancel={() => setDeleteDialogOpen(false)}
            onConfirm={handleDeleteConfirm}
        />

      {/* Snackbar code */}
      <AlertBar
            open={snackbarOpen}
            onClose={() => setSnackbarOpen(false)}
            message={snackBarInfo?.message}
            severity={snackBarInfo?.severity} // Can be 'success', 'error', 'warning', 'info'
            duration={3000}
        />

    </Box>
  );
}
