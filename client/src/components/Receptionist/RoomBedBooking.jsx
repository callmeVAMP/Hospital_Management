import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Typography,
  Paper,
  Box,
  Divider,
  Alert,
  Collapse,
} from "@mui/material";

const initialData = {
  Public: [
    { roomNumber: "P101", beds: [{ number: "B1", available: true }, { number: "B2", available: false }] },
    { roomNumber: "P102", beds: [{ number: "B1", available: true }] },
  ],
  Private: [
    { roomNumber: "PV201", beds: [{ number: "B1", available: true }] },
  ],
};

export default function RoomBookingForm() {
  const [formData, setFormData] = useState({
    patientName: "",
    phone: "",
    roomType: "",
    selectedRoom: "",
    selectedBed: "",
  });

  const [roomsData] = useState(initialData);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [availableBeds, setAvailableBeds] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (name === "roomType") {
      const rooms = roomsData[value].filter(
        (room) => room.beds.some((bed) => bed.available)
      );
      setAvailableRooms(rooms);
      setFormData({ ...formData, roomType: value, selectedRoom: "", selectedBed: "" });
      setAvailableBeds([]);
    }

    if (name === "selectedRoom") {
      const selected = availableRooms.find((room) => room.roomNumber === value);
      const beds = selected?.beds.filter((bed) => bed.available) || [];
      setAvailableBeds(beds);
      setFormData({ ...formData, selectedRoom: value, selectedBed: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Room Booked:", formData);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    setFormData({
      patientName: "",
      phone: "",
      roomType: "",
      selectedRoom: "",
      selectedBed: "",
    });
    setAvailableRooms([]);
    setAvailableBeds([]);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f0f4ff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Paper elevation={4} sx={{ maxWidth: 700, width: "100%", p: 4, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Room & Bed Booking
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Collapse in={success}>
          <Alert severity="success" sx={{ mb: 3 }}>
            Room successfully booked!
          </Alert>
        </Collapse>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item size={6}>
              <TextField
                label="Patient Name"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item size={6}>
              <TextField
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item size={4}>
              <TextField
                select
                label="Room Type"
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                fullWidth
                required
              >
                <MenuItem value="Public">Public</MenuItem>
                <MenuItem value="Private">Private</MenuItem>
              </TextField>
            </Grid>

            {availableRooms.length > 0 && (
              <Grid item size ={4}>
                <TextField
                  select
                  label="Select Room"
                  name="selectedRoom"
                  value={formData.selectedRoom}
                  onChange={handleChange}
                  fullWidth
                  required
                >
                  {availableRooms.map((room) => (
                    <MenuItem key={room.roomNumber} value={room.roomNumber}>
                      Room {room.roomNumber}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            )}

            {availableBeds.length > 0 && (
              <Grid item size={4}>
                <TextField
                  select
                  label="Select Bed"
                  name="selectedBed"
                  value={formData.selectedBed}
                  onChange={handleChange}
                  fullWidth
                  required
                >
                  {availableBeds.map((bed) => (
                    <MenuItem key={bed.number} value={bed.number}>
                      Bed {bed.number}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            )}

            <Grid item size={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={
                  !formData.patientName ||
                  !formData.phone ||
                  !formData.roomType ||
                  !formData.selectedRoom ||
                  !formData.selectedBed
                }
              >
                Book Room
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}





// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   Grid,
//   MenuItem,
//   Typography,
//   Paper,
//   Box,
//   Divider,
//   Alert,
//   Collapse,
// } from "@mui/material";

// export default function RoomBookingForm() {
//   const [formData, setFormData] = useState({
//     patientName: "",
//     phoneNumber: "",
//     roomType: "",
//     roomsAvailable: "",
//     bedsAvailable: "",
//   });

//   const [success, setSuccess] = useState(false);

//   // Simulated room data
//   const roomData = {
//     Public: {
//       roomsAvailable: 10,
//       bedsAvailable: 30,
//     },
//     Private: {
//       roomsAvailable: 4,
//       bedsAvailable: 4,
//     },
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const updatedData = { ...formData, [name]: value };

//     if (name === "roomType" && roomData[value]) {
//       updatedData.roomsAvailable = roomData[value].roomsAvailable;
//       updatedData.bedsAvailable = roomData[value].bedsAvailable;
//     }

//     setFormData(updatedData);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Room Booking Details:", formData);
//     setSuccess(true);

//     // Reset form after submission
//     setFormData({
//       patientName: "",
//       phoneNumber: "",
//       roomType: "",
//       roomsAvailable: "",
//       bedsAvailable: "",
//     });

//     setTimeout(() => {
//       setSuccess(false);
//     }, 3000);
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         backgroundColor: "#f0f4f8",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         p: 3,
//       }}
//     >
//       <Paper elevation={4} sx={{ maxWidth: 700, width: "100%", p: 4, borderRadius: 3 }}>
//         <Typography variant="h4" align="center" gutterBottom>
//           Room and Bed Booking
//         </Typography>

//         <Divider sx={{ mb: 3 }} />

//         <Collapse in={success}>
//           <Alert severity="success" sx={{ mb: 3 }}>
//             Room successfully booked!
//           </Alert>
//         </Collapse>

//         <Box component="form" onSubmit={handleSubmit}>
//           <Grid container spacing={2}>
//             <Grid item size={6}>
//               <TextField
//                 label="Patient Name"
//                 name="patientName"
//                 value={formData.patientName}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//               />
//             </Grid>

//             <Grid item size={6}>
//               <TextField
//                 label="Phone Number"
//                 name="phoneNumber"
//                 value={formData.phoneNumber}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//               />
//             </Grid>

//             <Grid item size={3}>
//               <TextField
//                 select
//                 label="Room Type"
//                 name="roomType"
//                 value={formData.roomType}
//                 onChange={handleChange}
//                 fullWidth
//                 required
//               >
//                 <MenuItem value="Public">Public</MenuItem>
//                 <MenuItem value="Private">Private</MenuItem>
//               </TextField>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Rooms Available"
//                 name="roomsAvailable"
//                 value={formData.roomsAvailable}
//                 fullWidth
//                 disabled
//               />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Beds Available"
//                 name="bedsAvailable"
//                 value={formData.bedsAvailable}
//                 fullWidth
//                 disabled
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 size="large"
//                 fullWidth
//                 sx={{ py: 1.5 }}
//               >
//                 Book Room
//               </Button>
//             </Grid>
//           </Grid>
//         </Box>
//       </Paper>
//     </Box>
//   );
// }
