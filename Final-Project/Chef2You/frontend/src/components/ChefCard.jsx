import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import '../styles/ChefCard.css';

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function ChefCard({ chef, currentUser }) {
  const [showDetails, setShowDetails] = useState(false);
  const [comments, setComments] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [error, setError] = useState('');

  const apiUrl = import.meta.env.VITE_API_URL;

  // Function to retrieve the JWT token from localStorage
  const getJwtToken = () => {
    return localStorage.getItem('token');  
  };

  // Check if currentUser exists, otherwise, try to retrieve the user from localStorage
  const getCurrentUser = () => {
    if (currentUser) {
      return currentUser;
    }
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;  
  };

  useEffect(() => {
    const token = getJwtToken();
    if (!token) {
      setError('Please ensure you are logged in.');
      return;
    }

    const fetchComments = async () => {
      try {
        const response = await axios.get(`${apiUrl}/comments/chef/${chef.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,  // Send JWT into headers
          },
        });

        if (response.data && Array.isArray(response.data.comments)) {
          setComments(response.data.comments);
          const avgRating = parseFloat(response.data.avgRating) || 0;
          setAverageRating(avgRating);
        } else {
          console.error('Erreur : La réponse de l\'API n\'est pas dans le format attendu.');
          setComments([]);
          setAverageRating(0);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
        setError('An error occurred while fetching comments.');
      }
    };

    fetchComments();
  }, [chef.id]);

  const handleAddComment = async () => {
    const token = getJwtToken();
    const user = getCurrentUser();

    // Verify if user connected
    if (!user || !user.id) {
      setError('Please ensure you are logged in.');
      return;
    }

    // Verify if comment empty
    if (!newComment.trim()) {
      setError('Please fill out the comment.');
      return;
    }

    // If everything is OK, proceed with sending the comment
    try {
      const commentData = {
        chefId: chef.id,
        clientId: user.id,
        rating: newRating,
        comment: newComment,
      };

      const response = await axios.post(`${apiUrl}/comments`, commentData, {
        headers: {
          Authorization: `Bearer ${token}`,  // Adding the JWT to the request header
        },
      });

      if (response.data.success) {
        const updatedComments = [...comments, { ...commentData, client_name: user.first_name }];
        setComments(updatedComments);
        calculateAverageRating(updatedComments);
        setNewComment('');
        setNewRating(5);
        setError(''); // Clear error message if the comment is successfully posted
      } else {
        setError('Failed to add comment. Please try again later.');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      setError('An error occurred while adding the comment.');
    }
  };

  const calculateAverageRating = (comments) => {
    const totalRating = comments.reduce((acc, comment) => acc + (comment.rating || 0), 0);
    const average = comments.length > 0 ? totalRating / comments.length : 0;
    setAverageRating(average);
  };

  const toggleDetails = () => {
    setShowDetails(prevState => !prevState);
  };

  return (
    <div className="chef-card">
      <Slider {...sliderSettings}>
        {chef.photos && chef.photos.map((photo, index) => (
          <div key={index}>
            <img
              src={photo}
              alt={`Chef photo ${index + 1}`}
              className="chef-image"
            />
          </div>
        ))}
      </Slider>

      <h2>{chef.first_name} {chef.last_name}</h2>
      <p>{chef.cuisine_type}</p>
      <p>{chef.years_of_experience} years of experience</p>
      <p>{chef.location}</p>

      <p><strong>Average Rating: {isNaN(averageRating) ? 0 : averageRating.toFixed(1)} / 5</strong></p>

      <button onClick={toggleDetails}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>

      {showDetails && (
        <div className="scrollable-details">
          <p><strong>Price per hour:</strong> ${chef.price_per_hour}</p>
          <p><strong>Worked for:</strong> {chef.worked_for}</p>

          <p><strong>Comments:</strong></p>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index}>
                <p><strong>{comment.client_name}</strong> ({comment.rating} stars)</p>
                <p>{comment.comment}</p>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}

          <div>
            {error && <p className="error-message">{error}</p>}
            <textarea
              id="comment"
              name="comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
            ></textarea>
            <select
              id="rating"
              name="rating"
              value={newRating}
              onChange={(e) => setNewRating(Number(e.target.value))}
            >
              <option value={1}>1 Star</option>
              <option value={2}>2 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={5}>5 Stars</option>
            </select>
            <button onClick={handleAddComment}>Add Comment</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChefCard;
































