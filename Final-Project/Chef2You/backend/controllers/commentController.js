const Comment = require('../models/commentModel');

// Ajouter un commentaire
exports.addComment = async (req, res) => {
  try {
    const { chefId, rating, comment } = req.body;
    const clientId = req.userId;  // Récupère l'ID du client depuis le token
    
    // Ajout d'un log pour vérifier la valeur de clientId
    console.log("Client ID:", clientId);

    // Ajoute le commentaire en utilisant les données de la requête et de l'utilisateur
    const newComment = await Comment.addComment(chefId, clientId, rating, comment);
    
    // Récupérer la note moyenne après ajout du commentaire
    const avgRating = await Comment.getAverageRatingByChefId(chefId);
    
    // Arrondir la note moyenne à 2 décimales
    const roundedAvgRating = parseFloat(avgRating).toFixed(2);
    
    // Renvoie la réponse avec les détails du commentaire et la note moyenne arrondie
    res.status(201).json({ 
      newComment: {
        id: newComment.id,            // ID du commentaire ajouté
        chefId: chefId,               // Chef ID (ajouté ici)
        clientId: clientId,           // Client ID (ajouté ici)
        rating: rating,               // Note donnée au chef (utilisation de rating provenant du body)
        comment: comment              // Texte du commentaire (utilisation de comment provenant du body)
      },
      avgRating: roundedAvgRating   // Note moyenne arrondie
    });
  } catch (error) {
    console.error('Error adding comment:', error);  // Log de l'erreur pour le debug
    res.status(500).json({ message: "Erreur lors de l'ajout du commentaire" });
  }
};

// Obtenir les commentaires d'un chef (avec noms des clients et note moyenne)
exports.getCommentsByChef = async (req, res) => {
  try {
    const chefId = parseInt(req.params.chefId);
    const comments = await Comment.getCommentsByChefId(chefId);

    // Récupérer la note moyenne pour le chef
    const avgRating = await Comment.getAverageRatingByChefId(chefId);
    
    // Arrondir la note moyenne à 2 décimales
    const roundedAvgRating = parseFloat(avgRating).toFixed(2);
    
    // Renvoie les commentaires et la note moyenne
    res.status(200).json({ comments, avgRating: roundedAvgRating });
  } catch (error) {
    console.error('Error retrieving comments for chef:', error);  // Log de l'erreur pour le debug
    res.status(500).json({ message: "Erreur lors de la récupération des commentaires pour ce chef" });
  }
};

// Obtenir les commentaires d'un client
exports.getCommentsByClient = async (req, res) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const comments = await Comment.getCommentsByClientId(clientId);
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error retrieving comments for client:', error);  // Log de l'erreur pour le debug
    res.status(500).json({ message: "Erreur lors de la récupération des commentaires pour ce client" });
  }
};

// Obtenir tous les commentaires
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.getAllComments();  // Ajouter la méthode dans le modèle
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error retrieving all comments:', error);  // Log de l'erreur pour le debug
    res.status(500).json({ message: "Erreur lors de la récupération de tous les commentaires" });
  }
};











