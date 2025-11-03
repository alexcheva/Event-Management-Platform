import { Box, Typography, } from "@mui/material";
import AllEvents from "../components/AllEvents";
import AllUsers from "../components/AllUsers";
import ShowTickets from "../components/ShowTickets";
// import AtendeeDashboard from '../components/AtendeeDashboard';
// import OrganizerDashboard from '../components/OrganizerDashboard';
// import AdminDashboard from '../components/AdminDashboard';

export default function Dashboard() {
  //     if (!user) {
  //   return <p>Please log in.</p>;
  // }
  return (
    <Box sx={{ p: 4 }}>
      {/* <Typography variant="h4" gutterBottom>
        {user.role === "atendee"
          ? "Admin Dashboard"
          : "Organizer Dashboard"}
      </Typography> */}
      <AllEvents />
      <AllUsers />
      <ShowTickets />

      
      {/* <Box sx={{ p: 2 }}>
          {user.role === "admin" ? (
          <AdminDashboard user={user} />
          ) : (
          <AtendeeDashboard user={user} />
          )}
      </Box> */}
    </Box>
  );
}