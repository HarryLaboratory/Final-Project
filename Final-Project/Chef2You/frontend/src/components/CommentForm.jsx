// src/components/CommentForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../services/commentService';

const CommentForm = ({ chefId }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const commentData = {
      chefId,
      rating,
      comment,
    };
    dispatch(addComment(commentData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        max="5"
        min="1"
      />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Leave a comment"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
