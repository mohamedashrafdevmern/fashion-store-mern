import { useEffect, useState } from "react";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
     sizes: "",
    colors: "",
    stock: "",
  });
     
   
const [orderSearch, setOrderSearch] = useState("");
const [orderFilter, setOrderFilter] = useState("All");

const getOrderTotal = (order) =>
  order.totalPrice ?? order.totalAmount ?? order.total ?? 0;

const getOrderStatus = (order) =>
  (order.status || "Pending").toLowerCase();

const filteredOrders = orders.filter((order) => {
  const search = orderSearch.toLowerCase();

  const customerName = (
    order.user?.name ||
    order.shippingAddress?.fullName ||
    ""
  ).toLowerCase();

  const matchesSearch =
    order._id?.toLowerCase().includes(search) ||
    customerName.includes(search) ||
    (order.user?.email || "").toLowerCase().includes(search);

  const matchesStatus =
    orderFilter === "All" ||
    getOrderStatus(order) === orderFilter.toLowerCase();

  return matchesSearch && matchesStatus;
});

const pendingOrders = orders.filter(
  (order) => getOrderStatus(order) === "pending"
).length;

const completedOrders = orders.filter(
  (order) => getOrderStatus(order) === "delivered"
).length;

const totalSales = orders
  .filter((order) => getOrderStatus(order) === "delivered")
  .reduce((sum, order) => sum + Number(getOrderTotal(order)), 0);

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-GB")
    : "—";

const formatPrice = (price) =>
  `${Number(price || 0).toLocaleString("en-US")} EGP`;








  useEffect(() => {
  fetchProducts();
  fetchOrders();
}, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:5001/api/products"
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        return;
      }

      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };
    
  
  const fetchOrders = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:5001/api/orders/admin",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to fetch orders:", data);
      return;
    }

    setOrders(data);
  } catch (error) {
    console.error("Failed to fetch orders:", error);
  } finally {
    setOrdersLoading(false);
  }
   } ;






  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const url = editingProduct
        ? `http://localhost:5001/api/products/${editingProduct._id}`
        : "http://localhost:5001/api/products";

      const method = editingProduct ? "PUT" : "POST";
       const token = localStorage.getItem("token");
      const response = await fetch(url, {
        method,
        headers: {
           "Content-Type": "application/json",  
            Authorization: `Bearer ${token}`,       
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: Number(formData.price),
          category: formData.category,
          image: formData.image,
          sizes: formData.sizes
            .split(",")
            .map((size) => size.trim()),
          colors: formData.colors
            .split(",")
            .map((color) => color.trim()),
          stock: Number(formData.stock),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        return;
      }

      console.log(
        editingProduct
          ? "Product updated:"
          : "Product created:",
        data
      );

      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
        sizes: "",
        colors: "",
        stock: "",
      });

      setEditingProduct(null);

      fetchProducts();
    } catch (error) {
      console.error("Failed to save product:", error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      sizes: product.sizes.join(", "),
      colors: product.colors.join(", "),
      stock: product.stock,
    });
  };
  const handleDelete = async (productId) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmed) {
    return;
  }

 try {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:5001/api/products/${productId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      return;
    }

    console.log("Product deleted:", data);

    fetchProducts();
  } catch (error) {
    console.error("Failed to delete product:", error);
  }
};
  
const handleOrderStatusChange = async (orderId, status) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:5001/api/orders/${orderId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      }
    );

   const responseText = await response.text();

console.log("Status code:", response.status);
console.log("Response body:", responseText);

let data;

