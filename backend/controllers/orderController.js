const Order = require("../models/Order");
const Product = require("../models/ProductData");
 const mongoose = require("mongoose");
const createOrder = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const { items, shippingAddress } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Order must contain at least one product",
      });
    }

    if (
      !shippingAddress?.address?.trim() ||
      !shippingAddress?.city?.trim() ||
      !shippingAddress?.phone?.trim()
    ) {
      return res.status(400).json({
        message: "Valid shipping address and phone are required",
      });
    }

    const quantities = new Map();

    for (const item of items) {
      if (
        !mongoose.isValidObjectId(item.product) ||
        !Number.isSafeInteger(item.quantity) ||
        item.quantity < 1
      ) {
        return res.status(400).json({
          message: "Invalid product or quantity",
        });
      }

      const id = String(item.product);

      quantities.set(
        id,
        (quantities.get(id) || 0) + item.quantity
      );
    }

    let createdOrder;

    await session.withTransaction(async () => {
      const orderItems = [];
      let calculatedTotal = 0;

      for (const [productId, quantity] of quantities) {
        const product = await Product.findOneAndUpdate(
          {
            _id: productId,
            stock: { $gte: quantity },
          },
          {
            $inc: { stock: -quantity },
          },
          {
            new: true,
            session,
          }
        );

        if (!product) {
          const exists = await Product.exists({
            _id: productId,
          }).session(session);

          if (!exists) {
            throw new Error(`Product not found: ${productId}`);
          }

          throw new Error(
            `Not enough stock for product: ${productId}`
          );
        }

        calculatedTotal += product.price * quantity;

        orderItems.push({
          product: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity,
        });
      }

      const [order] = await Order.create(
        [
          {
            user: req.user.id,
            items: orderItems,
            totalPrice: calculatedTotal,
            shippingAddress,
          },
        ],
        { session }
      );

      createdOrder = order;
    });

    return res.status(201).json({
      message: "Order created successfully",
      order: createdOrder,
    });
  } catch (error) {
    console.error("Create order failed:", error);

    const isStockError =
      error.message.startsWith("Not enough stock");

    const isProductError =
      error.message.startsWith("Product not found");

    return res.status(
      isStockError || isProductError ? 400 : 500
    ).json({
      message: error.message || "Failed to create order",
    });
  } finally {
    await session.endSession();
  }
};


 const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get orders",
      error: error.message,
    });
  }
}; 
   const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get all orders",
      error: error.message,
    });
  }
  };
 const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get order",
      error: error.message,
    });
  }
};
 
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update order status",
      error: error.message,
    });
  }
};
 
module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
 updateOrderStatus,
};