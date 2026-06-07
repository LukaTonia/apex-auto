import './ProductCard.css';
export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <div className="product-image-wrap">
        <img src={product.img} alt={product.name} />
      </div>
      
      <div className="product-body">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">{product.price.toFixed(2)}&#8382;</p>
        <button className="btn-add-cart" onClick={() => onAddToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}