import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import { useCart } from '../context/CartContext'; // Importation du hook useCart
import ItemProduct from '../components/products/ItemProduct'; // Importation correcte de ItemProduct
import './detailProduct.scss';

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useProduct();
  const { addToCart } = useCart(); // Utilisation du hook pour ajouter au panier
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const currentCategory = location.state?.category;

  const handleGoBack = () => {
    if (currentCategory) {
      navigate(`/category/${currentCategory._id}`, { state: { category: currentCategory } });
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    const foundProduct = products.find((p) => p._id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id, products]);



  const handleAddToCart = (product) => {
    addToCart(product);
    // Redirection vers la page panier après l'ajout du produit
    navigate('/cart');
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details">
      <button onClick={handleGoBack} className="go-back-btn">Retour</button>
      <h2>{product.name}</h2>
     
       
        <ItemProduct
            product={product} 
            isAdminView={false}
            isProductDetailView={true}
            currentCategory={currentCategory} // Passe la catégorie ici
            viewMode="details" // Ajout de la prop viewMode avec valeur 'details'
 />
      
    </div>
  );
};

export default ProductDetails;
