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
db.once("open", () => console.log("Successfully connected to mongodb!"));

// routes
const indexRoutes = require("./routes/index")
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const transactionRoutes = require("./routes/transactions");
const cartRoutes = require("./routes/carts");
const paymentRoutes = require("./routes/paymentStripe");
const deliveryRoutes = require("./routes/delivery");
const notificationRoutes = require("./routes/notifications");

const errorHandler = require("./middlewares/errorHandler");

app.use("/", indexRoutes);
app.use("/users", userRoutes);
app.use("/transactions", transactionRoutes);
app.use("/carts", cartRoutes);
app.use("/payment", paymentRoutes);
app.use("/products", productRoutes);
app.use("/delivery", deliveryRoutes);
app.use("/notifications", notificationRoutes);
app.use(errorHandler);

// server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Brought you to localhost : ${PORT}`));

