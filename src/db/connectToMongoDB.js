const mongoose = require('mongoose') 

function connectToMongoDB() {
    try{
        mongoose.connect(process.env.MONGO_URL)
        console.log('Database Connected Successfully!')
    } catch(e) {
        console.log('Error occured while connecting database',e)
    }
}

module.exports = connectToMongoDB