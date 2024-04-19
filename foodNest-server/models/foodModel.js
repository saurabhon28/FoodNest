import mongoose from "mongoose";

const foodItemSchema = mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    options: [],
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export const FoodItem = mongoose.model("food_item", foodItemSchema);

const foodCategorySchema = mongoose.Schema({
  category: {
    type: String,
  },
});

export const FoodCategory = mongoose.model("food_category", foodCategorySchema);
