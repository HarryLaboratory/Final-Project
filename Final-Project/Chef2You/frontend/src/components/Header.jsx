import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slice/authSlice'; 
import '../styles/Header.css';

const Header = () => {
  const { token, user } = useSelector((state) => state.auth);  
  const dispatch = useDispatch();
  const [showLogout, setShowLogout] = useState(false);  
  
  // Function to handle logout
  const handleLogout = () => {
    dispatch(logout());  // Dispatch logout action
  };

  // Toggle the logout option when the profile bubble is clicked
  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/all-chefs">All Chefs</Link>
        
        {/* If the user is logged in, show the profile bubble */}
        {token ? (
          <div className="profile-bubble" onClick={toggleLogout}>
            {user ? `${user.first_name[0]}${user.last_name[0]}` : 'U'} {/* Show first letter of first and last name */}
            {showLogout && (
              <div className="logout-option">
                <button onClick={handleLogout}>Logout</button>  {/* Logout button */}
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">Login</Link> 
        )}
      </nav>
    </header>
  );
};

export default Header;



