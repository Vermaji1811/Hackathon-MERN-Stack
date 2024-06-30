import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from './useAuth'; // adjust the path as necessary

const Profile = () => {
  useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventsError, setEventsError] = useState(null);

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
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleCreateEvent = () => {
    navigate('/create-event');
  };

  const handleViewCommunity = () => {
    navigate('/community');
  };

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  const handleViewEvents = async () => {
    setEventsLoading(true);
    setEventsError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/events/created', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEvents(response.data);
      setEventsLoading(false);
    } catch (err) {
      setEventsError('Failed to load events. Please try again.');
      setEventsLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="border border-blue-500 bg-light-green-200 shadow-md rounded-lg p-6 w-full max-w-2xl mt-4">
        <div className="flex justify-between items-center mb-4">
          <div className="bg-blue-500 text-white py-2 px-4 rounded">
            <h2 className="text-3xl font-semibold text-center w-full mt-0">Profile</h2>
          </div>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Profile Description</h3>
          <hr className="border-b-2 border-gray-300 mb-4" />
          <p className="text-gray-700">{user.description}</p>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
          <hr className="border-b-2 border-gray-300 mb-4" />
          <p className="text-gray-700"><strong>Name:</strong> {user.name}</p>
          <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
          <p className="text-gray-700"><strong>Contact:</strong> {user.contact}</p>
          <p className="text-gray-700"><strong>Community:</strong> {user.community}</p>
        </div>
        <div className="flex justify-center space-x-4 mb-6">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            onClick={handleCreateEvent}
          >
            Create an Event
          </button>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            onClick={handleViewCommunity}
          >
            View Community Members
          </button>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            onClick={handleEditProfile}
          >
            Edit Profile
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleViewEvents}
          >
            View My Events
          </button>
        </div>
        {eventsLoading && <p>Loading events...</p>}
        {eventsError && <p>Error: {eventsError}</p>}
        {events.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-2">My Created Events</h3>
            <ul>
              {events.map(event => (
                <li key={event._id} className="mb-4">
                  <h4 className="text-lg font-semibold">{event.nameOfEvent}</h4>
                  <p className="text-gray-700"><strong>Date:</strong> {new Date(event.dateOfEvent).toLocaleDateString()}</p>
                  <p className="text-gray-700"><strong>Volunteers:</strong></p>
                  <ul className="list-disc ml-4">
                    {event.volunteers.map(volunteer => (
                      <li key={volunteer._id}>
                        {volunteer.name} ({volunteer.email} - {volunteer.community})
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;