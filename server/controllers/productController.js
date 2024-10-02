//productController.js
const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: 'Bad request' });
  }
};

const getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product); // Renvoie le produit mis à jour
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ message: 'Bad request' });
  }
};

const deleteProductById = async (req, res) => {
  console.log(`Tentative de suppression du produit avec ID: ${req.params.id}`);

  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      console.log('Produit non trouvé');
      return res.status(404).json({ message: 'Product not found' });
    }

    console.log('Produit supprimé avec succès');
    res.status(200).json({ message: 'Product has been deleted' });
  } catch (error) {
    console.error('Erreur lors de la suppression du produit:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  getAllProducts,
  createProduct,
  getOneProduct,
  updateProductById,
  deleteProductById
};