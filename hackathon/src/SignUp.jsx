import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './loginStyle.css'

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contact: '',
    community: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/signup', formData);
      alert('User created successfully');
      navigate('/login'); // Redirect to login page after successful signup
    } catch (error) {
      if (error.response && error.response.data === 'Email already exists') {
        setErrorMessage('Email already exists');
      } else {
        setErrorMessage('User already exists or other error');
      }
    }
  };

  return (
    <section className="header bg-cover bg-center">
      <div className="signuppage flex justify-center items-center h-screen">
        <div className="form-box bg-white p-10 max-w-md w-full rounded-lg shadow-lg">
          <h1 className="text-3xl mb-8 text-green-600">Sign Up</h1>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="input-place mb-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>
            <div className="input-place mb-4">
              <input
                type="number"
                name="contact"
                placeholder="Contact"
                value={formData.contact}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>
            <div className="input-place mb-4">
              <input
                type="text"
                name="community"
                placeholder="Community"
                value={formData.community}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>
            <div className="input-place mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>
            <div className="input-place mb-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>
            <p className="text-sm mb-4">
              Already a member?{' '}
              <button type="button" className="text-blue-500" onClick={() => navigate('/login')}>
                Sign In
              </button>
            </p>
            <div className="btn-des">
              <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-lg">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
