const express = require("express");
const validateProduct = require("../validation/product.js");
const Product = require("../models/product.js");
const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({
      products,
    });
  } catch (err) {
    return res.status(404).json({error: "not found"});
  }
});

productRouter.post("/", async (req, res) => {
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

productRouter.patch("/:product_id", async (req, res) => {
  const {error} = validateProduct(req.body);
  if (error)
    return res
      .status(409)
      .json({error: "Please check input data"});

  try {
    await Product.findByIdAndUpdate(
      req.params.product_id,
      req.body
    );
  } catch (err) {
    return res
      .status(409)
      .json({error: "Please check input data"});
  }

  res.status(200).json({
    success: "product updated successfully",
  });
});

productRouter.delete("/:product_id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.product_id);
  } catch (error) {
    return res.status(404).json({error: "Can't be found"});
  }

  res.status(202).json({
    success: "product deleted successfully",
  });
});

productRouter.get(
  "/:product_id/variants",
  async (req, res) => {
    let product;
    try {
      product = await Product.findById(
        req.params.product_id
      ).select("variants");
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

productRouter.get(
  "/:product_id/variants/:variant_id",
  async (req, res) => {
    let product;
    try {
      product = await Product.find(
        {
          _id: req.params.product_id,
        },
        {
          variants: {
            $elemMatch: {_id: req.params.variant_id},
          },
        }
      );
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

productRouter.get("/:product_id", async (req, res) => {
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

module.exports = productRouter;
