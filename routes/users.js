const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/users");
const { Authentication } = require("../middlewares/auth");
const {uploader} = require("../middlewares/multer");

router.post("/register", userControllers.Register);
router.post("/login", userControllers.Login);
router.get("/id", Authentication, userControllers.GetUserId);
router.get("/", Authentication, userControllers.GetUser);
router.put("/edit/:id",uploader.single('profile_image'), Authentication, userControllers.Edit);
router.delete("/delete/:id", Authentication, userControllers.Delete);

module.exports = router;

