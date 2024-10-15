// server/controllers/productController.js
const Product = require('../models/Product'); // Modèle du produit

// Créer un nouveau produit
const createProduct = async (req, res) => {
  try {
    // Récupérer les données du corps de la requête
    const { name, description, price, category, stock } = req.body; 
    const imageUrl = req.file ? req.file.path : null; // Chemin de l'image uploadée

    // Debug: Vérifiez les données reçues
    console.log('Données reçues pour créer le produit:', {
      name,
      description,
      price,
      category,
      stock,
      imageUrl,
    });

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      image: imageUrl,
    });

    await newProduct.save();
    res.status(201).json(newProduct); // Réponse avec le produit créé
  } catch (error) {
    console.error('Erreur lors de la création du produit:', error);
    res.status(400).json({ message: 'Erreur lors de la création du produit', error });
  }
};

// Mettre à jour un produit par ID
const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, stock } = req.body;
    const imageUrl = req.file ? req.file.path : null; // Récupérer le chemin de l'image

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, category, stock, image: imageUrl },
      { new: true, runValidators: true } // Ajouter runValidators pour valider les champs
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    res.status(200).json(updatedProduct); // Réponse avec le produit mis à jour
  } catch (error) {
    console.error('Erreur lors de la mise à jour du produit:', error);
    res.status(400).json({ message: 'Erreur lors de la mise à jour du produit', error });
  }
};

// Récupérer tous les produits
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products); // Réponse avec la liste des produits
  } catch (error) {
    console.error('Erreur lors de la récupération des produits:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des produits.' });
  }
};

// Récupérer un produit spécifique
const getOneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé.' });
    }

    res.status(200).json(product); // Réponse avec le produit trouvé
  } catch (error) {
    console.error('Erreur lors de la récupération du produit:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération du produit.' });
  }
};

// Supprimer un produit par ID
const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Produit non trouvé.' });
    }

    res.status(200).json({ message: 'Produit supprimé avec succès.' }); // Réponse de succès
  } catch (error) {
    console.error('Erreur lors de la suppression du produit:', error);
    res.status(500).json({ message: 'Erreur serveur lors de la suppression du produit.' });
  }
};

// Exports des fonctions du contrôleur
module.exports = {
  getAllProducts,
  createProduct,
  getOneProduct,
  updateProductById,
  deleteProductById,
};
