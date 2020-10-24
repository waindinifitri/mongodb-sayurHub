const express = require("express");
const router = express.Router();

const notificationController = require("../controllers/notifications");
const { Authentication } = require("../middlewares/auth");

router.post("/add",Authentication, notificationController.Create);
router.get("/all",Authentication, notificationController.AllNotification);
router.get("/find/:id",Authentication, notificationController.NotificationById);
router.delete("/delete/:id",Authentication, notificationController.Delete);

module.exports = router;