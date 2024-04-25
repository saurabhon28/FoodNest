import express from "express";
import { body } from "express-validator";
import { addFoodItems, getFood } from "../controllers/foodControllers.js";
import { loginUser, registerUser } from "../controllers/usersControlers.js";
import { myOrderData, orderData } from "../controllers/orderControllers.js";
import { addVendorDetails } from "../controllers/vendorsControllers.js";

//validation
const registerValidation = [
  body("email").isEmail(),
  body("name", "name should be of 5 charecters").isLength({ min: 5 }),
  body("password", "password length should be more than 5 charecters").isLength(
    { min: 5 }
  ),
];

const loginValidation = [
  body("email").isEmail(),
  body("password", "password length should be more than 5 charecters").isLength(
    { min: 5 }
  ),
];

const router = express.Router();

router.post("/addFood", addFoodItems);
router.get("/getFood", getFood);
router.post("/registerUser", registerValidation, registerUser);
router.post("/loginUser", loginValidation, loginUser);
router.post("/orders", orderData);
router.post("/myOrders", myOrderData);
router.post("/vendorRegitration", addVendorDetails);

export default router;
