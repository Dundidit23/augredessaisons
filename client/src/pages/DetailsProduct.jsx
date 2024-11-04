import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import ItemProduct from '../components/products/ItemProduct';

const ProductDetails = () => {
  const { id } = useParams(); // Récupère l'ID du produit depuis les paramètres de l'URL
  const { products } = useProduct(); // Récupère les produits du contexte
  const [product, setProduct] = useState(null); // État pour stocker le produit actuel

  const navigate = useNavigate(); // Pour la navigation
  const location = useLocation(); // Récupère la localisation actuelle (permet de récupérer l'état)
  const currentCategory = location.state?.category; // Récupère la catégorie depuis l'état

  // Fonction pour retourner à la page précédente
  const handleGoBack = () => {
    // Si la catégorie est présente, on retourne à la page filtrée par cette catégorie
    if (currentCategory) {
      navigate(`/category/${currentCategory._id}`, { state: { category: currentCategory } });
    } else {
      navigate(-1); // Sinon, retourne à la page précédente par défaut
    }
  };

  useEffect(() => {
    // Recherche le produit correspondant à l'ID dans la liste des produits
    const foundProduct = products.find((p) => p._id === id);
    if (foundProduct) {
      setProduct(foundProduct); // Si trouvé, définit le produit
    }
  }, [id, products]);

  if (!product) {
    return <div>Loading...</div>; // Affiche un message de chargement en attendant que le produit soit trouvé
  }

  return (
    <div className="product-details">
      <button onClick={handleGoBack}>Retour</button>
      <h2>Détails du produit</h2>
      <ItemProduct
        product={product} 
        isAdminView={false}
        isProductDetailView={true}
        currentCategory={currentCategory} // Passe la catégorie ici
      />
    </div>
  );
};

export default ProductDetails;
