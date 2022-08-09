const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./src/routes/product.js");
const auth = require("./src/middlewares/auth.js");

(async () => {
  try {
    dotenv.config();
    const PORT = process.env.PORT || 3000;
    const MONGO_URI = process.env.MONGO_URI;

    await mongoose.connect(`${MONGO_URI}`, {
      useNewUrlParser: true,
    });
    const app = express();
    app.disable("x-powered-by");
    app.use(
      express.urlencoded({
        extended: true,
        useUnifiedTopology: true,
      })
    );

    app.use(auth);
    app.use(express.json());
    const apiRouter = express.Router();
    app.use("/api", apiRouter);
    apiRouter.use("/product", productRoutes);
    app.listen(PORT, () => {
      console.log(`🚀 Listening on port ${PORT}`);
    });
    console.log("📙 MongoDB connected");
  } catch (err) {
    console.log(err);
  }
})();
