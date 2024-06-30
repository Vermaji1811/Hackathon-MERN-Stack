import React, { useState } from 'react';
import axios from 'axios';
import './CreateEvent.css';

const CreateEvent = () => {
  const initialFormData = {
    typeOfEvent: '',
    placeOfEvent: '',
    nameOfEvent: '',
    dateOfEvent: '', // Added dateOfEvent state
    volunteerNeeded: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [popup, setPopup] = useState({ show: false, message: '' }); // State variable for popup

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? (checked ? value : null) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Assuming you store the token in localStorage after login
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Convert volunteerNeeded to Boolean
      const eventData = {
        ...formData,
        volunteerNeeded: formData.volunteerNeeded === 'Yes',
      };

      await axios.post('http://localhost:5000/events', eventData, config);
      setPopup({ show: true, message: 'Event created successfully!' }); // Show success popup
      setTimeout(() => setPopup({ show: false, message: '' }), 3000); // Hide popup after 3 seconds
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error creating event:', error);
      setPopup({ show: true, message: 'Error creating event. Please try again.' }); // Show error popup
      setTimeout(() => setPopup({ show: false, message: '' }), 3000); // Hide popup after 3 seconds
    }
  };

  return (
    <div className="header">
      <div className="form-box">
        <h1>Create an Event</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="input-place">
            <input
              type="text"
              name="typeOfEvent"
              value={formData.typeOfEvent}
              onChange={handleChange}
              placeholder="Type of Event"
            />
          </div>
          <div className="input-place">
            <input
              type="text"
              name="placeOfEvent"
              value={formData.placeOfEvent}
              onChange={handleChange}
              placeholder="Place of Event"
            />
          </div>
          <div className="input-place">
            <input
              type="text"
              name="nameOfEvent"
              value={formData.nameOfEvent}
              onChange={handleChange}
              placeholder="Name of Event"
            />
          </div>
          <div className="input-place">
            <input
              type="date"
              name="dateOfEvent"
              value={formData.dateOfEvent}
              onChange={handleChange}
              placeholder="Date of Event"
            />
          </div>
          <div className="input-place">
            <span style={{ marginRight: '10px' }}>Volunteer Needed?</span>
            <label className="flex items-center" style={{ gap: '10px' }}>
              <input
                type="checkbox"
                name="volunteerNeeded"
                value="Yes"
                checked={formData.volunteerNeeded === 'Yes'}
                onChange={handleChange}
                className="mr-2"
              />
              Yes
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="volunteerNeeded"
                value="No"
                checked={formData.volunteerNeeded === 'No'}
                onChange={handleChange}
                className="mr-2"
              />
              No
            </label>
          </div>
          <div className="btn-des">
            <button type="submit">Submit</button>
          </div>
        </form>
        {popup.show && (
          <div className="popup">
            {popup.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateEvent;
