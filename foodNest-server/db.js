import mongoose from "mongoose";

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_ATLAS_URI);
    console.log("Database connected");

    // const foodItemsCollection = mongoose.connection.db.collection("food_items");
    // const foodCategoryCollection =
    //   mongoose.connection.db.collection("food_category");

    // const [foodItems, foodCategories] = await Promise.all([
    //   foodItemsCollection.find({}).toArray(),
    //   foodCategoryCollection.find({}).toArray(),
    // ]);

    // global.food_Items = foodItems;
    // global.food_Categories = foodCategories;
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
