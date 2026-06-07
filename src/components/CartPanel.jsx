import React, { useState } from "react";
import "./CartPanel.css";

export default function CartPanel(props) {
  var isOpen = props.isOpen;
  var onClose = props.onClose;
  var cartItems = props.cartItems;
  var onUpdateQty = props.onUpdateQty;
  var onRemove = props.onRemove;
  console.log("CartPanel render, items=", cartItems && cartItems.length);
  const [promocodeValue, setPromocodeValue] = useState("");
  const [appliedPromocode, setAppliedPromocode] = useState("");
  const [promoMessage, setPromoMessage] = useState("");

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

  const handleApplyPromocode = () => {
    const trimmedCode = promocodeValue.trim();
    if (!trimmedCode) {
      setPromoMessage("Please enter a promocode.");
      setAppliedPromocode("");
      return;
    }

    setAppliedPromocode(trimmedCode);
    if (trimmedCode.toUpperCase() === "APEX20") {
      setPromoMessage("Promocode applied.");
    } else {
      setPromoMessage("Promocode not valid.");
    }
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setIsCheckoutMode(false);
    setOrderComplete(true);
  };

  const handleClose = () => {
    // junior: extra log
    console.log("handleClose called");
    onClose();

    setTimeout(() => {
      setIsCheckoutMode(false);
      setOrderComplete(false);
    }, 300);
  };

  let headerText = "Your Cart";
  if (orderComplete) {
    headerText = "Order Complete";
  } else if (isCheckoutMode) {
    headerText = "Checkout";
  }

  let bodyContent = null;
  if (orderComplete) {
    bodyContent = (
      <div className="success-message">
        <h3>Your order has been accepted!</h3>
        <p>
          Thank you for shopping with us, courier will contact you. You will pay
          the courier upon delivery.
        </p>
      </div>
    );
  } else if (isCheckoutMode) {
    bodyContent = (
      <form
        id="checkout-form"
        className="checkout-form"
        onSubmit={handleCheckoutSubmit}
      >
        <input type="text" placeholder="First Name" required />
        <input type="text" placeholder="Surname" required />
        <input type="tel" placeholder="Phone Number" required />
        <input type="text" placeholder="ID Card Number" required />
        <input type="text" placeholder="City" required />
        <input type="text" placeholder="Street Address" required />

        <div className="payment-option">
          <input
            type="radio"
            id="pay-courier"
            name="payment"
            required
            defaultChecked
          />
          <label htmlFor="pay-courier">Pay price to the courier</label>
        </div>

        <button type="submit" className="btn-checkout">
          Submit Order (&#8382;{cartTotal.toFixed(2)})
        </button>
      </form>
    );
  } else if (cartItems.length === 0) {
    bodyContent = <p>Your cart is empty.</p>;
  } else {
    bodyContent = (
      <>
        {cartItems.map((item) => (
          <div key={item.id} className="cart-line">
            <img src={item.img} alt={item.name} className="cart-thumb" />
            <div className="cart-line-info">
              <strong>{item.name}</strong>
              <div className="cart-qty-row">
                <button onClick={() => onUpdateQty(item.id, item.quantity - 1)}>
                  −
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => onUpdateQty(item.id, item.quantity + 1)}>
                  +
                </button>
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
        ))}
      </>
    );
  }

  let footerButton = null;
  if (!isCheckoutMode) {
    footerButton = (
      <button
        className="btn-checkout"
        type="button"
        onClick={() => setIsCheckoutMode(true)}
        disabled={cartItems.length === 0}
      >
        Go to Checkout
      </button>
    );
  }

  return (
    <>
      <div className="cart-backdrop" onClick={handleClose} />

      <aside className="cart-panel">
        <div className="cart-panel-header">
          <h2>{headerText}</h2>
          <button className="cart-close" onClick={handleClose}>
            ×
          </button>
        </div>

        <div className="cart-panel-body">{bodyContent}</div>

        {!orderComplete && (
          <div className="cart-panel-footer">
            {!isCheckoutMode && (
              <>
                <div className="cart-footer-totals">
                  <input
                    type="text"
                    placeholder="Enter Promocode"
                    className="promocode-input"
                    value={promocodeValue}
                    onChange={(e) => {
                      setPromocodeValue(e.target.value);
                      setPromoMessage("");
                    }}
                  />
                  <button
                    type="button"
                    className="promocode-button"
                    onClick={handleApplyPromocode}
                  >
                    Submit
                  </button>
                  <span>Total:</span>
                  <strong>&#8382;{cartTotal.toFixed(2)}</strong>
                </div>
                {promoMessage && (
                  <div className="promo-message">{promoMessage}</div>
                )}
              </>
            )}

            {footerButton}
          </div>
        )}
      </aside>
    </>
  );
}
