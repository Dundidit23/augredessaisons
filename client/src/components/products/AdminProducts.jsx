// AdminProducts.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useProduct } from '../../context/ProductContext';
import { useCategory } from '../../context/CategoryContext';
import ItemProduct from './ItemProduct';

const AdminProducts = () => {
  const { products, isLoading, errorMessage, addProduct, updateProduct, deleteProduct, fetchProducts } = useProduct();
  const { categories, fetchCategories, errorMessage: categoryError } = useCategory();
  const formRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [formData, setFormData] = useState({
    _id: '',
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    image: '',
  });
  
  const fileInputRef = useRef(null);

  // Charger les catégories et produits une seule fois
  useEffect(() => {
    fetchCategories && fetchCategories();
    fetchProducts && fetchProducts();
  }, [fetchCategories, fetchProducts]);

  // Fonction pour commencer l'édition d'un produit
  const startEditProduct = (product) => {
    setProductToEdit(product);
    setFormData({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      stock: product.stock,
      image: product.image,
    });
    const imageUrl = `${import.meta.env.VITE_API_BASE_URL}${product.image.replace(/\\/g, '/')}`;
    setPreviewImage(imageUrl);
    setIsEditMode(true);
  };

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Fonction pour gérer les changements dans le champ fichier (image)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({ ...prevData, image: file }));
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    }
  };

  // Fonction pour réinitialiser le formulaire
  const handleCancel = () => {
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
    fileInputRef.current.value = null;  // Réinitialiser le champ fichier
    setIsEditMode(false);
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = { ...formData };
    if (isEditMode) {
      await updateProduct(formDataToSubmit);
    } else {
      await addProduct(formDataToSubmit);
    }

    handleCancel(); // Réinitialiser après soumission
  };

  const handleDelete = async (productId) => {
    await deleteProduct(productId);
  };

  return (
    <div>
      <h2>{isEditMode ? 'Modifier' : 'Ajouter'} un produit</h2>
      <form onSubmit={handleSubmit} ref={formRef}>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Nom du produit"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
        >
          <option value="">Sélectionnez une catégorie</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.category}
            </option>
          ))}
        </select>

        <input
          name="image"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        {previewImage && <img src={previewImage} alt="Aperçu" width="100" />}

        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleInputChange}
          placeholder="Prix"
          min="0"
          step="0.01"
          required
        />

        <input
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleInputChange}
          placeholder="Stock"
          min="0"
          required
        />

        <button type="submit">
          {isEditMode ? 'Modifier' : 'Ajouter'} le produit
        </button>
        <button type="button" onClick={handleCancel} style={{ marginLeft: '10px' }}>
          Annuler
        </button>
      </form>

      <h2>Gestion des produits (Admin)</h2>
      <div className="product-list">
        {products.map((product) => (
          <ItemProduct
            key={product._id}
            product={product}
            isAdminView={true}
            handleDelete={handleDelete}
            startEditProduct={startEditProduct}
            isEditMode={isEditMode && productToEdit?._id === product._id}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
