import './ProductCard.css';

export default function ProductCard(props) {
  console.log('ProductCard render', props.product && props.product.id);

  return (
    <div className="product-card">
      <div className="product-image-wrap">
        <img src={props.product.img} alt={props.product.name} />
      </div>
      
      <div className="product-body">
        <span className="product-category">{props.product.category}</span>
        <h3 className="product-title">{props.product.name}</h3>
        <p className="product-price">{props.product.price.toFixed(2)}&#8382;</p>
        <button className="btn-add-cart" onClick={function(e){ console.log('add clicked', props.product.id); props.onAddToCart(props.product); }}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}