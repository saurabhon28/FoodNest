import { Orders } from "../models/ordersModel.js";

export const orderData = async (req, res) => {
  let data = req.body.order_data;
  // Add order_date to the first element of the data array
  data.splice(0, 0, { order_date: req.body.order_date });
  console.log(data);

  // Try to find an existing order by email
  let emailId;
  try {
    emailId = await Orders.findOne({ email: req.body.email });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ error: "Database error." });
  }

  // If email does not exist, create a new record
  if (!emailId) {
    try {
      await Orders.create({
        email: req.body.email,
        order_data: [data], // Ensure data is wrapped in an array
      });
      res.status(201).json({ success: true });
    } catch (error) {
      console.error("Error creating order:", error);
      return res
        .status(500)
        .json({ error: "Server error. Could not create order." });
    }
  } else {
    // If email exists, update with the new order data
    try {
      await Orders.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      );
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error updating order:", error);
      return res
        .status(500)
        .json({ error: "Server error. Could not update order." });
    }
  }
};

export const myOrderData = async (req, res) => {
  try {
    const myData = await Orders.findOne({ email: req.body.email });

    if (!myData) {
      return res
        .status(404)
        .json({ message: "No orders found for this email." });
    }

    res.status(200).json({ orderData: myData });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
