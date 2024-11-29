// pages/Boutique.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import { useCategory } from '../context/CategoryContext';
import Events from '../components/modules/Meetings'
import HeroBoutique from '../components/hero/HeroBoutique';
import ItemProduct from '../components/products/ItemProduct';
import CategoryFilter from '../components/categories/categoryFilter';
import './boutique.scss';

const Boutique = () => {
  const { products } = useProduct();
  const { categories, fetchCategories } = useCategory();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { category } = useParams();
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Chargement initial des catégories
  //   fetchCategories();
  // }, [fetchCategories]);
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await fetchCategories();
        setError(null);
      } catch (err) {
        console.error('Erreur de chargement:', err);
        setError('Impossible de charger les données');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [fetchCategories]);

  useEffect(() => {
    if (category) {
      filterByCategory(decodeURIComponent(category));
    } else {
      setFilteredProducts(products);
    }
  }, [category, products]);

  const filterByCategory = (categoryId) => {
    if (categoryId && categoryId !== 'all') {
      setFilteredProducts(products.filter(product => product.category === categoryId));
    } else {
      setFilteredProducts(products);
    }
  };

  const handleCategorySelect = (selectedCategory) => {
    if (selectedCategory === 'all') {
      navigate('/boutique');
    } else {
      navigate(`/boutique/${encodeURIComponent(selectedCategory)}`);
    }
  };

  if (isLoading) {
    return <div className="loading">Chargement...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }


  return (
    <div className="boutique-content">
      <div className='title-boutique'>
      <h1>La Boutique en ligne</h1>
      <Events />
      </div>
       
       <HeroBoutique products={products} />
   
      <div className="boutique">
        <CategoryFilter
          onSelectCategory={handleCategorySelect}
          currentCategory={decodeURIComponent(category || '')} 
        />
        <div className="product-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ItemProduct
                key={product._id}
                product={product}
                isBoutiqueView={true}
              />
            ))
          ) : (
            <p>Aucun produit disponible dans cette catégorie.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Boutique;