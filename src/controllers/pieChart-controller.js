const Product = require('../models/product/product-model')

const fetchUniqueCategory = async (req, res) => {
    try {
        const { month } = req.query
        const monthNumber = parseInt(month)

        const pieChartData = await Product.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: [{ $month: "$dateOfSale" }, monthNumber]
                    }
                }
            },
            {
                $group: {
                    _id: "$category",
                    items: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id",
                    items: 1
                }
            },

        ])
        console.log(pieChartData)
        res.status(200).json({
            success: true,
            message: 'Successfully fetched the unique category along with number of items.',
            pieChartData
        })
    } catch (e) {
        console.log('Error occured while fetching unique category with number of items', e)
        res.status(500).json({
            success: false,
            message: 'Failed to fetch unique category with number of items'
        })
    }
}

module.exports = fetchUniqueCategory