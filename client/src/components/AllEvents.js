import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  Container
} from "@mui/material";
import API from '../api/api';
import { Add, Edit, Delete } from "@mui/icons-material";
import { globals } from "../utils/globals";
// import EditModal from "./modals/EditModal";

export default function AllEvents() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  console.log("events", events)
  // const [eventFields, setEventFields] = useState([]);

  useEffect(() => {
    // fetchData()
    fetchEvents();
  }, []);

  // const fetchData = async () => {
    
  // }

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const fetchEvents = async () => {
    const res = await API.get('/events');
    console.log("res", res);
    const data = res.data;
    console.log("data", data);
    setEvents(res.data);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        All Events
      </Typography>
        <Button variant="contained" color="primary" sx={{ mb: 3 }} 
        onClick={
          () => console.log("add event button clicked")
          }
          component={Link} to="/add-event"
          >
          <Add />Add Event
        </Button>
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "primary.main" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>ID</TableCell>
              <TableCell sx={{ color: "white" }}>Event Name</TableCell>
              <TableCell sx={{ color: "white" }}>Event Date</TableCell>
              <TableCell sx={{ color: "white" }}>Location</TableCell>
              <TableCell sx={{ color: "white" }}>Price</TableCell>
              <TableCell sx={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.id}</TableCell>
                <TableCell>
                  {event.name}
                </TableCell>
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{event.price}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => {
                    console.log("edit button clicked", event.id);
                    console.log("selectedEvent", event)
                    setSelectedEvent(event);
                    }}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" 
                  onClick={() => 
                    {
                      console.log("delete button clicked, event id", event.id);
                      globals.handleDeleteEvent(event.id);
                      fetchEvents();
                    }}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {events.length === 0 && (
        <Box textAlign="center" mt={3}>
          <Typography>No events available.</Typography>
        </Box>
      )}

      {/* 
      {selectedEvent && (
        <EditModal
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          entityName="event"
          data={selectedEvent}
          fields={eventFields}
          endpoint={endpoint}
          onSave={()=>fetchEvents()}
        />
      )} */}
    </Container>
  );
}
