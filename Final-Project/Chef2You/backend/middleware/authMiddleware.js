const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Retrieve the token from the Authorization header

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    // clientId instead of userId
    req.userId = decoded.clientId;  

    // Log vérify if userId is correctly retrieve
    console.log("Decoded clientId from token:", req.userId); 

    next(); 
  });
};

module.exports = verifyToken;

