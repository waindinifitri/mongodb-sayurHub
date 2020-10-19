const { Payment } = require("../models/payment");

exports.AllPayment = async (req, res, next) => {
	try {
	  let payment = await Payment.find()
	  res.status(200).json({
		success: true,
		message: "Successfully retrieve the data!",
		data: payment,
	  });
	} catch (err) {
	  next(err);
	}
  };

exports.AddPayment = async (req, res, next) => {
	try {
	  let data = await Payment.create(req.body);
  
	  res.status(201).json({
		success: true,
		message: "Successfully paid!",
		data,
	  });
	} catch (err) {
	  next(err);
	}
  };
  
  exports.FindById = async (req, res, next) => {
	try {
	const  id  = req.userData.id;
	  let payment = await Payment.findOne({_id: id})
	  res.status(200).json({
		data: payment,
	  });
	} catch (err) {
	  next(err);
	}
  };
  exports.Edit = async (req, res, next) => {
	try {
	  const { id } = req.params;
	  if (!id) return next({ message: "Missing ID Params" });
  
	  const updatedData = await Payment.findByIdAndUpdate(
		id,
		{ $set: req.body },
		{ new: true }
	  );
	  
	  res.status(200).json({
		success: true,
        message: "Successfully updated payment process!",
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
  
	  await Payment.findByIdAndRemove(id, (error, doc, result) => {
		if (error) throw "Failed to delete";
		if (!doc)
		  return res.status(400).json({ success: false, err: "Payment not found!" });
  
		res.status(200).json({
		  success: true,
		  message: "Successfully delete the payment data!",
		  data: doc,
		});
	  });
	} catch (err) {
	  next(err);
	}
  };