import { useRef } from 'react';
import ProductCard from './ProductCard';

export default function ProductSlider({ title, items, addToCart }) {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      // FIX: This simple 1-line check prevents the 'const' error!
      const scrollAmount = direction === 'left' ? -300 : 300;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="slider-section">
      <div className="slider-header">
        <h2>{title}</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => scroll('left')} className="slider-arrow-btn" aria-label="Scroll left">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button onClick={() => scroll('right')} className="slider-arrow-btn" aria-label="Scroll right">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>

      <div className="horizontal-scroll" ref={sliderRef}>
        {items.map((item) => (
          <ProductCard key={item.id} product={item} onAddToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}