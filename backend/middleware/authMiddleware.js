  const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    console.log("🔥 AUTH MIDDLEWARE REACHED");

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "No token provided",  
    }); 
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;
/*
  "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhYmQ1NjgxODdiMTk3ZTkzYzk4N2MxOCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzkwNzkzNDAyLCJleHAiOjE3OTA4Nzk4MDJ9.EKhjbPByBamY7jFvhmrOuimbdW-DY5i7PiBtbFZikfg",
    "user": {
        "id": "6abd568187b197e93c987c18",
        "name": "Test User",
        "email": "test@example.com",
        "role": "user" 
}
*/