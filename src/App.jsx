import { useState } from 'react';
import './index.css';

import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ProductSlider from './components/ProductSlider.jsx';
import CartPanel from './components/CartPanel.jsx';
import Footer from './components/Footer.jsx';
import ProductCard from './components/ProductCard.jsx'; // We use this for search results

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // --- SEARCH LOGIC ---
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

  // --- YOUR DATA (All in one place, very easy to edit) ---
  const allProducts = [
    { id: 1, name: "Brake Rotor", category: "Brakes", price: 76.00, section: "bestSales", img: "/media/slider1.png" },
    { id: 2, name: "Performance Tire", category: "Tires", price: 120.00, section: "bestSales", img: "/media/slider2.png" },
    { id: 3, name: "Car Battery", category: "Batteries", price: 85.00, section: "bestSales", img: "/media/slider1.png" },
    { id: 4, name: "Spark Plugs (Set of 4)", category: "Engine", price: 40.00, section: "bestSales", img: "/media/slider2.png" },
    { id: 5, name: "LED Headlights", category: "Lighting", price: 110.00, section: "newArrivals", img: "/media/slider2.png" },
    { id: 6, name: "Racing Steering Wheel", category: "Interior", price: 250.00, section: "newArrivals", img: "/media/slider1.png" },
    { id: 7, name: "Sport Suspension Kit", category: "Suspension", price: 450.00, section: "newArrivals", img: "/media/slider2.png" }
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
          /* If the search bar is empty, show the normal website (Hero + Sliders) */
          <>
            <Hero />
            
            <ProductSlider 
              title="Best Sales" 
              items={allProducts.filter(p => p.section === "bestSales")} 
              addToCart={handleAddToCart} 
            />
            
            <ProductSlider 
              title="New Arrivals" 
              items={allProducts.filter(p => p.section === "newArrivals")} 
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