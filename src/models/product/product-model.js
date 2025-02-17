const { text } = require("express");
const { Schema,model } = require("mongoose");

const productSchema = new Schema({
    id: {
        type:Number,
        required:true,
        unique:true
    },
    title: {
        type:String,
        required:true
    },
    price: {
        type:Number,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    category: {
        type:String,
        required:true
    },
    image: {
        type:String,
        required:true
    },
    sold: {
        type:Boolean,
        required:true
    },
    dateOfSale: {
        type:Date,
        required:true 
    }
})

productSchema.index({title:'text', description:'text', price:'text'})

const Product = model('Product',productSchema)

module.exports = Product