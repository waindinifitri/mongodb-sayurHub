require('dotenv').config();
const axios = require('axios');
const qs = require("querystring");

exports.costDelivery = async (req, res, next) => {
    try {
        let obj = {};
        const {origin, destination, weight, courier} = req.body;
        if(origin) obj.origin = origin;
        if(destination) obj.destination = destination;
        if(weight) obj.weight = weight;
        if(courier) obj.courier = courier;

        const data = {
            origin: `${origin}`,
            destination: `${destination}`,
            weight: `${weight}`,
            courier: `${courier}`,
        }
        const headers = {
            key: `${process.env.key}`,
            "Content-Type": "application/x-www-form-urlencoded"
        }
        const datas = await axios.post("https://api.rajaongkir.com/starter/cost", qs.stringify(data), {headers:headers})
        res.status(201).json({
            success: true,
            message: "Successfully retrieve the cost!",
            data : datas.data,
        }); 
    } catch (error) {
        console.log(error);
        next (error);
    }
}

exports.getProvince = async (req, res, next) => {
	try {
        const headers = {
            key: `${process.env.key}`,
            //"Content-Type": "application/x-www-form-urlencoded"
        }
        console.log(process.env.key);
        const datas = await axios.get("https://api.rajaongkir.com/starter/province", {headers: headers});
        console.log(datas);
        res.status(201).json({
            success: true,
            message: "List of Province!",
            data : datas.data,
        }); 
	} catch (err) {
        //console.log(err.response.data);
        //console.log(err.response.data.rajaongkir);
	  next(err);
	}
  };

  exports.getCity = async (req, res, next) => {
	try {
        const headers = {
            key: `${process.env.key}`,
            //"Content-Type": "application/x-www-form-urlencoded"
        }
        const datas = await axios.get("https://api.rajaongkir.com/starter/city", {headers: headers});
        res.status(201).json({
            success: true,
            message: "List of City!",
            data : datas.data,
        }); 
	} catch (err) {
	  next(err);
	}
  };