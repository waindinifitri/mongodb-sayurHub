const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema(
    {
        product_name: {
            type: String,
            require: true
        },
        description: {
            type: String,
            require: true
        },
        category: {
            type: String,
            require: true
        },    
        price: {
            type: Number,
            require: true,
            min: [100, 'The product price is too low.'],
            max: [1000000000, 'Please put reasonable price.'],
            trim: true
        },   
        discount: {
            type: Number,
            default: 0,
            max: 100,
            trim: true
        },    
        stock: {
            type: Number,
            require: true,
            min: [5, 'Too few products!'],
            max: [100, 'Too many products!']
        },
        weight: {
            type: Number,
            require: true,
            min: [1, 'Weight is too low!']
        },   
        product_image: {
            type: String,
            require: true
        },    
        question: {
            type: String,
            // default:
        },
        //Relation to Review Transaction Payment Cart
    },
    {
        timestamps: true
    }
)

const product = mongoose.model("Product", productSchema);

exports.Product = product;
