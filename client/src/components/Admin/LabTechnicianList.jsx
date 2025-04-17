// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   IconButton,
//   Tooltip,
//   Menu,
//   MenuItem,
//   TextField,
//   Checkbox,
// } from "@mui/material";
// import {
//   DataGrid,
//   useGridApiRef,
// } from "@mui/x-data-grid";
// import {
//   Edit,
//   Delete,
//   Refresh,
//   Download,
//   Add,
//   ViewColumn,
//   Search as SearchIcon,
// } from "@mui/icons-material";

// import LabTechnicianForm from "./LabTechnicianForm";
// import DeleteDialog from "./DeleteDialog";

// const initialLabTechs = [
//   {
//     id: "1",
//     name: "John Doe",
//     address: "123 Main Street",
//     phone: "9876543210",
//     gender: "Male",
//     labId: "101",
//   },
// ];

// export default function LabTechnicianList() {
//   const [labTechs, setLabTechs] = useState(initialLabTechs);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [columnVisibilityModel, setColumnVisibilityModel] = useState({
//     name: true,
//     address: true,
//     phone: true,
//     gender: true,
//     labId: true,
//   });

//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [editingTech, setEditingTech] = useState(null);
//   const [deleteTarget, setDeleteTarget] = useState(null);

//   const apiRef = useGridApiRef();
//   const open = Boolean(anchorEl);

//   const handleClick = (event) => setAnchorEl(event.currentTarget);
//   const handleClose = () => setAnchorEl(null);

//   const handleSave = (tech) => {
//     setLabTechs((prev) => {
//       const exists = prev.find((t) => t.id === tech.id);
//       return exists
//         ? prev.map((t) => (t.id === tech.id ? tech : t))
//         : [...prev, { ...tech, id: Date.now().toString() }];
//     });
//   };

//   const handleDelete = () => {
//     if (deleteTarget) {
//       setLabTechs((prev) => prev.filter((t) => t.id !== deleteTarget.id));
//       setDeleteTarget(null);
//     }
//   };

//   const filteredTechs = labTechs.filter((t) =>
//     t.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const columns = [
//     { field: "name", headerName: "Name", flex: 1 },
//     { field: "address", headerName: "Address", flex: 1 },
//     { field: "phone", headerName: "Phone", flex: 1 },
//     { field: "gender", headerName: "Gender", flex: 0.5 },
//     { field: "labId", headerName: "Lab ID", flex: 0.5 },
//     {
//       field: "actions",
//       headerName: "Actions",
//       flex: 0.6,
//       sortable: false,
//       renderCell: (params) => (
//         <Box display="flex" gap={0.5}>
//           <Tooltip title="Edit">
//             <IconButton
//               size="small"
//               sx={{ color: "#0288d1" }}
//               onClick={() => {
//                 setEditingTech(params.row);
//                 setDialogOpen(true);
//               }}
//             >
//               <Edit fontSize="small" />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Delete">
//             <IconButton
//               size="small"
//               sx={{ color: "#e53935" }}
//               onClick={() => setDeleteTarget(params.row)}
//             >
//               <Delete fontSize="small" />
//             </IconButton>
//           </Tooltip>
//         </Box>
//       ),
//     },
//   ];

//   return (
//     <Box sx={{ height: 600, width: "100%", p: 2 }}>
//       <Box
//         sx={{
//           backgroundColor: "#e3f2fd",
//           p: 2,
//           borderTopLeftRadius: 12,
//           borderTopRightRadius: 12,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <Typography variant="h6">Lab Technicians</Typography>
//         <Box display="flex" alignItems="center" gap={2}>
//           <Box
//             sx={{
//               backgroundColor: "white",
//               px: 2,
//               py: 0.5,
//               borderRadius: 1,
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//             }}
//           >
//             <SearchIcon fontSize="small" />
//             <TextField
//               variant="standard"
//               placeholder="Search"
//               InputProps={{ disableUnderline: true }}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               size="small"
//             />
//           </Box>
//           <Tooltip title="Toggle Columns">
//             <IconButton onClick={handleClick}>
//               <ViewColumn />
//             </IconButton>
//           </Tooltip>
//           <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
//             {Object.keys(columnVisibilityModel).map((field) => (
//               <MenuItem key={field}>
//                 <Checkbox
//                   checked={columnVisibilityModel[field]}
//                   onChange={() =>
//                     setColumnVisibilityModel((prev) => ({
//                       ...prev,
//                       [field]: !prev[field],
//                     }))
//                   }
//                 />
//                 <Typography>
//                   {columns.find((col) => col.field === field)?.headerName}
//                 </Typography>
//               </MenuItem>
//             ))}
//           </Menu>
//           <Tooltip title="Add New">
//             <IconButton
//               onClick={() => {
//                 setEditingTech(null);
//                 setDialogOpen(true);
//               }}
//             >
//               <Add sx={{ color: "green" }} />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Refresh">
//             <IconButton onClick={() => console.log("Refreshed")}>
//               <Refresh />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Download CSV">
//             <IconButton onClick={() => apiRef.current.exportDataAsCsv()}>
//               <Download sx={{ color: "#3b82f6" }} />
//             </IconButton>
//           </Tooltip>
//         </Box>
//       </Box>

