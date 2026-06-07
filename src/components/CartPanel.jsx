import React, { useState } from "react";
import './CartPanel.css';

export default function CartPanel({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemove,
}) {
  const [promocodeValue, setPromocodeValue] = useState("");
  const [appliedPromocode, setAppliedPromocode] = useState("");
  
  
  const [isCheckoutMode, setIsCheckoutMode] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  let cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (appliedPromocode.toUpperCase() === "APEX20") {
    cartTotal = cartTotal - cartTotal * 0.2;
  }

  
  const handleCheckoutSubmit = (e) => {
    e.preventDefault(); 
    setOrderComplete(true); 
  };

  const handleClose = () => {
    onClose();
   
    setTimeout(() => {
      setIsCheckoutMode(false);
      setOrderComplete(false);
    }, 300);
  };

  return (
    <>
      <div className="cart-backdrop" onClick={handleClose} />

      <aside className="cart-panel">
        <div className="cart-panel-header">
        
          <h2>{orderComplete ? "Order Complete" : isCheckoutMode ? "Checkout" : "Your Cart"}</h2>
          <button className="cart-close" onClick={handleClose}>
            ×
          </button>
        </div>

        <div className="cart-panel-body">
      
          {orderComplete ? (
            <div className="success-message">
              <h3>Your order has been accepted!</h3>
              <p>Thank you for shopping with us. You will pay the courier upon delivery.</p>
            </div>
            
        
          ) : isCheckoutMode ? (
            <form id="checkout-form" className="checkout-form" onSubmit={handleCheckoutSubmit}>
              <input type="text" placeholder="First Name" required />
              <input type="text" placeholder="Surname" required />
              <input type="tel" placeholder="Phone Number" required />
              <input type="text" placeholder="ID Card Number" required />
              <input type="text" placeholder="City" required />
              <input type="text" placeholder="Street Address" required />
              
              <div className="payment-option">
                <input type="radio" id="pay-courier" name="payment" required defaultChecked />
                <label htmlFor="pay-courier">Pay price to the courier</label>
              </div>
            </form>

       
          ) : cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-line">
                <img src={item.img} alt={item.name} className="cart-thumb" />
                <div className="cart-line-info">
                  <strong>{item.name}</strong>
                  <div className="cart-qty-row">
                    <button onClick={() => onUpdateQty(item.id, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onUpdateQty(item.id, item.quantity + 1)}>+</button>
                    <button
                      style={{ color: "red", border: "none", background: "none" }}
                      onClick={() => onRemove(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <strong>&#8382;{(item.price * item.quantity).toFixed(2)}</strong>
              </div>
            ))
          )}
        </div>

       
        {!orderComplete && (
          <div className="cart-panel-footer">
            {!isCheckoutMode && (
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", fontSize: "20px", alignItems: "center" }}>
                <input
                  type="text"
                  placeholder="Enter Promocode"
                  className="promocode-input"
                  value={promocodeValue}
                  onChange={(e) => setPromocodeValue(e.target.value)}
                />
                <button className="promocode-button" onClick={() => setAppliedPromocode(promocodeValue)}>
                  Submit
                </button>
                <span>Total:</span>
                <strong>&#8382;{cartTotal.toFixed(2)}</strong>
              </div>
            )}
            
            
            {isCheckoutMode ? (
              <button form="checkout-form" type="submit" className="btn-checkout">
                Submit Order (&#8382;{cartTotal.toFixed(2)})
              </button>
            ) : (
              <button className="btn-checkout" onClick={() => setIsCheckoutMode(true)} disabled={cartItems.length === 0}>
                Go to Checkout
              </button>
            )}
          </div>
        )}
      </aside>
    </>
  );
}