const mongoose = require('mongoose');
const { Schema} =  mongoose;

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        productID: Number,
        quantity: Number,
        name: String,
        price: Number
      }
    ],
    subtotal: {
        type: Number
    },
    user: { type: Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

const cart = mongoose.model("Cart", cartSchema);

exports.Cart = cart;