import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSnackBarInfo } from "../../Features/snackbarSlice";
import AddPatientDialog from "./AddPatientDialog";

// const operations = [
//   {
//     id: 1,
//     treatmentID: "OP1234",
//     startDate: "2024-04-15",
//     startTime: "09:00 AM",
//     endDate: "2024-04-15",
//     endTime: "11:00 AM",
//     patientName: "John Doe",
//     patientPhone: "123-456-7890",
//     professionals: ["Dr. Smith", "Dr. Allen"],
//     reportUrl: "https://example.com/report1.pdf",
//     opType: 'Spenal Surgery'
//   },
//   {
//     id: 2,
//     treatmentID: "OP5678",
//     startDate: "2024-04-16",
//     startTime: "01:00 PM",
//     endDate: "2024-04-16",
//     endTime: "03:00 PM",
//     patientName: "Jane Smith",
//     patientPhone: "987-654-3210",
//     professionals: ["Dr. Lee", "Dr. Johnson"],
//     reportUrl: "https://example.com/report2.pdf",
//     opType: 'Spenal Surgery'
//   },
// ];


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
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [openAddPatient, setAddOpenPatient] = useState(false);

  const [openAddOperation, setAddOpenOperation] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [editDialogOpen, setEditDilaogOpen]=useState(false);
  const [operations,setOperations]=useState([]);
  const [activeOp,setActiveOp]=useState({});

  // const [snackBarInfo,setSnackBarInfo]=useState({'message':'','severity':''})
  // const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [professionalsList,setProfessionalsList]=useState([]);

  const fetchProfessionals=async()=>{
    try {
      const res=await axios.get(`http://localhost:8000/admin/all_employees`)
      console.log("hprof",res);
      setProfessionalsList(res?.data);

    } catch (error) {
      console.log(error)
      dispatch(setSnackBarInfo({message:`Error loading HealthCare Professionals Data`,severity:'error',open:true}))
      
    }
  }


  const fetchAllOperations=async()=>{
    
    

    try {
      const res=await axios.get(`http://localhost:8000/operation/all`);
      console.log(res?.data);

      const formattedOps = res?.data.map((op,index) => ({
        id:index+1,
        treatmentID: op.TrID,
        patientName: op.PName,
        patientPhone: op.PPhNo,
        startDate: dayjs(op.StDateTime).format("YYYY-MM-DD"),
        startTime: dayjs(op.StDateTime).format("hh:mm A"),
        endDate: dayjs(op.EndDateTime).format("YYYY-MM-DD"),
        endTime: dayjs(op.EndDateTime).format("hh:mm A"),
        professionals: [op.HName],
        professionalsHID: [op.HID],
        reportUrl: op.FilePath,
        opType: op.TrName,
        appID:op.AppID
      }));
      console.log("formatted")
      console.log(formattedOps)

      const mergedMap = new Map();

      formattedOps.forEach(item => {
          const key = String(item.treatmentID); // ensure uniform key type
          if (!mergedMap.has(key)) {
              mergedMap.set(key, {
                  ...item,
              });
          } else {
              const existing = mergedMap.get(key);
              if (!existing.professionals.includes(item.professionals[0])) {
                  existing.professionals.push(item.professionals[0]);
                  existing.professionalsHID.push(item.professionalsHID[0]);
              }
          }
      });

      const mergedList = Array.from(mergedMap.values());
      console.log(mergedList);

      setOperations(mergedList)

    } catch (error) {
      console.log(error)
      dispatch(setSnackBarInfo({message:`Failed to Fetch Operations!`,severity:'error',open:true}))
    }
  }
  
  const handleRefreshTable = () => {
    fetchAllOperations();
  };
  
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

  const handleDeleteConfirm = async(trID) => {
    // perform delete using selectedRoom.id or something
    console.log("Deleting Room:", selectedOperation);

    try {
      const res=await axios.delete(`http://localhost:8000/operation/delete/${trID}`);
      console.log(res);
      if(res?.data?.success){
        dispatch(setSnackBarInfo({message:`Deleted Operation Successfully! Updating Operations here`,severity:'success',open:true}))
        fetchAllOperations()
      }
    } catch (error) {
      console.log(error)
      dispatch(setSnackBarInfo({message:`Failed to Delete Operation!`,severity:'error',open:true}))
    }
    


    setDeleteDialogOpen(false);

    // setSnackbarOpen(true);
    // setSnackBarInfo({'message':'Deleted Successfully','severity':'error'})
    
  };


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
    setActiveOp(data);
    console.log('Operation Data:', data,type);  
    if(type=="add"){

      let res;
      let res2;
      let res3;

      try {
          res=await axios.post(`http://localhost:8000/operation/insert_operation/`,{
          
            StDateTime:`${formatDateTime(data?.startDate,data?.startTime)}`,
            EndDateTime:`${formatDateTime(data?.endDate,data?.endTime)}`,
            TrName:data?.opType,
            AppID:data?.appID,
            PName:data?.patientName,
            PPhNo:data?.patientPhone
          
        }) 
        console.log(res);
        console.log(res?.status," status")

        if(!res?.data?.patientFound){
          setAddOpenOperation(false)
          setAddOpenPatient(true);

          return;
          

        }

        if(res?.data?.success){
          data.treatmentID=res?.data?.TrID;
          console.log(data.treatmentID)
        }

        
        
        // else if(res?.data?.success){
        //   data.treatmentID=res?.data?.TrID;
        //   console.log(data.treatmentID)
        // }
      } catch (error) {

        
        console.log(error)

        if(res?.status==400){
          
          // open dialog of insert patient

          // setAddOpenPatient(true)
          console.log("activeOp ----------------",activeOp)





        }
        dispatch(setSnackBarInfo({message:`Update Operation Failed!`,severity:'error',open:true}))
      }

      try {
          console.log("HealthcareProf")

          res2=await axios.post(`http://localhost:8000/operation/update_healthcare_prof/${data.treatmentID}`,{
          
            hid_list:data?.professionalsHID,
            
          
        }) 
        console.log(res2);
      } catch (error) {
        console.log(error)
        dispatch(setSnackBarInfo({message:`Failed to update Healthcare Professionals!`,severity:'error',open:true}))
      }

      //for report
      if(data?.reportFile){
        console.log("upload",data?.reportFile)
        const renamedFile = new File([data?.reportFile], `${data?.treatmentID}-report.pdf`, { type: data?.reportFile.type });

        const formData = new FormData();
        formData.append("file", renamedFile);          // The key must match multer's 'upload.single("file")'
        formData.append("TrID", data?.treatmentID); 

        console.log(formData)

        try {
            res3=await axios.post(`http://localhost:8000/report/upload_operation_report`,formData,
            {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            })
            console.log(res)
            if(res3?.data?.success) {
                // dispatch(setSnackBarInfo({message:`Uploaded Report Successfully! Updating Operations here`,severity:'success',open:true}))
                fetchAllOperations()
            }
        } catch (error) {
          dispatch(setSnackBarInfo({message:`Some Error Occured in Uploading`,severity:'error',open:true}))
          console.log(error)
        }
      }
      

      if(res?.data?.success && res2?.data?.success && res3?.data?.success){
        fetchAllOperations();
        dispatch(setSnackBarInfo({message:`Uploaded Operation Successfully! Updating Operations here`,severity:'success',open:true}))
      }


        // setSnackbarOpen(true);
        // setSnackBarInfo({'message':'Added Operation Information Successfully','severity':'success'})
    }   
    else{
      let res;
      let res2;
      let res3;

        try {
           res=await axios.post(`http://localhost:8000/operation/update_operation/${data.treatmentID}`,{
            
              StDateTime:`${formatDateTime(data?.startDate,data?.startTime)}`,
              EndDateTime:`${formatDateTime(data?.endDate,data?.endTime)}`,
              TrName:data?.opType
            
          }) 
          console.log(res);
        } catch (error) {
          console.log(error)
        }

        try {
           res2=await axios.post(`http://localhost:8000/operation/update_healthcare_prof/${data.treatmentID}`,{
            
              hid_list:data?.professionalsHID,
              
            
          }) 
          console.log(res2);
        } catch (error) {
          console.log(error)
        }

        //for report
        if(data?.reportFile){
          console.log("upload",data?.reportFile)
          const renamedFile = new File([data?.reportFile], `${data?.treatmentID}-report.pdf`, { type: data?.reportFile.type });

          const formData = new FormData();
          formData.append("file", renamedFile);          // The key must match multer's 'upload.single("file")'
          formData.append("TrID", data?.treatmentID); 

          console.log(formData)

          try {
             res3=await axios.post(`http://localhost:8000/report/upload_operation_report`,formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data"
                }
              })
              console.log(res)
              if(res3?.data?.success) {
                  dispatch(setSnackBarInfo({message:`Uploaded Report Successfully! Updating Operations here`,severity:'success',open:true}))
                  fetchAllOperations()
              }
          } catch (error) {
            dispatch(setSnackBarInfo({message:`Some Error Occured in Uploading`,severity:'error',open:true}))
            console.log(error)
          }
        }
        

        if(res?.data?.success && res2?.data?.success){
          fetchAllOperations();
          dispatch(setSnackBarInfo({message:`Uploaded Operation Successfully! Updating Operations here`,severity:'success',open:true}))
        }

        

        // setSnackbarOpen(true);
        // setSnackBarInfo({'message':'Updated Operation Information Successfully','severity':'success'})
    }
  };

  const handleSavePatient=async(data)=>{
    console.log(data);

    


    
  }

  useEffect(()=>{
    fetchAllOperations()
    fetchProfessionals()
  },[navigate])
  
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
    op.patientName.includes(searchQuery.toLowerCase())
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
        params.row?.professionals.length>0 && params.row?.professionals[0] &&
        <Box display="flex" flexWrap="wrap" gap={0.5}>
          {params.row?.professionals.map((name, index) => {
            // const bg = getRandomColor(name);
            // const text = darkenColor(bg);
            return (
              <Chip
                key={index}
                label={name}
                // sx={{ backgroundColor: bg, color: text, fontWeight: 600 }}
                sx={{ fontWeight: 600 }}
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
      renderCell: (params) => ( params?.row?.reportUrl &&
        <Button
          variant="outlined"
          size="small"
          onClick={() =>window.open(`http://localhost:5173/${params.row.reportUrl}`, "_blank")}
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
        // getRowHeight={() => 'auto'}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
        apiRef={apiRef}
        rows={filteredOperations}
        columns={columns}
        pageSize={20}
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
      <AddOrEditOperation open={editDialogOpen} onClose={() => setEditDilaogOpen(false)} onSave={handleSave} operationData={selectedOperation} professionalsList={professionalsList} />
      
      {/* Add op */}
      <AddOrEditOperation open={openAddOperation} onClose={() => setAddOpenOperation(false)} onSave={handleSave} professionalsList={professionalsList}/>
        

      {/* Delete Dialog */}
        <DeleteOperationDialog
            open={deleteDialogOpen}
            opData={selectedOperation}
            onCancel={() => setDeleteDialogOpen(false)}
            onConfirm={handleDeleteConfirm}
        />

        {/* add patient */}
        <AddPatientDialog
        open={openAddPatient}
        onClose={() => setAddOpenPatient(false)}
        onSave={handleSavePatient}
        patientData={activeOp}
      />

      {/* Snackbar code */}
      {/* <AlertBar
            open={snackbarOpen}
            onClose={() => setSnackbarOpen(false)}
            message={snackBarInfo?.message}
            severity={snackBarInfo?.severity} // Can be 'success', 'error', 'warning', 'info'
            duration={3000}
        /> */}

    </Box>
  );
}
