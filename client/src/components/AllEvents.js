import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import dayjs from "dayjs";
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
import { Visibility, Add, Edit, Delete } from "@mui/icons-material";
import { globals } from "../utils/globals";
import EditModal from "./modals/EditModal";
import { eventFields } from "../utils/constants";
// import EventsMasonry from "./EventMasonry";

import customParseFormat from 'dayjs/plugin/customParseFormat';


export default function AllEvents() {
  
  dayjs.extend(customParseFormat);
  
  const timeString = "21:28:00";
  const time = dayjs(timeString, "HH:mm:ss");
  
  if (time.isValid()) {
    console.log("Parsed time:", time.format("h:mm A"));
    // Output: Parsed time: 21:28:00
  } else {
    console.log("Parsed time Invalid Date");
  }
  const navigate = useNavigate();

  const handleViewClick = (event_id) => {
    console.log("handleViewClick event_id",event_id)
    navigate(`/event/${event_id}`, { state: event_id });
  };
  const formatDate = (d) => dayjs(d).format("MMM D, YYYY"); 
  // Fix time
  const formatTime = (t) => dayjs(t, "HH:mm:ss").format("h:mm A");
  console.log(formatTime("17:05:00"));
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  console.log("events", events)

  useEffect(() => {
    fetchEvents();
  }, []);

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
              <TableCell sx={{ color: "white" }}>Starts</TableCell>
              <TableCell sx={{ color: "white" }}>Ends</TableCell>
              <TableCell sx={{ color: "white" }}>Location</TableCell>
              <TableCell sx={{ color: "white" }}>Description</TableCell>
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
                  <IconButton color="primary" onClick={() => {
                    console.log("view details button clicked", event.id);
                    console.log("selectedEvent", event)
                    handleViewClick(event.id);
                    }}>
                    <Visibility />
                  </IconButton>
                </TableCell>
                <TableCell>{formatDate(event.date)}</TableCell>
                <TableCell>{formatTime(event.start_time)}</TableCell>
                <TableCell>{formatTime(event.end_time)}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{event.description}</TableCell>
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
      {/* {events.map((event)  => (<EventPage event={event}/>))} */}
      
      {/* {events.map((event)  => ())} */}
      {/* <EventsMasonry events={events} /> */}
      {/* <DataGrid
      rows={events}
      columns={columns}
      onRowClick={handleRowClick}
    /> */}

      {events.length === 0 && (
        <Box textAlign="center" mt={3}>
          <Typography>No events available.</Typography>
        </Box>
      )}

      
      {selectedEvent && (
        <EditModal
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          entityName="event"
          data={selectedEvent}
          fields={eventFields}
          endpoint={`/events/${selectedEvent.id}`}
          onSave={()=>fetchEvents()}
        />
      )}
    </Container>
  );
}
