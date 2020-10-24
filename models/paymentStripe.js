const mongoose = require('mongoose');
const { Schema} =  mongoose;


const paymentSchema = new Schema({
  productId : { 
    type : Number,
    required : true,
  },
  cartId : {
    type : Number,
    required : true,
  },
  transaction: { type: Schema.Types.ObjectId, ref: "Transaction", default: null },
  // cart: { type: Schema.Types.ObjectId, ref: "Cart", default: null },
}, { timestamps: true, versionKey: false })

const payment = mongoose.model("Payment", paymentSchema);

exports.Payment = payment;