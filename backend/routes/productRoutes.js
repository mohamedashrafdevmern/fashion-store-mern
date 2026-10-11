const express = require("express");
const router = express.Router();
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} = require("../controllers/productController");

router.get("/", getProducts);
router.get("/:id", getProductById);
// API endpoint to post a new product
router.post("/", createProduct);
// API endpoint to put (update) a product by ID
router.put("/:id", updateProduct);
// API endpoint to delete a product by ID
router.delete("/:id", deleteProduct);

module.exports = router;