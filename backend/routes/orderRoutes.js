

const express = require("express");
const router = express.Router();

console.log("ORDER ROUTES LOADED:", __filename);

const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Test route
router.get("/", (req, res) => {
  res.json({ message: "ORDER ROUTE WORKS" });
});

// Create order
router.post("/", authMiddleware, createOrder);

// Admin: Get all orders
router.get("/admin", authMiddleware, adminMiddleware, getAllOrders);

// Get current user's orders
router.get("/my-orders", authMiddleware, getMyOrders);

// Update order status
router.patch(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  updateOrderStatus
);

// Get order by ID
router.get("/:id", authMiddleware, getOrderById);

module.exports = router;
