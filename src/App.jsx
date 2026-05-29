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
    { id: 20, name: "FIAMM BT D31X 95 AH JIS", category: "Batteries", price: 379, section: "Batteries", img: "./media/20.png" }
  ];

  // Filters the array based on what the user typed in the header!
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
        {/* If the user typed something, show the search results grid */}
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
            /* If the search bar is empty show the normal website (Hero + Sliders) */
            
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
              title="Engine Oil" 
              items={allProducts.filter(p => p.section === "Engine Oil")} 
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