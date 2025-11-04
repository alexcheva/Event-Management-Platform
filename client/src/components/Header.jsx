import { useContext } from 'react';
import { Typography, Button, Box } from "@mui/material";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext.jsx';

export default function Header(){
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <Box sx={{
        maxWidth: 800,
        mx: 'auto',
        mt: 10,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        textAlign: 'center',
      }}>
      <ConfirmationNumberIcon  sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
      <Typography variant="h3" gutterBottom>
      Welcome to Eventura
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Attend, organize and manage events
      </Typography>
        <Button type="submit"
          variant="contained"
          sx={{ m: 2 }} startIcon={<LoginIcon />} onClick={() => navigate("/login")}>
          Login
        </Button>
        <Button type="submit"
          variant="contained"
          sx={{ m: 2 }} startIcon={<PersonAddAltIcon />} onClick={() => navigate("/register")}>
          Register
        </Button>
    </Box>
  );
}