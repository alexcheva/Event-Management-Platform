import { useState, useContext } from 'react';
import {  Snackbar,
  Alert,
} from "@mui/material";
import API from '../api/api';
import AuthForm from '../components/AuthForm';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext.jsx';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      login(res.data.token, res.data.user);
      setSnackbar({ open: true, message: "Login successful!!", severity: "success" });
      navigate("/dashboard");
    } catch (err) {
      setSnackbar({ open: true, message: "Error logging in: " + err.response?.data?.message, severity: "error" });
    }
  };

  return (
    <>
    <AuthForm
      title="Login"
      fields={[
        { label: 'Email', name: 'email', onChange: handleChange },
        { label: 'Password', name: 'password', type: 'password', onChange: handleChange },
      ]}
      onSubmit={handleSubmit}
      />
    {/* Snackbar for notifications */}
    <Snackbar
      open={snackbar.open}
      autoHideDuration={3000}
      onClose={() => setSnackbar({ ...snackbar, open: false })}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
      <Alert
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
        {snackbar.message}
      </Alert>
    </Snackbar>
  </>
  );
}
