


import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import "./Checkout.css";

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Remove error when user starts correcting the field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Full name must be at least 3 characters.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9+\-\s]{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
    } else if (formData.address.trim().length < 10) {
      newErrors.address = "Address must be at least 10 characters.";
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  const validationErrors = validateForm();

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  if (cart.length === 0) {
    return;
  }

  try {
    const token = localStorage.getItem("token");
    console.log("CART BEFORE ORDER:", cart);

    console.log(
    "ORDER ITEMS:",
    cart.map((item) => ({
    product: item._id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    }))
    );
    console.log("Cart before order:", cart);
    const response = await fetch(
      "http://localhost:5001/api/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
       body: JSON.stringify({
  items: cart.map((item) => ({
    product: item._id,
    name: item.name,
    image: item.image,
    price: item.price,
    quantity: item.quantity,
  })),

  totalPrice,

  shippingAddress: {
    address: formData.address,
    city: "Egypt",
    phone: formData.phone,
  },
}),
      }
    );

    const responseText = await response.text();

console.log("Order response status:", response.status);
console.log("Order response URL:", response.url);
console.log("Order response body:", responseText);

let data;

try {
  data = JSON.parse(responseText);
} catch {
  console.error("The server returned HTML or invalid JSON.");
  return;
}

if (!response.ok) {
  console.error("Order error:", data);
  return;
}

    console.log("Order created:", data.order);

    clearCart();

    navigate("/order-success");
  } catch (error) {
    console.error("Order error:", error);
  }
};

  return (
    <main className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-container">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Shipping Information</h2>

          <div
            className={`form-group ${errors.name ? "has-error" : ""}`}
          >
            <label htmlFor="name">Full Name</label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />

            {errors.name && (
              <p className="error-message">{errors.name}</p>
            )}
          </div>

          <div
            className={`form-group ${errors.email ? "has-error" : ""}`}
          >
            <label htmlFor="email">Email</label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />

            {errors.email && (
              <p className="error-message">{errors.email}</p>
            )}
          </div>

          <div
            className={`form-group ${errors.phone ? "has-error" : ""}`}
          >
            <label htmlFor="phone">Phone</label>

            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />

            {errors.phone && (
              <p className="error-message">{errors.phone}</p>
            )}
          </div>

          <div
            className={`form-group ${errors.address ? "has-error" : ""}`}
          >
            <label htmlFor="address">Address</label>

            <textarea
              id="address"
              name="address"
              placeholder="Enter your address"
              rows="4"
              value={formData.address}
              onChange={handleChange}
            ></textarea>

            {errors.address && (
              <p className="error-message">{errors.address}</p>
            )}
          </div>

          <button type="submit" className="place-order-button">
            Place Order
          </button>
        </form>

        <aside className="checkout-summary">
          <h2>Order Summary</h2>

          {cart.map((product) => (
            <div className="checkout-product" key={product._id}>
              <img src={product.image} alt={product.name} />

              <div>
                <h3>{product.name}</h3>

                <p>
                  {product.quantity} × {product.price} ج.م
                </p>
              </div>

              <strong>
                {product.price * product.quantity} ج.م
              </strong>
            </div>
          ))}

          <hr />

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{totalPrice} ج.م</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <span>{totalPrice} ج.م</span>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default Checkout;

