// controllers/categoryController.js
const Category = require('../models/Category');

const createCategory = async (req, res) => {
    try {
      const { name } = req.body;
      const category = new Category({ name });
      await category.save();
      res.status(201).json(category);
    } catch (error) {
      console.error('Error creating category:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  };

  const updateCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const category = await Category.findByIdAndUpdate(id, { name }, { new: true });
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json(category);
    } catch (error) {
      console.error('Error updating category:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  };
  const deleteCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findByIdAndDelete(id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      console.error('Error deleting category:', error.message);
      res.status(500).json({ message: 'Server error' });
    }
  };

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = { getAllCategories, createCategory, updateCategory, deleteCategory };