const {Cart} = require('../models/carts')
const {Product} = require('../models/products')
const {User} = require('../models/users')

// Pseudocode nye bosq : 
// if User cart kosong  user menambahkan product ke cart
// if cart mempunyai produk yang sama maka quantity nambah 1 (atau sesaui dgn yg doi inginkan)
// else quantity product 0 maka hapus array products
// else jika product tidak ada maka product push to array cart
// add subtotal = jumlah dari semua price yg ada di cart
// if checkout cart kirm ke order

exports.Create = async (req, res) => {
	const userID = req.userData;
	// const { productId, quantity, name, price } = req.body; from this
	const {quantity} = req.body; //to this coy => how we can get the productId(?) populate kah?
	
    //let userID = await User.findOne({user: userID})
    try {
      let cart = await Cart.findOne({ userID });
  
      if (cart) {
        //cart exists for user
        let itemIndex = cart.products.findIndex(p => p.productId == productId);
  
        if (itemIndex > -1) {
          //product exists in the cart, update the quantity dungs mau brp
          let productItem = cart.products[itemIndex];
          productItem.quantity = quantity;
          cart.products[itemIndex] = productItem;
        } else {
          //product does not exists in cart, add new item
          cart.products.push({ productId, quantity, name, price });
        }
        cart = await cart.save();
        return res.status(201).send(cart);
      } else {
        //no cart for user, create new cart 
        const newCart = await Cart.create({
		  userID: {userID},
          products: [{ productId, quantity, name, price }]
		});
		// add the subtotal of cart products
		if (newCart){
			let total = [],
		subtotal = cart.products.forEach(element => {
			let a = element.quantity * element.price;
			total.push(Number(a));
		});

		let lastTotal = sum(total);
		}
		//cart.subTotal = cart.products.map(product => product.total).reduce((acc, next) => acc + next);
		//.map = bikos we want to change isi dari array (products)
		//.reduce : change array in to value (?) => array to object

		// console.log(newCart);
		// console.log(Cart['products']);
		//console.log(cart);
		// return
		
        return res.status(201).send(newCart, lastTotal);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Failed to create Cart!");
    }
  };

exports.AllCart = async (req, res, next) => {
	try {
	  let cart = await Cart.find().populate({
			path: "User, Produk"
	  })
	  res.status(200).json({
		success: true,
		message: "There is all the transaction data!",
		data: cart,
	  });
	} catch (err) {
	  next(err);
	}
  };
  
  exports.CartById = async (req, res, next) => {
	try {
	const  userID  = req.userData;
	  let cart = await Cart.findOne({user: userID})
	  res.status(200).json({
		data: cart,
	  });
	} catch (err) {
	  next(err);
	}
  };
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

