import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import ItemProduct from '../components/products/ItemProduct';
import CategoryFilter from '../components/categories/categoryFilter';
import './boutique.scss';

const Boutique = () => {
 const { products } = useProduct();
 const [filteredProducts, setFilteredProducts] = useState(products);
 const navigate = useNavigate();
 const location = useLocation(); 
  // const filterByCategory = (category) => {
  //   setFilteredProducts(products.filter(product => product.category === category));
  // };
  useEffect(() => {
    setFilteredProducts(products); // Mettre à jour la liste lorsque les produits changent
  }, [products]);



  // Filtrer les produits par catégorie
  const filterByCategory = (categoryId) => {
    if (categoryId) {
      // Mettre à jour l'URL sans recharger la page
      navigate(`/boutique/${categoryId}`, { replace: true });

      // Filtrer les produits en fonction de la catégorie
      setFilteredProducts(products.filter(product => product.category === categoryId));
    } else {
      // Remettre l'URL à l'état d'origine si aucune catégorie n'est sélectionnée
      navigate('/boutique', { replace: true });
      setFilteredProducts(products); // Affiche tous les produits si aucune catégorie n'est sélectionnée
    }
  };

  return (
    <div className="boutique">
      <h2>La Boutique en ligne</h2>
      <div className="boutique-container">
        {/* Filtre par catégorie */}
        <CategoryFilter onSelectCategory={filterByCategory} />

        {/* Affichage des produits */}
        <div className="product-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
        <ItemProduct
                key={product._id} // Utilisation de la clé unique pour chaque produit
                product={product}  // Passe un seul produit à ItemProduct
         isBoutiqueView={true}
          />
        ))
      ) : (
        <p>Aucun produit disponible.</p>
      )}
        </div>
      </div>
    </div>
  );
};

export default Boutique;