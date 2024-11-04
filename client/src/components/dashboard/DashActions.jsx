//DashActions.jsx
import React, { useState, useEffect } from 'react';
//import { v4 as uuidv4 } from 'uuid';
import Modal from '../modal/Modal'; 
import CreateEditProduct from '../forms/CreateEditProduct';
import { useCategory } from '../../context/CategoryContext';
//import './dashAction.scss';
//import '../../assets/styles/dashboard/dashboard.scss';

const DashActions = ({ onFilterCategory, onAddProduct, onViewChange }) => {
    const { categories, fetchCategories } = useCategory(); 
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [filterCategory, setFilterCategory] = useState('All Categories');
    const [showModal, setShowModal] = useState(false);
    const [viewMode, setViewMode] = useState('table');

    // Gestion des changements de catégorie
    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setFilterCategory(selectedCategory);
        onFilterCategory(selectedCategory);
        setShowFilterMenu(false);
    };

    // Gestion de l'affichage du modal
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    // Ajout d'un produit
    const handleAddProduct = (product) => {
        console.log('Adding product:', product);
        if (product.name && product.category) {
           // const newProductId = uuidv4();
            const formData = new FormData();
            for (const key in product) {
                formData.append(key, product[key]);
            }
           // formData.append('id', newProductId);
            onAddProduct(formData); // Appel de la fonction passée en props
            toggleModal(); // Ferme le modal après ajout
        } else {
            console.error('Product name and category are required');
        }
    };
    useEffect(() => {
        const loadCategories = async () => {
            await fetchCategories(); // Assurez-vous que fetchCategories est défini dans le contexte
        };

        loadCategories();
    }, [fetchCategories]);
    
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
        <div className="actions-content">
            <button className="action-button mode-switch" title="Switch Theme">
                <svg className="moon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                </svg>
            </button>
            <div className="filter-button-wrapper">
                <button className="action-button filter jsFilter" onClick={toggleModal}>
                    <span>Filter</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-filter">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                    </svg>
                </button>
                {showFilterMenu && (
                    <div className="filter-menu active">
                        <select value={filterCategory} onChange={handleCategoryChange}>
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
                Ajouter un Produit
            </button>

            <Modal show={showModal} onClose={toggleModal}>
                <CreateEditProduct onSave={handleAddProduct} />
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

export default DashActions;
