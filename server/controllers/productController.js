// server/controllers/productController.js
const Product = require('../models/Product'); // Modèle du produit

const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    // Vérifiez que tous les champs obligatoires sont fournis
    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
    }

    const imageUrl = req.file ? req.file.path : null;  // Vérifiez l'image

    const newProduct = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      image: imageUrl,
    });

    res.status(201).json(newProduct);
    console.log('Requête reçue :', req.body);
console.log('Fichier reçu :', req.file);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'createdAt', order = 'desc', ...filters } = req.query;

    // Convert page and limit to numbers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Build the query with filters
    const query = { ...filters };

    // Execute the query with pagination and sorting
    const products = await Product.find(query)
      .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    // Get the total count for pagination
    const totalProducts = await Product.countDocuments(query);

    res.status(200).json({
      products,
      totalPages: Math.ceil(totalProducts / limitNumber),
      currentPage: pageNumber,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
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
    const updatedData = req.body;

    // Vérifiez si une nouvelle image a été uploadée
    if (req.file) {
      updatedData.imageUrl = req.file.path.replace(/\\/g, '/'); // Nettoyer le chemin de l'image
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
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