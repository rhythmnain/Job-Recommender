// backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/user.model"); // Assuming we have a User model

const protect = async (req, res, next) => {
  try {
    let token;

    // Check if Authorization header contains a Bearer token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user data (excluding password)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found, not authorized" });
      }

      next(); // Proceed to next middleware or route handler
    } else {
      res.status(401).json({ message: "Not authorized, no token provided" });
    }
  } catch (error) {
    console.error("❌ Auth Middleware Error:", error);
    res.status(401).json({ message: "Token verification failed, not authorized" });
  }
};

module.exports = { protect };
