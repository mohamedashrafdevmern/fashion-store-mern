
import { Link } from "react-router-dom";
import "./OrderSuccess.css";

function OrderSuccess() {
  return (
    <main className="order-success">
      <div className="success-card">
        <div className="success-icon">✓</div>

        <h1>Order Placed Successfully!</h1>

        <p>
          Thank you for your order. We will contact you soon
          to confirm your order details.
        </p>

        <Link to="/products" className="continue-shopping">
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}

export default OrderSuccess;

