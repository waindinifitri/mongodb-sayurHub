const { Cart } = require("../models/carts");
const { Product } = require("../models/products");
const { User } = require("../models/users");

exports.AddCart = async (req, res) => {
  const { productId, quantity, price } = req.body;
  const items = [];
  const subTotal = quantity * price;
  const itemsObject = { productId, quantity, subTotal };
  items.push(itemsObject);

  const id = req.userData.id; //TODO: the logged in user id
  let userId = await User.findOne({ _id: id });
  // let cart = await Cart.findOne({ userId });
  // console.log(cart);
  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      //cart exists for user
      let itemIndex = cart.products.findIndex((p) => p.productId == productId);

      if (itemIndex > -1) {
        //product exists in the cart, update the quantity
        let productItem = cart.products[itemIndex];
        productItem.quantity = quantity;
        cart.products[itemIndex] = productItem;
        //total

      } else {
        //product does not exists in cart, add new item
        cart.products.push(itemsObject);

        // count subtotal dan total
      }

      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      //no cart for user, create new cart;
      // cart.Total = cart.products
      //   .map((product) => product.subTotal)
      //   .reduce((acc, next) => acc + next);
      let Total = 0;
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

//  exports.addItemToCart = async (req, res) => {
//         const {productId} = req.body;
//         const quantity = Number.parseInt(req.body.quantity);

//         try {
//             let cart = await Cart.find().populate({
//                 path: "products.productId",
//                 select: "product_name price total"
//             })
//             let productDetails = await Product.findById (productId);
//             if (!productDetails) {
//                 return res.status(500).json({
//                     type: "Not Found",
//                     msg: "Invalid request"
//                 })
//             }
//             //--If cart exists ----
//             if (cart && cart.products && cart.products.length ) {
//                 //---- Check if index exists ----
//                 const indexFound = cart.products.findIndex(product => product.productId.id == productId);
//                 //------This removes an product from the the cart if the quantity is set to zero, We can use this method to remove an product from the list  -------
//                 if (indexFound !== -1 && quantity <= 0) {
//                     cart.products.splice(indexFound, 1);
//                     if (cart.products.length == 0) {
//                         cart.subTotal = 0;
//                     } else {
//                cart.subTotal = cart.products.map((product) => product.total).reduce((acc, next) => acc + next);
//                     }
//                 }
//                 //----------Check if product exist, just add the previous quantity with the new quantity and update the total price-------
//                 else if (indexFound !== -1) {
//                     cart.products[indexFound].quantity = cart.products[indexFound].quantity + quantity;
//                     cart.products[indexFound].total = cart.products[indexFound].quantity * productDetails.price;
//                     cart.products[indexFound].price = productDetails.price
//                     cart.subTotal = cart.products.map(product => product.total).reduce((acc, next) => acc + next);
//                 }
//                 //----Check if quantity is greater than 0 then add product to products array ----

//                 //----If quantity of price is 0 throw the error -------
//                 else {
//                     return res.status(400).json({
//                         type: "Invalid",
//                         msg: "Invalid request"
//                     })
//                 }
//                 let data = await cart.save();
//                 res.status(200).json({
//                     type: "success",
//                     mgs: "Process Successful",
//                     data: data
//                 })
//             }
//             else  {
//                 cart.products.push({
//                     productId: productId,
//                     quantity: quantity,
//                     price: productDetails.price,
//                     total: parseInt(productDetails.price * quantity)
//                 })
//                 cart.subTotal = cart.products.map(product => product.total).reduce((acc, next) => acc + next);
//             }
//             let data = await cart.save();
//             res.status(200).json({
//                 type: "success",
//                 mgs: "Process Successful",
//                 data: data
//             })

//         } catch (err) {
//             console.log(err)
//             res.status(400).json({
//                 type: "Invalid",
//                 msg: "Something Went Wrong",
//                 err: err
//             })
//         }
//     }
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
