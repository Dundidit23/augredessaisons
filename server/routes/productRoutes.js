const express = require('express');
const { getAllProducts, createProduct, getOneProduct, updateProductById, deleteProductById } = require('../controllers/productController');

const router = express.Router();

router.route("/").get(getAllProducts).post(createProduct);
router.route("/:id").get(getOneProduct).put(updateProductById).delete(deleteProductById);

module.exports = router;
