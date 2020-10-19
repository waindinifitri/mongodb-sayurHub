const mongoose = require('mongoose');
const { Schema} =  mongoose;
// const uniqueValidator = require("mongoose-unique-validator");

const transactionSchema = new Schema(
  {
  userId : { 
    type : Integer,
    require : true,
  },
  products : {
    type : String,
    require : true,
    trim : false,
  },
  count : {
    type : Integer,
    default : " "
  },
  status : { 
    type : String,
    default : "On process"
  },
  product: { type: Schema.Types.ObjectId, ref: "Product", default: null },
  user: { type: Schema.Types.ObjectId, ref: "User", default: null },
}, { timestamps: true, versionKey: false })



// unique validator
// transactionSchema.plugin(uniqueValidator);
const transaction = mongoose.model("Transaction", transactionSchema);

exports.Transaction = transaction;