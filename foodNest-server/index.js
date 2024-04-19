import express from "express";
import dotenv from "dotenv";
import { connectToMongoDB } from "./db.js";
import foodItemRoute from "./routes/foodItemRoute.js";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

//database connection
connectToMongoDB();

//middlewares
app.use(cors());
app.use(express.json());

app.use("/api/food", foodItemRoute);

//calling the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
