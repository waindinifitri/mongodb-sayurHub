const express = require("express");

const app = express();
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const mongoose = require("mongoose");

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors
app.use(cors());

// db config
const mongoURI = process.env.MONGOURI;
mongoose.Promise = global.Promise;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
mongoose.connect(mongoURI, options);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error"));
db.once("open", () => console.log("Connected to mongodb!"));

// routes
const indexRoutes = require("./routes/index")
const userRoutes = require("./routes/user");
const transactionRoutes = require("/routes/transaction");
const paymentRoutes = require("/routes/payment");
const productRoutes = require("/routes/product");
const errorHandler = require("./middlewares/errorHandler");

app.use("/", indexRoutes);
app.use("/user", userRoutes);
app.use("/transaction", transactionRoutes);
app.use("/payment", paymentRoutes);
app.use("/product", productRoutes)
app.use(errorHandler);

// server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening to ${PORT}`));

