const Product = require('../models/product/product-model')

const fetchPriceRangeItems = async (req, res) => {
    try {
        const { month } = req.query
        const monthNumber = parseInt(month)

        const barChartData = await Product.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: [
                            { $month: "$dateOfSale" },
                            monthNumber
                        ]
                    }
                }
            },
            {
                $group: {
                    _id:0,
                    "0-100": {
                        $sum: { $cond: [{ $and: [{ $gte: ["$price", 0] }, { $lte: ["$price", 100] }] }, 1, 0] }
                    },
                    "101-200": {
                        $sum: { $cond: [{ $and: [{ $gte: ["$price", 101] }, { $lte: ["$price", 200] }] }, 1, 0] },
                    },
                    "201-300": {
                        $sum: { $cond: [{ $and: [{ $gte: ["$price", 201] }, { $lte: ["$price", 300] }] }, 1, 0] },

                    },
                    "301-400": {
                        $sum: { $cond: [{ $and: [{ $gte: ["$price", 301] }, { $lte: ["$price", 400] }] }, 1, 0] }
                    },
                    "401-500": {
                        $sum: { $cond: [{ $and: [{ $gte: ["$price", 401] }, { $lte: ["$price", 500] }] }, 1, 0] },

                    },
                    "501-600": {
                        $sum: { $cond: [{ $and: [{ $gte: ["$price", 501] }, { $lte: ["$price", 600] }] }, 1, 0] },

                    },
                    "601-700": {
                        $sum: { $cond: [{ $and: [{ $gte: ["$price", 601] }, { $lte: ["$price", 700] }] }, 1, 0] },

                    },
                    "701-800": {
                        $sum: { $cond: [{ $and: [{ $gte: ["$price", 701] }, { $lte: ["$price", 800] }] }, 1, 0] },

                    },
                    "801-900": {
                        $sum: { $cond: [{ $and: [{ $gte: ["$price", 801] }, { $lte: ["$price", 900] }] }, 1, 0] },

                    },
                    "901-Above": {
                        $sum: { $cond: [{ $and: [{ $gte: ["$price", 901] }, { $lte: ["$price", Infinity] }] }, 1, 0] },

                    },

                }
            }
        ])
        console.log("BarChartData", barChartData)
        res.status(200).json({
            success: true,
            message: "Successfully fetched all items respective of price",
            barChartData
        })
    } catch (e) {
        console.log("Error occured while fetching price range items", e)
        res.status(500).json({
            success: false,
            message: "Error occured while fetching price range items"
        })
    }
}

module.exports = fetchPriceRangeItems