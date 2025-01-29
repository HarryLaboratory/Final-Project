const express = require('express');
const router = express.Router();
const chefController = require('../controllers/chefController');

// Route to get all chefs
router.get('/chefs', chefController.getAllChefs);

// Route to get a chef by ID
router.get('/chef/:id', chefController.getChefById);

// Route to get top-rated chefs
router.get('/chefs/top-rated', chefController.getTopRatedChefs);  

module.exports = router;


