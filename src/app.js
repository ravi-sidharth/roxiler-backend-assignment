require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectToMongoDB = require('./db/connectToMongoDB')

const fetchPriceRangeItems = require('./controllers/barChart-controller')
const fetchCombinedData = require('./controllers/combined-controller')
const fetchUniqueCategory = require('./controllers/pieChart-controller')
const statisticsData = require('./controllers/statistics-controller')
const allTransaction = require('./controllers/transaction-controller')
const initializeProduct = require('./controllers/initializeProduct-controller')

const app = express()
const port = process.env.PORT || 3000 

// middlewares 
app.use(express.json())
app.use(cors())

// database connection
connectToMongoDB()

// api 
app.get('/api/product-register',initializeProduct)
app.get('/api/transactions',allTransaction)
app.get('/api/statistics',statisticsData)
app.get('/api/pie-chart',fetchUniqueCategory)
app.get('/api/combined-data',fetchCombinedData)
app.get('/api/bar-chart',fetchPriceRangeItems)


app.listen(port,()=> console.log(`Server Started at http://localhost:${port}`))