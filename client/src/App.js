import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import AddEvent from './components/AddEvent';
import AllEvents from './components/AllEvents';
import AllUsers from './components/AllUsers';
import Navbar from './components/Navbar';
import EventPage from './pages/EventPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<AllUsers />} />
        <Route path="/events" element={<AllEvents />} />
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/event/:id" element={<EventPage />} />
        {/* Events separate page */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;