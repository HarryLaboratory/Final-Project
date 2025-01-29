const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');

// Import routes
const chefRoutes = require('./routes/chefRoutes');
const authRoutes = require('./routes/authRoutes');
const commentRoutes = require('./routes/commentRoutes');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;  

// Allow only the frontend URL for security reasons
const allowedOrigins = ['https://final-project-frontend-tngm.onrender.com'];  // Replace with your frontend URL

// CORS middleware with configuration
app.use(cors({
  origin: function(origin, callback) {
    // If no origin or if the origin is allowed, accept the request
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  }
}));

app.use(express.json());  // To handle JSON in requests

// Database connection with SSL handling 
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,  
  },
  idleTimeoutMillis: 30000,  // Time to wait before closing idle connections
  connectionTimeoutMillis: 10000,  // Time to wait before considering connection failure (increased)
});

// Database connection function with error handling
const connectDB = async () => {
  try {
    console.log('Attempting to connect to the database...');
    await pool.connect();  // Connect to the database
    console.log('Connected to the database');  // Log if the connection is successful
  } catch (err) {
    console.error('Error connecting to the database:', err.message);  // Log error if connection fails
  }
};

// Call the connectDB function when starting the server
connectDB();

// Example endpoint to test the database connection
app.get('/', async (req, res) => {
  console.log('Request received at the / endpoint');  

  try {
    const result = await pool.query('SELECT NOW()');  
    console.log('Query result:', result.rows);  // Log the result of the query
    res.send('Welcome to the Chef2You API! Database connection successful at: ' + result.rows[0].now);
  } catch (err) {
    console.error('Error during SQL query:', err.message);  // Log error if the query fails
    res.status(500).send('Error connecting to the database');
  }
});

// API Routes
app.use('/api', chefRoutes);  
app.use('/api', authRoutes);  
app.use('/api', commentRoutes); 

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});





