const express = require("express");

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "You are authenticated",
    user: req.user,  
  });
});
router.get("/admin", authMiddleware, adminMiddleware, (req, res) => {
  res.json({    
    message: "Welcome Admin", 
    user: req.user,      
  });    
});

module.exports = router;
