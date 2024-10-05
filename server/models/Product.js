// server/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    validate: {
      validator: function(v) {
        return v >= 0;
      },
      message: 'Price must be a non-negative number.'
    }
  },
  imageUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  //category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  stock: {
    type: Number,
    required: true,
    validate: {
      validator: function(v) {
        return v >= 0;
      },
      message: 'Stock must be a non-negative number.'
    }
  },
}, { timestamps: true });

productSchema.methods.formatPrice = function() {
  return this.price.toLocaleString();
};

module.exports = mongoose.model('Product', productSchema);