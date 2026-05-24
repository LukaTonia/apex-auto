import { useRef } from 'react';
import ProductCard from './ProductCard';

export default function ProductSlider({ title, items, addToCart }) {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    const el = sliderRef.current;
    if (!el) return;

    const scrollAmount = direction;
    if (direction === 'left') {
  scrollAmount = -300;
} else {
  scrollAmount = 300;
}
    if (typeof el.scrollBy === 'function') {
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    } else {
      el.scrollLeft += scrollAmount;
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="slider-section">
      <div className="slider-header">
        <h2>{title}</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => scroll('left')} style={{ padding: '5px 15px', cursor: 'pointer', background: 'var(--bg-gray)', border: '1px solid var(--border-color)', borderRadius: '5px' }}>{"<"}</button>
          <button onClick={() => scroll('right')} style={{ padding: '5px 15px', cursor: 'pointer', background: 'var(--bg-gray)', border: '1px solid var(--border-color)', borderRadius: '5px' }}>{">"}</button>
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