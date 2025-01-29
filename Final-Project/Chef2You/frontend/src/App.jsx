import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from './pages/HomePage';
import ChefPage from './pages/ChefPage';
import AllChefsPage from './pages/AllChefsPage';
import AuthPage from './pages/AuthPage'; 
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/App.css';

// Import Slick carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  // Get the authentication state from Redux
  const { token } = useSelector((state) => state.auth);

  // Create a ProtectedRoute component
  const ProtectedRoute = ({ children }) => {
    // If no token, redirect to the login page
    if (!token) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/all-chefs" element={<AllChefsPage />} /> {/* AllChefsPage route */}
          <Route path="/chef/:id" element={<ChefPage />} />
          <Route path="/auth" element={<AuthPage />} /> {/* AuthPage route */}
          <Route path="/login" element={<Navigate to="/auth" />} /> {/* Redirect /login to /auth */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;








