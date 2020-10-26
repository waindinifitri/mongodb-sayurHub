const express = require("express");
const router = express.Router();

const paymentStripeController = require("../controllers/paymentStripe");
const { Authentication } = require("../middlewares/auth");

router.post("/charge",Authentication, paymentStripeController.stripeCharge);
router.post("/method",Authentication, paymentStripeController.PaymentMethod);
router.post("/retrieve", Authentication, paymentStripeController.Retrieve);

module.exports = router;