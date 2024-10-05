const express = require('express');
const { getAllCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryControllers');
const router = express.Router();

router.get('/', getAllCategories);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;