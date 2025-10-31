import { useState } from 'react';
import API from '../api/api';
import AuthForm from '../components/AuthForm';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
    } catch (err) {
      alert(err.response?.data?.message || 'Error logging in');
    }
  };

  return (
    <AuthForm
      title="Login"
      fields={[
        { label: 'Email', name: 'email', onChange: handleChange },
        { label: 'Password', name: 'password', type: 'password', onChange: handleChange },
      ]}
      onSubmit={handleSubmit}
    />
  );
}
