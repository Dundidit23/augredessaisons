import React, { useRef, useEffect, useState } from 'react';

import './createProduct.scss';

const CreateProduct = ({ onSave, initialData }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setCategory(initialData.category);
        } else {
            setName('');
            setCategory('');
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const productData = {
            name,
            category,
            image,
        };
        onSave(productData); // Assurez-vous que la fonction onSave est bien passée
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    return (
        <form className="edit-product-form" onSubmit={handleSubmit} ref={formRef}>
        <h2>{isEditMode ? 'Modifier' : 'Ajouter'} un produit</h2>
  <div className='name-category'>
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
  <fieldset>
    <legend>description</legend>
  <textarea
            name="description"
            type="text"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            required
          />
  </fieldset>
  
   <div className="image-price-stock">      
  <fieldset>
    <legend>Choisir une image</legend>
  <input
            name="image"
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
           // onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
          />
          {previewImage && (
            <img src={previewImage} alt="Aperçu" width="100" />
          )}
  
  </fieldset> 
   <fieldset>      
          <legend>prix</legend>
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
   <legend>stock</legend>
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
        
          <div className='buttons'>
  
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

export default CreateProduct;
