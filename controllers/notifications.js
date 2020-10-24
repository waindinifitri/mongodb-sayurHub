const { Notification } = require("../models/notifications");
const { User } = require("../models/users");


exports.Create = async (req, res, next) => {
    try {
		let obj = {};
		const userID = req.userData;
        const { information } = req.body;

        //checking data input
        if(information) obj.information = information;
		if (userID) obj.user = userID;
		//console.log(_id);

		const foundUser = await Notification.findOne({ user : userID});
		if((foundUser)) {
        let notifications = await Notification.create(obj);
			await User.findByIdAndUpdate(userID, {
				$push: { notification: notification._id}
			})
        res.status(201).json({
            success: true,
            msg: 'Successfully Notified!',
            notifications
		})
	} else {
		res.status(404).json({
			success: false,
			msg: "Sending notification failed!"})
	}
    } catch (error) {
		console.log(error);
        next(error)
    }
}

exports.AllNotification = async (req, res, next) => {
	try {
	  let notification = await Notification.find().populate({
		//   path: "User, Produk"
	  })
	  res.status(200).json({
		success: true,
		message: "There is all the transaction data!",
		data: notification,
	  });
	} catch (err) {
	  next(err);
	}
  };
  
  exports.NotificationById = async (req, res, next) => {
	try {
	const  userID  = req.userData;
	  let notification = await Notification.findOne({user: userID})
	  res.status(200).json({
		data: notification,
	  });
	} catch (err) {
	  next(err);
	}
  };
  
  exports.Delete = async (req, res, next) => {
	try {
	  const { id } = req.params;
  
	  if (!id) return next({ message: "Missing ID Params" });
  
	  await Notification.findOneAndRemove(id, (error, doc, result) => {
		if (error) throw "Failed to delete";
		if (!doc)
		  return res.status(400).json({ success: false, err: "Notification not found!" });
  
		res.status(200).json({
		  success: true,
		  message: "Successfully delete notification data!",
		  data: doc,
		});
	  });
	} catch (err) {
	  next(err);
	}
  };