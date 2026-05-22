import { useState, useEffect } from 'react';
import './index.css';

function App() {
  // --- SLIDER LOGIC ---
  const photos = ["/media/slider1.png", "/media/slider2.png"];
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // --- YOUR HTML ---
  return (
    <>
      <header>
        <a href="/">
          <img className="logo" src="/media/Logo.png" alt="ApexAuto Logo" />
        </a>
        
        <div className="Search-Parts">
          <span>What are you looking for?</span>

          {/* Look! Just your normal HTML, no extra Javascript needed */}
          <div className="parts" tabIndex="0">
            Tire
            <div className="options">
              <p>Winter</p><hr />
              <p>Summer</p><hr />
              <p>M+S</p>
            </div>
          </div>

          <div className="parts" tabIndex="0">
            Battery
            <div className="options">
              <p>Duracell</p><hr />
              <p>Varta</p><hr />
              <p>Bosch</p><hr />
              <p>Optima</p>
            </div>
          </div>

          <div className="parts" tabIndex="0">
            Engine
            <div className="options">
              <p>Engine Oil</p><hr />
              <p>Spark Plugs</p><hr />
              <p>Engine Filters</p><hr />
              <p>Coolant / Antifreeze</p>
            </div>
          </div>

          <div className="parts" tabIndex="0">
            Gear Oil
            <div className="options">
              <p>Motul</p><hr />
              <p>Liqui moly</p><hr />
              <p>Mobil</p><hr />
              <p>Castrol</p>
            </div>
          </div>

          <div className="parts" tabIndex="0">
            Suspension
            <div className="options">
              <p><a href="/login.html" style={{textDecoration: 'none', color: 'inherit'}}>Control Arm</a></p><hr />
              <p><a href="/login.html" style={{textDecoration: 'none', color: 'inherit'}}>Ball Joint</a></p><hr />
              <p><a href="/login.html" style={{textDecoration: 'none', color: 'inherit'}}>Wheel Hub</a></p><hr />
              <p><a href="/login.html" style={{textDecoration: 'none', color: 'inherit'}}>Bushing</a></p>
            </div>
          </div>

          <div className="parts" tabIndex="0">
            Lights
            <div className="options">
              <p>Philips</p><hr />
              <p>Osram</p><hr />
              <p>Hella</p>
            </div>
          </div>
        </div>

        <a href="/login.html">
          <img className="cart" src="/media/cart.svg" alt="Cart" />
        </a>

        <a href="/login.html" className="login">
          <span>Log In</span>
          <img src="/media/login.svg" alt="Login icon" />
        </a>
      </header>

      <div className="slider">
        <img className="js-slider-image" src={photos[slideIndex]} alt="Slider" />
      </div>
    </>
  );
}

export default App;