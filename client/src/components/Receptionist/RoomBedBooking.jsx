import React, { useState, useEffect } from "react";
import axios from "axios";
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

export default function RoomBookingForm() {
  const [formData, setFormData] = useState({
    PName: "",
    PPhNo: "",
    RType: "",
    RNo: "",
    BedID: "",
  });

  const [roomsData, setRoomsData] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [availableBeds, setAvailableBeds] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/occupancy/available-rooms")
      .then((res) => {
        setRoomsData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching room data:", err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "RType") {
      setFormData((prev) => ({
        ...prev,
        RType: value,
        RNo: "",
        BedID: "",
      }));

      const filteredRooms = roomsData
        .filter((r) => r.RType === value)
        .reduce((acc, curr) => {
          if (!acc.find((r) => r.RNo === curr.RNo)) {
            acc.push(curr);
          }
          return acc;
        }, []);
      setAvailableRooms(filteredRooms);
      setAvailableBeds([]);
    } else if (name === "RNo") {
      setFormData((prev) => ({
        ...prev,
        RNo: value,
        BedID: "",
      }));

      const filteredBeds = roomsData.filter(
        (r) => r.RType === formData.RType && r.RNo.toString() === value
      );
      setAvailableBeds(filteredBeds);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookingData = {
      PName: formData.PName,
      PPhNo: formData.PPhNo,
      RType: formData.RType,
      RNo: parseInt(formData.RNo),
      BedID: parseInt(formData.BedID),
    };

    axios
      .post("http://localhost:3000/occupancy/book-room", bookingData)
      .then((res) => {
        console.log("Room booked successfully:", res.data);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        setFormData({
          PName: "",
          PPhNo: "",
          RType: "",
          RNo: "",
          BedID: "",
        });
        setAvailableRooms([]);
        setAvailableBeds([]);
      })
      .catch((err) => {
        console.error("Error booking room:", err);
        alert("Error booking room. Please try again.");
      });
  };

  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        mt: 0,
        backgroundColor: "#f0f4ff",
        pt: 10,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 800,
          width: "100%",
          p: 5,
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600 }}>
          Room & Bed Booking
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Collapse in={success}>
          <Alert severity="success" sx={{ mb: 3 }}>
            Room successfully booked!
          </Alert>
        </Collapse>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item size={6}>
              <TextField
                label="Patient Name"
                name="PName"
                value={formData.PName}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>

            <Grid item size={6}>
              <TextField
                label="Phone Number"
                name="PPhNo"
                value={formData.PPhNo}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>

            <Grid item size={4}>
              <TextField
                select
                label="Room Type"
                name="RType"
                value={formData.RType}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
              >
                {[...new Set(roomsData.map((room) => room.RType))].map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {availableRooms.length > 0 && (
              <Grid item size={4}>
                <TextField
                  select
                  label="Select Room"
                  name="RNo"
                  value={formData.RNo}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                >
                  {availableRooms.map((room) => (
                    <MenuItem key={room.RNo} value={room.RNo.toString()}>
                      Room {room.RNo}
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
                  name="BedID"
                  value={formData.BedID}
                  onChange={handleChange}
                  fullWidth
                  required
                  variant="outlined"
                >
                  {availableBeds.map((bed) => (
                    <MenuItem key={bed.BedID} value={bed.BedID.toString()}>
                      Bed {bed.BedID}
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
                sx={{
                  py: 1.5,
                  fontWeight: "bold",
                  backgroundColor: "#3f51b5",
                  "&:hover": {
                    backgroundColor: "#2c387e",
                  },
                }}
                disabled={
                  !formData.PName ||
                  !formData.PPhNo ||
                  !formData.RType ||
                  !formData.RNo ||
                  !formData.BedID
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



