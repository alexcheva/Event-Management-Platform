import { useEffect, useState } from "react";
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
  Container,
} from "@mui/material";
import API from '../api/api';
import { Edit, Delete } from "@mui/icons-material";
// import EditModal from "./modals/EditModal";

export default function AllEvents() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  console.log("events", events)
  // const [eventFields, setEventFields] = useState([]);

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async () => {
    fetchEvents();
  }

  const endpoint = `${process.env.REACT_APP_API_URL}/api/events`
  // const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const fetchEvents = async () => {
    console.log("fetching events", endpoint)
    const res = await API.get('/events');
    console.log("res", res);
    // const data = await res.json();
    const data = res.data;
    console.log("data", data);
    setEvents(res.data);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        All Events
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "primary.main" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>ID</TableCell>
              <TableCell sx={{ color: "white" }}>Name</TableCell>
              <TableCell sx={{ color: "white" }}>Credits</TableCell>
              <TableCell sx={{ color: "white" }}>Total Enrolled</TableCell>
              <TableCell sx={{ color: "white" }}>Enrollment Limit</TableCell>
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
                  // onClick={() => handleDeleteOpen(event.id)}
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

      {/* <DeleteEventModal
        open={isDeleteOpen}
        event={events[selectedEvent-1]}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
      />

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
