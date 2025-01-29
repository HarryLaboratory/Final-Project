const db = require('../db');  // Assuming you are using the db module to interact with the database

// Function to fetch all chefs
const getAllChefs = async () => {
    const result = await db.query('SELECT * FROM chefs');
    return result.rows;
};

// Function to fetch a chef by ID
const getChefById = async (id) => {
    const result = await db.query('SELECT * FROM chefs WHERE id = $1', [id]);
    return result.rows[0]; // Assuming the ID is unique
};

// Function to fetch the top-rated chefs
const getTopRatedChefs = async (limit) => {
    const result = await db.query(
        'SELECT * FROM chefs ORDER BY rating DESC LIMIT $1', 
        [limit]  // Limit is passed as a parameter to fetch only top-rated chefs
    );
    return result.rows;
};

// Function to add a new chef
const addChef = async (firstName, lastName, age, yearsOfExperience, location, pricePerHour, cuisineType, workedFor) => {
    const result = await db.query(
        'INSERT INTO chefs (first_name, last_name, age, years_of_experience, location, price_per_hour, cuisine_type, worked_for) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
        [firstName, lastName, age, yearsOfExperience, location, pricePerHour, cuisineType, workedFor]
    );
    return result.rows[0].id;
};

module.exports = {
    getAllChefs,
    getChefById,
    getTopRatedChefs,  // Export the new method
    addChef
};



