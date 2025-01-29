import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { fetchChefById } from '../services/chefService';
import { addComment } from '../services/commentService';
import { useSelector } from 'react-redux';

function ChefPage() {
  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);  // Get the auth token from Redux
  const [chef, setChef] = useState(null);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getChef = async () => {
      try {
        const response = await fetchChefById(id);
        setChef(response.data);
      } catch (error) {
        console.error('Error fetching chef details:', error);
      }
    };
    getChef();
  }, [id]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      const commentData = { chefId: id, comment, rating };
      const newComment = await addComment(commentData);
      setComments((prevComments) => [...prevComments, newComment]);
      setComment(''); // Clear the input field
      setRating(1); // Reset the rating to 1
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  // ProtectedRoute: If no token, redirect to login page
  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div>
      {chef ? (
        <>
          <h1>{chef.first_name} {chef.last_name}</h1>
          <p>{chef.cuisine_type}</p>
          <p>{chef.experience} years of experience</p>
          <p>{chef.price_per_hour} per hour</p>
          <img src={chef.picture} alt={chef.first_name} />

          <h2>Leave a Comment</h2>
          
          {/* Protecting the comment form with ProtectedRoute */}
          <ProtectedRoute>
            <form onSubmit={handleSubmitComment}>
              <textarea
                value={comment}
                onChange={handleCommentChange}
                placeholder="Write your comment..."
                required
              />
              <div>
                <label>Rating: </label>
                <select value={rating} onChange={handleRatingChange} required>
                  {[1, 2, 3, 4, 5].map((rate) => (
                    <option key={rate} value={rate}>
                      {rate}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit">Submit Comment</button>
            </form>
          </ProtectedRoute>

          <h2>Comments</h2>
          {comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>
                  <p>{comment.comment}</p>
                  <p>Rating: {comment.rating}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <p>Loading chef details...</p>
      )}
    </div>
  );
}

export default ChefPage;



