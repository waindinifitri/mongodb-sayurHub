const express = require('express');
const router = express.Router();

const productController = require("../controllers/product");
const { Authentication } = require("../middlewares/auth");
const uploader = require("../middlewares/multer");

router.get('/', productController.GetAll)
router.post('/create', Authentication, uploader.single("product_image"), productController.Create)
router.put('/update/:id', Authentication, uploader.single("product_image"), productController.Update) 
router.delete('/delete/:id', Authentication, productController.Delete) 
router.get('/find', productController.Search)
router.get('/:id', productController.GetProductId)


module.exports = router;
