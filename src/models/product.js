const mongoose = require("mongoose");
const {Schema} = mongoose;

const variantSchema = new Schema({
  sku: {
    type: String,
    required: true,
  },
  specification: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const productSchema = new Schema({
  reference: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  variants: {
    type: [variantSchema],
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
