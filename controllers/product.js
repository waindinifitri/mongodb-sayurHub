const { Product } = require ('../models/product');
const { User } = require('../models/user');

exports.Create = async (req, res, next) => {
    try {
        let obj = {};
        const {product_name, description, category, price, discount, stock, weight, product_image, question} = req.body;
        let actualPrice = parseFloat(price - ((discount*price)/100));
        // let categoryProduct = ("Fruit" || "Vegetables" || "Diet")

        //checking data input
        if(product_name) obj.product_name = product_name;
        if(description) obj.description = description;
        if(category) obj.category = categoryProduct;
        if(discount) obj.discount = discount;
        if(price) obj.price = actualPrice; 
        if(stock) obj.stock = stock;
        if(weight) obj.weight = weight;
        if(req.file && req.file.fieldname && req.file.path) obj.product_image = req.file.path;
        // if(question) obj.question = question;
        
        // let categoryProduct = ("Fruit" || "Vegetables" || "Diet")
        // if(category==!categoryProduct){
        //     res.status(404).json({
        //         status: "failed",
        //         msg: "Category must be either Fruit or Vegetables or Diet"
        //     })
        // }
        
        let product = await Product.create(obj);
        console.log(product);
        res.status(201).json({
            success: true,
            msg: 'Product created!',
            product
        })
    } catch (err) {
        next(err)
    }
}

exports.GetAll = async (req, res, next) => {
    try {
        let products = await Product.find()
        res.status(200).json({
            success: true, 
            msg: "Succesfully retrieve all the products!",
            products
        })
    } catch (err) {
        next(err)
    }
}

exports.Update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateProduct = await Product.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );
        console.log(updateProduct);
        res.status(200).json({
            success: true,
            msg: "Product updated!",
            updateProduct
        });
    } catch (err) {
        next(err)
    }
}

exports.Delete = async (req, res, next) => {
    try {
        const {id} = req.params;
        await Product.findByIdAndRemove(id, (err, doc, result) => {
            if(err){
                throw "Failed to delete product"
            }
            if(!doc){
                res.status(404).json({
                    success: false,
                    msg: "Product not found"
                })
            }
            res.status(200).json({
                success: true,
                msg: "Product deleted!",
                doc
            });
        });        
    } catch (err) {
        next(err)
    }
}

exports.GetProductId = async (req, res, next) => {
	try {
	    const  {id}  = req.params;
	    let products = await Product.findById({_id: id});
	    res.status(200).json({
            success: true,
            msg: "Successfully retrieve product data",
		    products
	    });
	} catch (err) {
	  next(err);
	}
  };

exports.Search = async (req, res, next) => {
    try {
       const { product_name } = req.body;
       let found = await Product.find({
           name: product_name
        })
        console.log(found)
       res.status(200).json({
           success: true,
           msg: "Successfully retrieve all the products that have same name.",
           found
       })

    } catch (err) {
        next(err)
    }
}
