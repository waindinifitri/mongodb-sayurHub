const express = require("express");
const router = express.Router();

const transactionController = require("../controllers/transaction");
const { Authentication } = require("../middlewares/auth");

router.post("/add",Authentication, transactionController.Create);
router.get("/all",Authentication, transactionController.AllTransaction);
router.get("/find/:id",Authentication, transactionController.TransactionById);
router.put("/edit/:id",Authentication, transactionController.Edit);
router.delete("/delete/:id",Authentication, transactionController.Delete);

module.exports = router;
