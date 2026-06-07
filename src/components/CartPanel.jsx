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

  if (!isOpen) return null; // If its not open, draw nothing!

  let cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (appliedPromocode.toUpperCase() === "APEX20") {
    cartTotal = cartTotal - cartTotal * 0.2;
  }

  return (
    <>
      {}
      <div className="cart-backdrop" onClick={onClose} />

      {}
      <aside className="cart-panel">
        <div className="cart-panel-header">
          <h2>Your Cart</h2>
          <button className="cart-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="cart-panel-body">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-line">
                <img src={item.img} alt={item.name} className="cart-thumb" />
                <div className="cart-line-info">
                  <strong>{item.name}</strong>
                  <div className="cart-qty-row">
                    <button
                      onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      style={{
                        color: "red",
                        border: "none",
                        background: "none",
                      }}
                      onClick={() => onRemove(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <strong>
                  &#8382;{(item.price * item.quantity).toFixed(2)}
                </strong>
              </div>
            ))
          )}
        </div>

        <div className="cart-panel-footer">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "15px",
              fontSize: "20px",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              placeholder="Enter Promocode"
              className="promocode-input"
              value={promocodeValue}
              onChange={(e) => setPromocodeValue(e.target.value)}
            />
            <button
              className="promocode-button"
              onClick={() => setAppliedPromocode(promocodeValue)}
            >
              Submit
            </button>
            <span>Total:</span>
            <strong>&#8382;{cartTotal.toFixed(2)}</strong>
          </div>
          <button className="btn-checkout">Checkout</button>
        </div>
      </aside>
    </>
  );
}
