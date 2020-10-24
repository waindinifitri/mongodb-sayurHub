const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      products: [
        {
          productId: {
            type: Schema.Types.ObjectId, 
            ref: "Product"
          },
          quantity: Number,
          subTotal: Number
        }
      ],
      Total: {
        type: Number
      },
    },
    { timestamps: true }
  );
  
  const cart = mongoose.model("Cart", CartSchema);
  exports.Cart = cart;
