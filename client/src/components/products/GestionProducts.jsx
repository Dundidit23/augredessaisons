import React, { useRef, useEffect, useState } from 'react';
import { useProduct } from '../../context/ProductContext';
import { useCategory } from '../../context/CategoryContext';
import '../categories/categories.scss';

const GestionProducts = () => {
  const { products, isLoading, errorMessage, addProduct, updateProduct, deleteProduct } = useProduct();
  console.log('Produits:', products);
  const { categories, fetchCategories, errorMessage: categoryError } = useCategory();
  
  const [previewImage, setPreviewImage] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    _id: '',
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    image: '', 
  });

  const formRef = useRef(null);

  useEffect(() => {
    if (fetchCategories) {
      fetchCategories();
    }
  }, [fetchCategories]);

  if (isLoading) {
    return <div>Chargement des produits...</div>;
  }

  if (errorMessage) {
    return <div>Erreur : {errorMessage}</div>;
  }
  if (categoryError) {
    return <div>Erreur : {categoryError}</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('stock', formData.stock);
    
    if (typeof formData.image === 'object') {
      formDataToSend.append('image', formData.image);
    }

    if (isEditMode) {
      updateProduct(formData._id, formDataToSend);
    } else {
      addProduct(formDataToSend);
    }
    
    formRef.current.reset();
    setFormData({
      _id: '',
      name: '',
      description: '',
      category: '',
      price: '',
      stock: '',
      image: '',
    });
    setPreviewImage(null);
    setIsEditMode(false);
  };

  const handleEdit = (product) => {
    setFormData({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      stock: product.stock,
      image: product.image,
    });
    setPreviewImage(`${import.meta.env.VITE_API_BASE_URL}/${product.image}`);
    setIsEditMode(true);
  };

  return (
    <div>
        <h1>{isEditMode ? 'Modifier le produit' : 'Ajouter un produit'}</h1>
        <form onSubmit={handleSubmit} ref={formRef}>
        <input name="name" type="text" value={formData.name} onChange={handleInputChange} placeholder="Nom" required />
        <input name="description" type="text" value={formData.description} onChange={handleInputChange} placeholder="Description" required />
        
        <select name="category" value={formData.category} onChange={handleInputChange} required>
          <option value="">Sélectionnez une catégorie</option>
          {categories.map((category) => (
            <option key={category._id} value={category.category}>
              {category.category}
            </option>
          ))}
        </select>

        <input name="image" type="file" accept="image/*" onChange={handleFileChange} />
        {previewImage && <img src={previewImage} alt="Aperçu" width="100" />}

        <input name="price" type="number" value={formData.price} onChange={handleInputChange} placeholder="Prix" required />
        <input name="stock" type="number" value={formData.stock} onChange={handleInputChange} placeholder="Stock" required />
        
        <button type="submit">{isEditMode ? 'Modifier' : 'Ajouter'} le produit</button>
      </form>

      <ul>
            {products.length > 0 ? ( // Vérifie si des produits sont disponibles
                products.map((product) => (
                    <li key={product._id}>
                        <div>
                            <strong>{product.name}</strong>
                            <p>{product.description}</p>
                            <p>Catégorie: {product.category}</p>
                            {product.image && (
                                <img src={`${import.meta.env.VITE_API_BASE_URL}/${product.image}`} alt={product.name} width="100" />
                            )}
                            <p>Prix: {product.price} €</p>
                            <p>Stock: {product.stock}</p>
                        </div>
                        <button onClick={() => handleEdit(product)}>Modifier</button>
                        <button onClick={() => deleteProduct(product._id)}>Supprimer</button>
                    </li>
                ))
            ) : (
                <p>Aucun produit disponible.</p>
            )}
        </ul>
         <div>
        <h1>Liste des Produits</h1>

        {isLoading ? (
            <p>Chargement des produits...</p>
        ) : products.length > 0 ? ( // Assurez-vous que products est un tableau
            <ul>
                {products.map((product) => (
                    <li key={product._id}>
                        <strong>{product.name}</strong>
                        <p>{product.description}</p>
                        <p>Prix: {product.price} €</p>
                        <img src={`${import.meta.env.VITE_API_BASE_URL}/${product.image}`} alt={product.name} width="100" />
                    </li>
                ))}
            </ul>
        ) : (
            <p>Aucun produit disponible.</p>
        )}
    </div>
    </div>
);
};

export default GestionProducts;
