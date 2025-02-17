const Product = require('../models/product/product-model')

const statisticsData = async (req, res) => {
    try {
        const { month } = req.query
        const monthNumber = parseInt(month)
        const statistics = await Product.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: [{
                            $month: "$dateOfSale"
                        },
                            monthNumber
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalSaleAmount: { $sum: { $cond: ["$sold", "$price", 0] } },
                    totalSoldItems: { $sum: { $cond: ["$sold", 1, 0] } },
                    totalNotSoldItems: { $sum: { $cond: ["$sold", 0, 1] } }

                }
            }
        ])
        res.status(200).json({
            success: true,
            message: "Successfully fetched all transaction statistics.",
            statistics
        })
    } catch (e) {
        console.log('Error occured while fetching statistics data', e)
        res.status(500).json({
            success: false,
            message: "Failed to fetch statistics data"
        })
    }
}

module.exports = statisticsData