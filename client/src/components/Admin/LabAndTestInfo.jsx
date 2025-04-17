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
import AddOrEditLabAndTestForm from "./AddOrEditLabTest";
import AlertBar from "../Common/AlertBar";
import { DeleteLabDialog } from "./DeleteLabDialog";

const tests = [
  {
    id: 1,
    labRoomNo: "201",
    labName: "Biochemistry Lab",
    testsPerformed: ["Blood Test", "Liver Function Test"],
    floor: 2,
  },
  {
    id: 2,
    labRoomNo: "202",
    labName: "Microbiology Lab",
    testsPerformed: ["Culture Test", "Sensitivity Test"],
    floor: 2,
  },
];

const getColor = (text) => {
  const colorMap = {
    "Blood Test": { bg: "#e3f2fd", text: "#1565c0" },
    "Liver Function Test": { bg: "#fff3e0", text: "#ef6c00" },
    "Culture Test": { bg: "#ede7f6", text: "#4527a0" },
    "Sensitivity Test": { bg: "#f3e5f5", text: "#6a1b9a" },
  };
  return colorMap[text] || { bg: "#eceff1", text: "#263238" };
};

export default function LabAndTestInfo() {
    const [openAddTest, setAddOpenTest] = useState(false);
 
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedLabTest, setSelectedLabTest] = useState(null);
    const [editDialogOpen, setEditDilaogOpen]=useState(false);

    const [snackBarInfo,setSnackBarInfo]=useState({'message':'','severity':''})
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleEditClick=(labTestData)=>{
        console.log("out ",labTestData);
        setSelectedLabTest(labTestData);
        setEditDilaogOpen(true);
    }

    const handleDeleteClick = (labTestData) => {
        console.log(labTestData);
        setSelectedLabTest(labTestData);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        // perform delete using selectedRoom.id or something
        console.log("Deleting Lab Test:", selectedLabTest);
        setDeleteDialogOpen(false);
        setSnackbarOpen(true);
        setSnackBarInfo({'message':'Deleted Successfully','severity':'error'})
        
    };

        
    const handleSave = (data, type) => {
        console.log('Lab Test Data:', data);  
        if(type=="add"){
            setSnackbarOpen(true);
            setSnackBarInfo({'message':'Added Lab and Tests Successfully','severity':'success'})
        }   
        else{
            setSnackbarOpen(true);
            setSnackBarInfo({'message':'Updated Lab Information Successfully','severity':'success'})
        }
    };
    

  const [searchQuery, setSearchQuery] = useState("");
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    labRoomNo: true,
    labName: true,
    testsPerformed: true,
    floor: true,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const apiRef = useGridApiRef();

  const filteredTests = tests.filter((lab) =>
    lab.labRoomNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { field: "labRoomNo", headerName: "Lab Room No", flex: 1 },
    { field: "labName", headerName: "Lab Name", flex: 1.5 },
    {
      field: "testsPerformed",
      headerName: "Tests Performed",
      flex: 2,
      renderCell: (params) => (
        <Box display="flex" flexWrap="wrap" gap={0.5} sx={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          {params.row.testsPerformed.map((test, index) => {
            const { bg, text } = getColor(test);
            return (
              <Chip
                key={index}
                label={test}
                sx={{
                  backgroundColor: bg,
                  color: text,
                  fontWeight: "bold",
                  borderRadius: 1.5,
                  height: 28,
                }}
              />
            );
          })}
        </Box>
      ),
    },
    { field: "floor", headerName: "Floor", flex: 0.5 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => (
        <Box display="flex" flexDirection="row" gap={0.5}>
          <Tooltip title="Edit">
            <IconButton size="small" sx={{ color: "#4f46e5" }} onClick={()=>handleEditClick(params)}>
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" sx={{ color: "#f43f5e" }} onClick={()=>handleDeleteClick(params)}>
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
          <Typography variant="h6">Room Info</Typography>
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
            <Tooltip title="Add New LabTest">
              <IconButton onClick={()=>setAddOpenTest(true)}>
                <Add sx={{ color: "green" }} />
              </IconButton>
              
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
        onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
        apiRef={apiRef}
        rows={filteredTests}
        columns={columns.map((col) =>
          col.field === "floor" ? { ...col, headerName: "Floor" } : col
        )}
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

        {/* Add Test */}
        <AddOrEditLabAndTestForm open={openAddTest} onClose={() => setAddOpenTest(false)} onSave={handleSave}/>
        
        {/* Edit Test */}
        <AddOrEditLabAndTestForm open={editDialogOpen} onClose={() => setEditDilaogOpen(false)} onSave={handleSave} labTestData={selectedLabTest?.row} />

        {/* Delete Dialog */}
        <DeleteLabDialog
            open={deleteDialogOpen}
            labTest={selectedLabTest}
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
