const { Cart } = require("../models/carts");
const { Product } = require("../models/products");
const { User } = require("../models/users");

exports.AddCart = async (req, res) => {
  const { productId, quantity, price } = req.body;
  const items = [];
  const subTotal = quantity * price;
  const itemsObject = { productId, quantity, subTotal };
  items.push(itemsObject);

  const id = req.userData.id;
  let userId = await User.findOne({ _id: id });
  try {
    let cart = await Cart.findOne({ userId });
    if (cart) {
      let itemIndex = cart.products.findIndex((p) => p.productId == productId); //cart exists for user
      if (itemIndex > -1) {
        let productItem = cart.products[itemIndex]; //product exists in the cart, update the quantity
        productItem.quantity = quantity;
        cart.products[itemIndex] = productItem;
        subTotal = quantity*price;
      } else {
        cart.products.push(itemsObject); //product does not exists in cart, add new item
        cart.save(err, data => {
              res.json(cart);
        })
        subTotal = products(quantity*price) 
      }
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      // count subtotal dan total
      // cart.Total = cart.products
      //   .map((product) => product.subTotal)
      //   .reduce((acc, next) => acc + next);
      //.map
      function subTotal(products) {
        return products.map((product) => {
          return product * quantity
        })
      }
      subTotal([cart.products])
      // .reduce => Array.protoype.reduce((accumulator, currentValue) => {}, initialValue)
      function getSum(subTotal) {
        return subTotal.reduce((acc, currVal) => {
          return acc + currVal
        }, 0)
      }
      getSum([subTotal])

      let Total = 0; //no cart for user, create new cart;
      items.forEach((el) => {
        Total += el.subTotal;
      });
      const newCart = await Cart.create({
        userId,
        products: items,
        Total,
      });
      return res.status(201).send({ newCart });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

    exports.getCart = async (req, res) => {
        try {
            let cart = await Cart.find().populate({
                path: "Product.productId",
                select: "name price total"
            })
            if (!cart) {
                return res.status(400).json({
                    type: "Invalid",
                    msg: "Cart not found",
                })
            }
            res.status(200).json({
                status: true,
                data: cart
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({
                type: "Invalid",
                msg: "Something went wrong",
                err: err
            })
        }
    }
    exports.emptyCart = async (req, res) => {
        try {
            let cart = await Cart.find().populate({
                path: "products.productId",
                select: "name price total"
            });;
            cart.products = [];
            cart.Total = 0
            let data = await Cart.save();
            res.status(200).json({
                type: "Success",
                mgs: "Cart has been emptied",
                data: data
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({
                type: "Invalid",
                msg: "Something went wrong",
                err: err
            })
        }
    }

// if (cart && cart.product) {
//     cart.products = []
//     if (cart && cart.product && !cart.products.length) {
//     cart.products = []
exports.Edit = async (req, res, next) => {
	try {
	  const { id } = req.params;
	  if (!id) return next({ message: "Missing ID Params" });
  
	  const updatedData = await Cart.findOneAndUpdate(
		id,
		{ $set: req.body },
		{ new: true }
	  );
	  
	  res.status(200).json({
		success: true,
		message: "Successfully update a transaction!",
		data: updatedData,
	  });
	} catch (err) {
	  next(err);
	}
  };
  
  exports.Delete = async (req, res, next) => {
	try {
	  const { id } = req.params;
  
	  if (!id) return next({ message: "Missing ID Params" });
  
	  await Cart.findOneAndRemove(id, (error, doc, result) => {
		if (error) throw "Failed to delete";
		if (!doc)
		  return res.status(400).json({ success: false, err: "Transaction not found!" });
  
		res.status(200).json({
		  success: true,
		  message: "Successfully delete transaction data!",
		  data: doc,
		});
	  });
	} catch (err) {
	  next(err);
	}
  };
