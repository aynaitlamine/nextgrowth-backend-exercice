const app = require("./server");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(`${MONGO_URI}`, {
    useNewUrlParser: true,
  })
  .then(() => console.log("📙 MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`🚀 Listening on port ${PORT}`);
});
