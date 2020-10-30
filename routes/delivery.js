const express = require("express");
const router = express.Router();

const deliveryController = require("../controllers/delivery");
const { Authentication } = require("../middlewares/auth");

router.post("/cost",Authentication, deliveryController.costDelivery);
router.get("/province",Authentication, deliveryController.getProvince);
router.get("/city",Authentication, deliveryController.getCity);
module.exports = router;