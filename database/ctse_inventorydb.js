const mongoose = require('mongoose');

const ConnectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI, 
        err => {
            if(err) throw err;
            console.log('connected to MongoDB')
        });

}

module.exports = ConnectDB;