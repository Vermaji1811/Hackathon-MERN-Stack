import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from './useAuth'; // adjust the path as necessary

const EditProfile = () => {
  useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    contact: '',
    community: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load profile. Please try again.');
        console.error(err); // Log detailed error for debugging
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/profile', user, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/profile');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error(err); // Log detailed error for debugging
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="spinner"></div></div>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="border border-red-500 bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="name">Name</label>
            <textarea
              name="name"
              id="name"
              value={user.name}
              onChange={handleChange}
              className="w-full p-2 border border-green-500 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">Email</label>
            <textarea
              name="email"
              id="email"
              value={user.email}
              onChange={handleChange}
              className="w-full p-2 border border-green-500 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="contact">Contact</label>
            <textarea
              name="contact"
              id="contact"
              value={user.contact}
              onChange={handleChange}
              className="w-full p-2 border border-green-500 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="community">Community</label>
            <textarea
              name="community"
              id="community"
              value={user.community}
              onChange={handleChange}
              className="w-full p-2 border border-green-500 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="description">Profile Description</label>
            <textarea
              name="description"
              id="description"
              value={user.description}
              onChange={handleChange}
              className="w-full p-2 border border-green-500 rounded"
              required
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              onClick={() => navigate('/profile')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;