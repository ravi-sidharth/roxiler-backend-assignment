const axios = require('axios')
const Product= require('../models/product/product-model')

const initializeProduct = async(req,res) => {
    try {   
        const result = await axios.get(process.env.PRODUCT_API_URL)
        await Product.insertMany(result.data)

        res.status(201).json({
            success:true,
            message:"Successfully initialize the product",
            data:result.data
        })

    } catch(e) {
        console.log("Error occured while initializing product",e)
        res.status(500).json({
            success:false,
            message:"Failed to initialize the product"
        })
    }

}

module.exports = initializeProduct