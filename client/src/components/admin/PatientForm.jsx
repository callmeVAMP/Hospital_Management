// // // // import React from "react";
// // // // import { Dialog, DialogTitle, DialogContent, TextField, Button, Stack } from "@mui/material";

// // // // export default function AddPatient({ open, onClose, onSave }) {
// // // //   const [form, setForm] = React.useState({
// // // //     id: "",
// // // //     name: "",
// // // //     address: "",
// // // //     phone: "",
// // // //     gender: "",
// // // //   });

// // // //   const handleChange = (e) => {
// // // //     setForm({ ...form, [e.target.name]: e.target.value });
// // // //   };

// // // //   const handleSubmit = () => {
// // // //     onSave(form);
// // // //     onClose();
// // // //   };

// // // //   return (
// // // //     <Dialog open={open} onClose={onClose}>
// // // //       <DialogTitle>Add Patient</DialogTitle>
// // // //       <DialogContent>
// // // //         <Stack spacing={2} mt={1}>
// // // //           <TextField name="id" label="PID" onChange={handleChange} />
// // // //           <TextField name="name" label="Name" onChange={handleChange} />
// // // //           <TextField name="address" label="Address" onChange={handleChange} />
// // // //           <TextField name="phone" label="Phone" onChange={handleChange} />
// // // //           <TextField name="gender" label="Gender" onChange={handleChange} />
// // // //           <Button variant="contained" onClick={handleSubmit}>
// // // //             Save
// // // //           </Button>
// // // //         </Stack>
// // // //       </DialogContent>
// // // //     </Dialog>
// // // //   );
// // // // }

// // // import React, { useEffect, useState } from "react";
// // // import {
// // //   Dialog,
// // //   DialogTitle,
// // //   DialogContent,
// // //   TextField,
// // //   Button,
// // //   Stack,
// // // } from "@mui/material";

// // // export default function AddPatient({ open, onClose, onSave, initialData = null }) {
// // //   const [form, setForm] = useState({
// // //     id: "",
// // //     name: "",
// // //     address: "",
// // //     phone: "",
// // //     gender: "",
// // //   });

// // //   useEffect(() => {
// // //     if (initialData) {
// // //       setForm(initialData);
// // //     } else {
// // //       setForm({
// // //         id: "",
// // //         name: "",
// // //         address: "",
// // //         phone: "",
// // //         gender: "",
// // //       });
// // //     }
// // //   }, [initialData, open]);

// // //   const handleChange = (e) => {
// // //     setForm({ ...form, [e.target.name]: e.target.value });
// // //   };

// // //   const handleSubmit = () => {
// // //     onSave(form);
// // //     onClose();
// // //   };

// // //   return (
// // //     <Dialog open={open} onClose={onClose}>
// // //       <DialogTitle>{initialData ? "Edit Patient" : "Add Patient"}</DialogTitle>
// // //       <DialogContent>
// // //         <Stack spacing={2} mt={1}>
// // //           <TextField
// // //             name="id"
// // //             label="PID"
// // //             value={form.id}
// // //             onChange={handleChange}
// // //           />
// // //           <TextField
// // //             name="name"
// // //             label="Name"
// // //             value={form.name}
// // //             onChange={handleChange}
// // //           />
// // //           <TextField
// // //             name="address"
// // //             label="Address"
// // //             value={form.address}
// // //             onChange={handleChange}
// // //           />
// // //           <TextField
// // //             name="phone"
// // //             label="Phone"
// // //             value={form.phone}
// // //             onChange={handleChange}
// // //           />
// // //           <TextField
// // //             name="gender"
// // //             label="Gender"
// // //             value={form.gender}
// // //             onChange={handleChange}
// // //           />
// // //           <Button variant="contained" onClick={handleSubmit}>
// // //             Save
// // //           </Button>
// // //         </Stack>
// // //       </DialogContent>
// // //     </Dialog>
// // //   );
// // // }

// // // import React, { useEffect } from "react";
// // // import {
// // //   Dialog,
// // //   DialogTitle,
// // //   DialogContent,
// // //   TextField,
// // //   Button,
// // //   Stack,
// // // } from "@mui/material";

// // // export default function AddPatient({ open, onClose, onSave, initialData }) {
// // //   const [form, setForm] = React.useState({
// // //     id: "",
// // //     name: "",
// // //     address: "",
// // //     phone: "",
// // //     gender: "",
// // //   });

// // //   useEffect(() => {
// // //     if (initialData) {
// // //       setForm(initialData);
// // //     } else {
// // //       setForm({
// // //         id: "",
// // //         name: "",
// // //         address: "",
// // //         phone: "",
// // //         gender: "",
// // //       });
// // //     }
// // //   }, [initialData]);

// // //   const handleChange = (e) => {
// // //     setForm({ ...form, [e.target.name]: e.target.value });
// // //   };

// // //   const handleSubmit = () => {
// // //     if (!form.id) form.id = Date.now().toString(); // Generate ID if not present
// // //     onSave(form);
// // //     onClose();
// // //   };

