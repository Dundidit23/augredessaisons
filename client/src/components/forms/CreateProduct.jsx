import React, { useState, useEffect } from 'react';
import { addProduct, updateProduct, fetchCategories } from '../../services/api';

const CreateProduct = ({ isEditing, productToEdit, onSubmit }) => {
    const [name, setName] = useState(productToEdit ? productToEdit.name : '');
    const [category, setCategory] = useState(productToEdit ? productToEdit.category : '');
    const [description, setDescription] = useState(productToEdit ? productToEdit.description : '');
    const [stock, setStock] = useState(productToEdit ? productToEdit.stock : 0);
    const [price, setPrice] = useState(productToEdit ? productToEdit.price : 0);
    const [selectedImage, setSelectedImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const fetchedCategories = await fetchCategories();
                console.log('Fetched categories:', fetchedCategories); // Affichez les catégories dans la console
                if (Array.isArray(fetchedCategories)) {
                    setCategories(fetchedCategories);
                } else {
                    throw new Error('Les catégories récupérées ne sont pas au format attendu.');
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
                setErrorMessage('Erreur lors du chargement des catégories.');
            }
        };

        loadCategories();
    }, []);

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('category', category);
        formData.append('description', description);
        formData.append('stock', stock);
        formData.append('price', price);
        if (selectedImage) {
            formData.append('image', selectedImage);
        }

        try {
            if (isEditing) {
                await updateProduct(productToEdit._id, formData);
            } else {
                await addProduct(formData);
            }
            onSubmit();
            setErrorMessage('');
        } catch (error) {
            console.error('Error during product creation:', error);
            setErrorMessage('Une erreur est survenue lors de la création du produit.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nom du produit"
                required
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="">Sélectionnez une catégorie</option>
                {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.category}</option>
                ))}
            </select>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
            />
            <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Stock"
                required
            />
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Prix"
                required
            />
            <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit">{isEditing ? 'Modifier' : 'Ajouter'}</button>
        </form>
    );
};

export default CreateProduct;
