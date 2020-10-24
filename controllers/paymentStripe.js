const { Transaction } = require("../models/transactions");
const Stripe = require("stripe");
const stripe = Stripe(process.env.Server_key);

exports.stripeCharge = async (req, res, next) => {
	try {
	  let obj = {};
	  const {amount, currency, payment_method_types, receipt_email} = req.body;
	  
	  if(amount) obj.amount = amount;
      if(currency) obj.currency = currency;
	  if(payment_method_types) obj.payment_method_types = payment_method_types;
	  if(receipt_email) obj.receipt_email = receipt_email;
  
	  let paymentIntent = await stripe.paymentIntents.create(req.body);
	//.Transaction.findOneAndUpdate({_id:mongoose.Types.ObjectId()}, data, {
	// 	new: true,
	// 	upsert: true,
	// 	runValidators: true,
	// 	setDefaultsOnInsert: true,
	// 	populate: options
	//});
	  res.status(201).json({
		success: true,
		message: "Successfully Paid, thank you!",
		paymentIntent,
	  });
	  //populate transaksi, (update transactions.status)
	} catch (err) {
	  next(err);
	}
  };

  exports.PaymentMethod = async (req, res, next) => {
	try {
	  let obj = {};
	  const {type, card_number, exp_month, exp_year, cvc} = req.body;
	  
	  if(type) obj.type = type;
      if(card_number) obj.card_number = card_number;
	  if(exp_month) obj.exp_month = exp_month;
	  if(exp_year) obj.exp_year = exp_year;
	  if(cvc) obj.cvc = cvc;

	  let paymentMethod  = await stripe.paymentMethods.create({
		  type: type,
		  card: {
			  number,
			  exp_month,
			  exp_year,
			  cvc,
		  }
	  })
	  res.status(201).json({
		success: true,
		message: "Successfully paid!",
		paymentMethod,
	  });
	} catch (err) {
	  next(err);
	}
  };
//   const stripe = require('stripe')('sk_test_51HehgHKfoWCNAY8xlrtizdxraqW0dxj1eLZGtVrvmCWiNpzMKy2E5AkHOCJ9MkM5mpdyQ8l9hLnJx2Whzxw1FFV600O7KlMMR4');

// const paymentIntent = await stripe.paymentIntents.retrieve(
//   'pi_1HehhBKfoWCNAY8xPCuSV4o2'
// );
  exports.Retrieve = async (req, res, next) => {
	try {
	  let paymentIntent = await stripe.paymentIntents.retrieve(
		'pi_1HehhBKfoWCNAY8xPCuSV4o2'
	  )
	  res.status(200).json({
		data: paymentIntent,
	  });
	} catch (err) {
	  next(err);
	}
  };