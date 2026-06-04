import { useState } from 'react';
import './index.css';

import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ProductSlider from './components/ProductSlider.jsx';
import CartPanel from './components/CartPanel.jsx';
import Footer from './components/Footer.jsx';
import ProductCard from './components/ProductCard.jsx'; // this is  used  for search results

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  //  SEARCH LOGIC
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    setCart(cart.map(item => item.id === id ? { ...item, quantity: newQty } : item));
  };

  const removeItem = (id) => setCart(cart.filter(item => item.id !== id));
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // საიტის დატა
  const allProducts = [
    { id: 1, name: "GOODYEAR EAGLE SPORT 2 235/60R18 ზაფხული (საბურავი)", category: "Tires", price: 600, section: "Tires", img: "./media/1.jpg" },
    { id: 2, name: "GOODYEAR EAGLE SPORT 2 215/65R17 ზაფხული (საბურავი)", category: "Tires", price: 600, section: "Tires", img: "./media/2.jpg" },
    { id: 3, name: "GOODYEAR EAGLE SPORT 2 225/55R17 ზაფხული (საბურავი)", category: "Tires", price: 525, section: "Tires", img: "./media/3.jpg" },
    { id: 4, name: "TOYO PROXES SPORT 2 295/40R22 ზაფხული (საბურავი)", category: "Tires", price: 1200, section: "Tires", img: "./media/4.jpg" },
    { id: 5, name: "MICHELIN PILOT SPORT EV (AO) 265/40R20 ზაფხული (საბურავი)", category: "Tires", price: 1080, section: "Tires", img: "./media/5.jpg" },
    { id: 6, name: "MICHELIN PILOT SPORT 4S 275/35R21 ზაფხული (საბურავი)", category: "Tires", price: 2340, section: "Tires", img: "./media/6.png" },
    { id: 7, name: "PIRELLI P ZERO (J) (LR) 265/40R22 ზაფხული (საბურავი)", category: "Tires", price: 1240, section: "Tires", img: "./media/7.jpg" },
    { id: 8, name: "PIRELLI PZERO WINTER 245/40R20 ზამთარი (საბურავი)", category: "Tires", price : 1300, section: "Tires", img: "./media/8.jpg" },
    { id: 9, name: "CONTINENTAL WINTERCONTACT 255/60R20 ზამთარი (საბურავი)", category: "Tires", price: 110 , section: "Tires", img: "./media/9.jpg" },
    { id: 10, name: "BRIDGESTONE TURANZA 6 255/45R20 ზაფხული (საბურავი)", category: "Tires", price: 740, section: "Tires", img: "./media/10.png" },
    { id: 11, name: "VARTA DYN AGM A5 95 AH", category: "Batteries", price: 750, section: "Batteries", img: "./media/11.jpg" },
    { id: 12, name: "VARTA EFB N72 72 AH JIS", category: "Batteries", price: 475, section: "Batteries", img: "./media/12.jpg" },
    { id: 13, name: "VARTA BLU G7 95 AH JIS", category: "Batteries", price: 440, section: "Batteries", img: "./media/13.jpg" },
    { id: 14, name: "VARTA DYN AGM A7 70 AH", category: "Batteries", price: 540, section: "Batteries", img: "./media/14.jpg" },
    { id: 15, name: "Duracell DE70 EFB 70 Ah. D26L", category: "Batteries", price: 480.00, section: "Batteries", img: "./media/15.jpg" },
    { id: 16, name: "ENERGIZER AGM EA70L3 70 AH", category: "Batteries", price: 530, section: "Batteries", img: "./media/16.png" },
    { id: 17, name: "ENERGIZER EFB E72D26 72 AH", category: "Batteries", price: 465, section: "Batteries", img: "./media/17.png" },
    { id: 18, name: "MACPOWER PR 95 AH AGM", category: "Batteries", price: 649, section: "Batteries", img: "./media/18.png" },
    { id: 19, name: "EXIDE EFB EL954 95 AH JIS", category: "Batteries", price: 460, section: "Batteries", img: "./media/19.png" },
    { id: 20, name: "FIAMM BT D31X 95 AH JIS", category: "Batteries", price: 379, section: "Batteries", img: "./media/20.png" },
    { id: 21, name: "Mobil 1ESP X2 0W20 5L (ENGINE OIL)", category: "Engine Oil", price: 265, section: "Engine Oil", img: "./media/21.jpg" },
    { id: 22, name: "Mobil Super 3000 Formula R 5W30 5L (ENGINE OIL)", category: "Engine Oil", price: 130, section: "Engine Oil", img: "./media/22.jpg" },
    { id: 23, name: "Mobil Super 3000 Formula P 0W20 5L (ENGINE OIL)", category: "Engine Oil", price: 195, section: "Engine Oil", img: "./media/23.jpg" },
    { id: 24, name: "Mobil 1FS 5W40 1L (ENGINE OIL)", category: "Engine Oil", price: 45, section: "Engine Oil", img: "./media/24.jpg" },
    { id: 25, name: "Mobil Super 3000 Formula OV 0W20 1L (ENGINE OIL)", category: "Engine Oil", price: 40, section: "Engine Oil", img: "./media/25.jpg" },
    { id: 26, name: "Shell Helix Ultra ECT C2/C3 0W30 5L (ENGINE OIL)", category: "Engine Oil", price: 235, section: "Engine Oil", img: "./media/26.jpg" },
    { id: 27, name: "Shell Helix HX8 ECT C3 5W30 5L (ENGINE OIL)", category: "Engine Oil", price: 170, section: "Engine Oil", img: "./media/27.jpg" },
    { id: 28, name: "Shell Helix Ultra Prof. AR-L 0W16 1L (ENGINE OIL)", category: "Engine Oil", price: 40, section: "Engine Oil", img: "./media/28.jpg" },
    { id: 29, name: "MOTUL 8100 ECO-LITE 5W30 4L ENGINE OIL", category: "Engine Oil", price: 168, section: "Engine Oil", img: "./media/29.png" },
    { id: 30, name: "PETRONAS SYNT. 800 EU 10W40 SN 4L", category: "Engine Oil", price: 104, section: "Engine Oil", img: "./media/30.png" },
    { id: 31, name: "TEXTAR 2268801 (Front Brake Pad)", category: "Brake Pads", price: 600, section: "Brake Pads", img: "./media/31.jpg" },
    { id: 32, name: "TEXTAR 2513301 (Front Brake Pad)", category: "Brake Pads", price: 530, section: "Brake Pads", img: "./media/32.jpg" },
    { id: 33, name: "TEXTAR 2590001 (Front Brake Pad)", category: "Brake Pads", price: 470, section: "Brake Pads", img: "./media/33.jpg" },
    { id: 34, name: "TEXTAR 2484701 (Front Brake Pad)", category: "Brake Pads", price: 410, section: "Brake Pads", img: "./media/34.jpg" },
    { id: 35, name: "TEXTAR 2242501 (Front Brake Pad)", category: "Brake Pads", price: 405, section: "Brake Pads", img: "./media/35.jpg" },
    { id: 36, name: "BREMBO P50142 2468102 (Front Brake Pad)", category: "Brake Pads", price: 390, section: "Brake Pads", img: "./media/36.jpg" },
    { id: 37, name: "BREMBO P44028 2248501 (Front Brake Pad)", category: "Brake Pads", price: 280, section: "Brake Pads", img: "./media/37.jpg" },
    { id: 38, name: "BREMBO P36035 2214501 (Front Brake Pad)", category: "Brake Pads", price: 235, section: "Brake Pads", img: "./media/38.jpg" },
    { id: 39, name: "BREMBO P59055 2441201 (Front Brake Pad)", category: "Brake Pads", price: 126, section: "Brake Pads", img: "./media/39.jpg" },
    { id: 40, name: "BREMBO P50061 2347801 (Back Brake Pad)", category: "Brake Pads", price: 110, section: "Brake Pads", img: "./media/40.jpg" },
    { id: 41, name: "BREMBO 09A94533 (Front Brake Disc)", category: "Brake Discs", price: 1280, section: "Brake Discs", img: "./media/41.jpg" },
    { id: 42, name: "BREMBO 09D76210 (Front Brake Disc)", category: "Brake  Discs", price: 110, section: "Brake Discs", img: "./media/42.jfif" },
    { id: 43, name: "TEXTAR 92253925 (Back Brake Disc)", category: "Brake Discs", price: 680, section: "Brake Discs", img: "./media/43.jpg" },
    { id: 44, name: "TEXTAR 92279805 (Front Brake Disc)", category: "Brake Discs", price: 677, section: "Brake Discs", img: "./media/44.jpg" },
    { id: 45, name: "TEXTAR 92253825 (Front Brake Disc)", category: "Brake Discs", price: 640, section: "Brake Discs", img: "./media/45.jpg" },
    { id: 46, name: "BREMBO 09D76311 (Back Brake Disc)", category: "Brake Discs", price: 601, section: "Brake Discs", img: "./media/46.jfif" },
    { id: 47, name: "BREMBO 09D52813 92331105 (Front Brake Disc)", category: "Brake Discs", price: 553, section: "Brake Discs", img: "./media/47.jpg" },
    { id: 48, name: "BREMBO 09A9211X 92139500 (Front Brake Disc)", category: "Brake Discs", price: 270, section: "Brake Discs", img: "./media/48.jpg" },
    { id: 49, name: "BREMBO 09992511 92161105 (Back Brake Disc)", category: "Brake Discs", price: 235, section: "Brake Discs", img: "./media/49.jpg" },
    { id: 50, name: "BREMBO 08D41811 92301403 (Back Brake Disc)", category: "Brake Discs", price: 120, section: "Brake Discs", img: "./media/50.jpg" },
    
             
  ];

  const filteredProducts = allProducts.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header 
        cartCount={cartCount} 
        onCartOpen={() => setIsCartOpen(true)} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main>
        {}
        {searchQuery.length > 0 ? (
          <div className="search-results-section">
            <h2>Search Results for "{searchQuery}"</h2>
            {filteredProducts.length === 0 ? (
              <p style={{marginTop: '10px'}}>No products found. Try a different search term.</p>
            ) : (
              <div className="search-results-grid">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))}
              </div>
            )}
          </div>
        ) : (
            
            <>
            
            <Hero />
            
            <ProductSlider 
              title="Tires" 
              items={allProducts.filter(p => p.section === "Tires")} 
              addToCart={handleAddToCart} 
            />
            
            <ProductSlider 
              title="Batteries" 
              items={allProducts.filter(p => p.section === "Batteries")} 
              addToCart={handleAddToCart} 
              />
              <ProductSlider 
              title="Engine Oils" 
              items={allProducts.filter(p => p.section === "Engine Oil")} 
              addToCart={handleAddToCart} 
              />
              <ProductSlider 
              title="Brake Pads" 
              items={allProducts.filter(p => p.section === "Brake Pads")} 
              addToCart={handleAddToCart} 
              />
               <ProductSlider 
              title="Brake Discs" 
              items={allProducts.filter(p => p.section === "Brake Discs")} 
              addToCart={handleAddToCart} 
            />
          </>
        )}
      </main>

      <Footer />

      <CartPanel 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cart}
        onUpdateQty={updateQuantity}
        onRemove={removeItem}
      />
    </>
  );
}

export default App;