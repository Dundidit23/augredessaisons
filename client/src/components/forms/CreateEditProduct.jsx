import React, { useRef, useState, useEffect } from 'react';
import { useCategory } from '../../context/CategoryContext';
import { useProduct } from '../../context/ProductContext';
import './createEditProduct.scss';

const CreateEditProduct = ({ productToEdit = {}, onSubmit, isEditMode, onCancel }) => {
  const { categories, fetchCategories } = useCategory();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (isEditMode && productToEdit) {
      setFormData({
        name: productToEdit.name || '',
        description: productToEdit.description || '',
        category: productToEdit.category || '',
        price: productToEdit.price || '',
        stock: productToEdit.stock || '',
        image: productToEdit.image || null,
      });
      if (productToEdit.image) {
        setPreviewImage(`${import.meta.env.VITE_IMAGE_BASE_URL}/${productToEdit.image.replace(/\\/g, '/')}`);
      }
    }
  }, [isEditMode, productToEdit]);

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

  const handleCancel = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      category: '',
      image: null,
    });
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
    onCancel();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      handleCancel(); // Réinitialiser après soumission
    } catch (error) {
      console.error('Error during submission:', error);
    }
  };

  return (
    <form className="edit-product-form" onSubmit={handleSubmit}>
      <h2>{isEditMode ? 'Modifier' : 'Ajouter'} un produit</h2>
      <div className="name-category">
        <fieldset>
          <legend>Nom</legend>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Nom du produit"
            required
          />
        </fieldset>
        <fieldset>
          <legend>Catégorie</legend>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Sélectionnez une catégorie</option>
            {categories.map((category) => (
              <option key={category._id} value={category.category}>
                {category.category}
              </option>
            ))}
          </select>
        </fieldset>
      </div>
      <div>
        <legend>Description</legend>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
        />
      </div>
      <div className="image-input">
        <fieldset>
          <legend>Choisir une image</legend>
          <input
            name="image"
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </fieldset>
        <span className="image-position">
          {previewImage ? (
            <img src={previewImage} alt="Aperçu" />
          ) : (
            "Aperçu"
          )}
        </span>
      </div>
      <div className="price-stock">
        <fieldset>
          <legend>Prix</legend>
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
        </fieldset>
        <fieldset>
          <legend>Stock</legend>
          <input
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleInputChange}
            placeholder="Stock"
            min="0"
            required
          />
        </fieldset>
      </div>
      <div className="buttons">
        <button type="submit">
          {isEditMode ? 'Modifier' : 'Ajouter'} le produit
        </button>
        <button type="button" onClick={handleCancel} style={{ marginLeft: '10px' }}>
          Annuler les changements
        </button>
      </div>
    </form>
  );
};

export default CreateEditProduct;