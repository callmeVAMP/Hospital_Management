import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Grid,
  Alert,
  Collapse,
  Box,
} from "@mui/material";
import { Person } from "@mui/icons-material";

const roomTypes = ["Single", "Double", "Triple", "Deluxe", "Suite", "Ward", "Isolation"];

const BookRoomOccupancy = ({ open, onClose, onSave, occupancyData, roomsData }) => {
  console.log(occupancyData);
  console.log(roomsData);
  const [formData, setFormData] = useState({
    patientName: occupancyData?.patientName || "",
    phone: occupancyData?.phone || "",
    roomType: occupancyData?.roomType || "",
    selectedRoom: occupancyData?.selectedRoom || "",
    selectedBed: occupancyData?.selectedBed || "",
  });

  const [availableRooms, setAvailableRooms] = useState([]);
  const [availableBeds, setAvailableBeds] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (occupancyData) {
      setFormData({
        patientName: occupancyData.patientName || "",
        phone: occupancyData.phone || "",
        roomType: occupancyData.roomType || "",
        selectedRoom: occupancyData.selectedRoom || "",
        selectedBed: occupancyData.selectedBed || "",
      });
    }
  }, [occupancyData]);
  
  useEffect(() => {
    if (formData.roomType) {
      const roomsWithBeds = roomsData.filter(
        (room) => room.RType === formData.roomType
      );

      const groupedRooms = {};
      roomsWithBeds.forEach((room) => {
        if (!groupedRooms[room.RNo]) groupedRooms[room.RNo] = [];
        groupedRooms[room.RNo].push(room.BedID);
      });

      const available = Object.keys(groupedRooms).map((rno) => ({
        roomNumber: rno,
        beds: groupedRooms[rno].map((bid) => ({
          number: bid,
          available: true,
        })),
      }));

      setAvailableRooms(available);
    } else {
      setAvailableRooms([]);
    }
  }, [formData.roomType, roomsData]);

  useEffect(() => {
    const selected = availableRooms.find(
      (room) => room.roomNumber === formData.selectedRoom
    );
    const beds = selected?.beds.filter(
      (bed) => bed.available || bed.number === formData.selectedBed
    ) || [];
    setAvailableBeds(beds);
  }, [formData.selectedRoom, availableRooms, formData.selectedBed]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "roomType" && { selectedRoom: "", selectedBed: "" }),
      ...(name === "selectedRoom" && { selectedBed: "" }),
    }));
  };

  const handleSubmit = () => {
    const type = occupancyData ? "edit" : "add";
    onSave(formData, type);
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
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Person /> {occupancyData ? "Edit Room Occupancy" : "Book Room"}
      </DialogTitle>
      <DialogContent dividers>
        {/* <Collapse in={success}>
          <Alert severity="success" sx={{ mb: 2 }}>
            Room successfully {occupancyData ? "updated" : "booked"}!
          </Alert>
        </Collapse> */}
        <Box component="form">
          <Grid container spacing={2}>
            <Grid size={{xs:6}}>
              <TextField
                label="Patient Name"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid size={{xs:6}}>
              <TextField
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
          </Grid>

          {/* Room Type */}
          <Grid container mt={2} spacing={2}>  
            <Grid size={{xs:4}}>
              <TextField
                select
                label="Room Type"
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                fullWidth
                required
              >
                {roomTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>


            {formData.roomType && availableRooms.length === 0 && (
              <Grid item xs={12}>
                <Alert severity="warning">No available rooms/beds for selected type.</Alert>
              </Grid>
            )}
            {availableRooms.length > 0 && (
              <>
                <Grid size={{xs:4}}>
                  <TextField
                    select
                    label="Select Room"
                    name="selectedRoom"
                    value={formData.selectedRoom}
                    onChange={handleChange}
                    fullWidth
                    required
                    disabled={formData.roomType ? false: true }
                  >
                    {availableRooms.map((room) => (
                      <MenuItem key={room.roomNumber} value={room.roomNumber}>
                        Room {room.roomNumber}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid size={{xs:4}}>
                  <TextField
                    select
                    label="Select Bed"
                    name="selectedBed"
                    value={formData.selectedBed}
                    onChange={handleChange}
                    fullWidth
                    required
                    disabled={formData.roomType ? false: true }
                  >
                    {availableBeds.map((bed) => (
                      <MenuItem key={bed.number} value={bed.number}>
                        Bed {bed.number}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={
            !formData.patientName ||
            !formData.phone ||
            !formData.roomType ||
            !formData.selectedRoom ||
            !formData.selectedBed
          }
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookRoomOccupancy;