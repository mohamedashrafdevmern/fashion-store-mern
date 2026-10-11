import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./OrderDetails.css";

function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:5001/api/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to fetch order");
          return;
        }

        setOrder(data);
      } catch (error) {
        setError("Unable to connect to server");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return <p>Loading order...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className="order-details-page">
      <h1>Order Details</h1>

      <p className="order-id">
        Order ID: {order._id}
      </p>

      <p className="order-status">
        Status: {order.status}
      </p>

      <div className="order-details-card">
        <h2>Products</h2>

        {order.items.map((item) => (
          <div className="order-details-item" key={item._id}>
            <img src={item.image} alt={item.name} />

            <div className="order-details-item-info">
              <h3>{item.name}</h3>

              <p>Quantity: {item.quantity}</p>

              <p>Price: {item.price} ج.م</p>
            </div>
          </div>
        ))}

        <p className="order-total">
          Total: {order.totalPrice} ج.م
        </p>
      </div>
    </main>
  );
}

export default OrderDetails;