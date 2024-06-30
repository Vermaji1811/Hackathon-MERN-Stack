import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from './useAuth'; 

const Community = () => {
  const { user, loading: authLoading } = useAuth();
  const [communityMembers, setCommunityMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let source = axios.CancelToken.source(); 

    if (!authLoading && user) {
      const fetchCommunityMembers = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('http://localhost:5000/community', {
            headers: {
              Authorization: `Bearer ${token}`
            },
            cancelToken: source.token 
          });
          setCommunityMembers(response.data);
          setLoading(false);
        } catch (err) {
          if (!axios.isCancel(err)) {
            setError(err.message);
            setLoading(false);
          }
        }
      };

      fetchCommunityMembers();

      return () => {
        source.cancel('Request canceled by cleanup');
      };
    }

    return () => {
      source.cancel('Request canceled by cleanup');
    };
  }, [authLoading, user]);

  if (authLoading || loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="bg-white shadow-md rounded-lg border-4 border-blue-500 p-6 w-full max-w-2xl relative overflow-hidden"
           style={{ backgroundImage: `url('/communityimage.jpg')`, backgroundSize: 'cover' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white">
          <h2 className="text-2xl font-semibold mb-4">Community Members</h2>
          <table className="min-w-full text-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {communityMembers.map((member) => (
                <tr key={member._id}>
                  <td className="py-2 px-4 border-b">{member.name}</td>
                  <td className="py-2 px-4 border-b">{member.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Community;
