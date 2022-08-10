const express = require("express");

const productRouter = require("./src/routes/product.js");
const auth = require("./src/middlewares/auth.js");
const app = express();

app.disable("x-powered-by");
// app.use(
//   express.urlencoded({
//     extended: true,
//     useUnifiedTopology: true,
//   })
// );

app.use(auth);
app.use(express.json());
const apiRouter = express.Router();
app.use("/api", apiRouter);
apiRouter.use("/product", productRouter);

module.exports = app;
