export default function Header({ cartCount, onCartOpen, searchQuery, setSearchQuery }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a href="/">
          <img className="logo" src="./media/Logo.png" alt="ApexAuto Logo" />
        </a>

        {/*  Search Bar */}
        <div className="search-wrap">
          <input
            type="text"
            className="search-input"
            placeholder="Search tires, batteries, oil, etc..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="header-actions">
          {/*  Cart */}
          <div className="cart-wrapper" onClick={onCartOpen}>
            <img src="./media/cart.svg" alt="Cart" />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </div>

          {/* Login Button */}
          <a href="./login.html" className="login-btn">
            <img src="./media/login.svg" alt="Login icon" />
            <span>Log In</span>
          </a>
        </div>
      </div>
    </header>
  );
}