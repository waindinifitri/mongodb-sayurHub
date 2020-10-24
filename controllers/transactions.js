const { Transaction } = require("../models/transactions");
const { User } = require("../models/users");
const { Product } = require("../models/products");
const { Cart } = require("../models/carts");
const mongoose = require('mongoose');

exports.Create = async (req, res, next) => {
    try {
		let obj = {};
		const userId = req.userData._id;
        const { products, count, status, deliveries } = req.body;

        //checking data input
        if(products) obj.products = products;
        if(count) obj.count = count;
		if(status) obj.status = status;
		if(deliveries) obj.deliveries = deliveries;
		if (userId) obj.user = userId;
		//console.log(_id);

		let transaction = await Transaction.findOneAndUpdate({_id:mongoose.Types.ObjectId()}, obj, {
            new: true,
            upsert: true, // create the data if not exist
            runValidators: true,
            setDefaultsOnInsert: true, // set default value based on models
			populate: {path: ("user","product", "cart")},
			//populate: {path: ["user","product", "cart"]}
		})
		res.status(201).json({
            success: true,
            msg: 'Transaction created!',
            transaction
        })
    } catch (err) {
        next(err)
    }
}

// 		const foundUser = await Transaction.findOne({ user : userId});
// 		if((foundUser)) {
//         let transaction = await Transaction.create(obj);
// 			await User.findByIdAndUpdate(userId, {
// 				$push: { transaction: transaction._id}
// 			})
//         res.status(201).json({
//             success: true,
//             msg: 'Successfully created transaction!',
//             transaction
// 		})
// 	} else {
// 		res.status(404).json({
// 			success: false,
// 			msg: "Transaction failed!"})
// 	}
//     } catch (error) {
// 		console.log(error);
//         next(error)
//     }
// }

exports.AllTransaction = async (req, res, next) => {
	try {
	  let transaction = await Transaction.find().populate({
		//   path: "User, Produk"
	  })
	  res.status(200).json({
		success: true,
		message: "There is all the transaction data!",
		data: transaction,
	  });
	} catch (err) {
	  next(err);
	}
  };
  
  exports.TransactionById = async (req, res, next) => {
	try {
	const  userId  = req.userData._id;
	  let transaction = await Transaction.findOne({user: userID})
	  res.status(200).json({
		data: transaction,
	  });
	} catch (err) {
	  next(err);
	}
  };
  exports.Edit = async (req, res, next) => {
	try {
	  const { id } = req.params;
	  if (!id) return next({ message: "Missing ID Params" });
  
	  const updatedData = await Transaction.findOneAndUpdate(
		id,
		{ $set: req.body },
		{ new: true }
	  );
	  
	  res.status(200).json({
		success: true,
		message: "Successfully update a transaction!",
		data: updatedData,
	  });
	} catch (err) {
	  next(err);
	}
  };
  
  exports.Delete = async (req, res, next) => {
	try {
	  const { id } = req.params;
  
	  if (!id) return next({ message: "Missing ID Params" });
  
	  await Transaction.findOneAndRemove(id, (error, doc, result) => {
		if (error) throw "Failed to delete";
		if (!doc)
		  return res.status(400).json({ success: false, err: "Transaction not found!" });
  
		res.status(200).json({
		  success: true,
		  message: "Successfully delete transaction data!",
		  data: doc,
		});
	  });
	} catch (err) {
	  next(err);
	}
  };