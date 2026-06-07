import './Header.css';

export default function Header(props) {
  
  console.log('Header render, cartCount=', props.cartCount);
  var debug = true;

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
            placeholder="Search tires, batteries, engine oil, etc..."
            value={props.searchQuery}
            onChange={function(e) { console.log('search input', e.target.value); props.setSearchQuery(e.target.value); }}
          />
        </div>

        <div className="header-actions">
          {/*  Cart */}
          <div className="cart-wrapper" onClick={function(){ if(debug) console.log('cart clicked'); props.onCartOpen(); }}>
            <img src="./media/cart.svg" alt="Cart" />
            {props.cartCount > 0 && <span className="cart-badge">{props.cartCount}</span>}
          </div>

        </div>
      </div>
    </header>
  );
}