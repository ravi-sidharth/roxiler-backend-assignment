const Product = require('../models/product/product-model')

const fetchCombinedData = async(req,res) => {
   try {
    const {month} = req.query
    const transactionsData = await axios.get(`/transactions?month=${month}`, { baseURL: 'http://localhost:3000/api' });
    const statisticsData = await axios.get(`/statistics?month=${month}`, { baseURL: 'http://localhost:3000/api' }); 
    const barChartData = await axios.get(`/bar-chart?month=${month}`, { baseURL: 'http://localhost:3000/api' }); 
    const pieChartData = await axios.get(`/pie-chart?month=${month}`, { baseURL: 'http://localhost:3000/api' }); 

    res.status(200).json({
        success:true,
        message:"Successfully combined data",
        transactionsData,
        statisticsData,
        barChartData,
        pieChartData
    })
   } catch(e) {
    console.log('Error occured while combining data',e)
    res.status(500).json({
        success:false,
        message:"Failed to combine data"
    })
   }
}

module.exports = fetchCombinedData