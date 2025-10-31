import { useState } from 'react';
import API from '../api/api';
import AuthForm from '../components/AuthForm';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      alert('Registration successful!');
    } catch (err) {
      alert(err.response?.data?.message || 'Error registering');
    }
  };

  return (
    <AuthForm
      title="Register"
      fields={[
        { label: 'Name', name: 'name', onChange: handleChange },
        { label: 'Email', name: 'email', onChange: handleChange },
        { label: 'Password', name: 'password', type: 'password', onChange: handleChange },
      ]}
      onSubmit={handleSubmit}
    />
  );
}
