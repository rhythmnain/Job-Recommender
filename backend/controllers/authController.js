//backend/controllers/authController.js
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    if (!process.env.JWT_SECRET) {
      throw new Error("Missing JWT_SECRET in environment variables");
    }
    
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  };

//register user
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        //check if user already exists
        let user = await User.findOne({email});
        if (user) return res.status(400).json({ message: "User already exists" });

        //create new user
        user = new User({ name, email, password });
        await user.save();

        res.status(201).json({ message: "User created successfully", token: generateToken(user) });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

//login user
exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      console.log("🔍 Login Attempt:", email, password); // Debugging
  
      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        console.log("❌ User not found!");
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Validate password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        console.log("❌ Password does not match!");
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      console.log("✅ Login Successful!");
      res.status(200).json({ message: "Login successful", token: generateToken(user) });
    } catch (error) {
      console.error("❌ Server Error:", error); // Log full error
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  