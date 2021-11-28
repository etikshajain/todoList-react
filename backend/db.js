const mongoose = require('mongoose');
const config=require('./config');
const mongoURI=config.mongoUrl;

const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to mongo successfully!");
    });
}

module.exports=connectToMongo;