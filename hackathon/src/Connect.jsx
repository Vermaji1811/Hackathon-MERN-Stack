import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Connect = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        // Sort people by name alphabetically
        const sortedPeople = response.data.sort((a, b) => a.name.localeCompare(b.name));
        setPeople(sortedPeople);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="bg-white shadow-md rounded-lg border-4 border-blue-500 p-6 w-full max-w-2xl relative overflow-hidden">
        <div className="relative z-10 text-gray-800">
          <h2 className="text-2xl font-semibold mb-4">List of People</h2>
          <table className="min-w-full">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Community</th>
              </tr>
            </thead>
            <tbody>
              {people.map(person => (
                <tr key={person._id} className="hover:bg-gray-200">
                  <td className="py-2 px-4 border-b">{person.name}</td>
                  <td className="py-2 px-4 border-b">{person.email}</td>
                  <td className="py-2 px-4 border-b">{person.community}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Connect;
