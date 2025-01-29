const chefModel = require('../models/chefModel');


const getAllChefs = async (req, res) => {
    try {
        const chefs = await chefModel.getAllChefs();
        res.status(200).json(chefs);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des chefs' });
    }
};


const getChefById = async (req, res) => {
    const chefId = parseInt(req.params.id);
    try {
        const chef = await chefModel.getChefById(chefId);
        if (!chef) {
            return res.status(404).json({ error: 'Chef non trouvé' });
        }
        res.status(200).json(chef);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du chef' });
    }
};


const getTopRatedChefs = async (req, res) => {
    try {
        // Assuming the model has a method to fetch chefs with sorting and limit
        const chefs = await chefModel.getTopRatedChefs(3);  // Fetch top 3 chefs by rating
        res.status(200).json(chefs);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des meilleurs chefs' });
    }
};

module.exports = {
    getAllChefs,
    getChefById,
    getTopRatedChefs  // Export the new method
};


