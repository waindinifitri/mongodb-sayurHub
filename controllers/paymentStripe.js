const { Transaction } = require("../models/transactions");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const axios = require('axios');
const qs = require("querystring");
//const mongoose = require('mongoose');

exports.stripeCharge = async (req, res, next) => {
	try {
	  let obj = {};
	  const {amount, currency, card_number, exp_month, exp_year, cvc} = req.body;
	  if(amount) obj.amount = Number(amount);
	  if(currency) obj.currency = currency;
	  if(card_number) obj.card_number = card_number;
	  if(exp_month) obj.exp_month = exp_month;
	  if(exp_year) obj.exp_year = exp_year;
	  if(cvc) obj.cvc = cvc;
  
	  let token = await stripe.tokens.create({
		  card : {
			  number: card_number,
			  exp_month: exp_month,
			  exp_year: exp_year,
			  cvc: cvc,
		  },
	  });
	  const data = {
		  source: `${token.id}`,
		  amount: `${amount * 100}`,
		  currency: `${currency}`,
	  };
	  //console.log(process.env.STRIPE_SECRET_KEY);
	  const headers = {
		  Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
		  "Content-Type": "application/x-www-form-urlencoded"
	  }
	  const datas = await axios.post("https://api.stripe.com/v1/charges", qs.stringify(data), {headers:headers})
	  //console.log(datas);
	  const invoice = datas.data.receipt_url;
	  res.status(201).json({
		success: true,
		message: "Successfully paid!",
		data : datas.data,
	}); 
	}
	catch (err) {
		next(err);
	}
};
//==>> after Payment, send email~

//const invoice = datas.data.receipt_url;
// 	//stripe.paymentIntents.findOneAndUpdate({_id:mongoose.Types.ObjectId()}, data, {
// 	// 	new: true,
// 	// 	upsert: true,
// 	// 	runValidators: true,
// 	// 	setDefaultsOnInsert: true,
// 	// 	populate: "transaction"
// 	//});
// 	  res.status(201).json({
// 		success: true,
// 		message: "Successfully Paid, thank you!",
// 		paymentIntent,
// 	  });
// 	  //populate transaksi, (update transactions.status)
// 	} catch (err) {
// 	  next(err);
// 	}
//   };

//   exports.PaymentMethod = async (req, res, next) => {
// 	try {
// 	  let obj = {};
// 	  const {type, card_number, exp_month, exp_year, cvc} = req.body;
	  
// 	  if(type) obj.type = type;
//       if(card_number) obj.card_number = card_number;
// 	  if(exp_month) obj.exp_month = exp_month;
// 	  if(exp_year) obj.exp_year = exp_year;
// 	  if(cvc) obj.cvc = cvc;

// 	  let paymentMethod  = await stripe.paymentMethods.create({
// 		  type: type,
// 		  card: {
// 			  number,
// 			  exp_month,
// 			  exp_year,
// 			  cvc,
// 		  }
// 	  })
// 	  res.status(201).json({
// 		success: true,
// 		message: "Successfully paid!",
// 		paymentMethod,
// 	  });
// 	} catch (err) {
// 	  next(err);
// 	}
//   };
//   const stripe = require('stripe')('sk_test_51HehgHKfoWCNAY8xlrtizdxraqW0dxj1eLZGtVrvmCWiNpzMKy2E5AkHOCJ9MkM5mpdyQ8l9hLnJx2Whzxw1FFV600O7KlMMR4');

// const paymentIntent = await stripe.paymentIntents.retrieve(
//   'pi_1HehhBKfoWCNAY8xPCuSV4o2'
// );