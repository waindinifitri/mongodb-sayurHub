const { User } = require("../models/user");
const {decryptPwd} = require('../helpers/bcrypt')
const {tokenGenerator} = require('../helpers/jwt')

exports.Register = async (req, res, next) => {
	const { full_name, email, password } = req.body;
	try {
		let found = await User.findOne({
			where: {
				email
			}
		})
		if (found) {
			res.status(409),json({
				message: "Thats email already registered! input another email account, please!"
			})
		} else {
		let data = await User.create(req.body);
  
	  res.status(201).json({
		success: true,
		message: "Successfully registered!",
		data,
	  });
	}
	} catch (err) {
	  next(err);
	}
  };
  
  exports.Login = async (req, res, next) => {
	try {
	  const { email, password } = req.body;
  
	  let user = await User.findOne({ email: email});
  
	  if (!user)
		return next({
		  message: `User with email:${email} is not found!`,
		});
  
	  if (decryptPwd(password, user.password)) {
		const token = tokenGenerator(user);
  
		res.status(200).json({
		  success: true,
		  message: "Successfully logged in!",
		  token: token,
		});
	  } else {
		res.status(409).json({
			msg: "Incorrect password!"
		  })
	  }
	} catch (err) {
	  res.status(500).json({
		  success: false,
		  message: "Cannot find User or Password"
	  })
	}
  };
  
  exports.GetUser = async (req, res, next) => {
	try {
	  let user = await User.find()
	  res.status(200).json({
		success: true,
		message: "Successfully retrieve the data!",
		data: user,
	  });
	} catch (err) {
	  next(err);
	}
  };
  exports.GetUserId = async (req, res, next) => {
	try {
	const  id  = req.userData.id;
	  let user = await User.findOne({_id: id})
	  res.status(200).json({
		data: user,
	  });
	} catch (err) {
	  next(err);
	}
  };
  exports.Edit = async (req, res, next) => {
	try {
	  const { id } = req.params;
		const profile_image = req.file.path;
	  if (!id) return next({ message: "Missing ID Params" });
  
	  const updatedData = await User.findByIdAndUpdate(
		id,
		{ $set: req.body,profile_image },
		{ new: true }
	  );
	  
	  res.status(200).json({
		success: true,
		message: "Successfully update a user!",
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
  
	  await User.findByIdAndRemove(id, (error, doc, result) => {
		if (error) throw "Failed to delete";
		if (!doc)
		  return res.status(400).json({ success: false, err: "Data not found!" });
  
		res.status(200).json({
		  success: true,
		  message: "Successfully delete data!",
		  data: doc,
		});
	  });
	} catch (err) {
	  next(err);
	}
  };
