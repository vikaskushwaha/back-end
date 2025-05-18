const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        return conn;

    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
    }

}
module.exports = connectDB;