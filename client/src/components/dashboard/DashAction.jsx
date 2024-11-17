//DashAction.jsx
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Modal from '../modal/Modal'; 
import CreateProduct from '../forms/CreateProduct2';
import { useCategory } from '../../../private/CategoryContextOriginal';
import './dashActions.scss';


const DashAction = ({ onAdd, onFilter, onViewChange }) => {
    const { categories } = useCategory();  
    const [showModal, setShowModal] = useState(false);
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    //const [filterCategory, setFilterCategory] = useState('All Categories'); // État pour le filtre de catégorie
    //const [newProduct, setNewProduct] = useState({ name: '', category: '', description: '', stock: 0, price: 0, imageUrl: '' });
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const toggleModal = () => {
        setShowModal(!showModal);
    };
    const handleFilter = (category) => {
        if (category) {
            setFilteredProducts(products.filter(product => product.category === category));
        } else {
            setFilteredProducts(products); // Réinitialise le filtre pour afficher tous les produits
        }
    };


    const handleAddProduct = async (product) => {
        console.log('Adding product:', product);
    
        // Vérification si le nom et la catégorie sont bien présents
        if (product.name && product.category) {
            const newProductId = uuidv4();
            
            // Créer un objet FormData pour inclure l'image et les autres données
            const formData = new FormData();
            for (const key in product) {
                formData.append(key, product[key]);
            }
            formData.append('id', newProductId); // Ajouter un ID unique pour le produit
    
            // Appel à la fonction onAdd (passée via les props) avec FormData
            onAdd(formData);
            
            // Réinitialisation des champs du produit après ajout
            setNewProduct({ name: '', category: '', description: '', stock: 0, price: 0, imageUrl: '' });
            setShowModal(false); // Fermer le modal après ajout
        } else {
            console.error('Product name and category are required');
        }
    };
    

    const toggleFilterMenu = () => {
        setShowFilterMenu(!showFilterMenu);
    };

    // useEffect(() => {
    //     onFilter(filterCategory === 'All Categories' ? null : filterCategory);
    // }, [filterCategory, onFilter]);

   

    useEffect(() => {
        const modeSwitch = document.querySelector('.mode-switch');
        if (modeSwitch) {
            const handleModeSwitch = () => {
                document.documentElement.classList.toggle('light');
                modeSwitch.classList.toggle('active');
            };
            modeSwitch.addEventListener('click', handleModeSwitch);

            return () => {
                modeSwitch.removeEventListener('click', handleModeSwitch);
            };
        }
    }, []);

    return (
        <div className="actions-wrapper">
            <button className="mode-switch" title="Switch Theme">
                <svg className="moon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                </svg>
            </button>
            <div className="filter-button-wrapper">
                <button className="action-button filter jsFilter" onClick={toggleFilterMenu}>
                    <span>Filtre</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-filter">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                    </svg>
                </button>
                {showFilterMenu && (
                    <div className="filter-menu active">
                        <select
                            value={filterCategory}
                            onChange={(e) => {
                                setFilterCategory(e.target.value);
                                setShowFilterMenu(false); // Fermer le menu de filtre
                            }}
                        >
                            <option value="All Categories">All Categories</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category.category}>
                                    {category.category}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            <button className="action-button add" onClick={toggleModal}>
                Add Product
            </button>

            <Modal show={showModal} onClose={toggleModal}>
                <CreateProduct onSubmit={handleAddProduct} />
            </Modal>

            <button className="action-button list" title="List View" onClick={() => onViewChange('table')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-list">
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
            </button>
            
            <button className="action-button grid" title="Grid View" onClick={() => onViewChange('grid')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-grid">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                </svg>
            </button>
        </div>
    );
};

export default DashAction;
