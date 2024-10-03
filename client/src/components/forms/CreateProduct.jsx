import React, { useState, useEffect } from 'react';
import useCategories from '../hooks/useCategories';
import './createProduct.scss';

const CreateProduct = ({ product, onSubmit, isEditing }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
    stock: ''
  });

  const categories = useCategories();

  useEffect(() => {
    // Remplissage des champs si édition
    if (isEditing && product) {
      setFormData(product);
    }
  }, [isEditing, product]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Edit Product' : 'Add Product'}</h2>
      
      <label htmlFor="name">Product Name</label>
      <input id="name" name="name" value={formData.name} onChange={handleChange} required />

      <label htmlFor="description">Description</label>
      <input id="description" name="description" value={formData.description} onChange={handleChange} required />

      <label htmlFor="price">Price (€)</label>
      <input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required />

      <label htmlFor="imageUrl">Image URL</label>
      <input id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />

      <label htmlFor="imageFile">Image File</label>
      <input id="imageFile" name="imageFile" type="file" onChange={handleChange} />

      <label htmlFor="category">Category</label>
      <select id="category"  className="small-width-select" name="category" value={formData.category} onChange={handleChange} required>
        <option value="">Sélectionnez une catégorie</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category}
          </option>
        ))}
      </select>

     
      <label htmlFor="stock">Stock</label>
      <input id="stock" name="stock" type="number" value={formData.stock} onChange={handleChange} required />

      <button type="submit">{isEditing ? 'Update Product' : 'Create Product'}</button>
    </form>
  );
};

export default CreateProduct;
