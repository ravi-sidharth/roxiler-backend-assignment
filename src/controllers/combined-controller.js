const axios = require('axios')
const Product = require('../models/product/product-model')


const fetchCombinedData = async(req,res) => {
   try {
    const {month} = req.query
    console.log(month)
    
    const transactionsData = await axios.get(`/transactions?month=${month}`, { baseURL: 'https://roxiler-backend-assignment-p406.onrender.com/api' });
    const statisticsData = await axios.get(`/statistics?month=${month}`, { baseURL: 'https://roxiler-backend-assignment-p406.onrender.com/api' }); 
    const barChartData = await axios.get(`/bar-chart?month=${month}`, { baseURL: 'https://roxiler-backend-assignment-p406.onrender.com' }); 
    const pieChartData = await axios.get(`/pie-chart?month=${month}`, { baseURL: 'https://roxiler-backend-assignment-p406.onrender.com/api'}); 

    res.status(200).json({
        success:true,
        message:"Successfully combined data",
        transactionsData:transactionsData.data,
        statisticsData:statisticsData.data,
        barChartData:barChartData.data,
        pieChartData:pieChartData.data
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