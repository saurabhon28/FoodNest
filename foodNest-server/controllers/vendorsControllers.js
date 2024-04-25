import { Vendor } from "../models/vendorsModel.js";

export const addVendorDetails = async (req, res) => {
  try {
    const {
      name,
      phone,
      title,
      email,
      password,
      accountName,
      accountNo,
      bankName,
      ifsc,
      vendorName,
      vendorType,
      description,
      website,
      address,
      zip,
      city,
      state,
      country,
    } = req.body;
    const existingVendor = await Vendor.findOne({ email });

    if (existingVendor) {
      return res.status(401).json({
        message: "This vendor is already registered",
        success: false,
      });
    }

    const newVendor = new Vendor({
      name,
      phone,
      title,
      email,
      password,
      accountName,
      accountNo,
      bankName,
      ifsc,
      vendorName,
      vendorType,
      description,
      website,
      address,
      zip,
      city,
      state,
      country,
    });

    // Create vendor and save to the database
    const vendor = await Vendor.create(newVendor);

    return res
      .status(200)
      .json({ code: 200, data: vendor, message: "New vendor registered" });
  } catch (error) {
    // Send status 500 for internal server error
    return res
      .status(500)
      .json({ code: 500, message: "Internal Server error", error });
  }
};
