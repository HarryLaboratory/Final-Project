const db = require('../db');  // Database connection

// Get all clients
const getAllClients = async () => {
    const result = await db.query('SELECT * FROM clients');
    return result.rows;
};

// Get a client by ID
const getClientById = async (clientId) => {
    const result = await db.query('SELECT * FROM clients WHERE id = $1', [clientId]);
    return result.rows[0];
};

// Add a client
const addClient = async (firstName, lastName, email, passwordHash) => {
    email = email.toLowerCase();  // Convert email to lowercase before insertion
    const result = await db.query(
        'INSERT INTO clients (first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING id',
        [firstName, lastName, email, passwordHash]
    );
    return result.rows[0].id;
};

// Find a client by email
const findByEmail = async (email) => {
    email = email.toLowerCase();  // Convert email to lowercase for search
    const result = await db.query('SELECT * FROM clients WHERE email = $1', [email]);
    return result.rows.length > 0 ? result.rows[0] : null;  // Return null if not found
};

module.exports = {
    getAllClients,
    getClientById,
    addClient,
    findByEmail
};


