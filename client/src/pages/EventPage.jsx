import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Chip, Button, Divider, Stack } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceIcon from "@mui/icons-material/Place";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import dayjs from "dayjs";
import API from "../api/api";

const EventPage = () => {
  const { id } = useParams();
  console.log(id);
  const location = useLocation();
  const [event, setEvent] = useState(location.state || null);
  const formatDate = (d) => dayjs(d).format("MMM D, YYYY"); 
  const formatTime = (t) => dayjs(t, "HH:mm:ss").format("h:mm A");

  const fetchEvent = async () => {
    const res = await API.get(`/events/${id}`);
    console.log("res", res);
    const data = res.data;
    console.log("data", data);
    setEvent(res.data);
  };

  useEffect(() => {
      fetchEvent();
}, [id]);

  if (!event) return <div>Loading...</div>;

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", py: 4 }}>
      <Card sx={{ p: 3, borderRadius: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h3" fontWeight="bold" mb={2}>
            {event.name}
          </Typography>
          
          <Typography variant="body1" color="text.secondary" mb={3}>
            {event.description}
          </Typography>

          <Stack spacing={2}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <CalendarMonthIcon color="primary" />
              <Typography variant="h6">
                {formatDate(event.date)}
              </Typography>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1}>
              <AccessTimeIcon color="primary" />
              <Typography variant="h6">
                {formatTime(event.start_time)} – {formatTime(event.end_time)}
              </Typography>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1}>
              <PlaceIcon color="primary" />
              <Typography variant="h6">{event.location}</Typography>
            </Stack>
          </Stack>

          <Divider sx={{ my: 3 }} />

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Chip
              label={`$${event.price}`}
              color="success"
              sx={{ fontSize: "1.1rem", p: 2 }}
            />

            <Button
              variant="contained"
              size="large"
              startIcon={<EventAvailableIcon />}
              sx={{ borderRadius: 3, px: 4 }}
            >
              Register
            </Button>
          </Stack>

          <Typography variant="caption" display="block" mt={3} textAlign="right">
            {/* TODO Fetch creator name */}
            Event by {event.created_by}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EventPage;