//       <DataGrid
//         apiRef={apiRef}
//         rows={filteredTechs}
//         columns={columns}
//         pageSize={10}
//         rowsPerPageOptions={[10, 15]}
//         pagination
//         disableSelectionOnClick
//         columnVisibilityModel={columnVisibilityModel}
//         onColumnVisibilityModelChange={(newModel) =>
//           setColumnVisibilityModel(newModel)
//         }
//         sx={{
//           backgroundColor: "white",
//           borderRadius: 2,
//           mt: 1,
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: "#f3f6f9",
//             fontWeight: "bold",
//           },
//         }}
//       />

//       {/* Add/Edit Dialog */}
//       <LabTechnicianForm
//         open={dialogOpen}
//         onClose={() => setDialogOpen(false)}
//         onSave={handleSave}
//         initialData={editingTech}
//       />

//       {/* Delete Confirmation Dialog */}
//       <DeleteDialog
//         open={!!deleteTarget}
//         onCancel={() => setDeleteTarget(null)}
//         onConfirm={handleDelete}
//         title="Are you sure you want to delete?"
//         data={deleteTarget}
//         fields={[
//           { key: "name", label: "Name" },
//           { key: "phone", label: "Phone" },
//           { key: "labId", label: "Lab ID" },
//         ]}
//       />
//     </Box>
//   );
// }


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
  Chip,
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

import LabTechnicianForm from "./LabTechnicianForm";
import DeleteDialog from "./DeleteDialog";

const initialLabTechs = [
  {
    id: "1",
    name: "John Doe",
    address: "123 Main Street",
    phone: "9876543210",
    gender: "male",
    labId: "101",
  },
];

const getGenderColor = (gender) => gender === "male" ? ["#d1fae5", "#065f46"] : ["#ede9fe", "#5b21b6"];

  const renderLabel = (value, color, textColor) => (
    <Chip label={value} size="small" sx={{ backgroundColor: color, color: textColor }} />
  );

export default function LabTechnicianList() {
  const [labTechs, setLabTechs] = useState(initialLabTechs);
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    name: true,
    address: true,
    phone: true,
    gender: true,
    labId: true,
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTech, setEditingTech] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const apiRef = useGridApiRef();
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSave = (tech) => {
    setLabTechs((prev) => {
      const exists = prev.find((t) => t.id === tech.id);
      return exists
        ? prev.map((t) => (t.id === tech.id ? tech : t))
        : [...prev, { ...tech, id: Date.now().toString() }];
    });
  };

  const handleDelete = () => {
    if (deleteTarget) {
      setLabTechs((prev) => prev.filter((t) => t.id !== deleteTarget.id));
      setDeleteTarget(null);
      setShowDeleteAlert(true);
    }
  };

  const filteredTechs = labTechs.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5},
    { field: "name", headerName: "Name", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "gender", headerName: "Gender", flex: 0.5,
      renderCell: (params) => {
        const [bg, text] = getGenderColor(params.row.gender);
        return renderLabel(params.row.gender, bg, text);
      },
    },
    { field: "labId", headerName: "Lab ID", flex: 0.5 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.6,
      sortable: false,
      renderCell: (params) => (
        <Box display="flex" gap={0.5}>
          <Tooltip title="Edit">
            <IconButton
              size="small"
              sx={{ color: "#0288d1" }}
              onClick={() => {
                setEditingTech(params.row);
                setDialogOpen(true);
              }}
            >
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              sx={{ color: "#e53935" }}
              onClick={() => setDeleteTarget(params.row)}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: "100%", p: 2 }}>
      {/* Top bar */}
      <Box
        sx={{
          backgroundColor: "#e3f2fd",
          p: 2,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">Lab Technicians</Typography>
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
          <Tooltip title="Add New">
            <IconButton
              onClick={() => {
                setEditingTech(null);
                setDialogOpen(true);
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

      {/* DataGrid */}
      <DataGrid
        apiRef={apiRef}
        rows={filteredTechs}
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

      {/* Add/Edit Dialog */}
      <LabTechnicianForm
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
        initialData={editingTech}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        open={!!deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Are you sure you want to delete?"
        data={deleteTarget}
        fields={[
          { key: "name", label: "Name" },
          { key: "phone", label: "Phone" },
          { key: "labId", label: "Lab ID" },
        ]}
      />

      {/* Snackbar for delete success */}
      <Snackbar
        open={showDeleteAlert}
        autoHideDuration={3000}
        onClose={() => setShowDeleteAlert(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() => setShowDeleteAlert(false)}
          sx={{ width: "100%" }}
        >
          Delete successful!
        </Alert>
      </Snackbar>
    </Box>
  );
}
