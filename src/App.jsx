import { useState, useEffect } from 'react';
import './index.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

function App() {
  // --- SLIDER LOGIC ---
  const photos = ['/media/slider1.png', '/media/slider2.png'];
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Header />

      <main>
        <div className="slider">
          <img className="js-slider-image" src={photos[slideIndex]} alt="Slider" />
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;