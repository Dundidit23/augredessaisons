import React, { useState, useEffect } from 'react';
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
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom du produit" required />
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Catégorie" required />
            <input type="file" onChange={handleImageChange} />
            <button type="submit">Enregistrer</button>
        </form>
    );
};

export default CreateProduct;
