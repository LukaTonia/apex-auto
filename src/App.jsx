import { useState, useEffect } from 'react';
import './index.css';
import Header from './components/Header.jsx';
import ProductSlider from './components/ProductSlider.jsx';

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

  const bestSales = [
    { id: 1, name: "Brake Rotor", price: 76, oldPrice: 99, discount: 25, img: "/media/slider1.png" },
    { id: 2, name: "Performance Tire", price: 120, oldPrice: 150, discount: 20, img: "/media/slider2.png" },
    { id: 3, name: "Car Battery", price: 85, oldPrice: 100, discount: 15, img: "/media/slider1.png" },
    { id: 4, name: "Spark Plugs (Set of 4)", price: 40, oldPrice: null, discount: null, img: "/media/slider2.png" },
    { id: 5, name: "Oil Filter", price: 15, oldPrice: 20, discount: 25, img: "/media/slider1.png" },
  ];

  const newArrivals = [
    { id: 101, name: "LED Headlights", price: 110, oldPrice: null, discount: null, img: "/media/slider2.png" },
    { id: 102, name: "Racing Steering Wheel", price: 250, oldPrice: 300, discount: 10, img: "/media/slider1.png" },
    { id: 103, name: "Sport Suspension Kit", price: 450, oldPrice: null, discount: null, img: "/media/slider2.png" },
  ];

  return (
    <>
      <Header />

      <main>
        <div className="slider">
          <img className="js-slider-image" src={photos[slideIndex]} alt="Slider" />
        </div>

        <ProductSlider title="Best Sales" items={bestSales} />
        <ProductSlider title="New Arrivals" items={newArrivals} />
        
      </main>
    </>
  );
}

export default App;