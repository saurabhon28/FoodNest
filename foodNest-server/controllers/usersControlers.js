import { User } from "../models/userModel.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { redisClient } from "../index.js"; // Importing redisClient

// Login user
export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Check Redis connection
    if (!redisClient.isOpen) {
      // Reconnect to Redis if not connected
      await redisClient.connect();
    }

    const cachedUserData = await redisClient.get(`user:${email}`);
    let user;

    if (cachedUserData) {
      user = JSON.parse(cachedUserData);
      console.log("cache hit");
    } else {
      // If not cached, query the database
      user = await User.findOne({ email });
      if (user) {
        // Cache user data in Redis
        await redisClient.set(`user:${email}`, JSON.stringify(user), {
          EX: 3600, // 1-hour expiration
        });
      }
    }

    if (!user) {
      return res.status(400).json({
        code: 400,
        errors: "Please login with correct credentials",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    // Generate JWT token
    const tokenData = {
      id: user._id,
    };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      code: 200,
      data: user,
      message: `Welcome back ${user.name}`,
      success: true,
      token,
    });
  } catch (error) {
    console.error("Error during login:", error); // Log the error for debugging
    return res.status(500).json({
      code: 500,
      message: "Internal Server error",
      error,
    });
  }
};

// Register user
export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password, location } = req.body;

    // Data validation
    if (!name || !email || !password || !location) {
      return res.status(401).json({
        message: "Invalid Data",
        success: false,
      });
    }

    // Existing user validation
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        message: "This email is already used",
        success: false,
      });
    }

    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 16);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      location,
    });

    // Create user and save to the database
    const user = await User.create(newUser);

    return res.status(200).json({
      code: 200,
      data: user,
      message: "New user created",
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: "Internal Server error",
      error,
    });
  }
};
