// components/hero/HeroSlider.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import './heroBoutique.scss';

const HeroBoutique = ({ products }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Filtrer les 5 derniers produits
  const newProducts = products
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % newProducts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [newProducts.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % newProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? newProducts.length - 1 : prev - 1
    );
  };

  const goToProduct = (productId) => {
    navigate(`/product/${productId}`);
  };
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    
    // Si l'image commence déjà par http, on la retourne telle quelle
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Sinon on construit l'URL complète
    return `${import.meta.env.VITE_IMAGE_BASE_URL}/${imagePath}`;
  };
  useEffect(() => {
    console.log('URL de base des images:', import.meta.env.VITE_IMAGE_BASE_URL);
    console.log('Produits:', newProducts);
  }, [newProducts]);
  return (
    <div className="hero-slider">
      <div className="slider-container">
        {newProducts.map((product, index) => (
          <div
            key={product._id}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{
              transform: `translateX(${100 * (index - currentSlide)}%)`
            }}
          >
            <div className="slide-image">
              <img
                src={getImageUrl(product.image)}
                alt={product.name}
                onError={(e) => {
                  console.error('Erreur de chargement image:', e);
                  e.target.src = '/placeholder.jpg'; // Image par défaut si erreur
                }}
              />
            </div>
            <div className="slide-content">
              <span className="new-label">Nouveau</span>
              <h2>{product.name}</h2>
              <p className='slider-description'>{product.description}</p>
              <div className="slide-footer">
                <button 
                  onClick={() => goToProduct(product._id)}
                  className="discover-btn"
                >
                  Découvrir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="slider-btn prev" onClick={prevSlide}>
        <MdKeyboardArrowLeft />
      </button>
      <button className="slider-btn next" onClick={nextSlide}>
        <MdKeyboardArrowRight />
      </button>

      <div className="slider-dots">
        {newProducts.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBoutique;