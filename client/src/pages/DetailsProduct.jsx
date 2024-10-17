import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import ItemProduct from '../components/products/ItemProduct';

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useProduct();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = products.find((p) => p._id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id, products]);

  if (!product) {
    return <div>Loading...</div>; // Affiche un message de chargement en attendant que le produit soit trouvé
  }

  return (
    <div className="product-details">
       <h2>Détails du produit</h2>
       <ItemProduct product={product} isDetailedView={true} />
    </div>
  );
};

export default ProductDetails;
