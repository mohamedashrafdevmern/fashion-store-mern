// Import the authentication routes
const authRoutes = require("./routes/authRoutes");
// Import the order routes
const orderRoutes = require("./routes/orderRoutes");
// Import the Express framework
const express = require("express");
// Import the CORS middleware to handle cross-origin requests
const cors = require("cors");
// Import the database connection function, product routes, and error handling middleware
const connectDB = require("./db");
// productRoutes is already defined above, so we don't need to import it again
const productRoutes = require("./routes/productRoutes");
// Import the error handling middleware
const errorMiddleware = require("./middleware/errorMiddleware");
// Create an instance of the Express application
const app = express();
 
const PORT = process.env.PORT || 5001; // Use 5001 as the default port if not specified in environment variables

app.use(cors());// Enable CORS for all routes
app.use(express.json()); // Middleware to parse incoming JSON requests
 // Define a simple route to check if the server is running                             
app.get("/", (req, res) => {                    
  res.send("Fashion Store API is running!");    
});                              
// Use the imported routes for handling requests to specific endpoints              
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

app.use(errorMiddleware);

// Start the server and connect to the database
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};
// Call the function to start the server
startServer();