try {
  data = JSON.parse(responseText);
} catch {
  throw new Error(
    `Server returned non-JSON response (HTTP ${response.status}). Check Console.`
  );
}

    if (!response.ok) {
      alert(data.message || "Failed to update order status");
      return;
    }

    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order._id === orderId ? data.order : order
      )
    );

    alert("Order status updated successfully");
  } catch (error) {
    console.error("Failed to update order status:", error);
  alert(`Update failed: ${error.message}`);
  }
};


 
  return (
    <main className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      {/* Add / Edit Product */}

      <section className="admin-add-product">
        <h2>
          {editingProduct ? "Edit Product" : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product name"
            value={formData.name}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Product description"
            value={formData.description}
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
          />

          <input
            type="text"
            name="sizes"
            placeholder="Sizes: S, M, L, XL"
            value={formData.sizes}
            onChange={handleChange}
          />

          <input
            type="text"
            name="colors"
            placeholder="Colors: Black, White"
            value={formData.colors}
            onChange={handleChange}
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
          />

          <button type="submit">
            {editingProduct ? "Update Product" : "Add Product"}
          </button>
        </form>
      </section>

      {/* Products */}

      <h2>Products</h2>

      <div className="admin-products">
        {products.map((product) => (
          <div
            className="admin-product-card"
            key={product._id}
          >
            <img
              src={product.image}
              alt={product.name}
              className="admin-product-image"
            />

            <h3>{product.name}</h3>

            <p className="admin-product-price">
              {product.price} ج.م
            </p>

            <p className="admin-product-stock">
              Stock: {product.stock}
            </p>

           <div className="admin-product-actions">
           <button type="button" className="edit-button"onClick={() => handleEdit(product)} >
           Edit
          </button>
 
           <button type="button" className="delete-button" onClick={() => handleDelete(product._id)}>
           Delete
          </button>
          </div>
          </div>
        ))}
      </div>
        
{/* Orders Management */}

<section className="admin-orders">
  <div className="orders-heading">
    <div>
      <span className="orders-eyebrow">STORE MANAGEMENT</span>
      <h2>Orders Management</h2>
      <p>Track and manage your customers' orders.</p>
    </div>

    <button
      className="orders-refresh"
      type="button"
      onClick={fetchOrders}
    >
      ↻ Refresh Orders
    </button>
  </div>

  <div className="orders-stats">
    <div className="order-stat">
      <span className="stat-label">Total Orders</span>
      <strong>{orders.length}</strong>
      <span className="stat-note">All customer orders</span>
    </div>

    <div className="order-stat">
      <span className="stat-label">Pending Orders</span>
      <strong>{pendingOrders}</strong>
      <span className="stat-note">Awaiting processing</span>
    </div>

    <div className="order-stat">
      <span className="stat-label">Delivered Orders</span>
      <strong>{completedOrders}</strong>
      <span className="stat-note">Successfully delivered</span>
    </div>

    <div className="order-stat">
      <span className="stat-label">Delivered Revenue</span>
      <strong>{formatPrice(totalSales)}</strong>
      <span className="stat-note">From delivered orders</span>
    </div>
  </div>

  <div className="orders-panel">
    <div className="orders-toolbar">
      <div>
        <h3>All Orders</h3>
        <p>{filteredOrders.length} orders found</p>
      </div>

      <div className="orders-controls">
        <input
          type="search"
          placeholder="Search order or customer..."
          value={orderSearch}
          onChange={(event) =>
            setOrderSearch(event.target.value)
          }
        />

        <select
          value={orderFilter}
          onChange={(event) =>
            setOrderFilter(event.target.value)
          }
        >
          <option value="All">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
    </div>

    {ordersLoading ? (
      <p className="orders-message">Loading orders...</p>
    ) : filteredOrders.length === 0 ? (
      <div className="orders-empty">
        <span>▤</span>
        <h3>No orders found</h3>
        <p>Try changing your search or filter.</p>
      </div>
    ) : (
      <div className="orders-table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>ORDER</th>
              <th>CUSTOMER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>STATUS</th>
             <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => {
              const status = getOrderStatus(order);

              return (
                <tr key={order._id}>
                  <td>
                    <span className="order-id">
                      #{order._id.slice(-6).toUpperCase()}
                    </span>
                  </td>

                  <td>
                    <div className="order-customer">
                      <strong>
                        {order.user?.name ||
                          order.shippingAddress?.fullName ||
                          "Customer"}
                      </strong>

                      <span>
                        {order.user?.email || "No email"}
                      </span>
                    </div>
                  </td>

                  <td>{formatDate(order.createdAt)}</td>

                  <td className="order-total">
                    {formatPrice(getOrderTotal(order))}
                  </td>

                 
                  <td>
                             <select
                      className={`order-status-select status-${status}`}
                      value={
                        ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"]
                          .find((item) => item.toLowerCase() === status) || "Pending"
                      }
                      onChange={(event) =>
                        handleOrderStatusChange(order._id, event.target.value)
                      }
                      aria-label={`Change status for order ${order._id}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                    <td>
                       <button
                         type="button"
                         className="view-order-btn"
                         onClick={() => setSelectedOrder(order)}
                       >
                         View Details
                       </button>
                     </td>
          
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )}
  </div>
</section>
            {selectedOrder && (
  <div className="order-details-overlay">
    <div
      className="order-details-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-details-title"
    >
      <div className="order-details-header">
        <div>
          <span>ORDER DETAILS</span>
          <h2 id="order-details-title">
            Order #{selectedOrder._id.slice(-6).toUpperCase()}
          </h2>
        </div>

     <button
  type="button"
  className="view-order-btn"
  onClick={() => {
    console.log("Selected order:", order);
    setSelectedOrder(order);
  }}
>
  View Details
</button>
      </div>

      <div className="order-details-content">
        <div className="order-detail-card">
          <h3>Customer Information</h3>

          <p>
            <strong>Name:</strong>{" "}
            {selectedOrder.user?.name ||
              selectedOrder.shippingAddress?.fullName ||
              "Customer"}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {selectedOrder.user?.email || "No email"}
          </p>
        </div>

        <div className="order-detail-card">
          <h3>Shipping Information</h3>

          <p>
            <strong>Address:</strong>{" "}
            {selectedOrder.shippingAddress?.address || "Not provided"}
          </p>

          <p>
            <strong>City:</strong>{" "}
            {selectedOrder.shippingAddress?.city || "Not provided"}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {selectedOrder.shippingAddress?.phone || "Not provided"}
          </p>
        </div>

        <div className="order-detail-card">
          <h3>Products</h3>

          {selectedOrder.items?.map((item) => (
            <div
              className="order-detail-product"
              key={item._id || `${item.product}-${item.name}`}
            >
              <img
                src={item.image}
                alt={item.name}
              />

              <div>
                <strong>{item.name}</strong>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {formatPrice(item.price)}</p>
              </div>

              <strong>
                {formatPrice(item.price * item.quantity)}
              </strong>
            </div>
          ))}
        </div>

        <div className="order-detail-summary">
          <div>
            <span>Order Date</span>
            <strong>{formatDate(selectedOrder.createdAt)}</strong>
          </div>

          <div>
            <span>Status</span>
            <strong>{selectedOrder.status}</strong>
          </div>

          <div>
            <span>Total</span>
            <strong>
              {formatPrice(getOrderTotal(selectedOrder))}
            </strong>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="order-details-close"
        onClick={() => setSelectedOrder(null)}
      >
        Close Details
      </button>
    </div>
  </div>
  )}
      
    </main>
  );
}

export default AdminDashboard;