// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   IconButton,
//   Tooltip,
//   InputAdornment,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TablePagination,
// } from "@mui/material";
// import {
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Refresh as RefreshIcon,
//   FileDownload as FileDownloadIcon,
//   ViewColumn as ViewColumnIcon,
//   Search as SearchIcon,
// } from "@mui/icons-material";

// const mockTreatments = [
//   {
//     id: 1,
//     treatmentName: "Chemotherapy",
//     sDate: "2024-01-15",
//     eDate: "2024-02-15",
//   },
//   {
//     id: 2,
//     treatmentName: "Radiation Therapy",
//     sDate: "2024-03-01",
//     eDate: "2024-04-01",
//   },
// ];

// const TreatmentList = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(100);

//   const filteredTreatments = mockTreatments.filter((t) =>
//     t.treatmentName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const paginatedTreatments = filteredTreatments.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   return (
//     <Box sx={{ px: 3, py: 2 }}>
//       {/* Title */}
//       <Typography variant="h6" fontWeight="bold" mb={2}>
//         Treatments List
//       </Typography>

//       {/* Header Toolbar */}
//       <Box
//         sx={{
//           backgroundColor: "#f0f4ff",
//           borderRadius: 2,
//           px: 2,
//           py: 1.5,
//           mb: 1.5,
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <Typography variant="subtitle1" fontWeight="bold">
//           Treatments
//         </Typography>
//         <Box display="flex" gap={1}>
//           <TextField
//             size="small"
//             placeholder="Search"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon fontSize="small" />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{ backgroundColor: "#fff", borderRadius: 1 }}
//           />
//           <Tooltip title="Toggle Columns">
//             <IconButton>
//               <ViewColumnIcon />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Add Treatment">
//             <IconButton color="success">
//               <AddIcon />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Refresh">
//             <IconButton>
//               <RefreshIcon />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Export CSV">
//             <IconButton>
//               <FileDownloadIcon />
//             </IconButton>
//           </Tooltip>
//         </Box>
//       </Box>

//       {/* Table */}
//       <TableContainer
//         component={Paper}
//         sx={{
//           border: "1px solid #e0e0e0",
//           borderRadius: 2,
//           overflow: "hidden",
//         }}
//       >
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ fontWeight: "bold" }}>Treatment Name</TableCell>
//               <TableCell sx={{ fontWeight: "bold" }}>Start Date</TableCell>
//               <TableCell sx={{ fontWeight: "bold" }}>End Date</TableCell>
//               <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedTreatments.map((treatment) => (
//               <TableRow key={treatment.id}>
//                 <TableCell>{treatment.treatmentName}</TableCell>
//                 <TableCell>{treatment.sDate}</TableCell>
//                 <TableCell>{treatment.eDate}</TableCell>
//                 <TableCell>
//                   <Tooltip title="Edit">
//                     <IconButton size="small" color="primary">
//                       <EditIcon fontSize="small" />
//                     </IconButton>
//                   </Tooltip>
//                   <Tooltip title="Delete">
//                     <IconButton size="small" color="error">
//                       <DeleteIcon fontSize="small" />
//                     </IconButton>
//                   </Tooltip>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>

//         {/* Pagination Footer */}
//         <TablePagination
//           component="div"
//           count={filteredTreatments.length}
//           page={page}
//           onPageChange={(e, newPage) => setPage(newPage)}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={(e) => {
//             setRowsPerPage(parseInt(e.target.value, 10));
//             setPage(0);
//           }}
//           rowsPerPageOptions={[5, 10, 25, 100]}
//           sx={{
//             borderTop: "1px solid #e0e0e0",
//             px: 2,
//             py: 1,
//           }}
//         />
//       </TableContainer>
//     </Box>
//   );
// };

// export default TreatmentList;


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
import TreatmentForm from "./TreatmentForm";
import DeleteDialog from "./DeleteDialog"; // Make sure this is correctly imported

const initialTreatments = [
  {
    id: "1",
    patientName: "Mike",
    name: "Chemotherapy",
    startDate: "2024-04-16",
    startTime: "01:00 PM",
    endDate: "2024-04-16",
    endTime: "03:00 PM",
    description: "Cancer treatment using drugs",
    cost: "5000",
  },
  {
    id: "2",
    patientName: "Donna",
    startDate: "2024-04-16",
    startTime: "01:00 PM",
    endDate: "2024-04-16",
    endTime: "03:00 PM",
    name: "Physiotherapy",
    description: "Physical therapy treatment",
    cost: "1200",
  },
];

export default function TreatmentList() {
  const [treatments, setTreatments] = useState(initialTreatments);
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [editingTreatment, setEditingTreatment] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [treatmentToDelete, setTreatmentToDelete] = useState(null);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    id: true,
    patientName: true,
    name: true,
    startDate: true,
    startTime: true,
    endDate: true,
    endTime: true,
    description: true,
    cost: true,
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const apiRef = useGridApiRef();
  const menuOpen = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSave = (data) => {
    setTreatments((prev) => {
      const exists = prev.find((t) => t.id === data.id);
      if (exists) {
        return prev.map((t) => (t.id === data.id ? data : t));
      }
      return [...prev, data];
    });
    setEditingTreatment(null);
  };

  const filteredTreatments = treatments.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = () => {
    setTreatments((prev) =>
      prev.filter((t) => t.id !== treatmentToDelete?.id)
    );
    setDeleteDialogOpen(false);
    setSnackbarOpen(true);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "patientName", headerName: "Patient Name", flex: 1 },
    { field: "startDate", headerName: "Start Date", flex: 1 },
    { field: "startTime", headerName: "Start Time", flex: 1 },
    { field: "endDate", headerName: "End Date", flex: 1 },
    { field: "endTime", headerName: "End Time", flex: 1 },
    { field: "name", headerName: "Treatment Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "cost", headerName: "Cost ($)", flex: 1 },
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
                setEditingTreatment(params.row);
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
                setTreatmentToDelete(params.row);
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
    { key: "id", headerName: "ID"},
    { key: "patientName", headerName: "Patient Name"},
    { key: "name", label: "Treatment Name" },
    { key: "description", label: "Description" },
    { key: "cost", label: "Cost ($)" },
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
        <Typography variant="h6">Treatments</Typography>
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
          <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleClose}>
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
          <Tooltip title="Add New Treatment">
            <IconButton
              onClick={() => {
                setEditingTreatment(null);
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
        rows={filteredTreatments}
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

      <TreatmentForm
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setEditingTreatment(null);
        }}
        onSave={handleSave}
        initialData={editingTreatment}
      />

      <DeleteDialog
        open={deleteDialogOpen}
        title="Are you sure you want to delete this treatment?"
        data={treatmentToDelete}
        fields={deleteFields}
        onCancel={() => {
          setDeleteDialogOpen(false);
          setTreatmentToDelete(null);
        }}
        onConfirm={handleDelete}
      />

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
    </Box>
  );
}
