import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Event = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming you store the token in localStorage after login
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get('http://localhost:5000/events', config);
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
        toast.error('Error fetching events');
      }
    };
    fetchEvents();
  }, []);

  const handleVolunteer = async (eventId) => {
    try {
      const token = localStorage.getItem('token'); // Assuming you store the token in localStorage after login
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post(`http://localhost:5000/events/${eventId}/volunteer, {}, config`);
      toast.success('Volunteered successfully');
      // Update events after volunteering (if needed)
      const updatedEvents = events.map(event =>
        event._id === eventId ? { ...event, volunteerNeeded: false } : event
      );
      setEvents(updatedEvents);
    } catch (error) {
      console.error('Error volunteering for event:', error);
      toast.error('Error volunteering');
    }
  };

  if (loading) {
    return <div className="container mx-auto p-4">Loading events...</div>;
  }

  // Separate upcoming and past events based on current date
  const currentDate = new Date();
  const upcomingEvents = events.filter(event => new Date(event.dateOfEvent) >= currentDate);
  const pastEvents = events.filter(event => new Date(event.dateOfEvent) < currentDate);

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-4">Events</h1>

      {/* Upcoming Events */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Upcoming Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <div
                key={event._id}
                className="relative border-2 border-blue-500 rounded-lg p-4 shadow-lg"
                style={{
                  backgroundImage: `url('/event11.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
                <div className="relative z-10 text-white">
                  <h3 className="text-xl font-semibold">{event.nameOfEvent}</h3>
                  <p>Date: {new Date(event.dateOfEvent).toLocaleDateString()}</p>
                  <p>Place: {event.placeOfEvent}</p>
                  <p>Type: {event.typeOfEvent}</p>
                  {event.volunteerNeeded && (
                    <div className="mt-4">
                      <p>Want to volunteer?</p>
                      <button
                        onClick={() => handleVolunteer(event._id)}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                      >
                        Yes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No upcoming events.</p>
          )}
        </div>
      </section>

      {/* Past Events */}
      <section>
        <h2 className="text-2xl font-bold mb-2">Past Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pastEvents.length > 0 ? (
            pastEvents.map((event) => (
              <div
                key={event._id}
                className="relative border-2 border-blue-500 rounded-lg p-4 shadow-lg"
                style={{
                  backgroundImage: `url('/event11.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
                <div className="relative z-10 text-white">
                  <h3 className="text-xl font-semibold">{event.nameOfEvent}</h3>
                  <p>Date: {new Date(event.dateOfEvent).toLocaleDateString()}</p>
                  <p>Place: {event.placeOfEvent}</p>
                  <p>Type: {event.typeOfEvent}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No past events.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Event;