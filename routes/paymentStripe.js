const express = require("express");
const router = express.Router();

const paymentStripeController = require("../controllers/paymentStripe");
const { Authentication } = require("../middlewares/auth");

router.post("/charges",Authentication, paymentStripeController.stripeCharge);

module.exports = router;