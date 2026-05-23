export default function ProductSlider({ title, items }) {
  
  // This is where you will eventually put your real cart logic!
  const addToCart = (itemName) => {
    alert(`Added ${itemName} to your cart!`);
  };

  return (
    <div className="slider-section">
      <div className="slider-header">
        <h2>{title}</h2>
        {/* Fake arrows just for the visual layout like your image */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ padding: '5px 10px', cursor: 'pointer' }}>{"<"}</button>
          <button style={{ padding: '5px 10px', cursor: 'pointer' }}>{">"}</button>
        </div>
      </div>

      <div className="horizontal-scroll">
        {items.map((item) => (
          <div key={item.id} className="item-card">
            {item.discount && <div className="discount-badge">{item.discount}% Off</div>}
            
            <img src={item.img} alt={item.name} />
            <h3>{item.name}</h3>
            
            <div className="price-row">
              <span className="current-price">${item.price}</span>
              {item.oldPrice && <span className="old-price">${item.oldPrice}</span>}
            </div>

            <div className="card-buttons">
              <button 
                className="btn-add" 
                onClick={() => addToCart(item.name)}
              >
                Add to cart
              </button>
              <button className="btn-buy">Buy now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}