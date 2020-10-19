const mongoose = require('mongoose');
const { Schema} =  mongoose;
const uniqueValidator = require("mongoose-unique-validator");


// hashing password
// const { encryptPwd } = require("../helpers/bcrypt");

const paymentSchema = new Schema({
  productId : { 
    type : Integer,
    require : true,
  },
  cartId : {
    type : Integer,
    require : true,
  },
}, { timestamps: true, versionKey: false })

// pre, post hooks
// transactionSchema.pre("save", async function (next) {
//   let user = this;

//   if (user.password && user.isModified("password")) {
//     user.password = await encryptPwd(user.password);
//   }
//   next();
// });

// unique validator
paymentSchema.plugin(uniqueValidator);
const payment = mongoose.model("Payment", paymentSchema);

exports.Payment = payment;