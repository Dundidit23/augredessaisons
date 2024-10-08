//productController.js
const Product = require('../models/Product');

const createProduct = async (req, res) => {
  try {
    // Ensure that the file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    // Construct product data
    const productData = {
      ...req.body,
      imageUrl: req.file.path, // Save the file path
    };

    // Create the product in the database
    const product = await Product.create(productData);

    // Respond with the created product
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error.message);
    res.status(500).json({ message: 'Server error' });
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