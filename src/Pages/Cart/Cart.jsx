  

import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import "./Cart.css";
import { Link } from "react-router-dom";

function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const totalItems = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  return (
    <main className="cart-page">
      <h1 className="cart-title">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>

          <p>Add some products to your cart.</p>

          <Link to="/products" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-container">

          {/* Cart Items */}

          <section className="cart-items">
            {cart.map((product) => (
              <div
                className="cart-item"
                key={`${product._id}-${product.selectedSize}-${product.selectedColor}`}
              >

                <img
                  src={product.image}
                  alt={product.name}
                  className="cart-item-image"
                />

                <div className="cart-item-info">

                  <h3>{product.name}</h3>

                  <p className="cart-item-price">
                    {product.price} ج.م
                  </p>

                  {/* Size */}

                  {product.selectedSize && (
                    <p className="cart-item-option">
                      <strong>Size:</strong>{" "}
                      {product.selectedSize}
                    </p>
                  )}

                  {/* Color */}

                  {product.selectedColor && (
                    <p className="cart-item-option">
                      <strong>Color:</strong>{" "}
                      {product.selectedColor}
                    </p>
                  )}

                  {/* Quantity */}

                  <div className="quantity-controls">

                    <button
                      className="decrease-button"
                      onClick={() =>
                        decreaseQuantity(
                          product._id,
                          product.selectedSize,
                          product.selectedColor
                        )
                      }
                    >
                      -
                    </button>

                    <span>{product.quantity}</span>

                    <button
                      className="increase-button"
                      onClick={() =>
                        increaseQuantity(
                          product._id,
                          product.selectedSize,
                          product.selectedColor
                        )
                      }
                    >
                      +
                    </button>

                  </div>

                  {/* Remove */}

                  <button
                    className="remove-button"
                    onClick={() =>
                      removeFromCart(
                        product._id,
                        product.selectedSize,
                        product.selectedColor
                      )
                    }
                  >
                    Remove
                  </button>

                </div>

                {/* Product Total */}

                <p className="cart-item-total">
                  {(product.price * product.quantity).toFixed(2)} ج.م
                </p>

              </div>
            ))}
          </section>

          {/* Order Summary */}

          <aside className="cart-summary">

            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>

              <span>
                {totalPrice.toFixed(2)} ج.م
              </span>
            </div>

            <div className="summary-row">
              <span>Total Items</span>

              <span>{totalItems}</span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>

              <span>Free</span>
            </div>

            <hr />

            <div className="summary-total">
              <span>Total</span>

              <span>
                {totalPrice.toFixed(2)} ج.م
              </span>
            </div>

            <button
              className="clear-cart-button"
              onClick={clearCart}
            >
              Clear Cart
            </button>

            <Link
              to="/checkout"
              className="checkout-button"
            >
              Proceed to Checkout
            </Link>

          </aside>

        </div>
      )}
    </main>
  );
}

export default Cart;