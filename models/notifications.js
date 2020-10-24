const mongoose = require('mongoose');
const { Schema} =  mongoose;

const notificationSchema = new Schema(
  {
  information : { 
    type : String,
    required: true,
  },
  product: { type: Schema.Types.ObjectId, ref: "Product", default: null },
  user: { type: Schema.Types.ObjectId, ref: "User", default: null },
}, { timestamps: true, versionKey: false })

const notification = mongoose.model("Notification", notificationSchema);

exports.Notification = notification;