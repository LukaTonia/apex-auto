import { useState, useEffect } from 'react';

export default function Hero() {
  const photos = ['/media/slider1.png', '/media/slider2.png'];
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-section">
      {/* Your Original Slider */}
      <div className="hero-slider">
        <img src={photos[slideIndex]} alt="Promotional Slider" />
      </div>

    
    </section>
  );
}