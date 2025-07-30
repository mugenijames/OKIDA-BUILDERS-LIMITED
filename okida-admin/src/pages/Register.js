// src/pages/Register.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import "./Register.css"
const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const success = await register(form.username, form.email, form.password);
    if (success) {
      alert('Registration successful. Please log in.');
      navigate('/login');
    } else {
      setError('Registration failed.');
    }
  };

  return (
    <div className='register-form'>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" value={form.username} onChange={handleChange} placeholder="Username" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          autoComplete='on'
          required
        />
        <button type="submit">Register</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <h2>Already have an account?<a href='login'>Login</a></h2>
      </form>
    </div>
  );
};

export default Register;
