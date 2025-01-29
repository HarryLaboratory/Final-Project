import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, signupUser } from '../store/slice/authSlice';  
import { logout } from '../store/slice/authSlice';  
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, user, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');  
  const [lastName, setLastName] = useState('');    
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');  // State to manage success or error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');  // Clear the previous message

    try {
      if (isLogin) {
        // Dispatch login action
        await dispatch(loginUser({ email, password }));
        setMessage('Login successful!');
        navigate('/');  // Redirect to homepage after successful login
      } else {
        // Dispatch signup action
        await dispatch(signupUser({ email, password, firstName, lastName }));
        setMessage('Signup successful! Please login.');
        navigate('/login');  // Redirect to login page after successful signup
      }
    } catch (err) {
      setMessage('An error occurred. Please try again.');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (token && user) {
    return (
      <div>
        <h2>Welcome, {user.first_name}!</h2>
        <p>Email: {user.email}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Signup'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        {/* Added input fields for first name and last name during signup */}
        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}
        
        <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
      </form>

      {/* Show success or error messages */}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <p>
        {isLogin ? 'Don’t have an account? ' : 'Already have an account? '}
        <span
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Sign up' : 'Log in'}
        </span>
      </p>
    </div>
  );
};

export default AuthPage;




