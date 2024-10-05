import React, { useState, useEffect } from 'react';
import useCategories from '../hooks/useCategories';
import './createProduct.scss';

const CreateProduct = ({ product, onSubmit, isEditing }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: null, // Initialize as null for file
    category: '',
    stock: ''
  });

  const categories = useCategories();

  useEffect(() => {
    if (isEditing && product) {
      setFormData(product);
    }
  }, [isEditing, product]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value, // Handle file input
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (isEditing && product && product.id) {
      onSubmit(product.id, data); // Pass product ID for update
    } else {
      onSubmit(data); // For creating a new product
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Edit Product' : 'Add Product'}</h2>
      
      <fieldset>
        <label htmlFor="name">Nom du produit</label>
        <input id="name" name="name" value={formData.name} onChange={handleChange} required />
        <label htmlFor="category">Category</label>
        <select
          id="category"
          className="small-width-select"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Sélectionnez une catégorie</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name} {/* Assuming category has a 'name' property */}
            </option>
          ))}
        </select>
      </fieldset>
      
      <fieldset>
        <label htmlFor="description">Description</label>
        <input id="description" name="description" value={formData.description} onChange={handleChange} required />
      </fieldset>

      <fieldset>
        <label htmlFor="imageUrl">Image File</label>
        <input id="imageUrl" name="imageUrl" type="file" onChange={handleChange} />
      </fieldset>

      <fieldset>
        <label htmlFor="price">Price (€)</label>
        <input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required />
        <label htmlFor="stock">Stock</label>
        <input id="stock" name="stock" type="number" value={formData.stock} onChange={handleChange} required />
      </fieldset>
      
      <button type="submit">{isEditing ? 'Update Product' : 'Create Product'}</button>
    </form>
  );
};

export default CreateProduct;