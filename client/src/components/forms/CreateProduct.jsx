import React, { useState, useEffect } from 'react';
import { useCategory } from '../../context/CategoryContext';
import './createProduct.scss';

const CreateProduct = ({ isEditing, product, onSubmit }) => {
  const { categories } = useCategory(); // Assurez-vous que les catégories sont récupérées ici
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: null,
  });

  useEffect(() => {
    if (isEditing && product) {
      setFormData(product);
      setSelectedCategory(product.category || '');
    }
  }, [isEditing, product]);


  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value, // Gestion des fichiers
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (isEditing && product && product._id) {
      onSubmit({ ...formData, id: product._id }); // Passer l'ID du produit pour la mise à jour
    } else {
      onSubmit(formData); // Pour créer un nouveau produit
    }
  };
  useEffect(() => {
    console.log('Catégories chargées :', categories);
  }, [categories]);
  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Modifier le produit' : 'Ajouter un produit'}</h2>

      <fieldset>
        <label htmlFor="name">Nom du produit</label>
        <input id="name" name="name" value={formData.name} onChange={handleChange} required />
      </fieldset>

      <fieldset>
        <label htmlFor="category">Catégorie</label>
        <select
          id="category"
          name="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.category}
            </option>
          ))}
        </select>
      </fieldset>

      <fieldset>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </fieldset>

      <fieldset>
        <label htmlFor="imageUrl">Image</label>
        <input id="imageUrl" name="imageUrl" type="file" onChange={handleChange} />
      </fieldset>

      <fieldset>
        <label htmlFor="price">Prix (€)</label>
        <input id="price" name="price" type="number" value={formData.price} onChange={handleChange} required />
        <label htmlFor="stock">Stock</label>
        <input id="stock" name="stock" type="number" value={formData.stock} onChange={handleChange} required />
      </fieldset>

      <button type="submit">{isEditing ? 'Mettre à jour le produit' : 'Créer le produit'}</button>
    </form>
  );
};

export default CreateProduct;
