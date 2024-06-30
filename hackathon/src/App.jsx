import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './Login';
import Home from './Home';
import Event from './Event';
import Profile from './components/Profile';
import CreateEvent from './components/CreateEvent';
import Community from './components/Community';
import PrivateRoute from './components/PrivateRoute';
import useAuth from './components/useAuth';
import EditProfile from './components/EditProfile';
import News from './news';
import Connect from './Connect';
import Signup from './SignUp';

const App = () => {
  const { user, login, logout } = useAuth();

  return (
    <Router>
      <Navbar user={user} logout={logout} />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/event" element={<Event />} />
          <Route path="/news" element={<News />} />
          <Route path="/connect" element={<Connect />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile user={user} />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-event"
            element={
              <PrivateRoute>
                <CreateEvent />
              </PrivateRoute>
            }
          />
          <Route
            path="/community"
            element={
              <PrivateRoute>
                <Community />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            }
          />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
