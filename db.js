const mongoose = require('mongoose')

const URI="mongodb://localhost:27017/inotebook";


const connecttomongo = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(URI) 
        console.log('Mongo connected')
    } catch(error) {
        console.log(error);
    }
}

module.exports = connecttomongo

// updated version to connect with db

    
