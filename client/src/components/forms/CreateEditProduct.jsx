import React, { useRef, useState, useEffect } from 'react';
import { useCategory } from '../../context/CategoryContext';

const CreateEditProduct = ({ isEditMode = false, productToEdit = {}, onSubmit }) => {
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
  const formRef = useRef(null);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        ...formData,
        ...productToEdit,
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
    fileInputRef.current.value = null;
    setIsEditMode(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (isEditMode && productToEdit) {
      await updateProduct(productToEdit._id, formData);
    } else {
      await addProduct(formData);
    }
  
    handleCancel(); // Réinitialiser après soumission
  };
  

  if (isLoading) {
    return <div>Chargement des produits...</div>;
  }

  if (errorMessage) {
    return <div>Erreur : {errorMessage}</div>;
  }


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

export default CreateEditProduct;
