import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import { useAuth } from './useAuth';

function Navbar() {
  const [startDate, setStartDate] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { user, loading } = useAuth();

  return (
    <div>
      <hr className="border-t-2 border-gray-300" />
      
      <div className="navbar bg-gray-200 flex items-center justify-between px-4 text-black border-b-2 border-gray-300 italic" 
      style={{ background: 'linear-gradient(rgba(235, 235, 241, 0.5), rgba(0,0,50,0.5))' }}>
        <div className="flex items-center space-x-2">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 lg:h-6 lg:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li><Link className="text-sm" to="/">Home</Link></li>
              <li><Link className="text-sm" to="/event">Events</Link></li>
              <li>
                <button 
                  className="btn bg-black text-white text-sm italic"
                  onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                >
                  Calendar
                </button>
                {isCalendarOpen && (
                  <div className="absolute top-12 z-50 bg-white p-2 shadow-lg rounded">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      inline
                    />
                  </div>
                )}
              </li>
            </ul>
          </div>
          <div className="flex items-center">
            <span className="btn btn-ghost normal-case text-4xl">nexus</span>
            <span className="text-xl transform rotate-90 -ml-6">.com</span>
          </div>
          <ul className="hidden lg:flex menu menu-horizontal px-1 space-x-4">
            <li>
              <Link className="btn bg-black text-white text-sm py-1 px-3" to="/">Home</Link>
            </li>
            <li>
              <Link className="btn bg-black text-white text-sm py-1 px-3" to="/event">Events</Link>
            </li>
          </ul>
        </div>
        <div className="hidden lg:flex items-center ml-12 lg:ml-16 lg:mr-12 relative space-x-4">
          <div className="relative">
            <button 
              className="btn bg-black text-white text-sm italic"
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            >
              Calendar
            </button>
            {isCalendarOpen && (
              <div className="absolute top-12 z-50 bg-white p-2 shadow-lg rounded">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  inline
                />
              </div>
            )}
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : user ? (
            <Link className="btn bg-black text-white text-sm" to="/profile">Profile</Link>
          ) : (
            <Link className="btn bg-black text-white text-sm" to="/login">Login</Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
