import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
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
import DeleteDialog from "./DeleteDialog";
import { setSnackBarInfo } from "../../Features/snackbarSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DeleteTreatmentDialog } from "./DeleteTreatmentDialog";

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
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const [treatments, setTreatments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [editingTreatment, setEditingTreatment] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [editDialogOpen, setEditDilaogOpen]=useState(false);
  // const [snackbarInfo, setSnackBarInfo] = useState({ message: '', severity: 'success' });
  // const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({
    id: true,
    treatmentID: true,
    patientName: true,
    name: true,
    startDate: true,
    startTime: true,
    endDate: true,
    endTime: true,
    description: true,
    appDocName:true,
    appDocHID:true
  });

  const apiRef = useGridApiRef();
  const menuOpen = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // const handleSave = (data) => {
  //   // setTreatments((prev) => {
  //   //   const exists = prev.find((t) => t.id === data.id);
  //   //   if (exists) {
  //   //     // setSnackBarInfo({ message: 'Updated treatment successfully', severity: 'success' });
  //   //     // setSnackbarOpen(true);
  //   //     return prev.map((t) => (t.id === data.id ? data : t));
  //   //   }
  //   //   // setSnackBarInfo({ message: 'Added treatment successfully', severity: 'success' });
  //   //   // setSnackbarOpen(true);
  //   //   return [...prev, { ...data, id: (prev.length + 1).toString() }];
  //   // });
  //   // setEditingTreatment(null);


  // };

  const formatDateTime = (date, time) => {
    const [timePart, modifier] = time.split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);
  
    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
  
    const hh = String(hours).padStart(2, '0');
    const mm = String(minutes).padStart(2, '0');
  
    return `${date} ${hh}:${mm}:00`;
  };

  const handleSave = async (data, type) => {
    // setActiveOp(data);
    console.log('Treament Data:', data,type);  
    if(type=="add"){
      
    }   
    else{
      let res;
      

      try {
        res=await axios.post(`http://localhost:8000/treatment/update_treatment/${data.treatmentID}`,{
        
          StDateTime:`${formatDateTime(data?.startDate,data?.startTime)}`,
          EndDateTime:`${formatDateTime(data?.endDate,data?.endTime)}`,
          TrName:data?.name
          
        }) 
        console.log(res);
      } catch (error) {
        console.log(error)
        dispatch(setSnackBarInfo({message:`Some Error Occured! Failed to Update`,severity:'error',open:true}))
      }

         
        
        

      if(res?.data?.success){
        fetchAllTreatments();
        dispatch(setSnackBarInfo({message:`Uploaded Treatment Successfully! Updating Treatments here`,severity:'success',open:true}))
      }

        

        // setSnackbarOpen(true);
        // setSnackBarInfo({'message':'Updated Operation Information Successfully','severity':'success'})
    }
  };

  const filteredTreatments = treatments.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteClick = (trData) => {
    console.log("trData",trData);
    setSelectedTreatment(trData);
    setDeleteDialogOpen(true);
  };

  const handleEditClick=(trData)=>{
    setSelectedTreatment(trData);
    console.log("out ",trData);
    setEditDilaogOpen(true);
  }

  const handleDeleteConfirm = async(trID) => {
    // perform delete using selectedRoom.id or something
    console.log("Deleting Treatment:", selectedTreatment);

    try {
      const res=await axios.delete(`http://localhost:8000/treatment/delete/${trID}`);
      console.log(res);
      if(res?.data?.success){
        dispatch(setSnackBarInfo({message:`Deleted Treatment Successfully! Updating Operations here`,severity:'success',open:true}))
        fetchAllTreatments()
      }
    } catch (error) {
      console.log(error)
      dispatch(setSnackBarInfo({message:`Failed to Delete Treatment!`,severity:'error',open:true}))
    }
    


    setDeleteDialogOpen(false);

    // setSnackbarOpen(true);
    // setSnackBarInfo({'message':'Deleted Successfully','severity':'error'})
    setDeleteDialogOpen(false);
  };


  const fetchAllTreatments=async()=>{
    
    

    try {
      const res=await axios.get(`http://localhost:8000/treatment/all`);
      console.log(res?.data);

      const formattedTrs = res?.data.map((op,index) => ({
        id:index+1,
        treatmentID: op.TrID,
        name:op.TrName,
        patientName: op.PName,
        patientPhone: op.PPhNo,
        startDate: dayjs(op.StDateTime).format("YYYY-MM-DD"),
        startTime: dayjs(op.StDateTime).format("hh:mm A"),
        endDate: dayjs(op.EndDateTime).format("YYYY-MM-DD"),
        endTime: dayjs(op.EndDateTime).format("hh:mm A"),
        appID:op.AppID,
        appDocHID:op.HID,
        appDocName:op.HName 
      }));
      console.log("formatted")
      console.log(formattedTrs)

      // const mergedMap = new Map();

      // formattedTrs.forEach(item => {
      //     const key = String(item.treatmentID); // ensure uniform key type
      //     if (!mergedMap.has(key)) {
      //         mergedMap.set(key, {
      //             ...item,
      //         });
      //     } else {
      //         const existing = mergedMap.get(key);
      //         if (!existing.professionals.includes(item.professionals[0])) {
      //             existing.professionals.push(item.professionals[0]);
      //             existing.professionalsHID.push(item.professionalsHID[0]);
      //         }
      //     }
      // });

      // const mergedList = Array.from(mergedMap.values());
      // console.log(mergedList);

      setTreatments(formattedTrs)

    } catch (error) {
      console.log(error)
      dispatch(setSnackBarInfo({message:`Failed to Fetch Treatments!`,severity:'error',open:true}))
    }
  }

  useEffect(()=>{
    fetchAllTreatments()
  },[navigate])

  const columns = [
    { field: "id", headerName: "S No", flex: 0.5 },
    { field: "treatmentID", headerName: "Treatment ID", flex: 0.5 },
    { field: "patientName", headerName: "Patient Name", flex: 1 },
    { field: "startDate", headerName: "Start Date", flex: 1 },
    { field: "startTime", headerName: "Start Time", flex: 1 },
    { field: "endDate", headerName: "End Date", flex: 1 },
    { field: "endTime", headerName: "End Time", flex: 1 },
    { field: "name", headerName: "Treatment Name", flex: 1 },
    // { field: "description", headerName: "Description", flex: 1 },
    { field: "appDocHID", headerName: "Appointment Doctor HID", flex: 1 },
    { field: "appDocName", headerName: "Appointment Doctor Name", flex: 1 },
    
    
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
              onClick={()=>handleEditClick(params?.row)}
              sx={{ color: "#0288d1" }}
            >
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              onClick={() => 
                handleDeleteClick(params?.row)
              }
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
    { key: "treatmentID", headerName: "Treatment ID" },
    { key: "patientName", headerName: "Patient Name" },
    { key: "name", label: "Treatment Name" },
    { key: "description", label: "Description" },
    // { key: "cost", label: "Cost ($)" },
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
            <IconButton onClick={() => window.location.reload()}>
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
        open={editDialogOpen}
        onClose={() => {
          setEditDilaogOpen(false)
        }}
        onSave={handleSave}
        initialData={selectedTreatment}
      />

      <DeleteTreatmentDialog
            open={deleteDialogOpen}
            trData={selectedTreatment}
            onCancel={() => setDeleteDialogOpen(false)}
            onConfirm={handleDeleteConfirm}
        />

      {/* <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarInfo.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarInfo.message}
        </Alert>
      </Snackbar> */}
    </Box>
  );
}
