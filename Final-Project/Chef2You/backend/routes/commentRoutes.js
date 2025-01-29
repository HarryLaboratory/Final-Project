const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const verifyToken = require('../middleware/authMiddleware'); 

// Comments routes
router.post('/comments', verifyToken, commentController.addComment);  
router.get('/comments/chef/:chefId', commentController.getCommentsByChef);  
router.get('/comments/client/:clientId', commentController.getCommentsByClient);  
router.get('/comments', commentController.getAllComments);  

module.exports = router;




