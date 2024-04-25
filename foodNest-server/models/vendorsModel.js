import mongoose from "mongoose";

const vendorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    accountName: {
      type: String,
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    accountNo: {
      type: String,
      required: true,
    },
    ifsc: {
      type: String,
      required: true,
    },
    vendorName: {
      type: String,
      required: true,
    },
    vendorType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Vendor = mongoose.model("vendersDetails", vendorSchema);
