import { useContext } from "react";
import { AppBar, Toolbar, Button, Typography, Box, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import LoginIcon from "@mui/icons-material/Login";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log("user", user)

  return (
    <AppBar position="static">
      <Toolbar>

        {/* Logo / Title */}
        <IconButton color="inherit" onClick={() => navigate("/dashboard")}>
          <ConfirmationNumberIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1, ml: 1 }}>
          Eventura
        </Typography>

        {user ? (
          <Box display="flex" alignItems="center">
            <Typography sx={{ mr: 2 }}>
              Welcome, {user.role}!
            </Typography>

            <Button
              color="inherit"
              startIcon={<LogoutIcon />}
              onClick={logout}
              navigate={"/login"}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <>
            <Button color="inherit" startIcon={<LoginIcon />} onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button color="inherit" startIcon={<PersonAddAltIcon />} onClick={() => navigate("/register")}>
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
