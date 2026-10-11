
import { useEffect, useState } from "react";
import "./Order.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
      const navigate = useNavigate();  
      useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
                if (!token) {
         navigate("/login", {
           replace: true,
           state: { message: "Please log in to view your orders." },
         });
         return; }
               


        const response = await fetch(
          "http://localhost:5001/api/orders/my-orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.status === 401 || response.status === 403) {
           localStorage.removeItem("token");
           localStorage.removeItem("user");

           navigate("/login", {
             replace: true,
             state: { message: "Please log in to view your orders." },
           });
         
           return;
         }
         
         if (!response.ok) {
           setError(data.message || "Failed to fetch orders");
           return;
         }
        setOrders(data);
      } catch (error) {
        setError("Unable to connect to server");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <main className="orders-page">
      <h1>My Orders</h1>

      {loading && <p>Loading orders...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <p>You have no orders yet.</p>
      )}

      {!loading && !error && orders.length > 0 && (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              <h2>Order #{order._id.slice(-6)}</h2>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>

              <p>
                <strong>Status:</strong> {order.status}
              </p>

              <p>
                <strong>Total:</strong> {order.totalPrice} ج.م
              </p>
                <Link
                to={`/orders/${order._id}`}
               className="view-order-button" > View Details</Link>
              <h3>Products</h3>

              {order.items.map((item) => (
                <div className="order-item" key={item._id}>
                  <img src={item.image} alt={item.name} />

                  <div>
                    <p>{item.name}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>{item.price} ج.م</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Orders;