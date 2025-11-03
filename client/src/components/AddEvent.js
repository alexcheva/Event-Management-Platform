import { useState, useContext } from "react";
import {
  TextField, Button, Box, Typography, Paper
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
const AddEvent = () => {

  const { notify } = useNotification();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState(dayjs());
  const [startTime, setStartTime] = useState(dayjs());
  const [endTime, setEndTime] = useState(dayjs());

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: title,
      location,
      description,
      price,
      date: date.format("YYYY-MM-DD"),
      start_time: startTime.format("HH:mm"),
      end_time: endTime.format("HH:mm"),
      created_by: user.id,
    };
    
    console.log("handle submit called", payload)
    try {
      await API.post(`/events`, payload, { withCredentials: true });
      notify("Event created successfully!", "success");
      // alert("Event created");

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      console.log("Error creating event: " + err.response?.data?.message);
      notify("Failed to create event", "error");

    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper sx={{ maxWidth: 500, p: 3, mx: "auto", mt: 4 }}>
        <Typography variant="h5" mb={2}>Add New Event</Typography>

        <Box component="form" onSubmit={handleSubmit}>

          <TextField
            fullWidth label="Event Title" required
            value={title} onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth label="Location" required
            value={location} onChange={(e) => setLocation(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth multiline rows={3}
            label="Event Description"
            value={description} onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 2 }}
          />

          <DatePicker required
            label="Event Date"
            value={date}
            onChange={setDate}
            sx={{ mb: 2, width: "100%" }}
          />

          <TimePicker required
            label="Start Time"
            value={startTime}
            onChange={setStartTime}
            sx={{ mb: 2, width: "100%" }}
          />

          <TimePicker
            label="End Time"
            value={endTime}
            onChange={setEndTime}
            sx={{ mb: 2, width: "100%" }}
          />

          <TextField
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          // required
          sx={{ mb: 2, width: "100%" }}
        />


          <Button type="submit" variant="contained" fullWidth>
            Create Event
          </Button>

        </Box>
      </Paper>
    </LocalizationProvider>
  );
};

export default AddEvent;