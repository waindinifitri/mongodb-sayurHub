const mongoose = require('mongoose');
const { Schema} =  mongoose;
// const uniqueValidator = require("mongoose-unique-validator");

const transactionSchema = new Schema(
  {
  products : {
    type : String,
    required : true,
    trim : false,
  },
  count : {
    type : Number,
    default : "",
  },
  status : { 
    type : String,
    required: true,
    enum: ['Success','On Process','Cancelled']
  },
  deliveries : {
    type : String,
    required : true,
    default : "",
  },
  //product: { type: Schema.Types.ObjectId, ref: "Product", default: null },
  user: { type: Schema.Types.ObjectId, 
    ref: "User", 
    default: null },
    
}, { timestamps: true, versionKey: false })

const transaction = mongoose.model("Transaction", transactionSchema);

exports.Transaction = transaction;