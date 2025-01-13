const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const mongoURL = process.env.MONGOURL;
        if (!mongoURL) {
            throw new Error('MONGOURL is not defined in environment variables');
        }

        await mongoose.connect(mongoURL);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
