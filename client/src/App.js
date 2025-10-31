import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AppBar, Toolbar, Button } from '@mui/material';
import Dashboard from './pages/Dashboard';
// import AddEvent from './components/AddEvent';
import AllEvents from './components/AllEvents';
import AllUsers from './components/AllUsers';

function App() {
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/login">Login</Button>
          <Button color="inherit" component={Link} to="/register">Register</Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<AllUsers />} />
        <Route path="/events" element={<AllEvents />} />
        {/* <Route path="/add-event" element={<AddEvent />} /> */}
        {/* Events separate page */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;