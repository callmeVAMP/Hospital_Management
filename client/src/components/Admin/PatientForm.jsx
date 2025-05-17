// import React, { useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   Stack,
//   MenuItem,
// } from "@mui/material";

// const genderOptions = ["Male", "Female", "Other"];

// export default function AddOrEditPatient({ open, onClose, onSave, initialData = null }) {
//   const [form, setForm] = useState({
//     id: "",
//     name: "",
//     address: "",
//     phone: "",
//     gender: "",
//     email: ""
//   });

//   useEffect(() => {
//     if (open) {
//       setForm(
//         initialData || {
//           id: "",
//           name: "",
//           address: "",
//           phone: "",
//           gender: "",
//           email: ""
//         }
//       );
//     }
//   }, [open, initialData]);

//   const handleChange = (e) => {
//     setForm((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = () => {
//     if (!form.id || !form.name) {
//       alert("Please fill required fields: Patient's ID, Patient's Name");
//       return;
//     }
//     if (onSave) {
//       onSave(form);
//     }
//     onClose();
//   };

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
//       <DialogTitle>{initialData ? "Edit Patient" : "Add Patient"}</DialogTitle>
//       <DialogContent sx={{ px: 4, py: 3 }}>
//         <Stack spacing={2} mt={1}>
//           <TextField
//             name="id"
//             label="ID *"
//             value={form.id}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             name="name"
//             label="Name *"
//             value={form.name}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             select
//             name="gender"
//             label="Gender"
//             value={form.gender}
//             onChange={handleChange}
//             fullWidth
//           >
//             {genderOptions.map((option) => (
//               <MenuItem key={option} value={option.toLowerCase()}>
//                 {option}
//               </MenuItem>
//             ))}
//           </TextField>
//           <TextField
//             name="phone"
//             label="Phone"
//             value={form.phone}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             name="email"
//             label="Email"
//             value={form.email}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             name="address"
//             label="Address"
//             value={form.address}
//             onChange={handleChange}
//             fullWidth
//           />
//         </Stack>
//       </DialogContent>
//       <DialogActions sx={{ px: 3, pb: 3 }}>
//         <Button onClick={onClose} color="inherit">
//           Cancel
//         </Button>
//         <Button onClick={handleSubmit} variant="contained">
//           {initialData ? "Update" : "Add"}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// }


import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  MenuItem,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  DialogContentText,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { History } from "@mui/icons-material";

const genderOptions = ["Male", "Female", "Other"];

export default function PatientForm({ open, onClose, onSave, initialData = null }) {
  const [form, setForm] = useState({
    id: "",
    name: "",
    address: "",
    phone: "",
    gender: "",
    email: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setForm(
        initialData || {
          id: "",
          name: "",
          address: "",
          phone: "",
          gender: "",
          email: ""
        }
      );
    }
    setErrors({});
  }, [open, initialData]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev, [e.target.name]: e.target.value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  }; 

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Required fields validation
    // if (!doctor.id) {
    //   newErrors.id = "ID is required";
    //   isValid = false;
    // }
    // if (!doctor.name) {
    //   newErrors.name = "Name is required";
    //   isValid = false;
    // }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
  
    if (!validateForm()) return; 
    // const transformedData = {
    //   ...doctor,
    //   // Force gender to match expected format
    //   gender: doctor.gender || "Male"
    // };
    onSave(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {initialData ? "Edit Patient" : "Add Patient"}
        {initialData && (
          <IconButton
            onClick={() => setShowHistoryModal(true)}
            sx={{ float: "right" }}
          >
            <History />
          </IconButton>
        )}
        </DialogTitle>
      <DialogContent sx={{ px: 4, py: 3 }}>
        <Stack spacing={2} mt={1}>
          <TextField
            name="id"
            label="ID *"
            value={form.id}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="name"
            label="Name *"
            value={form.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            select
            name="gender"
            label="Gender"
            value={form.gender}
            onChange={handleChange}
            fullWidth
          >
            {genderOptions.map((option) => (
              <MenuItem key={option} value={option.toLowerCase()}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name="phone"
            label="Phone"
            value={form.phone}
            onChange={handleChange}
            fullWidth
          />
          {/* <TextField
            name="email"
            label="Email"
            value={form.email}
            onChange={handleChange}
            fullWidth
          /> */}
          <TextField
            name="address"
            label="Address"
            value={form.address}
            onChange={handleChange}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained"
        disabled={!form.id || !form.name }
        
        >
          {initialData ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}