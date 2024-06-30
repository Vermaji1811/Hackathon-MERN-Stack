import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './loginStyle.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
      const res = await axios.post('http://localhost:5000/login', { email: formData.email, password: formData.password });
      localStorage.setItem('token', res.data.token);
      navigate('/profile'); 
    } catch (error) {
      setErrorMessage('Invalid credentials');
    }
  };

  return (
    <section className="header bg-cover bg-center">
      <div className="signuppage flex justify-center items-center h-screen">
        <div className="form-box bg-white p-10 max-w-md w-full rounded-lg shadow-lg">
          <h1 className="text-3xl mb-8 text-green-600">Sign In</h1>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
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
              Forgot password?{' '}
              <button type="button" className="text-blue-500" onClick={() => navigate('/forgot-password')}>
                Click Here
              </button>
              <br />
              New User?{' '}
              <button type="button" className="text-blue-500" onClick={() => navigate('/signup')}>
                Sign Up
              </button>
            </p>
            <div className="btn-des">
              <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-lg">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
