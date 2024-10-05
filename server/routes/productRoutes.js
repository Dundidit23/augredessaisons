//productRoutes.js
const express = require('express');
const multer = require('multer');
const { getAllProducts, createProduct, getOneProduct, updateProductById, deleteProductById} = require('../controllers/productController');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Specify the destination directory
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Specify the file naming convention
    }
  });
  
  const upload = multer({ storage: storage });


  router.route("/").get(getAllProducts).post(upload.single('image'), createProduct);
  router.route("/:id").get(getOneProduct).put(updateProductById).delete(deleteProductById);
  
module.exports = router;
