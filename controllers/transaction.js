const { Transaction } = require("../models/transaction");
const { User } = require("../models/user");
const { Product } = require("../models/Product");
const Transaction = require("mongoose-transactions");
const transaction = new Transaction();
 
const user = "User"; // the name of the registered schema
 
const userObject = {};

async function start() {
  try {
    const userId = transaction.insert(user, userObject);
    transaction.update(user, userId, userObject);
    transaction.remove(user, "fakeId"); // this operation fail
    const final = await transaction.run();
    // expect(final[0].name).toBe('Jonathan')
  } catch (error) {
    console.error(error);
    const rollbackObj = await transaction.rollback().catch(console.error);
    transaction.clean();
    //  expect(rollbacks[0].name).toBe('Alice')
    //  expect(rollbacks[0].age).toBe(aliceObject.age)
    //  expect(rollbacks[1].name).toBe('Jonathan')
    //  expect(rollbacks[1].age).toBe(bobObject.age)
  }
}
 
start();

exports.Create = async (req, res, next) => {
    try {
		let obj = {};
		const userID = req.userData.id;
        const { products, count, status } = req.body;

        //checking data input
        if(products) obj.products = products;
        if(count) obj.count = count;
        if(status) obj.status = status;

        let transaction = await Transaction.create(obj);
        console.log(product);

        res.status(201).json({
            success: true,
            msg: 'Successfully created transaction!',
            transaction
        })
    } catch (error) {
        next(error)
    }
}


exports.AllTransaction = async (req, res, next) => {
	try {
	  let transaction = await Transaction.find()
	  res.status(200).json({
		success: true,
		message: "Successfully retrieve the data!",
		data: transaction,
	  });
	} catch (err) {
	  next(err);
	}
  };
  
  exports.TransactionById = async (req, res, next) => {
	try {
	const  id  = req.userData.id;
	  let transaction = await Transaction.findOne({_id: id})
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
  
	  const updatedData = await Transaction.findByIdAndUpdate(
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
  
	  await Transaction.findByIdAndRemove(id, (error, doc, result) => {
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