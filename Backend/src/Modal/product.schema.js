const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  SKU: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  ],
});

const Product = mongoose.model("Product", productSchema);

module.exports = { Product, productSchema };
