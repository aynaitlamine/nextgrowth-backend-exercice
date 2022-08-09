const express = require("express");
const validateProduct = require("../validation/product.js");
const Product = require("../models/product.js");
const productRoutes = express.Router();

productRoutes.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({
      products,
    });
  } catch (err) {
    return res.status(404).json({error: "not found"});
  }
});

productRoutes.post("/", async (req, res) => {
  const {error} = validateProduct(req.body);
  if (error)
    return res
      .status(409)
      .json({error: "Please check input data"});

  let product = new Product(req.body);

  try {
    product = await product.save();
  } catch (err) {
    return res
      .status(409)
      .json({error: "Please check input data"});
  }

  res.status(201).json({
    success: "product created successfully",
    product,
  });
});

productRoutes.delete("/:product_id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.product_id);
  } catch (error) {
    return res.status(404).json({error: "Can't be found"});
  }

  res.status(202).json({
    success: "product deleted successfully",
  });
});

productRoutes.get(
  "/:product_id/variants",
  async (req, res) => {
    let product;
    try {
      product = await Product.findById(
        req.params.product_id
      ).select("name variants");
    } catch (error) {
      return res
        .status(404)
        .json({error: "Can't be found"});
    }

    res.status(200).json({
      product,
    });
  }
);

productRoutes.get(
  "/:product_id/variants/:variant_id",
  async (req, res) => {
    let product;
    try {
      product = await Product.find({
        _id: req.params.product_id,
      }).select("name variants");
    } catch (error) {
      return res
        .status(404)
        .json({error: "Can't be found"});
    }

    res.status(200).json({
      product,
    });
  }
);

productRoutes.get("/:product_id", async (req, res) => {
  let product;
  try {
    product = await Product.findById(req.params.product_id);
  } catch (error) {
    return res.status(404).json({error: "Can't be found"});
  }

  res.status(200).json({
    product,
  });
});

module.exports = productRoutes;
