import { useState, useEffect } from 'react';

export default function Hero() {
  const photos = ['./media/slider1.png', './media/slider2.png', './media/slider3.png', './media/slider4.png', './media/slider5.png', './media/slider6.png'];
  const [slideIndex, setSlideIndex] = useState(0);

  // Auto-slide logic
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Manual click logic
  const nextSlide = () => setSlideIndex((prevIndex) => (prevIndex + 1) % photos.length);
  const prevSlide = () => setSlideIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);

  return (
    <section className="hero-section">
      {/* main Slider */}
      <div className="hero-slider" style={{ position: 'relative' }}>
        <img src={photos[slideIndex]} alt="Promotional Slider" />
        
        {/* Floating Arrows on top of the image */}
        <button 
          onClick={prevSlide} 
          className="slider-arrow-btn" 
          style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', background: 'white' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        
        <button 
          onClick={nextSlide} 
          className="slider-arrow-btn" 
          style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'white' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
    </section>
  );
}