import express from "express";
import dotenv from "dotenv";
import { connectToMongoDB } from "./db.js";
import foodItemRoute from "./routes/foodItemRoute.js";
import cors from "cors";
import { createClient } from "redis";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// Database connection
connectToMongoDB();

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
const redisClient = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: "redis-14994.c301.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 14994,
  },
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

// Connect to Redis
redisClient
  .connect()
  .then(() => {
    console.log("Connected to Redis");
  })
  .catch((err) => {
    console.log("Failed to connect to Redis", err);
  });

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Exporting redisClient for other modules
export { redisClient };

// Routes
app.use("/api/food", foodItemRoute);

// Calling the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
