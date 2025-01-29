const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Client = require('../models/clientModel'); 

// Signup
exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Vérify if email already exist 
    const existingClient = await Client.findByEmail(email);
    if (existingClient) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    // Hashed password 
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add client to database 
    const newClient = await Client.addClient(firstName, lastName, email, hashedPassword);
    
    res.status(201).json({ message: 'Client créé avec succès', clientId: newClient });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'inscription" });
  }
};

// Connexion
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find client by mail
    const client = await Client.findByEmail(email);
    if (!client) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    // Compared password
    const isPasswordValid = await bcrypt.compare(password, client.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    // Générate token JWT
    const token = jwt.sign({ clientId: client.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: "Connexion réussie", token });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la connexion" });
  }
};

