import React, { useState, useEffect } from 'react';
import { fetchCategories } from '../../services/api';
import './createProduct.scss';
const CreateProduct = ({ onSubmit }) => {
  const [product, setProduct] = useState({
    name: '',
    category: '',
    description: '',
    stock: 0,
    price: 0,
    imageUrl: ''
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };

    loadCategories();
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting product:', product);
    onSubmit(product);
  };

  return (
    <div className="addProduct">
      <h2>Ajouter un produit</h2>
      <form className="newProduct" onSubmit={handleSubmit}>
        <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Nom du produit" required />
        <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description du produit" required></textarea>
        <input type="number" name="stock" value={product.stock} onChange={handleChange} placeholder="Stock du produit" required />
        <select className="small-width-select" name="category" value={product.category} onChange={handleChange} required>
          <option value="" disabled hidden>Categorie</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Prix du produit" required />
        <input type="text" name="imageUrl" value={product.imageUrl} onChange={handleChange} placeholder="URL de l'image" required />
        <button className="btn" type="submit">Ajouter le produit</button>
      </form>
    </div>
  );
};

export default CreateProduct;