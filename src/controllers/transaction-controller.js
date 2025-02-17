const Product = require('../models/product/product-model')

const allTransaction = async (req, res) => {
    try {
        const { month, search, page = 1, perPage = 10 } = req.query
        const monthNumber = parseInt(month)
        const skip = (page - 1) * perPage
        const limit = perPage

        const query = {}

        query.$expr = {
            $eq: [{ $month:"$dateOfSale"}, monthNumber ]
        }

        if (search) {
            const isNumber = isNaN(search)
            query.$or =
               isNumber ?[
                {title: {$regex: search, $options:"i"}},
                {descriptiion:{$regex: search, $options:"i"}},
               ]:[
                {price:{$gte: parseFloat(search) }},
            ]
        }

        

        const transactions = await Product.find(query).skip(skip).limit(limit)

        res.status(200).json({
            success: true,
            message: "Successfully fetch all product transactions",
            transactions,
            page:parseInt(page),
            perPage :parseInt(page)

        })

    } catch (e) {
        console.log('Error occured while fetching transactions', e)
        res.status(500).json({
            success: false,
            message: "Error occured while fetching transactions"
        })
    }
}

module.exports = allTransaction