// // //   return (
// // //     <Dialog open={open} onClose={onClose}>
// // //       <DialogTitle>{initialData ? "Edit Patient" : "Add Patient"}</DialogTitle>
// // //       <DialogContent>
// // //         <Stack spacing={2} mt={1}>
// // //           <TextField
// // //             name="id"
// // //             label="PID"
// // //             value={form.id}
// // //             onChange={handleChange}
// // //             disabled
// // //           />
// // //           <TextField
// // //             name="name"
// // //             label="Name"
// // //             value={form.name}
// // //             onChange={handleChange}
// // //           />
// // //           <TextField
// // //             name="address"
// // //             label="Address"
// // //             value={form.address}
// // //             onChange={handleChange}
// // //           />
// // //           <TextField
// // //             name="phone"
// // //             label="Phone"
// // //             value={form.phone}
// // //             onChange={handleChange}
// // //           />
// // //           <TextField
// // //             name="gender"
// // //             label="Gender"
// // //             value={form.gender}
// // //             onChange={handleChange}
// // //           />
// // //           <Button variant="contained" onClick={handleSubmit}>
// // //             Save
// // //           </Button>
// // //         </Stack>
// // //       </DialogContent>
// // //     </Dialog>
// // //   );
// // // }

// // import React, { useEffect, useState } from "react";
// // import {
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   TextField,
// //   Button,
// //   Stack,
// //   MenuItem,
// // } from "@mui/material";

// // const genderOptions = ["Male", "Female", "Other"];

// // export default function AddOrEditPatient({ open, onClose, onSave, initialData = null }) {
// //   const [form, setForm] = useState({
// //     id: "",
// //     name: "",
// //     address: "",
// //     phone: "",
// //     gender: "",
// //   });

// //   useEffect(() => {
// //     if (open) {
// //       setForm(initialData || {
// //         id: "",
// //         name: "",
// //         address: "",
// //         phone: "",
// //         gender: "",
// //       });
// //     }
// //   }, [open, initialData]);

// //   const handleChange = (e) => {
// //     setForm((prev) => ({
// //       ...prev,
// //       [e.target.name]: e.target.value,
// //     }));
// //   };

// //   const handleUpdate = () => {
// //     onSave(form);
// //     onClose();
// //   };

// //   return (
// //     <Dialog open={open} onClose={onClose}>
// //       <DialogTitle>{initialData ? "Edit Patient" : "Add Patient"}</DialogTitle>
// //       <DialogContent>
// //         <Stack spacing={2} mt={1}>
// //           <TextField
// //             name="id"
// //             label="PID"
// //             value={form.id}
// //             onChange={handleChange}
// //             fullWidth
// //           />
// //           <TextField
// //             name="name"
// //             label="Name"
// //             value={form.name}
// //             onChange={handleChange}
// //             fullWidth
// //           />
// //           <TextField
// //             name="address"
// //             label="Address"
// //             value={form.address}
// //             onChange={handleChange}
// //             fullWidth
// //           />
// //           <TextField
// //             name="phone"
// //             label="Phone"
// //             value={form.phone}
// //             onChange={handleChange}
// //             fullWidth
// //           />
// //           <TextField
// //             select
// //             name="gender"
// //             label="Gender"
// //             value={form.gender}
// //             onChange={handleChange}
// //             fullWidth
// //           >
// //             {genderOptions.map((option) => (
// //               <MenuItem key={option} value={option}>
// //                 {option}
// //               </MenuItem>
// //             ))}
// //           </TextField>
// //         </Stack>
// //       </DialogContent>
// //       <DialogActions>
// //         <Button onClick={onClose} color="inherit">
// //           Cancel
// //         </Button>
// //         <Button onClick={handleUpdate} variant="contained">
// //           Update
// //         </Button>
// //       </DialogActions>
// //     </Dialog>
// //   );
// // }


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

//   const handleUpdate = () => {
//     onSave(form);
//     onClose();
//   };

//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
//       <DialogTitle>{initialData ? "Edit Patient" : "Add Patient"}</DialogTitle>
//       <DialogContent>
//         <Stack spacing={2} mt={1}>
//           <TextField
//             name="id"
//             label="PID"
//             value={form.id}
//             onChange={handleChange}
//             fullWidth
//           />
//           <TextField
//             name="name"
//             label="Name"
//             value={form.name}
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
//           <TextField
//             name="phone"
//             label="Phone"
//             value={form.phone}
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
//               <MenuItem key={option} value={option}>
//                 {option}
//               </MenuItem>
//             ))}
//           </TextField>
//         </Stack>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="inherit">
//           Cancel
//         </Button>
//         <Button onClick={handleUpdate} variant="contained">
//           Update
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
} from "@mui/material";

const genderOptions = ["Male", "Female", "Other"];

export default function AddOrEditPatient({ open, onClose, onSave, initialData = null }) {
  const [form, setForm] = useState({
    id: "",
    name: "",
    address: "",
    phone: "",
    gender: "",
  });

  useEffect(() => {
    if (open) {
      setForm(
        initialData || {
          id: "",
          name: "",
          address: "",
          phone: "",
          gender: "",
        }
      );
    }
  }, [open, initialData]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = () => {
    onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialData ? "Edit Patient" : "Add Patient"}</DialogTitle>
      <DialogContent sx={{ px: 4, py: 3 }}>
        <Stack spacing={2} mt={1}>
          <TextField
            name="id"
            label="PID"
            value={form.id}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="name"
            label="Name"
            value={form.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="address"
            label="Address"
            value={form.address}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="phone"
            label="Phone"
            value={form.phone}
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
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleUpdate} variant="contained">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
