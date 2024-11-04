//AdminProducts.jsx
import React, { useRef, useEffect, useState } from 'react';
import { useProduct } from '../../context/ProductContext';
import { useCategory } from '../../context/CategoryContext';
import CategorySelector from '../categories/CategorySelector';
import ItemProduct from './ItemProduct';
import DashActions from '../dashboard/DashActions';
import '../../assets/styles/dashboard/dashboard.scss';

//import './productsAdmin.scss';
//import './adminProduct.scss';
import './adminp.scss';

const AdminProducts = () => {
  const { products, isLoading, errorMessage, addProduct, updateProduct, deleteProduct, fetchProducts } = useProduct();
 // const { categories, fetchCategories, errorMessage: categoryError } = useCategory();
 const [selectedCategory, setSelectedCategory] = useState('');

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
  
  const formRef = useRef(null);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };
  useEffect(() => {
    if (fetchCategories) {
      fetchCategories();
    }
    if (fetchProducts) {
    fetchProducts();
    }
  }, []);

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
    const imageUrl = `${import.meta.env.VITE_IMAGE_BASE_URL}/${product.image.replace(/\\/g, '/')}?t=${new Date().getTime()}`; 
    setPreviewImage(imageUrl);
    setIsEditMode(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, image: file })); // stocke le fichier dans formData
    }
  };
  

  const fileInputRef = useRef(null);

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
        fileInputRef.current.value = null; // Réinitialiser seulement si fileInputRef est défini
    }
    setIsEditMode(false);
};

  const handleDelete = (productId) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      deleteProduct(productId);
    }
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
    <div className='product-content'>
      <div className="title-action">
         <h2 className='title-page-product'>Gestion des produits</h2> 
         <DashActions />
        <div className='actions'></div>
      </div>
   
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

      <h2>Gestion des produits</h2>
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
