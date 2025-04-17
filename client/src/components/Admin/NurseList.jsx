// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   IconButton,
//   Tooltip,
//   TextField,
//   Menu,
//   MenuItem,
//   Checkbox,
//   Snackbar,
//   Alert,
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
// import NurseForm from "./NurseForm";
// import DeleteDialog from "./DeleteDialog";

// const initialNurses = [
//   {
//     id: "1",
//     name: "Nurse Jane Doe",
//     address: "123 Main Street",
//     phone: "9876543210",
//     gender: "Female",
//   },
//   {
//     id: "2",
//     name: "Nurse John Smith",
//     address: "456 Elm Street",
//     phone: "9123456789",
//     gender: "Male",
//   },
// ];

// export default function NurseList() {
//   const [nurses, setNurses] = useState(initialNurses);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [openForm, setOpenForm] = useState(false);
//   const [editingNurse, setEditingNurse] = useState(null);
//   const [deleteTarget, setDeleteTarget] = useState(null);
//   const [showSnackbar, setShowSnackbar] = useState(false);

//   const [columnVisibilityModel, setColumnVisibilityModel] = useState({
//     name: true,
//     gender: true,
//     phone: true,
//     address: true,
//   });

//   const apiRef = useGridApiRef();
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => setAnchorEl(event.currentTarget);
//   const handleClose = () => setAnchorEl(null);

//   const handleSave = (data) => {
//     setNurses((prev) => {
//       const exists = prev.find((n) => n.id === data.id);
//       if (exists) {
//         return prev.map((n) => (n.id === data.id ? data : n));
//       }
//       return [...prev, { ...data, id: Date.now().toString() }];
//     });
//     setEditingNurse(null);
//   };

//   const handleDelete = () => {
//     if (deleteTarget) {
//       setNurses((prev) => prev.filter((n) => n.id !== deleteTarget.id));
//       setDeleteTarget(null);
//       setShowSnackbar(true);
//     }
//   };

//   const filteredNurses = nurses.filter((n) =>
//     n.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const columns = [
//     { field: "name", headerName: "Name", flex: 1 },
//     { field: "gender", headerName: "Gender", flex: 0.7 },
//     { field: "phone", headerName: "Phone Number", flex: 1 },
//     { field: "address", headerName: "Address", flex: 2 },
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
//               onClick={() => {
//                 setEditingNurse(params.row);
//                 setOpenForm(true);
//               }}
//               sx={{ color: "#0288d1" }}
//             >
//               <Edit fontSize="small" />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Delete">
//             <IconButton
//               size="small"
//               onClick={() => setDeleteTarget(params.row)}
//               sx={{ color: "#e53935" }}
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
//           backgroundColor: "#fff3e0",
//           p: 2,
//           borderTopLeftRadius: 12,
//           borderTopRightRadius: 12,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <Typography variant="h6">Nurses</Typography>
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
//           <Tooltip title="Add New Nurse">
//             <IconButton
//               onClick={() => {
//                 setEditingNurse(null);
//                 setOpenForm(true);
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
//         rows={filteredNurses}
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

//       <NurseForm
//         open={openForm}
//         onClose={() => {
//           setOpenForm(false);
//           setEditingNurse(null);
//         }}
//         onSave={handleSave}
//         initialData={editingNurse}
//       />

//       <DeleteDialog
//         open={!!deleteTarget}
//         title="Are you sure you want to delete?"
//         data={deleteTarget}
//         fields={[
//           { key: "name", label: "Name" },
//           { key: "phone", label: "Phone Number" },
//           { key: "address", label: "Address" },
//         ]}
//         onCancel={() => setDeleteTarget(null)}
//         onConfirm={handleDelete}
//       />

//       <Snackbar
//         open={showSnackbar}
//         autoHideDuration={3000}
//         onClose={() => setShowSnackbar(false)}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert onClose={() => setShowSnackbar(false)} severity="error" variant="filled">
//           Delete successful!
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }



import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  TextField,
  Menu,
  MenuItem,
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
  History as HistoryIcon,
} from "@mui/icons-material";
import NurseForm from "./NurseForm";
import DeleteDialog from "./DeleteDialog";
import NurseHistoryDialog from "./NurseHistory";

const initialNurses = [
  {
    id: "1",
    name: "Nurse Jane Doe",
    address: "123 Main Street",
    phone: "9876543210",
    gender: "Female",
  },
  {
    id: "2",
    name: "Nurse John Smith",
    address: "456 Elm Street",
    phone: "9123456789",
    gender: "Male",
  },
];

export default function NurseList() {
  const [nurses, setNurses] = useState(initialNurses);
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [editingNurse, setEditingNurse] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [viewingNurse, setViewingNurse] = useState(null); // 👈 For modal
  const [showSnackbar, setShowSnackbar] = useState(false);

  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    name: true,
    gender: true,
    phone: true,
    address: true,
  });

  const apiRef = useGridApiRef();
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSave = (data) => {
    setNurses((prev) => {
      const exists = prev.find((n) => n.id === data.id);
      if (exists) {
        return prev.map((n) => (n.id === data.id ? data : n));
      }
      return [...prev, { ...data, id: Date.now().toString() }];
    });
    setEditingNurse(null);
  };

  const handleDelete = () => {
    if (deleteTarget) {
      setNurses((prev) => prev.filter((n) => n.id !== deleteTarget.id));
      setDeleteTarget(null);
      setShowSnackbar(true);
    }
  };

  const handleViewHistory = (nurse) => {
    setViewingNurse(nurse);
  };

  const filteredNurses = nurses.filter((n) =>
    n.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "gender", headerName: "Gender", flex: 0.7 },
    { field: "phone", headerName: "Phone Number", flex: 1 },
    { field: "address", headerName: "Address", flex: 2 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.9,
      sortable: false,
      renderCell: (params) => (
        <Box display="flex" gap={0.5}>
          <Tooltip title="Edit">
            <IconButton
              size="small"
              onClick={() => {
                setEditingNurse(params.row);
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
              onClick={() => setDeleteTarget(params.row)}
              sx={{ color: "#e53935" }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="View History">
            <IconButton
              size="small"
              onClick={() => handleViewHistory(params.row)}
              sx={{ color: "#6d4c41" }}
            >
              <HistoryIcon fontSize="small" />
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
          backgroundColor: "#fff3e0",
          p: 2,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">Nurses</Typography>
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
          <Tooltip title="Add New Nurse">
            <IconButton
              onClick={() => {
                setEditingNurse(null);
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
        rows={filteredNurses}
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

      <NurseForm
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setEditingNurse(null);
        }}
        onSave={handleSave}
        initialData={editingNurse}
      />

      <DeleteDialog
        open={!!deleteTarget}
        title="Are you sure you want to delete?"
        data={deleteTarget}
        fields={[
          { key: "name", label: "Name" },
          { key: "phone", label: "Phone Number" },
          { key: "address", label: "Address" },
        ]}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />

      <NurseHistoryDialog
        open={!!viewingNurse}
        onClose={() => setViewingNurse(null)}
        nurse={viewingNurse}
      />

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity="error"
          variant="filled"
        >
          Delete successful!
        </Alert>
      </Snackbar>
    </Box>
  );
}
