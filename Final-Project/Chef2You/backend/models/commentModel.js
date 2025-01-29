const db = require('../db'); 

// Add a comment
const addComment = async (chefId, clientId, rating, comment) => {
    const result = await db.query(
        'INSERT INTO comments (chef_id, client_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING id, chef_id, client_id, rating, comment',
        [chefId, clientId, rating, comment]
    );
    return result.rows[0];  // Return the full comment
};

// Get comments for a chef (including client names)
const getCommentsByChefId = async (chefId) => {
    const result = await db.query(
        'SELECT comments.*, clients.first_name, clients.last_name ' + 
        'FROM comments ' +
        'JOIN clients ON comments.client_id = clients.id ' + 
        'WHERE chef_id = $1',
        [chefId]
    );
    return result.rows;
};

// Get comments for a client
const getCommentsByClientId = async (clientId) => {
    const result = await db.query('SELECT * FROM comments WHERE client_id = $1', [clientId]);
    return result.rows;
};

// Get all comments
const getAllComments = async () => {
    const result = await db.query('SELECT * FROM comments');
    return result.rows;
};

// Calculate the average rating for a chef
const getAverageRatingByChefId = async (chefId) => {
    const result = await db.query(
        'SELECT AVG(rating) as avg_rating FROM comments WHERE chef_id = $1',
        [chefId]
    );
    return result.rows[0].avg_rating || 0; // If no comments, return 0
};

module.exports = {
    addComment,
    getCommentsByChefId,
    getCommentsByClientId,
    getAllComments,
    getAverageRatingByChefId,  // Added method to get the average rating
};





