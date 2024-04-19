import { FoodCategory, FoodItem } from "../models/foodModel.js";

export const addFoodItems = async (req, res) => {
  try {
    const { categoryName, name, image, options, description } = req.body;

    const newFoodItem = new FoodItem({
      categoryName,
      name,
      image,
      options,
      description,
    });

    // Save the item to the database
    const foodItem = await newFoodItem.save();

    return res
      .status(200)
      .json({ data: { foodItem }, message: "New Item Added" });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, message: "Internal Server error", error });
  }
};

export const getFood = async (req, res) => {
  try {
    const foodItems = await FoodItem.find({});
    const foodCategories = await FoodCategory.find({});

    res.send([foodItems, foodCategories]);
  } catch (error) {
    console.error(error.message);
    res.send("server error");
  }
};
