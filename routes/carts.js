const express = require('express');
const router = express.Router();

const cartController = require("../controllers/carts");
// const { Authentication } = require("../middlewares/auth");

router.get('/', cartController.AddCart)
//router.post("/create/:productId", Authentication, cartController.addItemToCart);
// router.get("/all",Authentication, cartController.AllCart);
// router.get("/find/:id",Authentication, cartController.CartById);
// router.put("/edit/:id",Authentication, cartController.Edit);
// router.delete("/delete/:id", Authentication, cartController.Delete);

module.exports = router;